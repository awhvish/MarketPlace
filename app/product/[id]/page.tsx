import { notFound } from 'next/navigation';
import { getProductFromId } from '@/utils/product';
import Image from 'next/image'
import Link from 'next/link'
import { IncreaseBidButton } from '@/components/product/IncreaseBidButton';
import BidHistory from '@/components/product/BidHistory';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, User, Eye, Heart, TrendingUp, Crown } from 'lucide-react';

export default async function ArtworkPage({ params }: { params: { id: string } }) {
    try {
        const artwork = await getProductFromId(Number(params.id));
        if (!artwork) {
            notFound();
        }

        // Get highest bid - ensure amount is treated as a number
        const highestBid = artwork.bidHistory && artwork.bidHistory.length > 0 
            ? artwork.bidHistory.reduce((max, bid) => {
                const bidAmount = Number(bid.amount);
                const maxAmount = Number(max.amount);
                return bidAmount > maxAmount ? bid : max;
            }, artwork.bidHistory[0])
            : null;

        // Current bid should be the highest bid amount, or the starting price if no bids
        const currentBidAmount = highestBid ? String(highestBid.amount) : artwork.price;

        return (
            <div className="min-h-screen flex flex-col relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
                
                {/* Gradient Orbs - More subtle */}
                <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-600/8 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/6 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
                
                {/* Grid Pattern Overlay - Very subtle */}
                <div className="fixed inset-0 opacity-[0.01]" style={{
                    backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
                
                <div className="relative z-10 min-h-screen flex flex-col text-white">
                    <Header />
                    
                    {/* Hero Section with Enhanced Background */}
                    <div className="relative pt-24 pb-12">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent"></div>
                    </div>
                    
                    <main className="flex-1 container mx-auto px-4 -mt-8 pb-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {/* Left Column - Image */}
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Image
                                    src={artwork.image}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                            </div>
                            
                            {/* Image Info Bar */}
                            <div className="glass rounded-xl p-4 flex items-center justify-between border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">1.2K views</span>
                                    </div>
                                    <button className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                                        <Heart className="w-4 h-4" />
                                        <span className="text-sm">Add to favorites</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                            {/* Title and Metadata */}
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight gradient-text-animated">
                                    {artwork.title}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
                                        <Calendar className="h-4 w-4 text-purple-400" />
                                        <span className="text-gray-300">Published on {new Date(artwork.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="glass rounded-xl p-6 border border-white/10">
                                <p className="text-lg text-gray-300 leading-relaxed">{artwork.description}</p>
                            </div>

                            {/* Owner Info */}
                            <div className="glass rounded-xl p-6 border border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider">Owned by</p>
                                            <Link 
                                                href={`/user/profile/${artwork.author.username}`} 
                                                className="text-lg font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                            >
                                                {artwork.author.username}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Highest Bid Display */}
                            {highestBid && (
                                <div className="glass rounded-xl p-6 border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 relative overflow-hidden">
                                    {/* Decorative gradient */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Crown className="w-5 h-5 text-yellow-400" />
                                            <h3 className="text-lg font-semibold text-white">Highest Bidder</h3>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center ring-4 ring-yellow-500/20">
                                                    <span className="text-xl font-bold text-white">
                                                        {highestBid.username?.[0]?.toUpperCase() || '?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-1">Leading bid by</p>
                                                    <p className="text-xl font-bold text-white">{highestBid.username}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(highestBid.timestamp).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                                    <p className="text-sm text-gray-400">Current Bid</p>
                                                </div>
                                                <p className="text-3xl font-bold gradient-text">
                                                    ${highestBid.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Bidding Section */}
                            <IncreaseBidButton price={currentBidAmount} id={Number(params.id)} highestBid={highestBid} />
                            
                            {/* Bid History */}
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
                                currentPrice={highestBid ? Number(highestBid.amount) : Number(artwork.price)}
                            />
                        </div>
                    </div>
                </main>
                <Footer />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error in ArtworkPage:', error);
        throw new Error('Failed to load artwork');
    }
}