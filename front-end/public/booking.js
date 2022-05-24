///////////////////  session user  //////////////////////
const data = window.sessionStorage.getItem("data");
const dataCopy = window.sessionStorage.getItem("dataCopy");
////////////////////show user his pin///////////////////
document.getElementById("pin_user").innerHTML = dataCopy;
if (dataCopy == null) {
  pin_user_card.classList.add("hidden");
}
////////////////////////////////////////////////////////
////////////////////  elements  /////////////////////////
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
      } else {
        error.innerHTML = "";
        cnt.classList.remove("hidden");
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
            //////////////show and hide edit form////////////////
            editButton.addEventListener("click", () => {
              show_singel_appointment();
              window.scrollTo(0, 0);
              edit_form.classList.remove("scale-0");
            });
            cancel_edit_form_btn.addEventListener("click", () => {
              edit_form.classList.add("scale-0");
            });
            //////////////////////////////////////////////////////
            function show_singel_appointment() {
              //////////////////////////////////////////////
              let data_id_appointment = new FormData();
              data_id_appointment.append("id", data[i][0]);
              fetch(
                "http://localhost/hospital/app/api/appointments/single_read_by_id.php",
                {
                  method: "post",
                  body: data_id_appointment,
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  ///////////edit form inputs/////////////////
                  const edit_topic_el = document.getElementById("topic_edit");
                  const date_appointment_edit_el = document.getElementById(
                    "date_appointment_edit"
                  );
                  const start_appointment_edit_el = document.getElementById(
                    "start_appointment_edit"
                  );
                  const end_appointment_edit_el = document.getElementById(
                    "end_appointment_edit"
                  );
                  //////btn edit//////////
                  const edit_appointment_btn = document.getElementById(
                    "edit_appointment_btn"
                  );
                  const edit_error = document.querySelector(".edit_error");
                  ////////////////////////////////////////////
                  document.getElementById("topic_edit").value = data[1];
                  document.getElementById("date_appointment_edit").value =
                    data[2];
                  document.getElementById("start_appointment_edit").value =
                    data[3];
                  document.getElementById("end_appointment_edit").value =
                    data[4];
                  var id_appointment_edit = data[0];
                  edit_appointment_btn.addEventListener("click", () => {
                    ///////////////validation////////////////////
                    if (
                      edit_topic_el.value == null ||
                      edit_topic_el.value == ""
                    ) {
                      edit_topic_el.classList.add("outline-red-500");
                      edit_error.innerHTML = "please fill all inputs";
                    } else {
                      edit_topic_el.classList.remove("outline-red-500");
                      edit_error.innerHTML = "";
                    }
                    //////////////////////////////////////////
                    if (
                      date_appointment_edit_el.value == null ||
                      date_appointment_edit_el.value == ""
                    ) {
                      date_appointment_edit_el.classList.add("outline-red-500");
                      edit_error.innerHTML = "please fill all inputs";
                    } else {
                      date_appointment_edit_el.classList.remove(
                        "outline-red-500"
                      );
                    }
                    //////////////////////////////////////////
                    if (
                      start_appointment_edit_el.value == null ||
                      start_appointment_edit_el.value == ""
                    ) {
                      start_appointment_edit_el.classList.add(
                        "outline-red-500"
                      );
                      edit_error.innerHTML = "please fill all inputs";
                    } else {
                      start_appointment_edit_el.classList.remove(
                        "outline-red-500"
                      );
                    }
                    //////////////////////////////////////////
                    if (
                      end_appointment_edit_el.value == null ||
                      end_appointment_edit_el.value == ""
                    ) {
                      end_appointment_edit_el.classList.add("outline-red-500");
                      edit_error.innerHTML = "please fill all inputs";
                    } else {
                      end_appointment_edit_el.classList.remove(
                        "outline-red-500"
                      );
                    }
                    /////////////////////////////////////////////
                    if (edit_error.innerHTML != "please fill all inputs") {
                      let data_to_update = new FormData();
                      data_to_update.append("id", id_appointment_edit);
                      data_to_update.append("topic", edit_topic_el.value);
                      data_to_update.append(
                        "date_appointment",
                        date_appointment_edit_el.value
                      );
                      data_to_update.append(
                        "start_appointment",
                        start_appointment_edit_el.value
                      );
                      data_to_update.append(
                        "end_appointment",
                        end_appointment_edit_el.value
                      );

                      fetch(
                        "http://localhost/hospital/app/api/appointments/update.php",
                        {
                          method: "post",
                          body: data_to_update,
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          if (data == "appointment exist") {
                            edit_error.innerHTML = "appointment already exist";
                            date_appointment_edit_el.classList.add(
                              "outline-red-500"
                            );
                            start_appointment_edit_el.classList.add(
                              "outline-red-500"
                            );
                            end_appointment_edit_el.classList.add(
                              "outline-red-500"
                            );
                          } else {
                            window.location.reload();
                          }
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                });
            }
            //////////////////////////////////////////////////////
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
                window.location.reload();
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
  window.sessionStorage.removeItem("dataCopy");
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
///////////////////////////add appointment function////////////////////////
function AddAppointment() {
  const topic_el = document.getElementById("topic");
  const date_appointment_el = document.getElementById("date_appointment");
  const time_appointment_el = document.getElementById("time_appointment");

  var error = document.querySelector(".error");

  if (topic_el.value == null || topic_el.value == "") {
    topic_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    topic_el.classList.remove("outline-red-500");
    error.innerHTML = "";
  }
  //////////////////////////////////////////
  if (date_appointment_el.value == null || date_appointment_el.value == "") {
    date_appointment_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    date_appointment_el.classList.remove("outline-red-500");
  }
  //////////////////////////////////////////
  if (time_appointment_el.value == null || time_appointment_el.value == "") {
    time_appointment_el.classList.add("outline-red-500");
    error.innerHTML = "please fill all inputs";
  } else {
    time_appointment_el.classList.remove("outline-red-500");
  }
  console.log(topic.value);
  console.log(date_appointment.value);
  console.log(time_appointment.value);
  if (
    error.innerHTML != "please fill all inputs" &&
    error.innerHTML != "please enter a valid date"
  ) {
    let data = new FormData();
    data.append("topic", topic.value);
    data.append("date_appointment", date_appointment.value);
    data.append("time_appointment", time_appointment.value);
    data.append("key_user", sessionStorage.getItem("data"));

    fetch("http://localhost/hospital/app/api/appointments/create.php", {
      method: "post",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data == "appointment exist") {
        //   error.innerHTML = "appointment already exist";
        //   date_appointment_el.classList.add("outline-red-500");
        //   start_appointment_el.classList.add("outline-red-500");
        //   end_appointment_el.classList.add("outline-red-500");
        // } else {
        //   window.location.reload();
        // }
        console.log(data);
      })
      .catch((err) => console.error(err));
  }
}
///////////////////////////call AddAppointment function/////////////////////
submit_appointment.addEventListener("click", () => {
  AddAppointment();
});
/////////////////////////////////////////////////////////////////////////////
