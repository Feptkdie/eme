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
var productId = document.getElementById("productid");
var currentUserName;
var currentUserPhone;
var currentUserAddress;
var postId=0;
var userUid;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    userUid = user.uid;
    if(user!=null){
      var dbRef = firebase.database().ref().child("1");
      dbRef.child(user.uid).child("1").on("value",function(name){
        currentUserName = name.val();
        userName.innerText = name.val();
      });
      dbRef.child(user.uid).child("3").on("value",function(name){
        currentUserPhone = name.val();
      });
      dbRef.child(user.uid).child("4").on("value",function(name){
        currentUserAddress = name.val();
      });
      var dbRefCart = firebase.database().ref().child("3").child(userUid);
      dbRefCart.orderByValue().on("value", function(snapshot){
          snapshot.forEach(function(data){
              postId = data.key;
          });
        postId++;
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
//View ref
//get elements
var blogHtml = "";

//Ref
var dbRefObject = firebase.database().ref().child("2");
dbRefObject.orderByValue().on("value", function(snapshot){
    snapshot.forEach(function(data){
        blogHtml += "<div id='blog-product' onClick='goTo()'>";
            blogHtml += "<div class='blog-box'>";
                blogHtml += "<div class='blog-img'>";
                    blogHtml += "<img id='product-img' class='blog-img' src='";
                    blogHtml += data.child("6").val();
                blogHtml += "'/></div>";
                blogHtml += "<div class='blog-content'>";
                    blogHtml += "<div class='title-blog'>";
                        blogHtml += "<h3 id='product-title'>";
                            blogHtml += data.child("1").val();
                        blogHtml += "</h3>";
                        blogHtml += "<p id='product-desc'>";
                            blogHtml += data.child("2").val();
                        blogHtml += "</p>";
                        blogHtml += "<button onclick='addCart(";
                        blogHtml += data.key;
                        blogHtml += ")' class='button'>";
                            blogHtml += "Сагсанд хийх";
                        blogHtml += "</button><br>";
                        blogHtml += "<p>";
                            blogHtml += "Тоо ширхэг :";
                            blogHtml += "<p id='product-amount'>";
                                blogHtml += data.child("5").val();
                            blogHtml += "</p>";
                        blogHtml += "</p><br>";
                        blogHtml += "<p>";
                            blogHtml += "Огноо :";
                            blogHtml += "<p id='product-date'>";
                                blogHtml += data.child("3").val();
                            blogHtml += "</p>";
                        blogHtml += "</p><br>";
                        blogHtml += "<p>";
                            blogHtml += "Үнэ :";
                            blogHtml += "<p id='product-price'>";
                                blogHtml += data.child("4").val();
                            blogHtml += "₮</p>";
                        blogHtml += "</p><br>";
                    blogHtml += "</div>";
                blogHtml += "</div>";
            blogHtml += "</div>";
        blogHtml += "</div>";
    });
    $("#blogs").html(blogHtml);
    blogHtml=[];
});

function goTo(){
  Swal.fire({
    icon: 'error',
    title: 'Та эхлээд нэвтрэх хэрэгтэй!',
    text: 'Хэрэв та бүртгэлгүй бол бүртгүүлнэ үү!',
    footer: '<a href="register.html">Бүртгүүлэх бол энд дарна уу.</a>'
  })
}

function addCart(productid){
  var productTitle;
  var productAmount;
  var productPrice;
  var productImage;
  if(userUid == null){
    Swal.fire({
      icon: 'error',
      title: 'Та эхлээд нэвтрэх хэрэгтэй!',
      text: 'Хэрэв та бүртгэлгүй бол бүртгүүлнэ үү!',
      footer: '<a href="register.html">Бүртгүүлэх бол энд дарна уу.</a>'
    })
  }else{
    var dbProductRef = firebase.database().ref().child("2");
    dbProductRef.child(productid).child("1").on("value",function(title){
      productTitle = title.val();
    });
    dbProductRef.child(productid).child("5").on("value",function(amount){
      productAmount = amount.val();
    });
    dbProductRef.child(productid).child("4").on("value",function(price){
      productPrice = price.val();
    });
    dbProductRef.child(productid).child("6").on("value",function(name){
      productImage = name.val();
    });
    
  }
  
  var uphone = currentUserPhone;
  var uaddress = currentUserAddress;
  var uname = currentUserName;
  var ptitle = productTitle;
  var pamount = productAmount;
  var pprice = productPrice;
  var pimg = productImage;
  var dbRef = firebase.database().ref().child("3");
    var usersData = {
        1: pimg,
        2: ptitle,
        3: pamount,
        4: pprice,
        5: uname,
        6: uphone,
        7: uaddress,
        8: userUid
    };
    dbRef.child(userUid).child(postId).set(usersData);
    Swal.fire(
      'Good job!',
      'Таны сагсанд амжилттай нэмэгдлээ!',
      'success'
    )
}

