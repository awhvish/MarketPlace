'use client'

import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import Header from '@/components/Header'
import { addpost } from '@/actions/addpost'
import { Footer } from '@/components/Footer'
import { Session } from 'next-auth'
import { Upload, DollarSign, FileText, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
      
      {/* Multiple Gradient Orbs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      <div className="fixed top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      
      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 py-12 pt-24 px-4 sm:px-6 lg:px-8">
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
                  Add New Artwork
                </span>
              </h1>
              <p className="text-lg text-gray-300">
                Share your masterpiece with the world
              </p>
            </div>
            
            {/* Form Card */}
            <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {errors.submit && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 animate-fade-in-up">
                  <p className="text-sm font-medium">{errors.submit}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <label htmlFor="image" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                    Upload Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 glass-hover rounded-xl border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all duration-300 group"
                    >
                      <Upload className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {image ? image.name : 'Choose a file or drag it here'}
                      </span>
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.image}
                    </p>
                  )}
                  {imagePreview && (
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                      <Image 
                        src={imagePreview} 
                        alt="Preview" 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4">
                          <p className="text-white font-semibold">Preview</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title Input */}
                <div className="space-y-3">
                  <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your artwork title"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.title}
                    </p>
                  )}
                </div>

                {/* Starting Price Input */}
                <div className="space-y-3">
                  <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    Starting Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.price}
                    </p>
                  )}
                </div>

                {/* Description Textarea */}
                <div className="space-y-3">
                  <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your artwork, its inspiration, techniques used..."
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.description}
                    </p>
                  )}
                </div>

                {/* Bid End Date */}
                <div className="space-y-3">
                  <label htmlFor="bidEndDate" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    Bid End Date
                  </label>
                  <input
                    type="date"
                    name="bidEndDate"
                    id="bidEndDate"
                    value={formData.bidEndDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  {errors.bidEndDate && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.bidEndDate}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 ${
                      uploading ? 'opacity-50 cursor-not-allowed' : 'hover-scale'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Add Artwork</span>
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