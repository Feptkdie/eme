
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
  var uaddress = document.getElementById("user-address-reg");
  var uname = document.getElementById("user-username-reg");
  var uphone = document.getElementById("user-phone-reg");
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(user!=null){
        
      }
    } else {
        console.log("user id orku bainaa");
    }
  });

  
  
  //Reg Full btn
  function regFullBtn(){
    var user = firebase.auth().currentUser;
    var userName = uname.value;
    var userAddress = uaddress.value;
    var userPhone = uphone.value
    var userUid = user.uid;
    var userMail = user.email;
    //Sign up2
    var dbRef = firebase.database().ref().child("1");
    var usersData = {
        1: userName,
        2: userMail,
        3: userAddress,
        4: userPhone,
        5: 0
    };
    dbRef.child(userUid).set(usersData);
    window.location.href = "index.html";
      
  }
  