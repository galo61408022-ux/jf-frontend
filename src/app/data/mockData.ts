// Mock data for JF Travels & Bureau de Change
// 
// This application includes:
// ✅ Home page with hero, featured tours, testimonials, and live currency rates
// ✅ About page with company story, stats, and values
// ✅ Destinations page with search and filtering
// ✅ Tours page with advanced filtering (category, price, country)
// ✅ Tour details page with itinerary, includes/excludes, and booking
// ✅ Booking flow (3-step process: tour details → traveler info → payment)
// ✅ Currency exchange page with live converter and rates table
// ✅ User authentication (login/register)
// ✅ User dashboard (bookings, transactions, profile)
// ✅ Deposit/payment page with multiple payment methods
// ✅ Admin dashboard (manage tours, bookings, and exchange rates)
// ✅ Fully responsive design for mobile and desktop
// ✅ Modern UI with Tailwind CSS and shadcn/ui components
//
// To access admin dashboard: Click the small dot (•) in the footer

export interface Tour {
  id: string;
  name: string;
  destination: string;
  country: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  description: string;
  itinerary: string[];
  included: string[];
  excluded: string[];
  category: 'beach' | 'adventure' | 'cultural' | 'luxury' | 'safari';
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  tourCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  buyRate: number;
  sellRate: number;
  flag: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'exchange' | 'booking';
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  date: string;
  description: string;
}

export const tours: Tour[] = [
  {
    id: '1',
    name: 'Tropical Paradise Getaway',
    destination: 'Bali',
    country: 'Indonesia',
    price: 1299,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558117338-aa433feb1c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2Njc0NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience the ultimate beach vacation in Bali with pristine beaches, cultural tours, and luxury accommodations.',
    itinerary: [
      'Day 1: Arrival in Bali, hotel check-in, welcome dinner',
      'Day 2: Ubud cultural tour, rice terraces, and traditional dance',
      'Day 3: Beach day at Seminyak, water sports activities',
      'Day 4: Temple tour - Tanah Lot and Uluwatu',
      'Day 5: Snorkeling and island hopping',
      'Day 6: Spa day and shopping in Seminyak',
      'Day 7: Departure'
    ],
    included: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Tour guides', 'Entry fees'],
    excluded: ['International flights', 'Lunch and dinner', 'Personal expenses', 'Travel insurance'],
    category: 'beach'
  },
  {
    id: '2',
    name: 'Romantic Paris Experience',
    destination: 'Paris',
    country: 'France',
    price: 2499,
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570097703229-b195d6dd291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHx8MTc2Njc0NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Discover the city of love with guided tours of iconic landmarks, Seine river cruise, and gourmet dining experiences.',
    itinerary: [
      'Day 1: Arrival, hotel check-in, Eiffel Tower evening visit',
      'Day 2: Louvre Museum, Champs-Élysées shopping',
      'Day 3: Versailles Palace day trip',
      'Day 4: Seine River cruise, Montmartre walking tour',
      'Day 5: Departure'
    ],
    included: ['4-star hotel', 'Daily breakfast', 'Museum passes', 'Seine cruise', 'Airport transfers'],
    excluded: ['Flights', 'Lunch and dinner', 'Shopping expenses'],
    category: 'cultural'
  },
  {
    id: '3',
    name: 'African Safari Adventure',
    destination: 'Serengeti',
    country: 'Tanzania',
    price: 3499,
    duration: '10 Days / 9 Nights',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NjY3NjA4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Witness the great migration and explore the vast savannas with expert guides. An unforgettable wildlife experience.',
    itinerary: [
      'Day 1-2: Arrival in Arusha, safari preparation',
      'Day 3-5: Serengeti National Park game drives',
      'Day 6-7: Ngorongoro Crater exploration',
      'Day 8: Lake Manyara bird watching',
      'Day 9: Cultural village visit',
      'Day 10: Departure'
    ],
    included: ['Luxury safari lodge', 'All meals', '4x4 safari vehicle', 'Professional guide', 'Park fees'],
    excluded: ['International flights', 'Alcoholic drinks', 'Tips for guides'],
    category: 'safari'
  },
  {
    id: '4',
    name: 'Maldives Luxury Escape',
    destination: 'Maldives',
    country: 'Maldives',
    price: 4299,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568727174680-7ae330b15345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydCUyMGx1eHVyeXxlbnwxfHx8fDE3NjY3OTUwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Indulge in overwater villas, crystal-clear waters, and world-class diving in this tropical paradise.',
    itinerary: [
      'Day 1: Seaplane transfer to resort, villa check-in',
      'Day 2: Snorkeling excursion',
      'Day 3: Spa treatments and beach relaxation',
      'Day 4: Diving experience',
      'Day 5: Sunset cruise and beach dinner',
      'Day 6: Departure'
    ],
    included: ['Overwater villa', 'All-inclusive meals', 'Water sports', 'Spa credit', 'Transfers'],
    excluded: ['International flights', 'Premium alcoholic beverages', 'Diving certification'],
    category: 'luxury'
  },
  {
    id: '5',
    name: 'Dubai City of Gold',
    destination: 'Dubai',
    country: 'UAE',
    price: 1899,
    duration: '5 Days / 4 Nights',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1718789967298-09132d1404bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc2NjczMTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Experience luxury shopping, desert safaris, and modern marvels in the most dazzling city in the Middle East.',
    itinerary: [
      'Day 1: Arrival, Burj Khalifa visit',
      'Day 2: Desert safari and dinner',
      'Day 3: Dubai Mall shopping, Dubai Fountain',
      'Day 4: Palm Jumeirah, Atlantis visit',
      'Day 5: Departure'
    ],
    included: ['5-star hotel', 'Daily breakfast', 'Desert safari', 'City tours', 'Burj Khalifa tickets'],
    excluded: ['Flights', 'Lunch and dinner', 'Shopping expenses'],
    category: 'luxury'
  },
  {
    id: '6',
    name: 'Japan Cultural Journey',
    destination: 'Tokyo & Kyoto',
    country: 'Japan',
    price: 2799,
    duration: '8 Days / 7 Nights',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1727868326091-9769aa3a8653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRlbXBsZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjY3NDc3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Immerse yourself in Japanese culture with temple visits, traditional tea ceremonies, and authentic cuisine.',
    itinerary: [
      'Day 1-3: Tokyo exploration, Shibuya, Asakusa',
      'Day 4-5: Bullet train to Kyoto, temple tours',
      'Day 6: Fushimi Inari, bamboo forest',
      'Day 7: Tea ceremony, geisha district',
      'Day 8: Return to Tokyo, departure'
    ],
    included: ['Hotels', 'Daily breakfast', 'Bullet train tickets', 'Temple fees', 'Guided tours'],
    excluded: ['International flights', 'Most meals', 'Personal shopping'],
    category: 'cultural'
  },
  {
    id: '7',
    name: 'Swiss Alps Adventure',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    price: 3199,
    duration: '7 Days / 6 Nights',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1747137657436-7c7374c6fb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMG1vdW50YWlucyUyMGFscHN8ZW58MXx8fHwxNzY2NzM3OTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore breathtaking mountain scenery, charming villages, and world-class skiing in the heart of the Alps.',
    itinerary: [
      'Day 1: Arrival in Zurich, transfer to Interlaken',
      'Day 2: Jungfraujoch excursion',
      'Day 3: Lauterbrunnen valley tour',
      'Day 4: Grindelwald hiking',
      'Day 5: Lucerne day trip',
      'Day 6: Scenic train journey',
      'Day 7: Departure from Zurich'
    ],
    included: ['Mountain hotels', 'Daily breakfast', 'Train passes', 'Cable car tickets', 'Guided tours'],
    excluded: ['International flights', 'Lunch and dinner', 'Ski equipment rental'],
    category: 'adventure'
  },
  {
    id: '8',
    name: 'Mountain Trek Experience',
    destination: 'Nepal',
    country: 'Nepal',
    price: 1599,
    duration: '12 Days / 11 Nights',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1548932134-3d7d765bece2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NjY3NjUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Trek through the Himalayas with experienced guides, visit monasteries, and experience mountain culture.',
    itinerary: [
      'Day 1-2: Kathmandu arrival and preparation',
      'Day 3-9: Trekking expedition with daily hikes',
      'Day 10: Mountain village cultural experience',
      'Day 11: Return to Kathmandu',
      'Day 12: Departure'
    ],
    included: ['Trekking permits', 'Guide and porters', 'Tea house accommodation', 'All meals during trek'],
    excluded: ['International flights', 'Kathmandu hotel', 'Travel insurance', 'Tips'],
    category: 'adventure'
  }
];

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches, rice terraces, and rich culture',
    image: 'https://images.unsplash.com/photo-1558117338-aa433feb1c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0fGVufDF8fHx8MTc2Njc0NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'City of lights, romance, art, and world-class cuisine',
    image: 'https://images.unsplash.com/photo-1570097703229-b195d6dd291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHx8MTc2Njc0NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '3',
    name: 'Serengeti',
    country: 'Tanzania',
    description: 'World-famous safari destination with incredible wildlife',
    image: 'https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NjY3NjA4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '4',
    name: 'Maldives',
    country: 'Maldives',
    description: 'Luxury island paradise with crystal-clear waters',
    image: 'https://images.unsplash.com/photo-1568727174680-7ae330b15345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHJlc29ydCUyMGx1eHVyeXxlbnwxfHx8fDE3NjY3OTUwNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '5',
    name: 'Dubai',
    country: 'UAE',
    description: 'Modern metropolis with luxury shopping and entertainment',
    image: 'https://images.unsplash.com/photo-1718789967298-09132d1404bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc2NjczMTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '6',
    name: 'Tokyo & Kyoto',
    country: 'Japan',
    description: 'Perfect blend of ancient traditions and modern technology',
    image: 'https://images.unsplash.com/photo-1727868326091-9769aa3a8653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRlbXBsZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjY3NDc3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '7',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Breathtaking mountains, pristine lakes, and charming villages',
    image: 'https://images.unsplash.com/photo-1747137657436-7c7374c6fb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMG1vdW50YWlucyUyMGFscHN8ZW58MXx8fHwxNzY2NzM3OTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  },
  {
    id: '8',
    name: 'Himalayas',
    country: 'Nepal',
    description: 'Majestic mountain ranges and spiritual experiences',
    image: 'https://images.unsplash.com/photo-1548932134-3d7d765bece2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NjY3NjUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tourCount: 1
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'JF Travels made our honeymoon in Bali absolutely magical! The attention to detail and customer service was outstanding.',
    avatar: '🙋‍♀️'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    comment: 'The safari experience in Tanzania was beyond my wildest dreams. Professional guides and seamless organization!',
    avatar: '👨‍💼'
  },
  {
    id: '3',
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 4,
    comment: 'Great value for money and excellent currency exchange rates. Will definitely book again!',
    avatar: '👩'
  },
  {
    id: '4',
    name: 'David Martinez',
    location: 'Madrid, Spain',
    rating: 5,
    comment: 'The team at JF Travels handled everything perfectly. From booking to currency exchange, top-notch service!',
    avatar: '🧑'
  }
];

export const currencyRates: CurrencyRate[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    rate: 1.0,
    buyRate: 1.0,
    sellRate: 1.0,
    flag: '🇺🇸'
  },
  {
    code: 'EUR',
    name: 'Euro',
    rate: 0.92,
    buyRate: 0.91,
    sellRate: 0.93,
    flag: '🇪🇺'
  },
  {
    code: 'GBP',
    name: 'British Pound',
    rate: 0.79,
    buyRate: 0.78,
    sellRate: 0.80,
    flag: '🇬🇧'
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    rate: 149.50,
    buyRate: 148.00,
    sellRate: 151.00,
    flag: '🇯🇵'
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    rate: 3.67,
    buyRate: 3.65,
    sellRate: 3.69,
    flag: '🇦🇪'
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    rate: 0.89,
    buyRate: 0.88,
    sellRate: 0.90,
    flag: '🇨🇭'
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    rate: 1542.00,
    buyRate: 1535.00,
    sellRate: 1549.00,
    flag: '🇳🇬'
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    rate: 18.50,
    buyRate: 18.30,
    sellRate: 18.70,
    flag: '🇿🇦'
  }
];

// Mock user data
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',

};

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    tourId: '1',
    tourName: 'Tropical Paradise Getaway',
    date: '2025-03-15',
    travelers: 2,
    totalPrice: 2598,
    status: 'confirmed',
    createdAt: '2024-12-20'
  },
  {
    id: 'BK002',
    tourId: '4',
    tourName: 'Maldives Luxury Escape',
    date: '2025-05-20',
    travelers: 2,
    totalPrice: 8598,
    status: 'pending',
    createdAt: '2024-12-25'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN002',
    type: 'booking',
    amount: 2598,
    currency: 'USD',
    status: 'success',
    date: '2024-12-20',
    description: 'Booking payment for Tropical Paradise Getaway'
  },
  {
    id: 'TXN003',
    type: 'exchange',
    amount: 500,
    currency: 'EUR',
    status: 'success',
    date: '2024-12-22',
    description: 'Currency exchange: USD to EUR'
  }
];