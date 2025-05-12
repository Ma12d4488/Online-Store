// cart.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("You must be logged in to view your cart.");
    window.location.href = "login.html";
    return;
  }

  fetch(`https://localhost:7126/api/cart/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const cartContainer = document.getElementById("cart-container");
      cartContainer.innerHTML = "";
      let total = 0;

      data.forEach(item => {
        total += item.quantity * item.product.price;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <h4>${item.product.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${item.product.price}</p>
          <p>Total: $${item.quantity * item.product.price}</p>
        `;
        cartContainer.appendChild(div);
      });

      document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
    })
    .catch(err => {
      console.error("Error loading cart:", err);
      alert("Failed to load cart.");
    });
});


// orders.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("You must be logged in to view your orders.");
    window.location.href = "login.html";
    return;
  }

  fetch(`https://localhost:7126/api/orders/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const ordersContainer = document.getElementById("orders-container");
      ordersContainer.innerHTML = "";

      data.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "order";
        orderDiv.innerHTML = `
          <h4>Order ID: ${order.id}</h4>
          <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
          <ul>
            ${order.items.map(item => `<li>${item.product.name} - Quantity: ${item.quantity}</li>`).join('')}
          </ul>
        `;
        ordersContainer.appendChild(orderDiv);
      });
    })
    .catch(err => {
      console.error("Error loading orders:", err);
      alert("Failed to load orders.");
    });
});
