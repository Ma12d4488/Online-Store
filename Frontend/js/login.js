let userName = document.querySelector(".username");
let password = document.querySelector(".pass");
let submit = document.querySelector(".submit");
let localUser = localStorage.getItem("username");
let localPassword = localStorage.getItem("password");
let btn = document.querySelector("#btn");
submit.addEventListener("click", login);
function login(e) {
    e.preventDefault();
    if(userName.value == "" || password.value == "") {
        Swal.fire("Please fill out all fields!");
    }
    else {
        if(localUser.trim() === userName.value.trim() && localPassword === password.value){
            setTimeout(() => {
                window.location = "index.html";
            }, 1500); 
        }else{
            Swal.fire("username or password is wrong!!");
        }
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