let userName = document.querySelector(".username");
let email = document.querySelector(".mail");
let password = document.querySelector(".pass");
let submit = document.querySelector(".submit");
submit.addEventListener("click" , signUp);
function signUp(e) {
    e.preventDefault();
    if(userName.value == "" || email.value == "" || !email.value.match(/^\w+@\w+\.\w+$/) || password.value == ""){
        Swal.fire("Please fill out all fields!");
    }else{
        localStorage.setItem("username", userName.value.trim());
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        setTimeout(() => {
            window.location = "Login.html";
        }, 1500);
    }
}
btn.addEventListener("click",function(e){
    e.preventDefault();
    if(btn.getAttribute("data-status") === "hidden"){
        password.setAttribute("type", "text");
        btn.setAttribute("data-status", "visible");
        btn.innerHTML =` <i class="fa-solid fa-eye-slash"></i>`;
    }else {
        btn.setAttribute("data-status", "hidden");
        password.setAttribute("type", "password");
        btn.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    }
})