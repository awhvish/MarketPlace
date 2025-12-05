'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Camera, User, Mail, Phone, MapPin, Lock, UserCircle, Sparkles } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { edit } from '@/actions/edit'
import { Footer } from '@/components/Footer'

export default function EditProfilePage() {
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        username: '',
        country: '',
        role: 'USER' as 'USER' | 'ARTIST'
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
                    country: session.user.country || '',
                    role: session.user.role || 'USER'
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
        setIsLoading(true)
        setError('')
        
        try {
            const response = await edit(formData)
            if (response?.error) {
                setError(response.error)
            } else if (response?.success) {
                router.push(`/user/profile/${formData.username}`)
            }
        } catch(error) {
            setError('An unexpected error occurred')
            console.error('Error encountered:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
            
            {/* Gradient Orbs */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            <div className="fixed top-1/3 right-1/3 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
            
            {/* Grid Pattern */}
            <div className="fixed inset-0 opacity-[0.015]" style={{
                backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>
            
            <div className="relative z-10 min-h-screen flex flex-col text-white">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-12 pt-24">
                    <div className="max-w-3xl mx-auto">
                        {/* Page Header */}
                        <div className="text-center mb-12 animate-fade-in-up">
                            <div className="inline-block mb-4">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                <span className="gradient-text-animated drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                                    Edit Profile
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300">
                                Update your personal information
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Profile Image */}
                                <div className="flex items-center justify-center mb-8">
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center ring-4 ring-purple-500/20 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                            <User className="w-14 h-14 text-white" />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-4 border-[#0a0a0a]"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 animate-fade-in-up">
                                        <p className="text-sm font-medium flex items-center gap-2">
                                            <span>⚠️</span> {error}
                                        </p>
                                    </div>
                                )}

                                {/* Name Input */}
                                <div className="space-y-3">
                                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <UserCircle className="w-4 h-4 text-purple-400" />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="space-y-3">
                                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <Mail className="w-4 h-4 text-purple-400" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Username Input */}
                                <div className="space-y-3">
                                    <label htmlFor="username" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <User className="w-4 h-4 text-purple-400" />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="@username"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="space-y-3">
                                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <Phone className="w-4 h-4 text-purple-400" />
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Location Input */}
                                <div className="space-y-3">
                                    <label htmlFor="country" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <MapPin className="w-4 h-4 text-purple-400" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="City, Country"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="space-y-3">
                                    <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <Lock className="w-4 h-4 text-purple-400" />
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Leave blank to keep current password"
                                        className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 ${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover-scale'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Saving Changes...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                <span>Save Changes</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}