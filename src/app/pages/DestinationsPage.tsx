import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { DestinationCard } from '../components/DestinationCard';
import { destinations } from '../data/mockData';

interface DestinationsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DestinationsPage({ onNavigate }: DestinationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewTours = (country: string) => {
    onNavigate('tours', { filterCountry: country });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Explore Our Destinations</h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover amazing places around the world waiting for you to explore
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredDestinations.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onViewTours={handleViewTours}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No destinations found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
