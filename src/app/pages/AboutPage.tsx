import { Award, Users, Globe, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About JF Travels & Bureau de Change</h1>
          <p className="text-xl text-blue-100">
            Your trusted partner in creating unforgettable travel experiences and providing reliable currency exchange services since 2015
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, JF Travels & Bureau de Change was born from a passion for travel and a commitment to making international journeys accessible to everyone. What started as a small travel agency has grown into a comprehensive travel and financial services company.
              </p>
              <p className="text-gray-700 mb-4">
                We understand that great travel experiences require more than just booking flights and hotels. That's why we've combined our travel expertise with reliable currency exchange services, ensuring our clients have everything they need for seamless international adventures.
              </p>
              <p className="text-gray-700">
                Today, we serve thousands of satisfied customers across Nigeria and beyond, offering curated tour packages, competitive currency exchange rates, and unparalleled customer service.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1548932134-3d7d765bece2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NjY3NjUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Travel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">15,000+</p>
              <p className="text-sm text-gray-600">Happy Travelers</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">50+</p>
              <p className="text-sm text-gray-600">Destinations</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">10+</p>
              <p className="text-sm text-gray-600">Awards Won</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">9</p>
              <p className="text-sm text-gray-600">Years Experience</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-t-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide exceptional travel experiences and reliable currency exchange services that exceed customer expectations. We strive to make international travel accessible, affordable, and enjoyable for everyone while maintaining the highest standards of professionalism and integrity.
              </p>
            </Card>
            <Card className="p-8 border-t-4 border-cyan-600">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading travel and currency exchange service provider in Nigeria and across Africa, recognized for our innovation, customer-centric approach, and commitment to creating memorable travel experiences that connect people and cultures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Trust & Transparency</h3>
              <p className="text-gray-700">
                We build lasting relationships with our clients through honest communication and transparent pricing.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Excellence</h3>
              <p className="text-gray-700">
                We are committed to delivering the highest quality services in every aspect of our business.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Customer First</h3>
              <p className="text-gray-700">
                Our customers are at the heart of everything we do, and their satisfaction is our priority.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Innovation</h3>
              <p className="text-gray-700">
                We continuously evolve and adopt new technologies to enhance the customer experience.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Reliability</h3>
              <p className="text-gray-700">
                We deliver on our promises with consistent, dependable service you can count on.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Passion</h3>
              <p className="text-gray-700">
                We love what we do and it shows in the care we put into every travel experience.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
