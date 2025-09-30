import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOrderNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrderNow }) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:-translate-y-2">
      <img src={product.images[0]} alt={product.name} className="w-full h-96 object-cover" />
      <div className="p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2 text-[#d4af37]">{product.name}</h3>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <p className="text-3xl font-bold mb-6">{product.price.toLocaleString()} دج</p>
        <button
          onClick={() => onOrderNow(product)}
          className="w-full bg-[#d4af37] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
