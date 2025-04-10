"use client"
import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import Clipboard from "clipboard";
import { Check, Copy } from 'lucide-react'
import { TooltipContent } from '@radix-ui/react-tooltip'

const ItemsPerPage = 6

interface Chapter {
    id: string;
    title: string;
    content: string[];
}

interface UserData {
    savedChapters: Chapter[];
}

const ChapterWrapper = ({ userData }: { userData: UserData }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPage = Math.ceil(userData.savedChapters.length / ItemsPerPage)
    const start = (currentPage - 1) * ItemsPerPage
    const end = start + ItemsPerPage
    const currentChapters = userData.savedChapters.slice(start, end)

    useEffect(() => {
        const clipboard = new Clipboard(".btn-copy");

        clipboard.on("success", (e) => {
            setCopiedId(e.trigger.id);
            setTimeout(() => setCopiedId(null), 2000);
            e.clearSelection();
        });

        return () => clipboard.destroy();
    }, []);

    return (
        <div>
            <div className='grid grid-cols-12 gap-4'>
                {
                    userData?.savedChapters && userData.savedChapters.length > 0 ? (
                        currentChapters.map((elem: Chapter) => (
                            <div key={elem.id} className='col-span-4 p-10'>
                                <h1 className='font-bold pb-8'>{elem.title}</h1>

                                <div className='w-full rounded p-4 h-64 overflow-auto border'>
                                    {
                                        elem.content.map((content: string) => (
                                            <h1 key={content}>{content}</h1>
                                        ))
                                    }
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                value={"outline"}
                                                className={`w-full flex justify-center items-center space-x-2 btn-copy ${copiedId === elem.id ? "bg-green-500" : ""
                                                    }`}
                                                variant={"outline"}
                                                id={elem.id}
                                                data-clipboard-text={elem.content.join('\n')}
                                            >
                                                {copiedId === elem.id ? (
                                                    <Check className="w-5 h-5" />
                                                ) : (
                                                    <Copy className="w-5 h-5" />
                                                )}
                                                <span>{copiedId === elem.id ? "Copied" : "Copy"}</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-black text-white p-2 border rounded'>
                                            <p>
                                                {copiedId === elem.id
                                                    ? "Copied To Clipboard!"
                                                    : "Copy chapters to clipboard!"}
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </div>
                        )))
                        : <div>
                            No Chapter found
                        </div>
                }

            </div>

            <Pagination>
                <PaginationContent>

                    <PaginationItem>
                        <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={`${currentPage === 1 ? 'pointer-events-none text-zinc-400' : 'pointer-event-auto'}`}
                        />
                    </PaginationItem>

                    {
                        [...Array(totalPage)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href='#' onClick={() => setCurrentPage(index + 1)} >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }

                    <PaginationItem>
                        <PaginationNext onClick={() => setCurrentPage(prev => Math.min(totalPage, prev + 1))}
                            className={`${currentPage === totalPage ? 'pointer-events-none text-zinc-400' : 'pointer-events-auto '}`}
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default ChapterWrapper