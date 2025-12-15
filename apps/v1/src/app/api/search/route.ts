// @ts-nocheck
import { createFromSource } from "fumadocs-core/search/server"

import { source } from "@/lib/fumadocs"

export const { GET } = createFromSource(source)
