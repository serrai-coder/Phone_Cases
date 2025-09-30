
import React, { useState, useCallback } from 'react';
import type { Page, Product, OrderDetails } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ThankYouPage from './pages/ThankYouPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { products } from './data/products';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleOrderNow = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  }, []);

  const handleOrderSuccess = useCallback((orderDetails: OrderDetails) => {
    setLastOrder(orderDetails);
    setCurrentPage('thankyou');
    window.scrollTo(0, 0);
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setSelectedProduct(null);
    setLastOrder(null);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        if (selectedProduct) {
          return <ProductPage product={selectedProduct} onOrderSuccess={handleOrderSuccess} />;
        }
        // Fallback to home if no product is selected
        return <HomePage products={products} onOrderNow={handleOrderNow} />;
      case 'thankyou':
         if(lastOrder) {
            return <ThankYouPage orderDetails={lastOrder} onBackToHome={handleBackToHome} />;
         }
         return <HomePage products={products} onOrderNow={handleOrderNow} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage products={products} onOrderNow={handleOrderNow} />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;