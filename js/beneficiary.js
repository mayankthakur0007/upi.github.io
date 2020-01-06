///delete row
function load() {
    var index,
    table = document.getElementById('table');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[3].onclick = function () {
            var confirm = confirm("do you want to delete this row");
            if (confirm === true) {
                // index = this.parentElement.rowIndex;


                var name = table.rows[index].cells[0].innerText;
                console.log(name);
                //    sessionStorage.setItem("selectedName",name);
                deleteRow(name);
            }


        };

       


    }

}
///adding beneficiary
function add() {


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
function avoidChar(event) {
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
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                


                tBody.appendChild(row);






            }

        }

    }
};
xhttp.open("GET", "http://localhost:3000/beneficiary", false);
xhttp.send();




///delete row
function deleteRow(v) {

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
    location.reload;


}