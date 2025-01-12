"use client"
import { signOut } from "next-auth/react"

export const SignoutButton = () => {

    const handleSignout = () => {
        signOut({redirect:true})
    }
    return (
        <button onClick={handleSignout}
        className="w-full bg-red-600 text-white font-semibold py-2 mt-5 px-4 rounded hover:bg-gray-800 transition duration-300 text-center block"
      >
        Sign Out
      </button>
    )
}