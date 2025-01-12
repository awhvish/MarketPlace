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
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8 w-full">
              <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold mb-1">Add New Post</div>
              
              {errors.submit && (
                <div className="text-red-500 mb-4">{errors.submit}</div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gray-50 file:text-gray-700
                      hover:file:bg-gray-100"
                  />
                  {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-md" />
                  </div>
                )}

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                  {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                  {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                  {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="bidEndDate" className="block text-sm font-medium text-gray-700">
                    Closing Date
                  </label>
                  <input
                    type="date"
                    name="bidEndDate"
                    id="bidEndDate"
                    value={formData.bidEndDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                  {errors.bidEndDate && <p className="mt-2 text-sm text-red-600">{errors.bidEndDate}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploading ? 'Uploading...' : 'Add Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}