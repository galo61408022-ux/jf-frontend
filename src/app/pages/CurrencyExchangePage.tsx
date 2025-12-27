import { useState } from 'react';
import { ArrowLeftRight, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { currencyRates } from '../data/mockData';
import { toast } from 'sonner';

interface CurrencyExchangePageProps {
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
}

export function CurrencyExchangePage({ onNavigate, isAuthenticated }: CurrencyExchangePageProps) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('154200');

  const handleConvert = () => {
    const fromRate = currencyRates.find(r => r.code === fromCurrency);
    const toRate = currencyRates.find(r => r.code === toCurrency);
    
    if (fromRate && toRate && amount) {
      const amountInUSD = parseFloat(amount) / fromRate.rate;
      const converted = amountInUSD * toRate.rate;
      setConvertedAmount(converted.toFixed(2));
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    handleConvert();
  };

  const handleExchange = () => {
    if (!isAuthenticated) {
      toast.error('Please login to exchange currency');
      onNavigate('login');
      return;
    }
    toast.success('Exchange order placed successfully!');
  };

  const fromCurrencyData = currencyRates.find(r => r.code === fromCurrency);
  const toCurrencyData = currencyRates.find(r => r.code === toCurrency);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Currency Exchange</h1>
          <p className="text-xl text-blue-100">
            Get the best exchange rates with transparent pricing and instant conversion
          </p>
        </div>
      </section>

      {/* Currency Converter */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Live Currency Converter</h2>
            
            <div className="space-y-6">
              {/* From Currency */}
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="flex gap-3 mt-2">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      const fromRate = currencyRates.find(r => r.code === fromCurrency);
                      const toRate = currencyRates.find(r => r.code === toCurrency);
                      if (fromRate && toRate && e.target.value) {
                        const amountInUSD = parseFloat(e.target.value) / fromRate.rate;
                        const converted = amountInUSD * toRate.rate;
                        setConvertedAmount(converted.toFixed(2));
                      }
                    }}
                    className="flex-1"
                    placeholder="100"
                  />
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyRates.map((rate) => (
                        <SelectItem key={rate.code} value={rate.code}>
                          {rate.flag} {rate.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleSwapCurrencies}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12"
                >
                  <ArrowLeftRight className="w-5 h-5" />
                </Button>
              </div>

              {/* To Currency */}
              <div>
                <Label htmlFor="converted">Converted Amount</Label>
                <div className="flex gap-3 mt-2">
                  <Input
                    id="converted"
                    type="text"
                    value={convertedAmount}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyRates.map((rate) => (
                        <SelectItem key={rate.code} value={rate.code}>
                          {rate.flag} {rate.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exchange Rate Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Exchange Rate:</span>
                  <span className="font-semibold">
                    1 {fromCurrency} = {fromCurrencyData && toCurrencyData ? (toCurrencyData.rate / fromCurrencyData.rate).toFixed(4) : '0'} {toCurrency}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleConvert} variant="outline" className="flex-1">
                  Recalculate
                </Button>
                <Button onClick={handleExchange} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Exchange Now
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500">
                * Rates are updated in real-time. Actual exchange rates may vary slightly.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Exchange Rates Table */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Current Exchange Rates</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currencyRates.filter(r => r.code !== 'USD').map((rate) => (
              <Card key={rate.code} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{rate.flag}</span>
                    <div>
                      <p className="font-semibold">{rate.code}</p>
                      <p className="text-xs text-gray-500">{rate.name}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">We Buy:</span>
                    <span className="font-medium">{rate.buyRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">We Sell:</span>
                    <span className="font-medium">{rate.sellRate.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>1 USD = {rate.rate.toFixed(2)} {rate.code}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Best Rates</h3>
              <p className="text-sm text-gray-600">
                We offer competitive exchange rates with no hidden fees
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeftRight className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Exchange</h3>
              <p className="text-sm text-gray-600">
                Quick and easy currency exchange process
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Service</h3>
              <p className="text-sm text-gray-600">
                Exchange currency anytime, anywhere with our online platform
              </p>
            </Card>
          </div>

          <Card className="mt-8 p-6 bg-yellow-50 border-yellow-200">
            <p className="text-sm text-gray-700">
              <strong>Disclaimer:</strong> Exchange rates are subject to market fluctuations and may change without prior notice. 
              The rates shown are indicative and the actual rate will be confirmed at the time of transaction. 
              JF Travels & Bureau de Change is licensed and regulated by the Central Bank.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
