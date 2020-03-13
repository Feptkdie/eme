
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
  var userMail = document.getElementById("user-mail");
  var userPass = document.getElementById("user-pass");
  var btnLogin = document.getElementById("lgnBtn");
  var userLogin = document.getElementById("user-login");
  var userName = document.getElementById("user-name");
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if(user!=null){
        window.location.href = "index.html";
      }
    } else {
      
    }
  });
  
  //Login btn
  function loginBtn(){
    var email = userMail.value;
    var pass = userPass.value;
    var auth = firebase.auth();
    //Sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    if(promise!=null){
      promise.catch(e => window.alert(e.message));
    }else{
      window.location.href = "index.html";
    }
  }