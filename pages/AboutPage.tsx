
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg p-8 md:p-12 shadow-lg shadow-yellow-500/10 animate-fade-in-up">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#d4af37] mb-6">
          من نحن؟
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          في Luxury Cases DZ، نؤمن بأن غطاء الهاتف ليس مجرد أداة حماية، بل هو قطعة فنية تعبر عن شخصيتك وتضيف لمسة من الأناقة إلى أسلوبك اليومي.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-right">
          <h2 className="text-3xl font-bold text-white mb-4">قصتنا</h2>
          <p className="text-gray-400 leading-loose">
            تأسست Luxury Cases DZ على شغف بالجودة والتصميم الفريد. انطلقنا في رحلتنا بهدف بسيط: تقديم أغطية هواتف فاخرة تتجاوز التوقعات، مصنوعة من أجود المواد وبحرفية عالية تضمن المتانة والجمال. نحن نجمع بين التكنولوجيا الحديثة واللمسات اليدوية الدقيقة لنصنع كل قطعة كتحفة فنية.
          </p>
        </div>
        <div className="flex justify-center">
            <img src="/images/case.jpg" alt="Craftsmanship" className="rounded-full w-64 h-64 object-cover border-4 border-[#d4af37] shadow-2xl"/>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-10 items-center">
         <div className="flex justify-center order-last md:order-first">
            <img src="/images/case.jpg" alt="Quality Materials" className="rounded-full w-64 h-64 object-cover border-4 border-[#d4af37] shadow-2xl"/>
        </div>
        <div className="text-center md:text-right">
          <h2 className="text-3xl font-bold text-white mb-4">رؤيتنا</h2>
          <p className="text-gray-400 leading-loose">
            نطمح لأن نكون الوجهة الأولى في الجزائر لكل من يبحث عن الفخامة والجودة في اكسسوارات الهواتف. نسعى باستمرار لابتكار تصاميم جديدة وعصرية تلبي أذواق عملائنا المميزين، مع الحفاظ على التزامنا بأعلى معايير الجودة وتقديم تجربة تسوق استثنائية.
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
