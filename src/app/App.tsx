import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ToursPage } from './pages/ToursPage';
import { TourDetailsPage } from './pages/TourDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { CurrencyExchangePage } from './pages/CurrencyExchangePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type Page = 
  | 'home' 
  | 'about' 
  | 'destinations' 
  | 'tours' 
  | 'tour-details' 
  | 'booking' 
  | 'currency'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'admin';

interface PageData {
  tourId?: string;
  filterCountry?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<PageData>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleNavigate = (page: Page, data?: PageData) => {
    setCurrentPage(page);
    setPageData(data || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // sign out from Firebase as well
    signOut(auth).catch(() => {});
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        
        // Check if user is admin
        try {
          const response = await fetch('http://localhost:8000/api/auth/check-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await response.json();
          setIsAdmin(data.isAdmin || false);
        } catch (error) {
          console.error('Failed to check admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Pages that don't need navbar/footer
  const fullPageLayouts = ['login', 'register'];
  const showLayout = !fullPageLayouts.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} selectedCurrency={selectedCurrency} />;
      case 'about':
        return <AboutPage />;
      case 'destinations':
        return <DestinationsPage onNavigate={handleNavigate} />;
      case 'tours':
        return <ToursPage onNavigate={handleNavigate} initialFilter={pageData} selectedCurrency={selectedCurrency} />;
      case 'tour-details':
        return pageData.tourId ? (
          <TourDetailsPage tourId={pageData.tourId} onNavigate={handleNavigate} selectedCurrency={selectedCurrency} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'booking':
        return pageData.tourId ? (
          <BookingPage 
            tourId={pageData.tourId} 
            onNavigate={handleNavigate} 
            isAuthenticated={isAuthenticated}
            selectedCurrency={selectedCurrency}
          />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'currency':
        return <CurrencyExchangePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'dashboard':
        return isAuthenticated ? (
          <UserDashboard onNavigate={handleNavigate} selectedCurrency={selectedCurrency} />
        ) : (
          <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
        );
      case 'deposit':
        return isAuthenticated ? (
          <DepositPage onNavigate={handleNavigate} />
        ) : (
          <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
        );
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} selectedCurrency={selectedCurrency} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showLayout && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
      )}
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      {showLayout && <Footer onNavigate={handleNavigate} />}
      
      <Toaster position="top-right" />
    </div>
  );
}
