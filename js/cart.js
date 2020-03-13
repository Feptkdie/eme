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
  var cart1 = document.getElementById("shopping-cart-box1");
  var cart2 = document.getElementById("shopping-cart-box");
  var cart3 = document.getElementById("shopping-cart-box3");
  var cart4 = document.getElementById("shopping-cart-box4");
  var userUid;
  var allPrice=0,price=0;
  var totalPrice = document.getElementById("totalPrice");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      userUid = user.uid;
      var checkRef = firebase.database().ref().child("4").child(userUid);
        var checkZero;
        
      if(user!=null){
        var dbRef = firebase.database().ref().child("1");
        dbRef.child(user.uid).child("1").on("value",function(name){
          userName.innerText = name.val();
        });
        checkRef.child("1").on("value",function(zero){
          checkZero = parseInt(zero.val());
          console.log(checkZero);
          if(checkZero == 1){
            userName.style.display = "block";
            userLogin.style.display = "none";
            cart1.style.display = "none";
            cart2.style.display = "none";
            cart3.style.display = "none";
            cart4.style.display = "block";
          }else if(checkZero == 0){
            userName.style.display = "block";
            userLogin.style.display = "none";
            cart1.style.display = "none";
            cart2.style.display = "none";
            cart3.style.display = "block";
            cart4.style.display = "none";
          }else{
            //View ref
            //get elements
            var blogHtml = "";
            //Ref
            var dbRefObject = firebase.database().ref().child("3").child(userUid);
            dbRefObject.orderByValue().on("value", function(snapshot){
                snapshot.forEach(function(data){
                  blogHtml += "<tr>"
                    blogHtml += "<td>";
                      blogHtml += data.key;
                    blogHtml += "</td>";
                    blogHtml += "<td><img style='width:40px;height:40px;border: 3px solid white;' src='";
                      blogHtml += data.child("1").val();
                    blogHtml += "'></td>";
                    blogHtml += "<td>";
                      blogHtml += data.child("2").val();
                    blogHtml += "</td>";
                    blogHtml += "<td>1</td>";
                    blogHtml += "<td>";
                      blogHtml += data.child("4").val();
                    blogHtml += "</td>";
                    blogHtml += "<td><button id='deleteCartItem' onclick='deleteCartItem(";
                      blogHtml += data.key;
                    blogHtml += ")'>Устгах</button></td>";
                  blogHtml += "</tr>"
                });
                $("#cartTable").html(blogHtml);
                blogHtml=[];
            });
            userName.style.display = "block";
            userLogin.style.display = "none";
            cart1.style.display = "block";
            cart2.style.display = "block";
            cart3.style.display = "none";
            cart4.style.display = "none";
          }
        });
        
        
      }
    } else {
      // User is signed out.
      userName.style.display = "none";
      userLogin.style.display = "block";
      cart1.style.display = "none";
      cart2.style.display = "none";
      cart3.style.display = "none";
      cart4.style.display = "none";
    }
  
  });
  

  function deleteCartItem(itemid){
    Swal.fire({
      title: 'Та устгахаа итгэлтэй байна уу?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(252, 111, 111)',
      cancelButtonColor: '#717171',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        var cartDbRef = firebase.database().ref().child("3").child(userUid).child(itemid);
        cartDbRef.remove();
        Swal.fire(
          'Deleted!',
          'Амжилттай устгагдлаа.',
          'success'
        )
      }
    });
  }

  function checkOutBtn(){
    allPrice=0;
    var dbRefObject = firebase.database().ref().child("3").child(userUid);
    dbRefObject.orderByValue().on("value", function(snapshot){
        snapshot.forEach(function(data){
            price = data.child("4").val();
            allPrice = allPrice + parseInt(price);
        });
    });
    totalPrice.innerHTML = allPrice;
  }

  function buyBtn(){
    Swal.fire({
      title: 'Баталгаажих хүртэл хүлээх хэрэгтэй! ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(252, 111, 111)',
      cancelButtonColor: '#717171',
      confirmButtonText: 'Мэдлээ, болсон'
    }).then((result) => {
      if (result.value) { 
        var user = firebase.auth().currentUser;
        var dbRefObject = firebase.database().ref().child("4");
        dbRefObject.child(user.uid).child("1").set("0");
        Swal.fire(
          'Баярлалаа',
          'Амжилттай хүсэлт илгээгдлээ.',
          'success'
        )
      }
    });
  }