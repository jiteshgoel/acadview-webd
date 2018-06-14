function borderCollapse() {
    var table = document.querySelector("table");
    
    table.style.borderCollapse = "collapse";
}
  
  function insertRow() {
    var table = document.querySelector("#myTable");
    // read values from input fields
    var firstName = document.querySelector("#first_name");
    var lastName = document.querySelector("#last_name");
    var age = document.querySelector("#age");

    // without parameters, insert at the end,
    // otherwise parameter = index where the row will be inserted
    var row = table.insertRow();
    
    var cell1 = row.insertCell();
    cell1.innerHTML = firstName.value;
    var cell2 = row.insertCell();
    cell2.innerHTML = lastName.value;
    var cell3 = row.insertCell();
    cell3.innerHTML = age.value;

    // reset input fields values to blank
    firstName.value = "";
    lastName.value = "";
    age.value = "";
  }
  
  function deleteFirstRow() {
    var table = document.querySelector("#myTable");
    table.deleteRow(1); // 0 is the header
  }