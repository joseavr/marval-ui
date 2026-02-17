type LogEntry = {
  id: number;
  time: number;
  label?: string;
  data: unknown;
  preview: string;
  stack?: string;
  component?: string
};

type Listener = () => void;

let logs: LogEntry[] = [];
const listeners = new Set<Listener>();
let id = 0;

export const store = {
  get: () => logs,

  push(entry: Omit<LogEntry, "id">) {
    logs = [{ ...entry, id: ++id }, ...logs];
    listeners.forEach(l => void l());
  },

  clear() {
    logs = [];
    listeners.forEach(l => void l());
  },

  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
};
