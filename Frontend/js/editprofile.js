document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".edit-form");
    let userInput = document.querySelector("#exampleInputtext1")
    let mail = document.querySelector("#exampleInputEmail1");
    let edit = document.querySelector(".edit");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let count = document.querySelector(".cart-count");
  count.innerHTML = cartItems.length;
  let cursor = document.querySelector(".cursor");
  cursor.addEventListener("click",() => {
    window.location = "addtocart.html"
  })
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if(userInput.value !== "" && mail.value !== "" && mail.value.match(/^\w+@\w+\.\w+$/)) {
        localStorage.setItem("username", userInput.value);
        localStorage.setItem("email", mail.value);
        setTimeout(() => {
          window.location = "profile.html";
        }, 500);
    }else {
        Swal.fire("Please fill out all fields!");
    }
})
});