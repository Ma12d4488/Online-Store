document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let count = document.querySelector(".cart-count");
  let form = document.querySelector(".create-form");
  let imageItem = document.querySelector("#image");
  let title = document.querySelector("#name");
  let type = document.querySelector("#type");
  let salary = document.querySelector("#salary");
  let selectedProduct = document.querySelector(".form-select");
  let selectedProductValue;
  let create = document.querySelector(".create");
  count.innerHTML = cartItems.length;

  selectedProduct.addEventListener("change", function (e) {
    selectedProductValue = e.target.value;
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!title.value || !type.value || !salary.value || !selectedProductValue) {
      Swal.fire("Please fill all fields!");
      return;
    }

    let file = imageItem.files[0];
    if (!file) {
      Swal.fire("Please upload an image!");
      return;
    }

    let allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.indexOf(file.type) === -1) {
      Swal.fire("Type Not Supported");
      return;
    }

    let imageUrl = await getImageBase64(file);

    let obj = {
      image: imageUrl,
      title: title.value,
      category: type.value,
      price: salary.value,
      selectedProduct: selectedProductValue,
    };

    localStorage.setItem("newproduct", JSON.stringify(obj));
    console.log("Product Saved:", obj);
    Swal.fire("Product Saved Successfully!").then(() => {
      window.location = "index.html";
    });
   
  });

  function getImageBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject("Error converting image!");
      };
    });
  }
});
