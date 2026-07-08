"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import BookDemoModal from "@/components/BookDemoModal"

interface BookDemoContextValue {
  openBookDemoModal: () => void
  closeBookDemoModal: () => void
}

const BookDemoContext = createContext<BookDemoContextValue | null>(null)

export function BookDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openBookDemoModal = useCallback(() => setIsOpen(true), [])
  const closeBookDemoModal = useCallback(() => setIsOpen(false), [])

  return (
    <BookDemoContext.Provider value={{ openBookDemoModal, closeBookDemoModal }}>
      {children}
      <BookDemoModal isOpen={isOpen} onClose={closeBookDemoModal} />
    </BookDemoContext.Provider>
  )
}

export function useBookDemo() {
  const context = useContext(BookDemoContext)
  if (!context) {
    throw new Error("useBookDemo must be used within a BookDemoProvider")
  }
  return context
}
