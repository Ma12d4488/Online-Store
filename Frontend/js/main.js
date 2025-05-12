// عناصر DOM
const links = document.querySelector(".links");
const userInfo = document.querySelector(".userinfo");
const userName = document.querySelector(".user");
const logoutBtn = document.querySelector(".logout");
const productsContainer = document.querySelector(".one");
const cartCountElement = document.querySelector(".cart-count");
const cartShoppingBtn = document.querySelector("#cart-shopping");
const searchInput = document.querySelector("#search");
const createBtn = document.querySelector(".create");

// متغيرات التطبيق
let products = [];
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// تهيئة الصفحة عند التحميل
document.addEventListener("DOMContentLoaded", function () {
  // إدارة حالة المستخدم
  manageUserState();

  // جلب وعرض المنتجات
  fetchProducts();

  // تحديث عداد السلة
  updateCartCount();

  // إعداد معالج الأحداث
  setupEventListeners();
});

// إدارة حالة تسجيل الدخول
function manageUserState() {
  if (localStorage.getItem("username")) {
    if (links) links.remove();
    if (userInfo) userInfo.style.display = "flex";
    if (userName) userName.textContent = localStorage.getItem("username");
  }
}

async function fetchProducts() {
  try {
    const [phonesRes, laptopsRes] = await Promise.all([
      fetch("https://dummyjson.com/products/category/smartphones"),
      fetch("https://dummyjson.com/products/category/laptops")
    ]);

    const phonesData = await phonesRes.json();
    const laptopsData = await laptopsRes.json();

    products = [...phonesData.products, ...laptopsData.products];

    // إضافة منتج جديد من localStorage إذا وجد
    const newProduct = localStorage.getItem("newproduct");
    if (newProduct) {
      products.push(JSON.parse(newProduct));
      localStorage.removeItem("newproduct"); // تنظيف بعد الاستخدام
    }

    if (productsContainer) {
      displayProducts(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    showAlert("حدث خطأ في جلب المنتجات", "error");
  }
}

// عرض المنتجات
function displayProducts(productsToDisplay) {
  if (!productsContainer) return;

  productsContainer.innerHTML = productsToDisplay.map(product => `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-3 mr-2">
            <div class="card overflow-hidden p-3" style="width: 100%">
                <i class="fa-solid fa-heart heart ${isFavorite(product.id) ? "favorite" : ""}"
                   onclick="toggleFavorite(${product.id}, this)"></i>
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />
                <div class="card-body text-center">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.category}</p>
                    <span class="product-price d-block mt-1 mb-2 fs-4">
                        ${product.price} <span class="dollar text-primary fs-6">$</span>
                    </span>
                    <button class="btn btn-primary mt-2" onclick="addToCart(${product.id})">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// التحقق إذا كان المنتج مفضلاً
function isFavorite(productId) {
  return favorites.some(item => item.id === productId);
}

// إضافة إلى السلة
// إضافة إلى السلة
function addToCart(productId) {
  if (!localStorage.getItem("username")) {
    window.location = "login.html";
    return;
  }

  const productToAdd = products.find(product => product.id === productId);
  if (!productToAdd) return;

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // التحقق من وجود المنتج في السلة
  const existingItem = cartItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    productToAdd.quantity = 1;
    cartItems.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCount();
  showAlert("تمت إضافة المنتج إلى السلة", "success");
}

// تحديث عداد السلة
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}
// تبديل حالة المفضلة
function toggleFavorite(productId, element) {
  if (!localStorage.getItem("username")) {
    window.location = "login.html";
    return;
  }

  const productIndex = favorites.findIndex(item => item.id === productId);

  if (productIndex === -1) {
    // إضافة إلى المفضلة
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      favorites.push(productToAdd);
      element.classList.add("favorite");
      showAlert("تمت إضافة المنتج إلى المفضلة", "success");
    }
  } else {
    // إزالة من المفضلة
    favorites.splice(productIndex, 1);
    element.classList.remove("favorite");
    showAlert("تمت إزالة المنتج من المفضلة", "info");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// البحث عن المنتجات
function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    );
    displayProducts(filteredProducts);
  });
}

// إعداد معالج الأحداث
function setupEventListeners() {
  // تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      setTimeout(() => window.location = "Register.html", 1500);
    });
  }

  // الذهاب إلى السلة
  if (cartShoppingBtn) {
    cartShoppingBtn.addEventListener("click", function () {
      if (localStorage.getItem("username")) {
        window.location = "addtocart.html";
      } else {
        window.location = "login.html";
      }
    });
  }

  // إنشاء منتج جديد
  if (createBtn) {
    createBtn.addEventListener("click", function () {
      if (localStorage.getItem("username")) {
        window.location = "createproduct.html";
      } else {
        window.location = "login.html";
      }
    });
  }

  // إعداد البحث
  setupSearch();
}

// عرض تنبيه
function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} fixed-alert`;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// جعل الدوال متاحة عالمياً للاستخدام في الأحداث
window.addToCart = addToCart;
window.toggleFavorite = toggleFavorite;