import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";

export function CartModal() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    openCheckout
  } = useCartStore();

  const total = getTotalPrice();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeCart}>
      <div className="flex justify-end h-full">
        <div 
          className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeCart}
                className="hover:bg-white/50 rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-400">Add some fresh organic vegetables!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                      <p className="text-organic-green font-medium">₹{item.price}/kg</p>
                      <div className="flex items-center space-x-3 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full border-2 hover:border-organic-green"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full border-2 hover:border-organic-green"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">₹{item.price * item.quantity}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 mt-2 rounded-lg"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-organic-green">₹{total}</span>
              </div>
              <Button
                className="w-full bg-organic-green text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-organic-dark transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={openCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
