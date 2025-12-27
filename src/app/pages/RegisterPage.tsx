import { useState } from 'react';
import { Mail, Lock, User, Plane } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { auth, googleProvider, appleProvider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function RegisterPage({ onNavigate, onLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Mock registration - in real app this would call Firebase
    toast.success('Account created successfully! Welcome to JF Travels.');
    onLogin();
    onNavigate('dashboard');
  };

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Save user email to backend
      await fetch('http://localhost:8000/api/auth/firebase-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          firebaseUid: user.uid,
        }),
      });
      
      toast.success(`Welcome ${user.displayName || 'User'}!`);
      onLogin();
      onNavigate('dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleRegister = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      
      // Save user email to backend
      await fetch('http://localhost:8000/api/auth/firebase-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          firebaseUid: user.uid,
        }),
      });
      
      toast.success(`Welcome ${user.displayName || 'User'}!`);
      onLogin();
      onNavigate('dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register with Apple');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Plane className="w-7 h-7 text-blue-600" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">JF Travels</h1>
              <p className="text-sm text-blue-100">Bureau de Change</p>
            </div>
          </div>
        </div>

        {/* Register Card */}
        <Card className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-600">Start your journey with us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-2"
                required
              />
            </div>

            <div className="text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="rounded mt-1" required />
                <span className="text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11">
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2"
              onClick={handleGoogleRegister}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#4285F4" strokeWidth="2" opacity="0.2" />
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2"
              onClick={handleAppleRegister}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 2.92.37 5.45 2.82 6.31 1.44.5 3.29.39 4.73-.3 1.44 1.16 3.12 1.75 4.92 1.75.75 0 1.5-.08 2.23-.25-1.51 2.4-4.56 4.08-8.01 4.08-3.45 0-6.5-1.68-8.01-4.08.73.17 1.48.25 2.23.25 1.8 0 3.48-.59 4.92-1.75-1.44.69-3.29.8-4.73.3-2.45-.86-3.73-3.39-2.82-6.31-.35.08-.7.12-1.05.12-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9c0 .35-.04.7-.12 1.05z"/>
              </svg>
              Apple
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        </Card>

        <p className="text-center text-sm text-blue-100 mt-6">
          Join thousands of happy travelers exploring the world with JF Travels
        </p>
      </div>
    </div>
  );
}
