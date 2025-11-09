import { notFound } from 'next/navigation';
import { getProductFromId } from '@/utils/product';
import Image from 'next/image'
import Link from 'next/link'
import { IncreaseBidButton } from '@/components/products/IncreaseBidButton';
import BidHistory from '@/components/products/BidHistory';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar } from 'lucide-react';

export default async function ArtworkPage({ params }: { params: { id: string } }) {
    try {
        const artwork = await getProductFromId(Number(params.id));
        if (!artwork) {
            notFound();
        }

        return (
            <div className="min-h-screen flex flex-col bg-black text-white">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#6D28D9]/30">
                            <Image
                                src={artwork.image}
                                alt={artwork.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold tracking-tight">{artwork.title}</h1>
                            <div className="flex items-center space-x-2 text-sm text-white/70">
                                <Calendar className="h-4 w-4" />
                                <span>Published on {new Date(artwork.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-lg text-white/70">{artwork.description}</p>

                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-white/70">Owned by</span>
                                <Link 
                                  href={`/user/profile/${artwork.author.username}`} 
                                  className="text-[#6D28D9] hover:text-[#5b21b6] transition-colors"
                                >
                                    {artwork.author.username}
                                </Link>
                            </div>
                            <IncreaseBidButton price={artwork.price} id={Number(params.id)} />
                            <BidHistory 
                              bids={artwork.bidHistory.map((bid: {
                                userId: string;
                                username: string;
                                amount: number;
                                timestamp: string;
                              }) => ({
                                id: `${bid.userId}-${bid.timestamp}`,
                                amount: bid.amount,
                                createdAt: bid.timestamp,
                                user: {
                                  username: bid.username
                                }
                              }))} 
                              currentPrice={Number(artwork.price)}
                            />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('Error in ArtworkPage:', error);
        throw new Error('Failed to load artwork');
    }
}