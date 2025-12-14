import { atom } from 'jotai'

type Grid = true | false

export const gridAtom = atom<Grid>(true)