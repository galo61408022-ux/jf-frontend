import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logo from '../../assets/logo.png';
interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
  src={logo}
  alt="JF Travels Logo"
  className="w-10 h-10 object-contain"
/>

              <div className="flex flex-col items-start">
                <span className="font-bold text-lg text-white">JF Travels</span>
                <span className="text-xs text-gray-400">Bureau de Change</span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner for unforgettable travel experiences and reliable currency exchange services.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-blue-400 transition-colors text-sm">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tours')} className="hover:text-blue-400 transition-colors text-sm">
                  Tours & Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('currency')} className="hover:text-blue-400 transition-colors text-sm">
                  Currency Exchange
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tour Booking</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Currency Exchange</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Travel Insurance</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Visa Assistance</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">24/7 Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>123 Travel Street, Tourism District, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <span>info@jftravels.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 JF Travels & Bureau de Change. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-2">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            <button 
              onClick={() => onNavigate('admin')} 
              className="hover:text-blue-400 transition-colors text-gray-700"
              title="Admin Access"
            >
              •
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}