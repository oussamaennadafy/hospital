///////////////////  session user  //////////////////////
const data = window.sessionStorage.getItem("data");
////////////////////  elements  ///////////////////////////
const log_out = document.querySelector("#log_out");
const error = document.querySelector("#error");
const table = document.querySelector(".table");
const cnt = document.querySelector(".cnt");

function readAppointments(key_special) {
  let data = new FormData();
  data.append("key_user", key_special);

  fetch("http://localhost/hospital/app/api/appointments/single_read.php", {
    method: "post",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == "not found") {
        error.innerHTML = "you don't have appointments";
        cnt.style.display = "none";
      } else {
        function add_Data_To_Table() {
          /////////////////remove last item for each array data////////////////////
          for (let i = 0; i < data.length; i++) {
            data[i].pop();
            // console.log(data[0][0]);
          }
          // Get a reference to the table
          let tableRef = document.getElementById("table");

          for (let i = 0; i < data.length; i++) {
            // Insert a row at the end of the table
            var newRow = tableRef.insertRow(-1);

            for (let j = 0; j < data[i].length; j++) {
              // Insert a cell in the row at index -1
              let newCell = newRow.insertCell(-1);
              // Append a text node to the cell
              let newText = document.createTextNode(data[i][j]);
              newCell.appendChild(newText);
            }
            //////////////////////////////
            // Insert a cell of edit button
            let newCellOne = newRow.insertCell(-1);
            // Append a button node to the cell
            let editButton = document.createElement("button");
            editButton.innerText = "edit";
            newCellOne.appendChild(editButton);
            //////////////////////////////
            // Create a href attribute:
            const att = document.createAttribute("class");

            // Set the value of the href attribute:
            att.value =
              "bg-yellow-500 text-base py-3 px-8 mx-auto block cursor-pointer rounded hover:bg-yellow-600 transition-all";

            // Add the href attribute to an element:
            editButton.setAttributeNode(att);
            //////////////////////////////
            // Insert a cell of edit button
            let newCellTwo = newRow.insertCell(-1);
            // Append a button node to the cell
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "delete";
            newCellTwo.appendChild(deleteButton);
            ///////////////////////////////
            deleteButton.addEventListener("click", () => {
              id = data[i][0];
              let dataToDelete = new FormData();
              dataToDelete.append("id", id);

              fetch(
                "http://localhost/hospital/app/api/appointments/delete.php",
                {
                  method: "post",
                  body: dataToDelete,
                }
              ).then((response) => {
                window.location.replace(
                  "http://localhost/hospital/front-end/public/booking.html"
                );
              });
            });
            ///////////////////////////////
            // Create a href attribute:
            const attTwo = document.createAttribute("class");

            // Set the value of the href attribute:
            attTwo.value =
              "bg-red-600 text-base py-3 px-8 mx-auto block cursor-pointer rounded hover:bg-red-700 transition-all";

            // Add the href attribute to an element:
            deleteButton.setAttributeNode(attTwo);
            ///////////////////////////////
          }
        }
        add_Data_To_Table();
      }
    })
    .catch((err) => console.error(err));
}

readAppointments(data);
/////////////////////log out //////////////////////////////
log_out.addEventListener("click", () => {
  window.sessionStorage.removeItem("data");
  window.location.replace("http://localhost/hospital/front-end/public");
});
///////////////////////////////////////////////////////////

///////////////////////display and hide add form/////////////////////////////
const add_form = document.querySelector("#add_form");
const add_form_btn = document.querySelector("#add_form_btn");
const cancel_form_btn = document.querySelector("#cancel_form_btn");

add_form_btn.addEventListener("click", () => {
  window.scrollTo(0, 0);
  add_form.classList.remove("scale-0");
});
cancel_form_btn.addEventListener("click", () => {
  add_form.classList.add("scale-0");
});
///////////////////////////add appointment function/////////////////////
function AddAppointment() {
  var topic_el = document.getElementById("topic");
  var date_appointment_el = document.getElementById("date_appointment");
  var start_appointment_el = document.getElementById("start_appointment");
  var end_appointment_el = document.getElementById("end_appointment");

  var topic = topic_el.value;
  var date_appointment = date_appointment_el.value;
  var start_appointment = start_appointment_el.value;
  var end_appointment = end_appointment_el.value;

  var error = document.querySelector(".error");

  if (topic == null || topic == "") {
    topic_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    topic_el.classList.remove("outline-red-500");
    error.innerHTML = "";
  }
  //////////////////////////////////////////
  if (date_appointment == null || date_appointment == "") {
    date_appointment_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    date_appointment_el.classList.remove("outline-red-500");
  }
  //////////////////////////////////////////
  if (start_appointment == null || start_appointment == "") {
    start_appointment_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    start_appointment_el.classList.remove("outline-red-500");
  }
  //////////////////////////////////////////
  if (end_appointment == null || end_appointment == "") {
    end_appointment_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    end_appointment_el.classList.remove("outline-red-500");
  }

  if (error.innerHTML != "please fill all inputs") {
    let data = new FormData();
    data.append("topic", topic);
    data.append("date_appointment", date_appointment);
    data.append("start_appointment", start_appointment);
    data.append("end_appointment", end_appointment);
    data.append("key_user", sessionStorage.getItem("data"));

    fetch("http://localhost/hospital/app/api/appointments/create.php", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == true) {
          window.location.replace(
            "http://localhost/hospital/front-end/public/booking.html"
          );
        }
      })
      .catch((err) => console.log(err));
  }
}
///////////////////////////call AddAppointment function/////////////////////
submit_appointment.addEventListener("click", () => {
  AddAppointment();
});
/////////////////////////////////////////////////////////
