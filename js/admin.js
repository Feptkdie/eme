
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
var itemCartId = document.getElementById("uCartId");
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
          var i=1;
          //View ref
            //get elements
            var blogHtml = "";
            //Ref
            var dbRefObject = firebase.database().ref().child("3");
            dbRefObject.orderByValue().on("value", function(snapshot){
                snapshot.forEach(function(data){
                  blogHtml += "<tr>"
                  blogHtml += "<td>";
                      blogHtml += i;
                    blogHtml += "</td>";
                    blogHtml += "<td>";
                      blogHtml += data.key;
                    blogHtml += "</td>";
                  blogHtml += "</tr>"
                  i++;
                });
                $("#carrierTable").html(blogHtml);
                blogHtml=[];
                i=0;
            });
            //View ref
            //get elements
            var blogHtml2 = "";
            //Ref
            var dbRefObject = firebase.database().ref().child("2");
            dbRefObject.orderByValue().on("value", function(snapshot){
                snapshot.forEach(function(data){
                  blogHtml2 += "<tr>"
                    blogHtml2 += "<td>";
                      blogHtml2 += data.key;
                    blogHtml2 += "</td>";
                    blogHtml2 += "<td><img style='width:40px;height:40px;border: 3px solid white;' src='";
                      blogHtml2 += data.child("6").val();
                    blogHtml2 += "'></td>";
                    blogHtml2 += "<td>";
                      blogHtml2 += data.child("1").val();
                    blogHtml2 += "</td>";
                    blogHtml2 += "<td>1</td>";
                    blogHtml2 += "<td>";
                      blogHtml2 += data.child("4").val();
                    blogHtml2 += "</td>";
                    blogHtml2 += "<td><button id='deleteCartItem' onclick='deleteCartItem(";
                      blogHtml2 += data.key;
                    blogHtml2 += ")'>Устгах</button></td>";
                  blogHtml2 += "</tr>"
                });
                $("#cartTable").html(blogHtml2);
                blogHtml2=[];
            });
        }else{
          window.location.href = "index.html";
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

  function deleteCartItem(){
            var itemId = itemCartId.value;
            console.log(itemId);
            //View ref
            //get elements
            var blogHtml = "";
            //Ref
            var dbRefObject = firebase.database().ref().child("3").child(itemId);
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
                  blogHtml += "</tr>"
                });
                $("#userInformation").html(blogHtml);
                blogHtml=[];
            });
  }

  function doneCartItem(){
    Swal.fire({
      title: 'Баталгаажих хүртэл хүлээх хэрэгтэй! ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(252, 111, 111)',
      cancelButtonColor: '#717171',
      confirmButtonText: 'Мэдлээ, болсон'
    }).then((result) => {
      if (result.value) { 
        var itemId = itemCartId.value;
        var dbRefObject = firebase.database().ref().child("4");
        dbRefObject.child(itemId).child("1").set("1");
        
        //View ref
            //get elements
            var blogHtml = "";
            //Ref
            var dbRefObject = firebase.database().ref().child("3").child(itemId);
            dbRefObject.orderByValue().on("value", function(snapshot){
                snapshot.forEach(function(data){
                  blogHtml += "<tr>"
                    blogHtml += "<td>";
                      blogHtml += data.key;
                    blogHtml += "</td>";
                    blogHtml += "<td>";
                      blogHtml += data.child("5").val();
                    blogHtml += "</td>";
                    blogHtml += "<td>";
                      blogHtml += data.child("7").val();
                    blogHtml += "</td>";
                    blogHtml += "<td>";
                      blogHtml += data.child("6").val();
                    blogHtml += "</td>";
                  blogHtml += "</tr>"
                });
                $("#userInformation2").html(blogHtml);
                blogHtml=[];
            });
        Swal.fire(
          'Баярлалаа',
          'Амжилттай хүсэлт илгээгдлээ.',
          'success'
        )
      }
    });
  }

  function clearCartItem(){
    var itemId = itemCartId.value;
    Swal.fire({
      title: 'Та устгахаа итгэлтэй байна уу?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(252, 111, 111)',
      cancelButtonColor: '#717171',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        var cartDbRef = firebase.database().ref().child("3").child(itemId);
        cartDbRef.remove();
        var cartDelete = firebase.database().ref().child("4").child(itemId);
        cartDelete.remove();
        Swal.fire(
          'Deleted!',
          'Амжилттай устгагдлаа.',
          'success'
        )
      }
    });
  }

  function signOut(){
      firebase.auth().signOut();
      window.location.href = "index.html";
  }