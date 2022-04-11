const data = window.sessionStorage.getItem("data");
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
            ///////////////////////////////
            //////////////////////////////
            // Insert a cell of edit button
            let newCellOne = newRow.insertCell(-1);
            // Append a button node to the cell
            let editButton = document.createElement("button");
            editButton.innerText = "edit";
            newCellOne.appendChild(editButton);
            ///////////////////////////////
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
