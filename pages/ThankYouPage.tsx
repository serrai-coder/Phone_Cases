
import React from 'react';
import type { OrderDetails } from '../types';

interface ThankYouPageProps {
  orderDetails: OrderDetails;
  onBackToHome: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ orderDetails, onBackToHome }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="bg-[#1a1a1a] p-10 rounded-xl shadow-2xl max-w-2xl w-full border border-gray-700">
            <div className="mb-6">
                 <svg className="w-16 h-16 text-[#d4af37] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h1 className="text-3xl font-bold text-[#d4af37] mb-4">
                شكراً لطلبك من Luxury Cases DZ
            </h1>
            <p className="text-gray-300 mb-8">
                مرحباً, {orderDetails.firstName}. لقد تم استلام طلبك بنجاح. سنتواصل معك قريباً عبر الهاتف لتأكيد الطلب.
            </p>

            <div className="text-right bg-black p-6 rounded-lg mb-8 border border-gray-700 space-y-3">
                <h3 className="text-xl font-semibold mb-4 text-white">ملخص الطلب</h3>
                <SummaryRow label="الاسم الكامل" value={`${orderDetails.firstName} ${orderDetails.lastName}`} />
                <SummaryRow label="نوع الهاتف" value={orderDetails.phoneModel} />
                <SummaryRow label="الولاية" value={orderDetails.wilaya} />
                <SummaryRow label="السعر الإجمالي" value={`${orderDetails.totalPrice.toLocaleString()} دج`} isHighlighted={true} />
            </div>

            <button
                onClick={onBackToHome}
                className="bg-[#d4af37] text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors duration-300"
            >
                العودة إلى الصفحة الرئيسية
            </button>
        </div>
    </div>
  );
};


const SummaryRow: React.FC<{label: string; value: string; isHighlighted?: boolean}> = ({ label, value, isHighlighted }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400">{label}:</span>
        <span className={`${isHighlighted ? 'text-[#d4af37] font-bold text-lg' : 'text-white'}`}>{value}</span>
    </div>
);


export default ThankYouPage;
