function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
}

function validateForm() {
  var b = Math.random()

  b = b.toString(36)
  b = b.slice(-8);

 var password = b;
 
 console.log(password);
 sessionStorage.setItem("password",password);
var userName = document.getElementById("uName").value;
  
  console.log(userName);
  var customerID = document.getElementById('id').value;
  var userID = `${document.getElementById("uName").value}${document.getElementById('id').value}`
 sessionStorage.setItem("name" , userID);
  var mobile = document.getElementById('mobile').value;
  var accountNumber = document.getElementById('accountNumber').value;
  var user = { "name": userName, "customerID": customerID, "IFSC":"OOO123" , "balance":"1000" ,"userID":userID , "mobile": mobile, "accountNumber": accountNumber , "password":password};
  var userObj = JSON.stringify(user);
  if (userName == '' || customerID == '' || mobile == '' || accountNumber == '') {
    alert("Enter your Information");
    return false;
  }
 
 
 
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/users", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(userObj);
  window.open("password.html", 'password', 'width=1000px,height=1000px,left=5,top=3');
  window.location.replace("login.html");
  return false;
  
 
}

function check(){
  
 
  var customerID = document.getElementById('id').value;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText; 
      users = JSON.parse(users);
   
  
      for(var i=0;i<users.length;i++){
        if(customerID == users[i].customerID){
         alert("Online Banking account exist for this user");
        }
      }
      
    }
  };
  xhttp.open("GET", "http://localhost:3000/users", true);
  xhttp.send();
  
}

function AvoidSpace(event) {
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) return false;
}

function avoidChar(event) {
  var k = event ? event.which : window.event.keyCode;
  if (!(k>=48 && k<=57) ) {
    return false;
  }
}
