
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formMessage, setFormMessage] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API.
        // For this example, we'll just show a success message.
        if(name && email && message) {
            setFormMessage('شكراً لك! تم استلام رسالتك وسنرد عليك قريباً.');
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setFormMessage('يرجى ملء جميع الحقول.');
        }
    }

  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-8 md:p-12 shadow-lg shadow-yellow-500/10 animate-fade-in-up">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#d4af37] mb-6">
          تواصل معنا
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          نحن هنا لمساعدتك. إذا كان لديك أي سؤال أو استفسار، لا تتردد في التواصل معنا عبر إحدى الطرق التالية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg">
           <h2 className="text-2xl font-bold mb-6 text-white">أرسل لنا رسالة</h2>
           <form onSubmit={handleFormSubmit} noValidate>
                <div className="mb-4">
                    <InputField id="contactName" label="الاسم الكامل" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <InputField id="contactEmail" label="البريد الإلكتروني" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-300 mb-1">رسالتك</label>
                    <textarea id="contactMessage" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full bg-[#333] border border-gray-600 text-white rounded-lg p-2.5 focus:ring-[#d4af37] focus:border-[#d4af37]"></textarea>
                </div>
                {formMessage && <p className="text-center text-green-400 mb-4">{formMessage}</p>}
                <button type="submit" className="w-full bg-[#d4af37] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300">
                    إرسال
                </button>
           </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
            <div>
                 <h3 className="text-xl font-semibold text-[#d4af37] mb-3">معلومات الاتصال</h3>
                 <p className="text-gray-400"><strong>الهاتف:</strong> <a href="tel:+213123456789" className="hover:text-[#d4af37] transition-colors" dir="ltr">+213 123 456 789</a></p>
                 <p className="text-gray-400"><strong>الإيميل:</strong> <a href="mailto:contact@luxurycases.dz" className="hover:text-[#d4af37] transition-colors">contact@luxurycases.dz</a></p>
            </div>
             <div>
                 <h3 className="text-xl font-semibold text-[#d4af37] mb-4">تابعنا</h3>
                 <div className="flex space-x-6 space-x-reverse">
                    <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.39 1.88 6.166l-1.29 4.721 4.833-1.274zM13.264 15.094c-.147-.075-.874-.431-1.011-.48-1.071-.383-1.071-.383-1.314.122-.182.375-.683.87-1.094.87-.412 0-.825-.249-1.237-.499-.412-.25-1.088-.749-1.749-1.416-.66-.667-1.071-1.237-1.314-1.649-.243-.412-.062-.687.122-1.094.183-.411.375-.683.557-.926.182-.243.243-.411.122-.654-.122-.243-.683-1.749-1.094-2.16-.412-.411-.825-.375-.989-.314-.163.062-.486.122-.683.314s-.683.812-.683 1.591c0 .779.683 1.749 1.094 2.16.412.411 1.029 1.354 2.517 2.378 1.488 1.025 2.18 1.213 2.518 1.213.338 0 .633-.162.926-.375.293-.213.989-.926 1.153-1.237.163-.312.163-.556.102-.654z"/></svg>
                    </a>
                    <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                    </a>
                    <a href="https://facebook.com/YOUR_FACEBOOK" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};


const InputField: React.FC<{id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ id, label, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input type={type} id={id} value={value} onChange={onChange} className={`w-full bg-[#333] border border-gray-600 text-white rounded-lg p-2.5 focus:ring-[#d4af37] focus:border-[#d4af37]`} required />
  </div>
);


export default ContactPage;