import { ArrowRight, Shield, Headphones, DollarSign, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { TourCard } from '../components/TourCard';
import { tours, testimonials, currencyRates } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  selectedCurrency?: string;
}

export function HomePage({ onNavigate, selectedCurrency = 'USD' }: HomePageProps) {
  const featuredTours = tours.slice(0, 3);
  const usdToLocal = currencyRates.find(r => r.code === 'NGN');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548932134-3d7d765bece2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NjY3NjUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore the World with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing destinations and get the best currency exchange rates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('tours')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
            >
              Book a Tour <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate('destinations')}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              View Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Live Currency Exchange Preview */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Current Exchange Rate</p>
                  <p className="text-2xl font-bold">
                    1 USD = {usdToLocal?.rate.toFixed(2)} {usdToLocal?.code}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('currency')}
                className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
              >
                Exchange Currency <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Tour Packages</h2>
            <p className="text-lg text-gray-600">
              Handpicked destinations for your next unforgettable adventure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                selectedCurrency={selectedCurrency}
                onViewDetails={(id) => onNavigate('tour-details', { tourId: id })}
              />
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => onNavigate('tours')}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              View All Tours <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose JF Travels?</h2>
            <p className="text-lg text-gray-600">
              Your trusted partner for travel and currency exchange
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted & Secure</h3>
              <p className="text-gray-600">
                Licensed and regulated currency exchange services with secure payment processing
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to assist you with your travel and exchange needs
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-gray-600">
                Competitive rates for tours and currency exchange with no hidden fees
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600">
              Real experiences from real travelers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your dream vacation today and get the best currency exchange rates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('tours')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
            >
              Browse Tours <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate('currency')}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Exchange Currency
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}