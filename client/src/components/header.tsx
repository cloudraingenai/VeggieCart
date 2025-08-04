import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";

export function Header() {
  const { toggleCart, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-organic-green">🌱</span>
                <span className="ml-2 text-xl font-bold text-gray-900">xyzOrganics</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              className="relative px-4 py-2 text-gray-600 hover:text-organic-green transition-colors rounded-lg"
              onClick={toggleCart}
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              <span className="font-medium">
                {totalItems > 0 ? `₹${totalPrice}` : 'Cart'}
              </span>
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 bg-organic-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Floating Cart Button for Mobile */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50 lg:hidden">
          <Button
            onClick={toggleCart}
            className="bg-organic-green text-white rounded-full w-16 h-16 shadow-lg hover:bg-organic-dark transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <ShoppingCart className="w-6 h-6 mb-1" />
              <Badge className="bg-white text-organic-green text-xs rounded-full px-2 py-0">
                {totalItems}
              </Badge>
            </div>
          </Button>
        </div>
      )}
    </>
  );
}
