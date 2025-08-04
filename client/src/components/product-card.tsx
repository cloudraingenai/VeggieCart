import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleImageError = () => {
    setImageError(true);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageError ? (product.fallbackImage || product.image) : product.image,
      quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} kg of ${product.name} added to your cart.`,
    });
    
    setQuantity(1);
  };

  const imageUrl = imageError ? (product.fallbackImage || product.image) : product.image;

  return (
    <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 hover:scale-[1.02]">
      <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-50 to-green-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>
        
        <div className="flex justify-center items-center py-2">
          <span className="text-3xl font-bold text-organic-green">₹{product.price}/kg</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 hover:border-organic-green"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-2 hover:border-organic-green"
              onClick={incrementQuantity}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button
          className="w-full bg-organic-green text-white py-4 px-6 rounded-lg font-semibold hover:bg-organic-dark transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
