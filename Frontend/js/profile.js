document.addEventListener("DOMContentLoaded", function () {
    let length = document.querySelector(".length");
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.querySelector(".cart-count");
     length.innerHTML = `Products (${cartItems.length})`;
     count.innerHTML = cartItems.length;
     let cursor = document.querySelector(".cursor");
     cursor.addEventListener("click",() => {
       window.location = "addtocart.html"
     })
});
