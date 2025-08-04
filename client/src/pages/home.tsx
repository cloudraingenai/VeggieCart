import { Truck, Leaf, Package } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { CartModal } from "@/components/cart-modal";
import { CheckoutModal } from "@/components/checkout-modal";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Farm Fresh <span className="text-organic-green">Organic</span> Vegetables
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Delivering nature's finest organic vegetables straight from our farms to your doorstep. 
            100% chemical-free, sustainably grown, and packed with nutrition.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Truck className="w-5 h-5 text-organic-green mr-2" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center">
              <Leaf className="w-5 h-5 text-organic-green mr-2" />
              <span>100% Organic</span>
            </div>
            <div className="flex items-center">
              <Package className="w-5 h-5 text-organic-green mr-2" />
              <span>Fresh Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Our Fresh Collection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Modals */}
      <CartModal />
      <CheckoutModal />
    </div>
  );
}
