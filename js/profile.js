
(function(){
    var firebaseConfig = {
      apiKey: "AIzaSyDeljaNIwuc9E4tLQP-r-2JrM_GuGHHsH0",
      authDomain: "emehandmadesp.firebaseapp.com",
      databaseURL: "https://emehandmadesp.firebaseio.com",
      projectId: "emehandmadesp",
      storageBucket: "emehandmadesp.appspot.com",
      messagingSenderId: "352459709175",
      appId: "1:352459709175:web:858eee122445b6431c11f2",
      measurementId: "G-JPPKEJCCYC"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.database();
    firebase.storage();
    firebase.auth();
  }());
//Get Elements
var userLogin = document.getElementById("user-login");
var userName = document.getElementById("user-name");
var adminPage = document.getElementById("admin-page-href");
var ca;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if(user!=null){
      var dbRef = firebase.database().ref().child("1");
      dbRef.child(user.uid).child("1").on("value",function(name){
        console.log(name);
        userName.innerText = name.val();
      });
      var dbRef = firebase.database().ref().child("1");
      dbRef.child(user.uid).child("5").on("value",function(data){
        ca = data.val();
        console.log(ca);
        if(ca == 1){
          adminPage.style.display = "block";
        }else{
          adminPage.style.display = "none";
        }
      });
      userName.style.display = "block";
      userLogin.style.display = "none";
    }
  } else {
    // User is signed out.
    userName.style.display = "none";
    userLogin.style.display = "block";
  }
});
  function signOut(){
      firebase.auth().signOut();
      window.location.href = "index.html";
  }