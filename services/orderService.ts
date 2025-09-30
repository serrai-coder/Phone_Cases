import type { OrderDetails } from '../types';

// Updated Google Web App URL provided by the user
const GOOGLE_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycby8e3kO13FX8OBCYsmZJ1XC7NmTp_COErvOlpt1kLCdqrJqWRz0Z5z9uzkQ6kehdOIQ/exec';

export const submitOrder = async (orderData: OrderDetails): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();

  // Mapping form data to the specified Google Sheet structure
  formData.append('Nom', orderData.lastName);
  formData.append('Prenom', orderData.firstName);
  formData.append('Numéro Tel', orderData.phone);
  formData.append('Wilaya', orderData.wilaya);
  formData.append('Commune', orderData.commune);
  formData.append('Produit', `${orderData.productName} - ${orderData.phoneModel}`);
  formData.append('Type de livraison', orderData.deliveryOption === 'home' ? 'À domicile' : 'Stop desk');
  formData.append('Prix', String(orderData.totalPrice));
  formData.append('Date et Heure', new Date().toLocaleString('fr-DZ', { timeZone: 'Africa/Algiers' }));
  formData.append('Situation de commande', 'Nouvelle Commande');

  try {
    const response = await fetch(GOOGLE_WEBAPP_URL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return { success: true, message: 'تم إرسال طلبك بنجاح!' };
    } else {
      const errorText = await response.text();
      return { success: false, message: `حدث خطأ أثناء إرسال الطلب: ${errorText}` };
    }
  } catch (error) {
    console.error('Submission error:', error);
    return { success: false, message: 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى.' };
  }
};
