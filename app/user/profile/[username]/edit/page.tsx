'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import {  Camera } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { edit } from '@/actions/edit'
import { Footer } from '@/components/Footer'

export default function EditProfilePage() {
    const router = useRouter()
    const [error, setError] = useState<string> ('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        username: '',
        country: '',
    })

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession()
            if (session?.user) {
                setFormData(prevData => ({
                    ...prevData,
                    name: session.user.name || '',
                    email: session.user.email || 'johndoe@example.com',
                    username: session.user.username || '',
                    phone: session.user.phone || '',
                    country: session.user.country || ''
                }))
            }
        }
        fetchSession()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await edit(formData);
            if (response?.error) {
                setError(response.error);
                console.log(response.error)
            }
            else if (response?.success) {
                router.push(`/user/profile/${formData.username}`);
            }
        }
        catch(error) {
            console.log("Error encountered: " + error);
        }
        
        console.log('Updated profile data:', formData)
        // After successful update, redirect to profile page
        // router.push('/profile')
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Camera size={32} className="text-gray-400" />
                                </div>
                                <button type="button" className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                                    <Camera size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {error ? 
                        <div className='text-red-600'>
                            {error}
                        </div>: ""}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}