
import React from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  onOrderNow: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onOrderNow }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-t from-black via-gray-900 to-black text-white text-center py-20 px-4 mb-16 rounded-lg border border-gray-800 shadow-lg shadow-yellow-500/10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#d4af37] mb-4 leading-tight animate-fade-in-down">
            الفخامة بين يديك
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            أغطية هواتف استثنائية تجمع بين الحماية الفائقة والتصميم الأنيق. ارتقِ بأسلوبك مع Luxury Cases DZ.
          </p>
          <a
            href="#products-grid"
            className="bg-[#d4af37] text-black font-bold py-3 px-10 rounded-lg hover:bg-yellow-300 transition-transform transform hover:scale-105 duration-300 inline-block text-lg"
          >
            اكتشف المجموعة
          </a>
        </div>
      </section>

      {/* Products Grid */}
      <div id="products-grid">
         <h2 className="text-3xl md:text-4xl font-bold text-center text-[#d4af37] mb-12">مجموعتنا الحصرية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-sm mx-auto md:max-w-none">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onOrderNow={onOrderNow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
