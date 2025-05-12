document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let row = document.querySelector(".row");
  let cartCount = document.querySelector(".cart-count");
  let clearCartBtn = document.querySelector(".clear-cart");

  if (favorites.length === 0) {
    row.innerHTML =
      "<p class='text-center fs-4 text-danger fw-bold '>Your cart is empty.</p>";
    clearCartBtn.style.display = "none";
    return;
  }

  row.innerHTML = "";
  cartCount.innerHTML = cartItems.length;
  clearCartBtn.style.display = "block";

  favorites.forEach((item) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-3");

    productDiv.innerHTML = `
        <div class="card p-3">
          <img src="${item.image}" class="card-img-top" alt="${item.title}" />
          <div class="card-body text-center">
            <h5 class="card-title text-danger">${item.title.slice(0, 21)}</h5>
            <p class="card-text">${
              item.price
            } <span class="dollar text-danger fs-4">$</span></p>
            <p class="">${item.category}</p>
            <button class="btn btn-danger remove-btn" data-id="${
              item.id
            }">Remove</button>
          </div>
        </div>
      `;

    row.appendChild(productDiv);
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let productId = parseInt(this.dataset.id);
      removeFromCart(productId);
    });
  });

  clearCartBtn.addEventListener("click", function () {
    localStorage.removeItem("favorites");
    location.reload();
  });
  let cursor = document.querySelector(".cursor");
  cursor.addEventListener("click",() => {
    window.location = "addtocart.html"
  })
});

function removeFromCart(productId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let updatedCart = favorites.filter((item) => item.id !== productId);

  localStorage.setItem("favorites", JSON.stringify(updatedCart));

  document.querySelector(".cart-count").innerHTML = localStorage.getItem("count");

  location.reload();
}
