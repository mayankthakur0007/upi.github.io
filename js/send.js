
/// automatic dropdown of added beneficiaries
let dropdown = document.getElementById('locality-dropdown');
let defaultOption = document.createElement('option');
defaultOption.text = 'Choose beneficiary';
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;
const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/beneficiary', true);
request.onload = function () {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    var currentAccount = sessionStorage.getItem("byAccount");

    for (let i = 0; i < data.length; i++) {
      if (currentAccount == data[i].addedBy) {
        option = document.createElement('option');
        option.text = data[i].bName;
        option.value = data[i].bName;
        dropdown.add(option);
      }
    }
  }
}

//automatically fetching data
request.send();

function _handleOnChange() {
  let dropdown = document.getElementById('locality-dropdown');
  let selectedUser = document.getElementById('locality-dropdown').value;
  console.log(selectedUser);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText;
      users = JSON.parse(users);
      for (var i = 0; i < users.length; i++) {
        if (selectedUser == users[i].bName) {
          document.getElementById("accountNumber").innerText = users[i].accountNumber;
          document.getElementById("IFSC").innerText = users[i].IFSC;
          document.getElementById("name").innerText = users[i].bName;
        }
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/beneficiary", true);
  xhttp.send();
}
///transaction validation
function moneySend() {
  var payAmount = parseInt(document.getElementById("payAmount").value);
  var accountBalance = parseInt(sessionStorage.getItem("accountBalance"));
  console.log(payAmount);
  console.log(accountBalance);
  if (payAmount <= 0) {
    alert("Please Enter valid amount");
    return false;
  }

  if (payAmount > accountBalance) {
    alert("Insufficient Balance");
    return false;
  }


  var beneficiaryAccountNumber = document.getElementById("accountNumber").innerText;
  var currentAccountNumber = sessionStorage.getItem("accountNumber");
  console.log(beneficiaryAccountNumber);
  console.log(currentAccountNumber);
  var userObj = { "from": currentAccountNumber, "to": beneficiaryAccountNumber, "amount": payAmount };
  userObj = JSON.stringify(userObj);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/transactions", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(userObj);
  var c = confirm("Confirm to send money");
        if (c === true) {
  updateAmount(currentAccountNumber, beneficiaryAccountNumber, payAmount);
  alert("Transaction Succesfull");
  
        }


document.getElementById("form2").resetForm();

  return false;

}


///function to update balance
function updateAmount(from, to, amount) {
  var deductFrom = from;
  var addTo = to;
  var amountChange = parseInt(amount);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText;
      users = JSON.parse(users);

      for (var i = 0; i < users.length; i++) {
        if (deductFrom == users[i].accountNumber) {
          let balance1 = parseInt(users[i].balance);
          balance1 = balance1 - amountChange;
          sessionStorage.setItem("accountBalance",balance1);
          let newData1 = { "name": users[i].name, "customerID": users[i].customerID, "IFSC": "OOO123", "balance": balance1, "userID": users[i].userID, "mobile": users[i].mobile, "accountNumber": users[i].accountNumber, "password": users[i].password };
          newData1 = JSON.stringify(newData1);
          let xhttp = new XMLHttpRequest();
          xhttp.open("PUT", `http://localhost:3000/users/${users[i].id}`, false);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(newData1);


        }

        if (addTo == users[i].accountNumber) {
          let balance = parseInt(users[i].balance);
          balance = balance + amountChange;
          let newData = { "name": users[i].name, "customerID": users[i].customerID, "IFSC": "OOO123", "balance": balance, "userID": users[i].userID, "mobile": users[i].mobile, "accountNumber": users[i].accountNumber, "password": users[i].password };
          newData = JSON.stringify(newData);
          let xhttp = new XMLHttpRequest();
          xhttp.open("PUT", `http://localhost:3000/users/${users[i].id}`, false);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(newData);

        }

      }




    }
  };
  xhttp.open("GET", "http://localhost:3000/users", false);
  xhttp.send();















}
