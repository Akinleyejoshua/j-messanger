var firebaseConfig = {
  apiKey: "AIzaSyBTZRPMLZZPNiRmf4HrBvF9-hjjUooj_dU",
  authDomain: "messanger-ef1de.firebaseapp.com",
  databaseURL: "https://messanger-ef1de.firebaseio.com",
  projectId: "messanger-ef1de",
  storageBucket: "messanger-ef1de.appspot.com",
  messagingSenderId: "441362453190",
  appId: "1:441362453190:web:a40f1c0bc86090b659fdc7",
  measurementId: "G-SNZXECG081"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.database();
var auth = firebase.auth();

$("button#signin").on("click", () => {
  document.location = "signin.html";
})

var username = $("#username");
var email = $("#email");
var password = $("#password");

const showModal = (msg) => {
  $("#modal").css("display", "flex");
  $("#modal .info").html(msg);
}

$("#signup").on("click", () => {
  if (username.val() === "" || email.val() === "" || password.val() === "") {
    showModal("All Fields Are Required")
  } else if (password.val().length < 6) {
    showModal("Password Length should be atleast 6")
  } else {
    auth.createUserWithEmailAndPassword(email.val(), password.val()).then(() => {
      var userID = auth.currentUser.uid;
      db.ref("users/" + userID).set({
        username: username.val(),
        email: email.val(),
        userID: userID,
      }).then(()=>{
        document.location = "home/home.html";
      }).catch(error => {
        showModal(error)
      })
    }).catch(error => {
      showModal(error)
    })
  }
})

$(".modal-body").on("click", () => {
  $("#modal").css("display", "none");
})