import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { TourCard } from '../components/TourCard';
import { tours } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';

interface ToursPageProps {
  onNavigate: (page: string, data?: any) => void;
  initialFilter?: { filterCountry?: string };
  selectedCurrency?: string;
}

export function ToursPage({ onNavigate, initialFilter, selectedCurrency = 'USD' }: ToursPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>(initialFilter?.filterCountry || 'all');

  useEffect(() => {
    if (initialFilter?.filterCountry) {
      setCountryFilter(initialFilter.filterCountry);
    }
  }, [initialFilter]);

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;

    const convertedPrice = convertCurrency(tour.price, 'USD', selectedCurrency);
    const budgetThreshold = convertCurrency(2000, 'USD', selectedCurrency);
    const midThresholdLow = convertCurrency(2000, 'USD', selectedCurrency);
    const midThresholdHigh = convertCurrency(3500, 'USD', selectedCurrency);
    const luxuryThreshold = convertCurrency(3500, 'USD', selectedCurrency);

    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'budget' && convertedPrice < budgetThreshold) ||
      (priceFilter === 'mid' && convertedPrice >= midThresholdLow && convertedPrice < midThresholdHigh) ||
      (priceFilter === 'luxury' && convertedPrice >= luxuryThreshold);

    const matchesCountry = countryFilter === 'all' || tour.country === countryFilter;

    return matchesSearch && matchesCategory && matchesPrice && matchesCountry;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPriceFilter('all');
    setCountryFilter('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Tour Packages</h1>
          <p className="text-xl text-blue-100">
            Browse through our carefully curated collection of tours
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="safari">Safari</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (&lt; {formatCurrency(convertCurrency(2000, 'USD', selectedCurrency), selectedCurrency)})</SelectItem>
                <SelectItem value="mid">Mid-Range ({formatCurrency(convertCurrency(2000, 'USD', selectedCurrency), selectedCurrency)} - {formatCurrency(convertCurrency(3500, 'USD', selectedCurrency), selectedCurrency)})</SelectItem>
                <SelectItem value="luxury">Luxury ({formatCurrency(convertCurrency(3500, 'USD', selectedCurrency), selectedCurrency)}+)</SelectItem>
              </SelectContent>
            </Select>

            {/* Country Filter */}
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="Indonesia">Indonesia</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Tanzania">Tanzania</SelectItem>
                <SelectItem value="Maldives">Maldives</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="Switzerland">Switzerland</SelectItem>
                <SelectItem value="Nepal">Nepal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || categoryFilter !== 'all' || priceFilter !== 'all' || countryFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Filters active</span>
              <Button onClick={clearFilters} variant="ghost" size="sm">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredTours.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    selectedCurrency={selectedCurrency}
                    onViewDetails={(id) => onNavigate('tour-details', { tourId: id })}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No tours found matching your criteria.</p>
              <Button onClick={clearFilters} variant="outline">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
