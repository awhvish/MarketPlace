'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Chrome } from 'lucide-react'
import { register } from '@/actions/register'
import { FormValues } from '@/utils/formValue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthLayout, AuthFormDivider, AuthFormLink } from '@/components/ui/auth-layout'

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

  const handleGoogleSignUp = () => {
    console.log('Google Sign-Up attempted')
    alert("Not yet functional")
    // Add your Google authentication logic here
  }

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Sign up to start creating and setting up bids for your art!"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-[13px] text-gray-500">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            required
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="block text-[13px] text-gray-500">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            required
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-sm text-red-400">{errors.username}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            required
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            required
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            required
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-400">
            Country
          </label>
          <Input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
            required
            placeholder="Enter your country"
          />
          {errors.country && <p className="text-sm text-red-400">{errors.country}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Account Type</label>
          <div className="flex gap-4">
            <label className="flex items-center text-gray-400">
              <input
                type="radio"
                name="role"
                value="USER"
                checked={formData.role === 'USER'}
                onChange={handleChange}
                className="mr-2 text-indigo-600 focus:ring-indigo-500 bg-[#141414] border-zinc-800"
              />
              User
            </label>
            <label className="flex items-center text-gray-400">
              <input
                type="radio"
                name="role"
                value="ARTIST"
                checked={formData.role === 'ARTIST'}
                onChange={handleChange}
                className="mr-2 text-indigo-600 focus:ring-indigo-500 bg-[#141414] border-zinc-800"
              />
              Artist
            </label>
          </div>
          {errors.role && <p className="text-sm text-red-400">{errors.role}</p>}
        </div>

        {errors.general && (
          <div className="p-3 rounded bg-red-900/20 border border-red-500/20 text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium rounded transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <AuthFormDivider />

      <Button
        variant="outline"
        onClick={handleGoogleSignUp}
        className="w-full bg-[#141414] border-zinc-800 text-white hover:bg-zinc-900 text-sm font-medium"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Sign up with Google
      </Button>

      <AuthFormLink
        href="/auth/login"
        text="Already have an account?"
        label="Sign in"
      />
    </AuthLayout>
  )
}

export default RegisterPage
