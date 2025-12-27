import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Destination } from '../data/mockData';

interface DestinationCardProps {
  destination: Destination;
  onViewTours: (country: string) => void;
}

export function DestinationCard({ destination, onViewTours }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{destination.country}</span>
          </div>
          <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
          <p className="text-sm text-gray-200 mb-3 line-clamp-2">{destination.description}</p>
          <Button
            onClick={() => onViewTours(destination.country)}
            size="sm"
            className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
          >
            View Tours <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
