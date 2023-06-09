'use client'

import { useState } from 'react'

type PaginationHook<T> = {
    totalPages: number
    currentPage: number
    prevPage: number | null
    nextPage: number | null
    goToPage: (page: number) => void
    pageNumbers: number[]
    startIndex: number
    endIndex: number
    currentPageItems: T[]
}

const usePagination = <T,>(
    items: T[],
    itemsPerPage: number
): PaginationHook<T> => {
    const totalPages = Math.ceil(items.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)

    const goToPage = (page: number) => {
        setCurrentPage(page)
    }

    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const nextPage = currentPage < totalPages ? currentPage + 1 : null

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageItems = items.slice(startIndex, endIndex)

    return {
        totalPages,
        currentPage,
        prevPage,
        nextPage,
        goToPage,
        pageNumbers,
        startIndex,
        endIndex,
        currentPageItems
    }
}

export default usePagination
