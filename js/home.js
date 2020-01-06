var index = sessionStorage.getItem("id");
///getting account balance on screen using ajax
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText;
      users = JSON.parse(users);
      
    

    var balance = document.createElement('h2'); 
    balance.innerText = `₹ ${users.balance}`;
    var balance1 = document.getElementById("balance");

    balance1.appendChild(balance);

    var name = document.createElement('h1'); 
    name.innerText = `Welcome, ${users.name}`;
    sessionStorage.setItem("byAccount",users.accountNumber);

    var name1 = document.getElementById("name");

    name1.appendChild(name);
    var number = document.createElement('h2'); 
    number.innerText = `${users.accountNumber}`;
    var number1 = document.getElementById("number");

    number1.appendChild(number);
      
     

    }
  };
  xhttp.open("GET", `http://localhost:3000/users/${index}`, true);
  xhttp.send();



