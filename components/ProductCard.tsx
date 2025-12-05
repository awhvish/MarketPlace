import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { VerifiedIcon, Clock, User, TrendingUp } from 'lucide-react'
import { Product } from '@/utils/formValue'


interface ProductCardProps {
    product: Product;
    handleIncrease: () => void;
}

export default function ProductCard({ product, handleIncrease }: ProductCardProps) {
    const [showDetails, setShowDetails] = useState(false)
    const [imageError, setImageError] = useState(false)
    
    const isBidActive = new Date(product.bidEndDate) > new Date()
    const daysLeft = Math.ceil((new Date(product.bidEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    return (
        <div
            className="group relative glass rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20"
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            style={{ transform: 'translateZ(0)' }}
        >
            {/* Image Section */}
            <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
                {!imageError && product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                        <span className="text-7xl opacity-40">🎨</span>
                    </div>
                )}
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Verified Badge */}
                <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-lg transition-all duration-300 group-hover:scale-105">
                    <VerifiedIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold">Verified</span>
                </div>
                
                {/* Status Badge */}
                {isBidActive && daysLeft <= 3 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-bold uppercase tracking-wide">{daysLeft}d left</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <h2 className="text-xl font-bold text-white line-clamp-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300">
                    {product.title}
                </h2>

                {/* Description (shown on hover) */}
                <div className={`transition-all duration-500 overflow-hidden ${showDetails ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                </div>

                {/* Author */}
                <Link 
                    href={`/user/profile/${product.authorUserName}`} 
                    className="flex items-center gap-2.5 text-gray-400 hover:text-purple-300 transition-all duration-200 group/author"
                >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-purple-500/20 group-hover/author:ring-purple-500/40 transition-all">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">By {product.authorUserName}</span>
                </Link>

                {/* Price and Date */}
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Current Bid</p>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-2xl font-bold gradient-text">
                                ${Number(product.price).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Ends On</p>
                        <p className="text-sm font-semibold text-gray-300">
                            {new Date(product.bidEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                {isBidActive ? (
                    <button 
                        onClick={handleIncrease} 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 group/button relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                        <TrendingUp className="w-5 h-5 relative z-10 transition-transform group-hover/button:scale-110" />
                        <span className="relative z-10">Place Bid Now</span>
                    </button>
                ) : (
                    <button 
                        disabled
                        className="w-full bg-gray-800/50 text-gray-500 py-3.5 px-4 rounded-xl font-semibold cursor-not-allowed border border-gray-700/50"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Clock className="w-5 h-5" />
                            Bidding Closed
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}

