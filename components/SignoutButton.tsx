"use client"
import { signOut } from "next-auth/react"

export const SignoutButton = () => {

    const handleSignout = () => {
        signOut({redirect:true})
    }
    return (
        <button onClick={handleSignout}
        className="w-full bg-gradient-to-r from-indigo-800 from-25% to-purple-600 hover:from-pink-500 hover:to-orange-500 text-white font-semibold py-2 mt-5 px-4 rounded-md transition text-center block"
      >
        Sign Out
      </button>
    )
}