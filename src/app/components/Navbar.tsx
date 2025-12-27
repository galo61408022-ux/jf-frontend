import { useState } from 'react';
import logo from '../../assets/logo.png';

import { Menu, X, Plane, User, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { currencyRates } from '../data/mockData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  onLogout: () => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  isAuthenticated,
  isAdmin = false,
  onLogout,
  selectedCurrency,
  onCurrencyChange
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'Tours', id: 'tours' },
    { name: 'Currency Exchange', id: 'currency' },
  ];

  const currentCurrencyData = currencyRates.find(c => c.code === selectedCurrency);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="JF Travels Logo"
              className="w-10 h-10 object-contain"
            />

            <div className="flex flex-col items-start">
              <span className="font-bold text-lg text-gray-900">JF Travels</span>
              <span className="text-xs text-gray-600">Bureau de Change</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors ${currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Currency Selector & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md bg-gray-50">
              <Globe className="w-4 h-4 text-gray-600" />
              <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
                <SelectTrigger className="w-32 border-0 bg-transparent p-0 focus:ring-0 text-lg">
                  <span className="flex items-center gap-2">
                    <span>{currentCurrencyData?.flag}</span>
                    <span className="text-sm font-medium">{selectedCurrency}</span>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {currencyRates.map((rate) => (
                    <SelectItem key={rate.code} value={rate.code}>
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{rate.flag}</span>
                        <span>{rate.code}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    onClick={() => onNavigate('admin')}
                    variant="ghost"
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Admin Panel
                  </Button>
                )}
                <Button
                  onClick={() => onNavigate('dashboard')}
                  variant="ghost"
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button onClick={onLogout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => onNavigate('login')} variant="ghost">
                  Login
                </Button>
                <Button onClick={() => onNavigate('register')} className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setMobileCurrencyOpen(!mobileCurrencyOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-2xl"
              >
                {currentCurrencyData?.flag || '🌍'}
              </button>

              {/* Mobile Currency Dropdown */}
              {mobileCurrencyOpen && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
                  {currencyRates.map((rate) => (
                    <button
                      key={rate.code}
                      onClick={() => {
                        onCurrencyChange(rate.code);
                        setMobileCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${selectedCurrency === rate.code ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                    >
                      <span className="text-xl">{rate.flag}</span>
                      <span className="text-sm font-medium">{rate.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${currentPage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t pt-4 px-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Button
                        onClick={() => {
                          onNavigate('admin');
                          setMobileMenuOpen(false);
                        }}
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Admin Panel
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        onNavigate('dashboard');
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                    <Button onClick={onLogout} variant="outline" className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        onNavigate('login');
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        onNavigate('register');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
