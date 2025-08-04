import emailjs from '@emailjs/browser';
import { CartItem, OrderForm } from "@shared/schema";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xyz_organics";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xyz_order";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "xyz_organics_key";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface OrderData extends OrderForm {
  items: CartItem[];
  total: number;
  orderDate: string;
}

export const sendOrderEmail = async (orderData: OrderData): Promise<void> => {
  try {
    const templateParams = {
      to_email: "cloud.rain.genai@gmail.com",
      from_name: orderData.fullName,
      from_email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      order_total: `₹${orderData.total}`,
      order_date: orderData.orderDate,
      order_items: orderData.items.map(item => 
        `${item.name} - ₹${item.price}/kg x ${item.quantity} = ₹${item.price * item.quantity}`
      ).join('\n'),
      customer_details: `
Name: ${orderData.fullName}
Email: ${orderData.email}
Phone: ${orderData.phone}
Address: ${orderData.address}
      `.trim(),
      message: `
New order received from xyzOrganics website!

Customer Details:
- Name: ${orderData.fullName}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Address: ${orderData.address}

Order Details:
${orderData.items.map(item => 
  `- ${item.name}: ₹${item.price}/kg × ${item.quantity} = ₹${item.price * item.quantity}`
).join('\n')}

Total Amount: ₹${orderData.total}
Order Date: ${orderData.orderDate}
      `.trim()
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send order email. Please try again or contact support.');
  }
};
