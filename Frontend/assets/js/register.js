// register.js

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch("https://localhost:7126/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        alert("Registration successful. Please login.");
        window.location.href = "login.html";

    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration.");
    }
});
