import { useState } from 'react';
import { Check, Calendar, Users, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { tours } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { toast } from 'sonner';

interface BookingPageProps {
  tourId: string;
  onNavigate: (page: string, data?: any) => void;
  isAuthenticated: boolean;
  selectedCurrency?: string;
}

export function BookingPage({ tourId, onNavigate, isAuthenticated, selectedCurrency = 'USD' }: BookingPageProps) {
  const tour = tours.find((t) => t.id === tourId);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    travelers: 1,
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'paystack'
  });

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tour Not Found</h2>
          <Button onClick={() => onNavigate('tours')}>Back to Tours</Button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to continue with your booking
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => onNavigate('login')} className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <Button onClick={() => onNavigate('register')} variant="outline">
              Create Account
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const convertedPrice = convertCurrency(tour.price, 'USD', selectedCurrency);
  const totalPrice = convertedPrice * formData.travelers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.date || formData.travelers < 1) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(3);
    } else {
      // Process booking
      toast.success('Booking confirmed! Redirecting to dashboard...');
      setTimeout(() => {
        onNavigate('dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 md:w-32 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2">
            <span className="text-sm text-gray-600">Tour Details</span>
            <span className="text-sm text-gray-600">Your Info</span>
            <span className="text-sm text-gray-600">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Tour Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Select Your Tour Details</h2>
                      <p className="text-gray-600">Choose your preferred date and number of travelers</p>
                    </div>

                    <div>
                      <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        Departure Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="travelers" className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" />
                        Number of Travelers
                      </Label>
                      <Select
                        value={formData.travelers.toString()}
                        onValueChange={(value) => setFormData({ ...formData, travelers: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Continue
                    </Button>
                  </div>
                )}

                {/* Step 2: Traveler Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Traveler Information</h2>
                      <p className="text-gray-600">Please provide your contact details</p>
                    </div>

                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 123 456 7890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
                      <p className="text-gray-600">Choose how you'd like to pay</p>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4" />
                        Payment Method
                      </Label>
                      
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="paystack"
                          checked={formData.paymentMethod === 'paystack'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">Paystack</p>
                          <p className="text-sm text-gray-500">Pay securely with card</p>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-500">Pay with PayPal account</p>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-gray-500">Direct bank transfer</p>
                        </div>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
              
              <div className="mb-4">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold mb-1">{tour.name}</h4>
                <p className="text-sm text-gray-600">{tour.destination}, {tour.country}</p>
              </div>

              <div className="space-y-3 py-4 border-t border-b">
                {formData.date && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Departure Date</span>
                    <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-medium">{formData.travelers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-medium">{formatCurrency(convertedPrice, selectedCurrency)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">{formatCurrency(totalPrice, selectedCurrency)}</span>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                * All prices are in USD. Free cancellation up to 24 hours before departure.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
