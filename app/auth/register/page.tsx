'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Phone, Globe, ArrowRight } from 'lucide-react'
import { register } from '@/actions/register'
import { FormValues } from '@/utils/formValue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    username: '',
    phone: '',
    country: '',
    role: 'USER'
  })

  interface FormErrors extends Partial<FormValues> {
    general?: string
  }

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submission started')
    console.log('Form data:', formData)
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await register(formData)
      if (response?.error) {
        console.log('Error received:', response.error)
        setErrors({ general: response.error })
      } else {
        console.log('Registration successful')
        router.push('/') // Redirect after successful registration
      }
    } catch (error) {
      console.log('Caught error:', error)
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
      console.error('Registration error:', error)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Left Side - Art Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative w-full h-full flex flex-col items-center justify-center p-12 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
            Start Your Journey
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-md">
            Join thousands of artists and collectors in the world&apos;s most vibrant digital art marketplace.
          </p>
          <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-left">
              <h3 className="text-lg font-semibold mb-2">🎨 For Artists</h3>
              <p className="text-sm text-gray-400">Showcase your work and connect with collectors worldwide</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-left">
              <h3 className="text-lg font-semibold mb-2">🖼️ For Collectors</h3>
              <p className="text-sm text-gray-400">Discover unique pieces and support emerging artists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Join Us Today</h2>
            <p className="mt-2 text-gray-400">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {errors.general && (
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/20 text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                required
                placeholder="Full Name"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                required
                placeholder="Username"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.username && <p className="text-sm text-red-400 mt-1">{errors.username}</p>}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                required
                placeholder="Email Address"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                required
                placeholder="Password"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                required
                placeholder="Phone Number"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.phone && <p className="text-sm text-red-400 mt-1">{errors.phone}</p>}
            </div>

            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                error={!!errors.country}
                required
                placeholder="Country"
                className="h-12 pl-12 bg-zinc-900/50 border-zinc-800 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg transition-all duration-300"
              />
              {errors.country && <p className="text-sm text-red-400 mt-1">{errors.country}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  formData.role === 'USER' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="USER"
                    checked={formData.role === 'USER'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Collector</span>
                </label>
                <label className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  formData.role === 'ARTIST' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="ARTIST"
                    checked={formData.role === 'ARTIST'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">Artist</span>
                </label>
              </div>
              {errors.role && <p className="text-sm text-red-400">{errors.role}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg h-12 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : (
                <>
                  Create Account <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={() => router.push('/auth/login')}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
