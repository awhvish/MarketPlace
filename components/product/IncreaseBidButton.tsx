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
    highestBid?: {
        username: string;
        amount: number;
        timestamp: string;
    } | null;
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
        <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
            {/* Current Bid Display */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Current Bid</p>
                    <span className="text-4xl font-bold gradient-text">${price}</span>
                </div>
            </div>
            
            {/* Bid Form */}
            <form onSubmit={submitBid} className="space-y-4">
                <input type="hidden" name="artworkId" value={id} />
                
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Place Your Bid</label>
                    <div className="flex gap-3">
                        <div className="relative flex-grow">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="number"
                                name="bidAmount"
                                placeholder="Enter your bid amount"
                                className="w-full h-14 pl-12 pr-4 glass border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder:text-gray-500 transition-all duration-300"
                                required
                                min={Number(price) + 1}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover-scale shadow-lg hover:shadow-purple-500/50 flex items-center gap-2 whitespace-nowrap"
                        >
                            <ChevronUp className="h-5 w-5" />
                            Increase Bid
                        </button>
                    </div>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm animate-fade-in-up">
                        <span className="text-lg">⚠️</span>
                        <span>{error}</span>
                    </div>
                )}
                
                {/* Success Message */}
                {success && (
                    <div className="flex items-center gap-2 p-4 bg-green-900/30 border border-green-500/30 rounded-xl text-green-300 text-sm animate-fade-in-up">
                        <span className="text-lg">✅</span>
                        <span>{success}</span>
                    </div>
                )}
                
                <p className="text-xs text-gray-500 text-center">
                    💡 Your bid must be higher than the current bid
                </p>
            </form>
        </div>)
}