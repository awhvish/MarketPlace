import ProductGrid from '@/components/ProductGrid'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getProducts } from '@/utils/product'
import { Suspense } from 'react'

function ProductGridSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 animate-pulse">
      <aside className="md:w-1/4">
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-white/10">
          <div className="h-8 w-32 bg-white/10 rounded mb-4"></div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-10 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
      <main className="md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-white/10">
              <div className="w-full h-48 bg-white/10 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default async function ProductsPage() {
  const { ongoingProducts, previousProducts } = await getProducts()

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Solid Dark Background */}
      <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
      
      {/* Very Subtle Gradient Orbs - barely visible */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      {/* Minimal Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.008]" style={{
        backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20">
            <div className="absolute inset-0 bg-transparent"></div>
            
            <div className="relative container mx-auto px-4 text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="gradient-text-animated drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                  Products
                </span>
              </h1>
              <p className="text-xl mb-8 font-light max-w-3xl mx-auto">
                <span className="inline-block px-8 py-3 glass rounded-2xl text-white/90 shadow-2xl border border-white/20">
                  Discover unique products and place your bids in our digital marketplace
                </span>
              </p>
            </div>

            <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl">
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid
                  ongoingProducts={ongoingProducts}
                  previousProducts={previousProducts}
                />
              </Suspense>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
