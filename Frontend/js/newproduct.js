document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let count = document.querySelector(".cart-count");
  let row = document.querySelector(".row");
  count.innerHTML = cartItems.length;
  let cursor = document.querySelector(".cursor");
  cursor.addEventListener("click", () => {
    window.location = "addtocart.html";
  });
  let newProduct = localStorage.getItem("newproduct");
  console.log(newProduct);
  

    let productDiv = document.createElement("div");
    productDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-3");

    productDiv.innerHTML = `
        <div class="card p-3">
          <img src="${newProduct.image}" class="card-img-top" alt="${newProduct.title}" />
          <div class="card-body text-center">
            <h5 class="card-title text-danger">${newProduct.title.slice(0, 21)}</h5>
            <p class="card-text">${
              newProduct.price
            } <span class="dollar text-danger fs-4">$</span></p>
            <p class="">${newProduct.category}</p>
            <button class="btn btn-danger remove-btn" data-id="${
              newProduct.id
            }">Remove</button>
          </div>
        </div>
      `;
    row.appendChild(productDiv);
});
