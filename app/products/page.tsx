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
    <div className="min-h-[100dvh] flex flex-col bg-black">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-black/95">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative container mx-auto px-4 text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-wider">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                Marketplace Products
              </span>
            </h1>
            <p className="text-xl mb-8 font-light max-w-3xl mx-auto">
              <span className="inline-block px-6 py-2 bg-black/40 backdrop-blur-sm rounded-lg text-white/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10">
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
  )
}
