import { notFound } from 'next/navigation';
import { getProductFromId } from '@/utils/product';
import Image from 'next/image'
import Link from 'next/link'
import { IncreaseBidButton } from '@/components/products/IncreaseBidButton';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar } from 'lucide-react';

export default async function ArtworkPage({ params }: { params: { id: string } }) {
    const artwork = await getProductFromId(Number(params.id));
    if (!artwork) {
        notFound();
    }

    return (
        <>
            <Header></Header>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={artwork.image}
                            alt={artwork.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                        />
                        {/* TODO: Bid History Section
                        <div className="bg-muted p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Bid History</h2>
                            <ul className="space-y-2">
                                {artwork.bidHistory.map((bid, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-muted-foreground">{bid.bidder}</span>
                                        <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         */}
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">{artwork.title}</h1>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Published on {new Date(artwork.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-lg text-muted-foreground">{artwork.description}</p>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Owned by</span>
                            <Link href={`/user/${artwork.authorUserName}`} className="text-primary hover:underline">
                                {artwork.authorUserName}
                            </Link>
                        </div>
                        <IncreaseBidButton price={artwork.price} id={Number(params.id)}></IncreaseBidButton>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}