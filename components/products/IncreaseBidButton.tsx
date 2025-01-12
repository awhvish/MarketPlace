'use client'

import {  increaseBid } from "@/actions/increaseBid";
import { DollarSign, ChevronUp } from "lucide-react"
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface IncreaseBidButtonProps {
    price: string;
    id: number;
}

export const IncreaseBidButton = ({ price, id }: IncreaseBidButtonProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<string> ("");
    const [success, setSuccess] = useState<string> ("");
    const router =  useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const fetchedSession = await getSession();
            setSession(fetchedSession);
        };
    
        fetchSession();
    }, []);
    

    const submitBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session) {
            router.push('/auth/login')
        }
        const formData = new FormData(e.target as HTMLFormElement);

        const newBid = formData.get('bidAmount');

        if (!newBid) setError("Invalid FormData");

        if (newBid && Number(newBid) > Number(price)){
            const response = await increaseBid(Number(newBid), id);
            if(response?.error) {
                setError(response?.error)
                setSuccess("")

            }
            if (response?.success){
                setSuccess(response?.success)
                setError("")

            }
        }
        else {
            setError("New bid should be higher than the current bid")
        }


    }

    return (
        <div className="bg-muted p-4 rounded-lg bg-gray-100">
            <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Current Bid</span>
                <span className="text-2xl font-bold">${price}</span>
            </div>
            <form onSubmit={submitBid} className="mt-4">
                <input type="hidden" name="artworkId" value={id} />
                <div className="flex items-center">
                    <div className="relative flex-grow">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="number"
                            name="bidAmount"
                            placeholder="Enter your bid"
                            className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded-r-md hover:bg-primary/90 transition-colors flex items-center bg-black"
                    >
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Increase Bid
                    </button>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}
            </form>
        </div>)
}