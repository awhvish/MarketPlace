import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { VerifiedIcon } from 'lucide-react'
import { Product } from '@/utils/formValue'


interface ProductCardProps {

    product: Product;

    handleIncrease: () => void;

}

export default function ProductCard({ product, handleIncrease }: ProductCardProps) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
        >
            <div className="relative h-48">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm text-white px-2 py-1 text-sm">
                    <VerifiedIcon />
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-white">{product.title}</h2>
                {showDetails && (
                    <>
                        <p className="text-gray-400 mb-4">{product.description}</p>
                        <Link href={`/user/profile/${product.authorUserName}`} className="text-white hover:text-[#6D28D9] block mb-4 transition-colors duration-200">
                            By {product.authorUserName}
                        </Link>
                    </>
                )}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-white">Current Bid: ${product.price}</span>
                    <span className="text-sm text-gray-400">Ends: {new Date(product.bidEndDate).toLocaleDateString()}</span>
                </div>
                {new Date(product.bidEndDate) > new Date() ?
                    <button onClick={handleIncrease} className="w-full bg-[#6D28D9] text-white py-2 px-4 rounded hover:bg-[#5b21b6] transition-colors duration-200">
                        Increase Bid Now
                    </button> :
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-black transition-colors duration-200">
                        Bids closed
                    </button>
                }
            </div>
            {showDetails && (
                <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">Bid History</h3>
                    {/*TODO: <BidHistory bids={product.bids} />*/}
                </div>
            )}
        </div>
    )
}

