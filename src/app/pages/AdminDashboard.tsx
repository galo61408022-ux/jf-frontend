import { DollarSign, Users, Plane, TrendingUp, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { tours, mockBookings, currencyRates } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { useState } from 'react';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  selectedCurrency?: string;
}

export function AdminDashboard({ onNavigate, selectedCurrency }: AdminDashboardProps) {
  const [selectedRate, setSelectedRate] = useState<string | null>(null);

  const curr = selectedCurrency ?? 'USD';
  const totalRevenue = mockBookings.reduce((sum, b) => sum + convertCurrency(b.totalPrice, 'USD', curr), 0);
  const totalBookings = mockBookings.length;
  const activeTours = tours.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            className="mb-4 text-white hover:bg-white/10 gap-2"
          >
            ← Back to Website
          </Button>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage tours, bookings, and exchange rates</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue, curr)}</p>
            <p className="text-xs text-green-600 mt-2">+12% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
            <p className="text-xs text-green-600 mt-2">+8% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Tours</p>
            <p className="text-3xl font-bold text-gray-900">{activeTours}</p>
            <p className="text-xs text-gray-600 mt-2">Across 8 countries</p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Customers</p>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
            <p className="text-xs text-green-600 mt-2">+23% from last month</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="tours">Manage Tours</TabsTrigger>
            <TabsTrigger value="bookings">View Bookings</TabsTrigger>
            <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
          </TabsList>

          {/* Tours Tab */}
          <TabsContent value="tours" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Tour Management</h2>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  Add New Tour
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tour Name</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tours.slice(0, 5).map((tour) => (
                      <TableRow key={tour.id}>
                        <TableCell className="font-medium">{tour.name}</TableCell>
                        <TableCell>{tour.destination}, {tour.country}</TableCell>
                        <TableCell>{formatCurrency(convertCurrency(tour.price, 'USD', curr), curr)}</TableCell>
                        <TableCell>{tour.duration}</TableCell>
                        <TableCell>{tour.rating} ⭐</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {tour.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="gap-1">
                              <Edit className="w-3 h-3" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Bookings</h2>
                <Button variant="outline">Export Report</Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Tour Name</TableHead>
                      <TableHead>Travel Date</TableHead>
                      <TableHead>Travelers</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Booked On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.tourName}</TableCell>
                        <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                        <TableCell>{booking.travelers}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(convertCurrency(booking.totalPrice, 'USD', curr), curr)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === 'confirmed'
                                ? 'default'
                                : booking.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Exchange Rates Tab */}
          <TabsContent value="rates" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Currency Exchange Rates</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage and update exchange rates</p>
                </div>
                <Button variant="outline">Update All Rates</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currencyRates.map((rate) => (
                  <Card key={rate.code} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{rate.flag}</span>
                        <div>
                          <p className="font-semibold">{rate.code}</p>
                          <p className="text-sm text-gray-500">{rate.name}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Base Rate (1 USD)</label>
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={rate.rate}
                          className="h-9"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">Buy Rate</label>
                          <Input
                            type="number"
                            step="0.01"
                            defaultValue={rate.buyRate}
                            className="h-9"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">Sell Rate</label>
                          <Input
                            type="number"
                            step="0.01"
                            defaultValue={rate.sellRate}
                            className="h-9"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}