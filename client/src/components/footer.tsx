export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl">🌱</span>
              <span className="ml-2 text-xl font-bold">xyzOrganics</span>
            </div>
            <p className="text-gray-300">
              Delivering the freshest organic vegetables straight from our farms to your table.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-organic-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">Our Farms</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">Quality Promise</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-organic-green transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-organic-green transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>cloud.rain.genai@gmail.com</p>
              <p>+91 98765 43210</p>
              <p>123 Farm Road, Green Valley, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 xyzOrganics. All rights reserved. | Fresh. Organic. Delivered.</p>
        </div>
      </div>
    </footer>
  );
}
