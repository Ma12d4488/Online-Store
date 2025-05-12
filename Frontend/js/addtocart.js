document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items-container");
  const clearCartBtn = document.querySelector(".clear-cart");
  const subtotalElement = document.getElementById("subtotal");
  const vatElement = document.getElementById("vat");
  const totalElement = document.getElementById("total");

  // عرض حالة السلة الفارغة
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <p class="empty-cart-msg text-center">
        You currently have <strong>0 items</strong> in your cart.
      </p>
    `;
    clearCartBtn.style.display = "none";
    updateSummary(0);
    return;
  }

  // عرض عناصر السلة
  renderCartItems(cartItems);
  clearCartBtn.style.display = "block";

  // إعداد معالج الأحداث
  setupEventListeners();
});

function renderCartItems(items) {
  const cartContainer = document.getElementById("cart-items-container");

  // حساب المجموع الفرعي
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  cartContainer.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="item-info">
        <div class="item-title">${item.title}</div>
        <div class="item-category">${item.category}</div>
      </div>
      <div class="item-price">$${item.price} x ${item.quantity || 1}</div>
      <button class="remove-btn" data-id="${item.id}">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join("");

  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const vat = subtotal * 0.14;
  const total = subtotal + vat;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("vat").textContent = `$${vat.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function setupEventListeners() {
  // حذف عنصر من السلة
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.id);
      removeFromCart(productId);
    });
  });

  // تفريغ السلة
  document.querySelector(".clear-cart").addEventListener("click", function () {
    localStorage.removeItem("cart");
    location.reload();
  });
}

function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems = cartItems.filter(item => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cartItems));

  if (cartItems.length === 0) {
    location.reload();
  } else {
    renderCartItems(cartItems);
  }

  // تحديث العداد في الصفحات الأخرى
  if (window.opener) {
    window.opener.updateCartCount();
  }
}

// جعل الدالة متاحة للصفحات الأخرى
window.updateCartCount = function () {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // هذا سيعمل فقط إذا كان هناك عنصر بعنوان cart-count في الصفحة الحالية
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
};