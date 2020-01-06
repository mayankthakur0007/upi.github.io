///transaction history table creation
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var users = this.responseText;
        users = JSON.parse(users);

        var currentUser = sessionStorage.getItem("accountNumber")

        var type;
        var fromAccount;
        var toAccount;
        var name;
        console.log(name)

        for (var i = 0; i < users.length; i++) {
            var amount = users[i].amount;
            if (users[i].from == currentUser || users[i].to == currentUser) {

                if (currentUser == users[i].from) {
                    type = "debit";

                } else {
                    type = "credit"
                }
                

                if (currentUser == users[i].from) {
                    toAccount = users[i].to;
                    name = getName(toAccount);
                    
                    fromAccount = ""
                }
                if (currentUser == users[i].to) {
                    toAccount = "";
                   
                    fromAccount = users[i].from;
                    name = getName(fromAccount);
                }
             



                var tBody = document.getElementById("tBody");
                var row = document.createElement("tr");





                var td1 = document.createElement("td");
                td1.innerHTML = fromAccount
                var td2 = document.createElement("td");
                td2.innerHTML = toAccount
                var td3 = document.createElement("td");
                td3.innerHTML = name;
                var td4 = document.createElement("td");
                td4.innerHTML = type;
                var td5 = document.createElement("td");
                td5.innerHTML = amount;


                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);


                tBody.appendChild(row);





            }


        }

    }
};
xhttp.open("GET", "http://localhost:3000/transactions", false);
xhttp.send();


///getting name in table
function getName(v) {

    var acc = v;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = this.responseText;
            users = JSON.parse(users);
            
            for (var i = 0; i < users.length; i++) {
                if (acc == users[i].accountNumber) {
                   acc = users[i].name;
                   

                }

            }
        }
    };
    xhttp.open("GET", "http://localhost:3000/users", false);
    xhttp.send();


return acc;


}