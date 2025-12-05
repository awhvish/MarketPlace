"use client"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { useState } from "react"

export const SignoutButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSignout = async () => {
        setIsLoading(true)
        await signOut({redirect: true})
    }
    
    return (
        <button 
            onClick={handleSignout}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing out...</span>
                </>
            ) : (
                <>
                    <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Sign Out</span>
                </>
            )}
        </button>
    )
}