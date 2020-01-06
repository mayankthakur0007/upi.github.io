///delete row
load = () => {
    var index,
        table = document.getElementById('table');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[3].onclick = function () {

            index = this.parentElement.rowIndex;


            var name = table.rows[index].cells[0].innerText;
            console.log(name);

            deleteRow(name);


            // location.reload();



        };



        table.rows[i].cells[4].onclick = function () {

            index = this.parentElement.rowIndex;


            var name = table.rows[index].cells[0].innerText;
            var acc = table.rows[index].cells[1].innerText;
            var IFSC = table.rows[index].cells[2].innerText;
            document.getElementById('heading').innerText = "Change Beneficiary Details";

            document.getElementById('save').style.display = "block";
            document.getElementById('submit').style.display = "none";
            document.getElementById('name').value = name;
            document.getElementById('accNumber').value = acc;
            document.getElementById('IFSC').value = IFSC;



            // location.reload();



        };





    }

}
///adding beneficiary
add = () => {


    var name = document.getElementById('name').value;
    var accNumber = document.getElementById('accNumber').value;
    var IFSC = document.getElementById('IFSC').value;
    var beneficiary = { "bName": name, "accountNumber": accNumber, "IFSC": IFSC, "addedBy": sessionStorage.getItem("byAccount") };
    beneficiary = JSON.stringify(beneficiary);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/beneficiary", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(beneficiary);
    alert("Beneficiary Added Succesfully");
    document.getElementById("form").resetForm();
    return false;



}
///avoid character
avoidChar = (event) => {
    var k = event ? event.which : window.event.keyCode;
    if (!(k >= 48 && k <= 57)) {
        return false;
    }
}


///adding data to table
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var users = this.responseText;
        users = JSON.parse(users);
        for (var i = 0; i < users.length; i++) {
            if (users[i].addedBy == sessionStorage.getItem("byAccount")) {


                var tBody = document.getElementById("tBody");
                var row = document.createElement("tr");





                var td1 = document.createElement("td");
                td1.innerHTML = users[i].bName;
                var td2 = document.createElement("td");
                td2.innerHTML = users[i].accountNumber;
                var td3 = document.createElement("td");
                td3.innerHTML = users[i].IFSC;


                var td4 = document.createElement("td");
                td4.innerText = "Delete";
                var td5 = document.createElement("td");
                td5.innerText = "Edit";
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);

                var editRow = { "name": td1.innerText, "acc": td2.innerText };
                editRow = JSON.stringify(editRow)
                sessionStorage.setItem("row", editRow);

                tBody.appendChild(row);






            }

        }

    }
};
xhttp.open("GET", "http://localhost:3000/beneficiary", false);
xhttp.send();




///delete row
deleteRow = (v) => {

    var name = v;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = this.responseText;
            users = JSON.parse(users);



            for (var i = 0; i < users.length; i++) {

                if (users[i].bName == name) {

                    var xhttp = new XMLHttpRequest();
                    xhttp.open("DELETE", `http://localhost:3000/beneficiary/${users[i].id}`, true);
                    xhttp.send();
                }

            }


        }
    };
    xhttp.open("GET", "http://localhost:3000/beneficiary", false);
    xhttp.send();
    location.reload();


}

edit = (event) => {
    event.preventDefault();
    var data = JSON.parse(sessionStorage.getItem("row"));

    var currentUser = sessionStorage.getItem("byAccount")
    name = document.getElementById('name').value;
    acc = document.getElementById('accNumber').value;
    IFSC = document.getElementById('IFSC').value;

    var beneficiary = { "bName": name, "accountNumber": acc, "IFSC": IFSC, "addedBy": currentUser };

    beneficiary = JSON.stringify(beneficiary);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = this.responseText;
            users = JSON.parse(users);
            for (var i = 0; i < users.length; i++) {
                
                if (users[i].bName == data.name && users[i].accountNumber == data.acc && users[i].addedBy == currentUser) {





                    let xhttp = new XMLHttpRequest();
                    xhttp.open("PUT", `http://localhost:3000/beneficiary/${users[i].id}`, true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(beneficiary);

                }
            }


        }
    };
    xhttp.open("GET", "http://localhost:3000/beneficiary", true);
    xhttp.send();




}
