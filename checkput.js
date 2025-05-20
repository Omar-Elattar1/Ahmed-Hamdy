// checkout.js

document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem('bstylk_cart')) || [];
  if (cart.length === 0) {
    alert('سلة التسوق فارغة!');
    return;
  }

  const customerData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    altPhone: document.getElementById('alt-phone').value.trim(),
    governorate: document.getElementById('governorate').value.trim(),
    area: document.getElementById('area').value.trim(),
    street: document.getElementById('street').value.trim(),
    building: document.getElementById('building').value.trim(),
    paymentMethod: 'COD',
    orderDate: new Date(),
    cartItems: cart
  };

  try {
    await db.collection('orders').add(customerData);
    alert('تم إرسال الطلب بنجاح. شكراً لك!');
    localStorage.removeItem('bstylk_cart');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('خطأ في إرسال الطلب:', error);
    alert('حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.');
  }
});
