import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "relative text-muted-foreground pointer-events-none w-fit min-w-5 gap-1 font-sans text-xs font-medium -top-[0.03em] box-border inline-flex h-fit shrink-0 select-none items-center justify-center whitespace-nowrap rounded-xs bg-neutral-100 px-[0.5em] pb-[0.05em] align-text-top text-[0.75em] text-neutral-900 leading-[1.7em] shadow-[inset_0_-0.05em_0.5em_rgba(0,0,0,0.05),inset_0_0.05em_rgba(255,255,255,0.7),inset_0_0.25em_0.5em_rgba(255,255,255,0.04),inset_0_-0.1em_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.15),0_0.08em_0.17em_rgba(0,0,0,0.25)] transition-[box-shadow,background-color] duration-150 [word-spacing:-0.1em] dark:bg-accent/20 dark:text-foreground",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
