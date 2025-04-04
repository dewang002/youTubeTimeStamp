"use client"
import React, { useEffect } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ChapterWrapper = ({ userData }: { userData: any }) => {


    useEffect(() => {

    }, [userData])

    return (
        <div className='grid grid-cols-12 gap-4'>
            {
                userData?.savedChapters && userData.savedChapters.length > 0 ? (
                    userData.savedChapters.map((elem: any) => (
                        <div key={elem.id} className='col-span-4 p-10'>
                            <h1 className='font-bold pb-8'>{elem.title}</h1>

                            <div className='w-full rounded p-4 h-64 overflow-auto border'>
                                {
                                    elem.content.map((elem: any) => (
                                        <h1>{elem}</h1>
                                    ))
                                }
                            </div>
                        </div>
                    ))

                ) : <div>
                    No Chapter found
                </div>
            }
        </div>
    )
}

export default ChapterWrapper