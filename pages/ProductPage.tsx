import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, OrderDetails, Wilaya, City } from '../types';
import { wilayas } from '../data/wilayas';
import { submitOrder } from '../services/orderService';

interface ProductPageProps {
  product: Product;
  onOrderSuccess: (orderDetails: OrderDetails) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onOrderSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneModel, setPhoneModel] = useState('iPhone 13 Pro Max');
  const [selectedWilayaCode, setSelectedWilayaCode] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'home' | 'stopDesk'>('home');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [communes, setCommunes] = useState<City[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const selectedWilaya = useMemo(() => {
    return wilayas.find(w => w.code === selectedWilayaCode);
  }, [selectedWilayaCode]);

  useEffect(() => {
    if (selectedWilaya) {
      setCommunes(selectedWilaya.cities);
      setSelectedCommune(''); // Reset commune on wilaya change
      
      let price = 0;
      if (deliveryOption === 'home') {
        price = typeof selectedWilaya.deliveryPriceHome === 'number' ? selectedWilaya.deliveryPriceHome : 0;
      } else {
        price = typeof selectedWilaya.deliveryPriceStopDesk === 'number' ? selectedWilaya.deliveryPriceStopDesk : 0;
      }

      if(price === 0 && (selectedWilaya.deliveryPriceHome !== null && selectedWilaya.deliveryPriceStopDesk !== null)) {
        setErrors(prev => ({...prev, delivery: "التوصيل غير متوفر لهذه الولاية"}));
      } else {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.delivery;
            return newErrors;
        })
      }
      
      setDeliveryPrice(price);
      setTotalPrice(product.price + price);
    } else {
      setCommunes([]);
      setDeliveryPrice(0);
      setTotalPrice(product.price);
    }
  }, [selectedWilaya, deliveryOption, product.price]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'الاسم مطلوب';
    if (!lastName.trim()) newErrors.lastName = 'اللقب مطلوب';
    if (!phone.trim()) {
        newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^0[5-7]\d{8}$/.test(phone)) {
        newErrors.phone = 'رقم الهاتف غير صالح (يجب أن يبدأ بـ 05, 06, أو 07 ويتكون من 10 أرقام)';
    }
    if (!selectedWilayaCode) newErrors.wilaya = 'الولاية مطلوبة';
    if (!selectedCommune) newErrors.commune = 'البلدية مطلوبة';
    if (deliveryPrice === 0 && (selectedWilaya?.deliveryPriceHome !== null && selectedWilaya?.deliveryPriceStopDesk !== null) ) {
        newErrors.delivery = "التوصيل غير متوفر لهذه الولاية";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    const orderDetails: OrderDetails = {
      firstName,
      lastName,
      phone,
      phoneModel,
      wilaya: selectedWilaya?.name_ar || '',
      commune: selectedCommune,
      deliveryOption,
      productName: product.name,
      productPrice: product.price,
      deliveryPrice,
      totalPrice
    };

    const result = await submitOrder(orderDetails);
    if(result.success) {
        onOrderSuccess(orderDetails);
    } else {
        setSubmitMessage(result.message);
    }

    setIsSubmitting(false);
  };
  
  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  }, [product.images.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  }, [product.images.length]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Details */}
      <div className="bg-[#111] p-6 rounded-lg">
        <div className="relative group mb-4">
            <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg transition-all duration-300 ease-in-out" />
            
            {product.images.length > 1 && (
                <>
                    <button onClick={handlePrevImage} aria-label="Previous Image" className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-[#d4af37]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextImage} aria-label="Next Image" className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-[#d4af37]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
            )}
        </div>
        
        <div className="flex space-x-2 space-x-reverse justify-center mb-6">
            {product.images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                    currentImageIndex === index ? 'border-[#d4af37] scale-110' : 'border-transparent hover:border-gray-500'
                    }`}
                />
            ))}
        </div>

        <h1 className="text-3xl font-bold text-[#d4af37] mb-4">{product.name}</h1>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <ul className="space-y-2 mb-6">
            {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-[#d4af37] ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <div className="text-4xl font-bold text-white">{product.price.toLocaleString()} دج</div>
      </div>

      {/* Order Form */}
      <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">نموذج الطلب</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField id="firstName" label="الاسم" value={firstName} onChange={e => setFirstName(e.target.value)} error={errors.firstName} />
            <InputField id="lastName" label="اللقب" value={lastName} onChange={e => setLastName(e.target.value)} error={errors.lastName} />
          </div>
          <div className="mb-4">
            <InputField id="phone" label="رقم الهاتف" type="tel" value={phone} onChange={e => setPhone(e.target.value)} error={errors.phone} />
          </div>
          <div className="mb-4">
            <SelectField id="phoneModel" label="نوع الهاتف" value={phoneModel} onChange={e => setPhoneModel(e.target.value)}>
                <option>iPhone 13 Pro Max</option>
                <option>iPhone 14 Pro Max</option>
                <option>iPhone 15 Pro Max</option>
                <option>Samsung S23 Ultra</option>
                <option>Samsung S24 Ultra</option>
            </SelectField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <SelectField id="wilaya" label="الولاية" value={selectedWilayaCode} onChange={e => setSelectedWilayaCode(e.target.value)} error={errors.wilaya}>
                 <option value="">-- اختر ولايتك --</option>
                 {wilayas.map(w => <option key={w.code} value={w.code}>{w.name_ar}</option>)}
             </SelectField>
             <SelectField id="commune" label="البلدية" value={selectedCommune} onChange={e => setSelectedCommune(e.target.value)} error={errors.commune} disabled={!selectedWilayaCode}>
                <option value="">-- اختر بلديتك --</option>
                {communes.map(c => <option key={c.id} value={c.name_ar}>{c.name_ar}</option>)}
             </SelectField>
          </div>
           <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">خيار التوصيل</label>
              <div className="flex space-x-4 space-x-reverse">
                <RadioOption id="home" name="delivery" label="إلى المنزل" checked={deliveryOption === 'home'} onChange={() => setDeliveryOption('home')} />
                <RadioOption id="stopDesk" name="delivery" label="إلى المكتب" checked={deliveryOption === 'stopDesk'} onChange={() => setDeliveryOption('stopDesk')} />
              </div>
              {errors.delivery && <p className="text-red-500 text-xs mt-1">{errors.delivery}</p>}
           </div>

           <div className="bg-black p-4 rounded-lg mb-6 text-sm">
                <div className="flex justify-between mb-2"><span>سعر المنتج:</span><span>{product.price.toLocaleString()} دج</span></div>
                <div className="flex justify-between mb-2"><span>سعر التوصيل:</span><span>{deliveryPrice > 0 ? `${deliveryPrice.toLocaleString()} دج` : '...'}</span></div>
                <hr className="border-gray-700 my-2" />
                <div className="flex justify-between font-bold text-lg text-[#d4af37]"><span>الإجمالي:</span><span>{totalPrice.toLocaleString()} دج</span></div>
           </div>
          
           {submitMessage && <div className="text-center bg-red-900 border border-red-700 text-white px-4 py-3 rounded relative mb-4" role="alert">{submitMessage}</div>}

          <button type="submit" disabled={isSubmitting || !!errors.delivery} className="w-full bg-[#d4af37] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
            {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب'}
          </button>
        </form>
      </div>
    </div>
  );
};


// Helper Components
const InputField: React.FC<{id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string}> = ({ id, label, type = 'text', value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input type={type} id={id} value={value} onChange={onChange} className={`w-full bg-[#333] border ${error ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg p-2.5 focus:ring-[#d4af37] focus:border-[#d4af37]`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField: React.FC<{id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, error?: string, disabled?: boolean, children: React.ReactNode}> = ({ id, label, value, onChange, error, disabled, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <select id={id} value={value} onChange={onChange} disabled={disabled} className={`w-full bg-[#333] border ${error ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg p-2.5 focus:ring-[#d4af37] focus:border-[#d4af37] disabled:bg-gray-700 disabled:cursor-not-allowed`}>
        {children}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const RadioOption: React.FC<{id: string, name: string, label: string, checked: boolean, onChange: () => void}> = ({ id, name, label, checked, onChange }) => (
  <div className="flex items-center">
    <input id={id} name={name} type="radio" checked={checked} onChange={onChange} className="h-4 w-4 text-[#d4af37] bg-gray-700 border-gray-600 focus:ring-[#d4af37]" />
    <label htmlFor={id} className="mr-2 text-sm font-medium text-gray-300">{label}</label>
  </div>
);


export default ProductPage;
