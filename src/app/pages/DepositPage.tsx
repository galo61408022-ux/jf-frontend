import { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { mockUser } from '../data/mockData';
import { toast } from 'sonner';

interface DepositPageProps {
  onNavigate: (page: string) => void;
}

export function DepositPage({ onNavigate }: DepositPageProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [showSuccess, setShowSuccess] = useState(false);

  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 10) {
      toast.error('Minimum deposit amount is $10');
      return;
    }

    // Simulate payment processing
    toast.loading('Processing payment...');
    
    setTimeout(() => {
      toast.dismiss();
      setShowSuccess(true);
      toast.success('Deposit successful!');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Deposit Successful!</h2>
          <p className="text-gray-600 mb-6">
            ${amount} has been added to your wallet
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-1">New Balance</p>
            <p className="text-3xl font-bold text-blue-600">
              ${(mockUser.walletBalance + parseFloat(amount)).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={() => onNavigate('dashboard')} className="bg-blue-600 hover:bg-blue-700">
              Go to Dashboard
            </Button>
            <Button onClick={() => setShowSuccess(false)} variant="outline">
              Make Another Deposit
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            className="mb-4 text-white hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">Add Funds to Wallet</h1>
          <p className="text-blue-100">Choose your deposit amount and payment method</p>
        </div>
      </div>

      {/* Deposit Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleDeposit} className="space-y-6">
                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Deposit Amount (USD)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    min="10"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">Minimum deposit: $10</p>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <Label className="mb-3 block">Quick Select</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {quickAmounts.map((amt) => (
                      <Button
                        key={amt}
                        type="button"
                        variant="outline"
                        onClick={() => setAmount(amt.toString())}
                        className={amount === amt.toString() ? 'border-blue-600 bg-blue-50' : ''}
                      >
                        ${amt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4" />
                    Payment Method
                  </Label>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="paystack"
                        checked={paymentMethod === 'paystack'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Paystack</p>
                        <p className="text-sm text-gray-500">Pay with card - Instant processing</p>
                      </div>
                      <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Recommended
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
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
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-500">Processing time: 1-3 business days</p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                  Deposit ${amount || '0'}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Your payment information is secure and encrypted. We never store your card details.
                </p>
              </form>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="font-bold mb-4">Deposit Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${mockUser.walletBalance.toLocaleString()}
                  </p>
                </div>

                {amount && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deposit Amount</span>
                      <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium text-green-600">$0.00</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">New Balance</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${(mockUser.walletBalance + parseFloat(amount)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-900">Why add funds?</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Instant booking confirmation</li>
                  <li>• Quick currency exchange</li>
                  <li>• Exclusive member discounts</li>
                  <li>• No transaction delays</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
