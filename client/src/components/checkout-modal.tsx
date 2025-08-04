import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { sendOrderEmail, OrderData } from "@/lib/emailjs";
import { orderFormSchema, OrderForm } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function CheckoutModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    items, 
    isCheckoutOpen, 
    closeCheckout, 
    clearCart, 
    getTotalPrice 
  } = useCartStore();
  const { toast } = useToast();
  
  const total = getTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema)
  });

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    
    try {
      const orderData: OrderData = {
        ...data,
        items,
        total,
        orderDate: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short'
        })
      };

      await sendOrderEmail(orderData);
      
      toast({
        title: "Order placed successfully!",
        description: "We'll contact you soon to confirm your delivery details.",
      });
      
      clearCart();
      reset();
      closeCheckout();
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        variant: "destructive",
        title: "Order failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeCheckout}
              className="hover:bg-white/50 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-gray-700 font-semibold">Full Name *</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
                className="mt-2 py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-organic-green"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="mt-2 py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-organic-green"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="mt-2 py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-organic-green"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="address" className="text-gray-700 font-semibold">Address *</Label>
              <Textarea
                id="address"
                {...register("address")}
                rows={4}
                placeholder="Enter your delivery address"
                className="mt-2 py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-organic-green resize-none"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>
              )}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 -mx-8 px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900">Order Total:</span>
              <span className="text-3xl font-bold text-organic-green">₹{total}</span>
            </div>
            <Button
              type="submit"
              className="w-full bg-organic-green text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-organic-dark transition-all duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Processing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
