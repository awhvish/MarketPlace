'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import Header from '@/components/Header'
import { addpost } from '@/actions/addpost'
import { Footer } from '@/components/Footer'
import { Session } from 'next-auth'

export default function AddPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    bidEndDate: '',
    filePath: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<boolean>(false)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession()
      setSession(currentSession)

      if (!currentSession) {
        router.push('/unauthorized')
      }
    }

    fetchSession()
  }, [router])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear the error when the user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        // Clear image error
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: '' }))
        }
      } else {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file.' }))
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!image) newErrors.image = 'Image is required'
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.price.trim()) newErrors.price = 'Price is required'
    else if (isNaN(parseFloat(formData.price))) newErrors.price = 'Price must be a number'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.bidEndDate) newErrors.bidEndDate = 'Closing date is required'
    else {
      const selectedDate = new Date(formData.bidEndDate)
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0) // Reset time to start of day
      if (selectedDate <= currentDate) {
        newErrors.bidEndDate = 'Closing date must be in the future'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Reset errors and uploading state
    setErrors({})
    setUploading(true)

    if (validateForm()) {
      try {
        // Upload image
        const imageData = new FormData()
        imageData.append('file', image as File)

        const responseUpload = await fetch('/api/upload', {
          method: 'POST',
          body: imageData,
        })

        if (!responseUpload.ok) {
          throw new Error('Failed to upload image. Please try again.')
        }

        const { filePath } = await responseUpload.json()

        // Prepare form data with file path
        const postData = { 
          ...formData, 
          filePath 
        }

        // Submit post
        const response = await addpost(postData)
        
        if (response.error) {
          throw new Error(response.error)
        }

        // Redirect to user profile if session exists
        if (session?.user?.username) {
          router.push(`/user/profile/${session.user.username}`)
        } else {
          console.error('Session or username is not defined')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setErrors(prev => ({ 
          ...prev, 
          submit: error instanceof Error ? error.message : 'An error occurred while uploading' 
        }))
      } finally {
        setUploading(false)
      }
    } else {
      setUploading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-black/50 rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-[#6D28D9]/30">
          <div className="md:flex">
            <div className="p-8 w-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Artwork</h2>
                <p className="text-sm text-gray-400 mt-1">Share your art with the world</p>
              </div>
              
              {errors.submit && (
                <div className="text-red-500 mb-4 p-3 rounded bg-red-50">
                  {errors.submit}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gradient-to-r file:from-indigo-800 file:from-25% file:to-purple-600 
                      hover:file:from-pink-500 hover:file:to-orange-500
                      file:text-white cursor-pointer"
                  />
                  {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                  {imagePreview && (
                    <div className="mt-4">
                      <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-md" />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-black/50 border border-[#6D28D9]/30 rounded-md shadow-sm py-2 px-3 
                             text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-white">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-black/50 border border-[#6D28D9]/30 rounded-md shadow-sm py-2 px-3 
                             text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  {errors.price && <p className="mt-2 text-sm text-red-400">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-black/50 border border-[#6D28D9]/30 rounded-md shadow-sm py-2 px-3 
                             text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  {errors.description && <p className="mt-2 text-sm text-red-400">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="bidEndDate" className="block text-sm font-medium text-white">
                    Bid End Date
                  </label>
                  <input
                    type="date"
                    name="bidEndDate"
                    id="bidEndDate"
                    value={formData.bidEndDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full bg-black/50 border border-[#6D28D9]/30 rounded-md shadow-sm py-2 px-3 
                             text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                  {errors.bidEndDate && <p className="mt-2 text-sm text-red-600">{errors.bidEndDate}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                             text-sm font-medium text-white bg-gradient-to-r from-indigo-800 from-25% to-purple-600 
                             hover:from-pink-500 hover:to-orange-500 transition
                             ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? 'Uploading...' : 'Add Artwork'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}