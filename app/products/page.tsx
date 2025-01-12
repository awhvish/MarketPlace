import ProductGrid from '@/components/ProductGrid'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getProducts } from '@/utils/product'

export default async function Home() {
  // Fetch posts from database
  const { ongoingProducts, previousProducts } = await getProducts()


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 mb-40">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Auction Arts</h1>
        <ProductGrid  ongoingProducts={ongoingProducts} previousProducts={previousProducts}/>
      </main>
      <Footer />
    </div>
  )
}
