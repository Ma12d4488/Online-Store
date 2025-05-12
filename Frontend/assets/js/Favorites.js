// Favorites.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("You must be logged in to view favorites.");
    window.location.href = "login.html";
    return;
  }

  fetch(`https://localhost:7126/api/favorites/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const favContainer = document.getElementById("favorites-container");
      favContainer.innerHTML = "";
      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "favorite-item";
        div.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p>Price: $${item.price}</p>
        `;
        favContainer.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error loading favorites:", err);
      alert("Failed to load favorites.");
    });
});
