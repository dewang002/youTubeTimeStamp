"use client"
import React from "react"
import { useFormState } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

interface SubmissionButtonProps {
    text: string
}

const SubmissionButton = ({text}:SubmissionButtonProps) => {
    const { pending } = useFormState()

    return(
        <Button>
            {pending? <Loader2 /> : text }
        </Button>
    )
}

export default SubmissionButton;