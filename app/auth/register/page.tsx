'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChromeIcon as Google } from 'lucide-react'
import { register } from '@/actions/register'
import { FormValues } from '@/utils/formValue'

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    username: '',
    phone: '',
    country: ''
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-500 mt-2">Sign up to start creating and setting up bids for your art!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>

          {errors.general && <div className="text-red-500 text-sm mt-2">{errors.general}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <div className="border-t border-gray-200 flex-grow"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-black hover:text-white transition duration-300"
        >
          <Google className="mr-2 h-5 w-5" />
          Sign up with Google
        </button>


        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <Link href="login" className="text-black font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
