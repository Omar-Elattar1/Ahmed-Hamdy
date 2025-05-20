// cart.js

// تحميل السلة من localStorage أو إنشاء جديدة
function getCart() {
  return JSON.parse(localStorage.getItem('bstylk_cart')) || [];
}

// حفظ السلة في localStorage
function saveCart(cart) {
  localStorage.setItem('bstylk_cart', JSON.stringify(cart));
}

// عرض محتويات السلة في الصفحة
function displayCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>سلة التسوق فارغة.</p>';
    document.getElementById('cart-total').textContent = '0';
    return;
  }

  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>السعر: ${item.price} جنيه</p>
          <p>
            الكمية:
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
          </p>
          <button onclick="removeFromCart('${item.id}')">حذف</button>
        </div>
      </div>
    `;
  });
  document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
}

function updateQuantity(id, quantity) {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].quantity = parseInt(quantity);
    saveCart(cart);
    displayCart();
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  displayCart();
}

// استدعاء العرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayCart);
