// editprofile.js

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("You must be logged in to edit your profile.");
    window.location.href = "login.html";
    return;
  }

  // Load existing profile data
  fetch(`https://localhost:7126/api/profile/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("username").value = data.username;
      document.getElementById("email").value = data.email;
    })
    .catch(err => {
      console.error("Error loading profile:", err);
      alert("Unable to load profile data.");
    });

  const form = document.getElementById("edit-profile-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    try {
      const response = await fetch(`https://localhost:7126/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username, email })
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Profile updated successfully.");
      window.location.href = "profile.html";

    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile.");
    }
  });
});
