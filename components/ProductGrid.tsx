'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import BidMenu from '@/components/bidMenu'
import { Product } from '@/utils/formValue'
import { useRouter } from 'next/navigation'
import { PackageOpen, Sparkles } from 'lucide-react'


interface ProductGridProps {
    ongoingProducts: Product[];
    previousProducts: Product[];
}

export default function ProductGrid({ ongoingProducts, previousProducts }: ProductGridProps) {
    const [category, setCategory] = useState('ongoing')
    const router = useRouter();
    const productsToDisplay = category === 'ongoing' ? ongoingProducts : previousProducts

    const handleIncrease = (id: number) => {
        router.push(`/product/${id}`)
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar for Category Selection */}
            <aside className="lg:w-1/4 w-full">
                <div className="sticky top-24">
                    <BidMenu onCategoryChange={setCategory} activeCategory={category} />
                    
                    {/* Stats Card */}
                    <div className="mt-6 glass rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-semibold text-white">Marketplace Stats</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Active Bids</span>
                                <span className="text-lg font-bold gradient-text">{ongoingProducts.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Completed</span>
                                <span className="text-lg font-bold text-gray-300">{previousProducts.length}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                <span className="text-sm text-gray-400">Total Items</span>
                                <span className="text-lg font-bold text-white">{ongoingProducts.length + previousProducts.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <main className="lg:w-3/4 w-full">
                {/* Info Card with Count */}
                <div className="mb-6 glass rounded-2xl p-5 border border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white mb-1">
                            {category === 'ongoing' ? 'Live bidding now' : 'Completed sales'}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {productsToDisplay.length} {productsToDisplay.length === 1 ? 'product' : 'products'}
                        </p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
                        <span className="text-lg font-bold gradient-text">{productsToDisplay.length}</span>
                    </div>
                </div>

                {/* Products Grid */}
                {productsToDisplay.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-up">
                        {productsToDisplay.map((product, index) => (
                            <div 
                                key={product.id}
                                style={{animationDelay: `${index * 0.05}s`}}
                                className="animate-fade-in-up"
                            >
                                <ProductCard
                                    handleIncrease={() => handleIncrease(product.id)}
                                    product={product}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass rounded-2xl p-12 border border-white/10 text-center animate-fade-in-up">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                <PackageOpen className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-2">
                                No {category} products found
                            </h3>
                            <p className="text-gray-400 mb-6 max-w-md">
                                {category === 'ongoing' 
                                    ? 'There are no active auctions at the moment. Check back soon!' 
                                    : 'No completed auctions to display yet.'}
                            </p>
                            {category === 'previous' && ongoingProducts.length > 0 && (
                                <button
                                    onClick={() => setCategory('ongoing')}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover-scale"
                                >
                                    View Active Auctions
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
