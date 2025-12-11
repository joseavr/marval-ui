import { atom } from 'jotai'

type Layout = "full" | "zen"

export const layoutAtom = atom<Layout>("full")