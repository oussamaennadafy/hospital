("use strict");

let signUp = document.querySelector(".signUp");
let Authentication = document.querySelector(".Authentication");
let signUp_btn = document.querySelector(".signUp_btn");
let logIn_btn = document.querySelector(".logIn_btn");

signUp_btn.addEventListener("click", function () {
  Authentication.classList.remove("left-1/2");
  Authentication.classList.add("-left-1/2");
  signUp.classList.remove("translate-x-full");
  signUp.classList.add("-translate-x-1/2");
});

logIn_btn.addEventListener("click", function () {
  Authentication.classList.add("left-1/2");
  Authentication.classList.remove("-left-1/2");
  signUp.classList.add("translate-x-full");
  signUp.classList.remove("-translate-x-1/2");
});

/////////////////////////////////////////////////////

let sign_up_submit = document.querySelector("#sign_up_submit");
let login_submit = document.querySelector("#login_submit");

function signUpUser() {
  var first_name_el = document.getElementById("first_name");
  var last_name_el = document.getElementById("last_name");
  var age_el = document.getElementById("age");
  var birth_el = document.getElementById("birth");

  var first_name = first_name_el.value;
  var last_name = last_name_el.value;
  var age = age_el.value;
  var birth = birth_el.value;

  var error = document.querySelector(".error");

  if (first_name == null || first_name == "") {
    first_name_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    first_name_el.classList.remove("outline-red-500");
    error.innerHTML = "";
  }
  //////////////////////////////////////////
  if (last_name == null || last_name == "") {
    last_name_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    last_name_el.classList.remove("outline-red-500");
  }
  //////////////////////////////////////////
  if (age == null || age == "") {
    age_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    age_el.classList.remove("outline-red-500");
  }
  //////////////////////////////////////////
  if (birth == null || birth == "") {
    birth_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    birth_el.classList.remove("outline-red-500");
  }

  let data = new FormData();
  data.append("first_name", first_name);
  data.append("last_name", last_name);
  data.append("age", age);
  data.append("birth", birth);

  fetch("http://localhost/hospital/app/api/users/create.php", {
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data != "error") {
        // console.log(data);
        newData = Object.values(data);
        // console.log(newData[0]);
        window.sessionStorage.setItem("data", newData[0]);
        window.location.replace(
          "http://localhost/hospital/front-end/public/booking.html"
        );
      }
    })
    .catch((err) => console.error(err));
}
//////////////////////////////////////////////////
function loginUser() {
  var key_special_el = document.getElementById("key_special");
  var key_special = key_special_el.value;

  var error = document.querySelector("#error");

  let data = new FormData();
  data.append("key_special", key_special);

  fetch("http://localhost/hospital/app/api/users/login.php", {
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == "empty") {
        key_special_el.classList.add("outline-red-500");
        error.innerHTML = "please entre pin";
      } else if (data == "not found") {
        key_special_el.classList.add("outline-red-500");
        error.innerHTML = "pin in invalid";
      } else {
        sessionStorage.setItem("data", data["key_special"]);
        window.location.replace(
          "http://localhost/hospital/front-end/public/booking.html"
        );
      }
    })
    .catch((err) => console.error(err));
}
//////////////////////////////////////////////////////////
login_submit.addEventListener("click", () => {
  loginUser();
});
sign_up_submit.addEventListener("click", () => {
  signUpUser();
});
