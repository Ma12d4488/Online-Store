// login.js

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://localhost:7126/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        // Save token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userEmail", email);

        alert("Login successful");
        window.location.href = "shop.html";

    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials.");
    }
});
