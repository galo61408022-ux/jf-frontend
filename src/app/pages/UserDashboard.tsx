import { Calendar, ArrowLeftRight, Plus, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { mockUser, mockBookings, mockTransactions } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';

interface UserDashboardProps {
  onNavigate: (page: string, data?: any) => void;
  selectedCurrency?: string;
}

export function UserDashboard({ onNavigate, selectedCurrency = 'USD' }: UserDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
          <p className="text-blue-100">Manage your bookings and travel history</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{mockBookings.length}</p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <ArrowLeftRight className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Exchange History</p>
            <p className="text-3xl font-bold text-gray-900">
              {mockTransactions.filter(t => t.type === 'exchange').length}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Bookings</h2>
                <Button
                  onClick={() => onNavigate('tours')}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Book New Tour
                </Button>
              </div>

              <div className="space-y-4">
                {mockBookings.length > 0 ? (
                  mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{booking.tourName}</h3>
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
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Booking ID: {booking.id}</p>
                          <p>Travel Date: {new Date(booking.date).toLocaleDateString()}</p>
                          <p>Travelers: {booking.travelers}</p>
                          <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(convertCurrency(booking.totalPrice, 'USD', selectedCurrency), selectedCurrency)}
                        </p>
                        <Button
                          onClick={() => onNavigate('tour-details', { tourId: booking.tourId })}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No bookings yet</p>
                    <Button onClick={() => onNavigate('tours')}>Browse Tours</Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <Button
                  onClick={() => onNavigate('deposit')}
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Funds
                </Button>
              </div>

              <div className="space-y-3">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit'
                            ? 'bg-green-100'
                            : transaction.type === 'booking'
                            ? 'bg-blue-100'
                            : 'bg-purple-100'
                        }`}
                      >
                        {transaction.type === 'deposit' && <Plus className="w-5 h-5 text-green-600" />}
                        {transaction.type === 'booking' && <Calendar className="w-5 h-5 text-blue-600" />}
                        {transaction.type === 'exchange' && <ArrowLeftRight className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === 'deposit' ? 'text-green-600' : 'text-gray-900'
                        }`}
                      >
                        {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(convertCurrency(transaction.amount, 'USD', selectedCurrency), selectedCurrency)}
                      </p>
                      <Badge
                        variant={
                          transaction.status === 'success'
                            ? 'default'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{mockUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{mockUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Currency</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{selectedCurrency}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Member Since</label>
                    <p className="p-3 bg-gray-50 rounded-lg">January 2024</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline">Edit Profile</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
