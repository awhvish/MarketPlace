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
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
        >
            <div className="relative h-48">
                <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-sm">
                    <VerifiedIcon />
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                {showDetails && (
                    <>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <Link href={`/user/profile/${product.authorUserName}`} className="text-blue-500 hover:underline block mb-4">
                            By {product.authorUserName}
                        </Link>
                    </>
                )}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Current Bid: ${product.price}</span>
                    <span className="text-sm text-gray-500">Ends: {new Date(product.bidEndDate).toLocaleDateString()}</span>
                </div>
                {new Date(product.bidEndDate) > new Date() ?
                    <button onClick={handleIncrease} className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300">
                        Increase Bid Now
                    </button> :
                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300">
                        Bids closed
                    </button>
                }
            </div>
            {showDetails && (
                <div className="bg-gray-100 p-4">
                    <h3 className="text-lg font-semibold mb-2">Bid History</h3>
                    {/*TODO: <BidHistory bids={product.bids} />*/}
                </div>
            )}
        </div>
    )
}

