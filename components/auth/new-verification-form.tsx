"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { BeatLoader } from "react-spinners"

export const NewVerificationForm = () => {
    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    )
}