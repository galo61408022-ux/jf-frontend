import { Star, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tour } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (tourId: string) => void;
  selectedCurrency?: string;
}

export function TourCard({ tour, onViewDetails, selectedCurrency = 'USD' }: TourCardProps) {
  const convertedPrice = convertCurrency(tour.price, 'USD', selectedCurrency);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="font-bold text-blue-600">{formatCurrency(convertedPrice, selectedCurrency)}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{tour.destination}, {tour.country}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{tour.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{tour.duration}</span>
          </div>
        </div>
        <Button 
          onClick={() => onViewDetails(tour.id)}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
