function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
}///google translate

///captcha and other validation
function check1() {
  var response = grecaptcha.getResponse();
  if (response == 0) {
    alert("Please enter correct captcha")
    return false;
  }

  var userID = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText;
      users = JSON.parse(users);



      for (var i = 0; i < users.length; i++) {

        if (users[i].userID == userID) {
          if (users[i].password == password) {
            console.log(users[i].id)
            sessionStorage.setItem("id", users[i].id);
            sessionStorage.setItem("accountNumber",users[i].accountNumber)
            sessionStorage.setItem("accountBalance",users[i].balance)

            window.location.replace("home.html");

          } else {
            alert("Wrong Username or Password");
            break;
          }

        }

      }


    }
  };
  xhttp.open("GET", "http://localhost:3000/users", false);
  xhttp.send();

  return false;

}

///validation
function check() {


  var customerID = document.getElementById('id').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var users = this.responseText;
      users = JSON.parse(users);

      for (var i = 0; i < users.length; i++) {
        if (customerID == users[i].userID) {
          var k = 1;
        } 

      } if (k != 1) {
        alert("User doesn't exist");
      }

    }
  };
  xhttp.open("GET", "http://localhost:3000/users", true);
  xhttp.send();

}


