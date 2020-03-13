
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
  var userMail = document.getElementById("user-mail-reg");
  var userName = document.getElementById("user-name-reg");
  var userPass = document.getElementById("user-pass-reg");
  var userPass2 = document.getElementById("user-pass2-reg");
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      if(user!=null){
        window.location.href = "register-full.html";
      }
    } else {
      
    }
  });
  
  //Reg btn
  function regBtn(){
    var email = userMail.value;
    var pass = userPass.value;
    var auth = firebase.auth();
    //Sign up
    var promise = auth.createUserWithEmailAndPassword(email, pass);

    if(promise!=null){
        promise.catch(e => window.alert(e.message));
      }else{
        
      }
  }
  