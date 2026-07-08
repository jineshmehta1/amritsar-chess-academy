"use client"

import { BookDemoProvider } from "@/components/BookDemoProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return <BookDemoProvider>{children}</BookDemoProvider>
}
