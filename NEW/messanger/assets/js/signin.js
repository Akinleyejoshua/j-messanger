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

var auth = firebase.auth();

$("button#signup").on("click", () => {
  document.location = "signup.html";
})

$(".modal-body").on("click", () => {
  $("#modal").css("display", "none");
})

const showModal = (msg) => {
  $("#modal").css("display", "flex");
  $("#modal .info").html(msg);
}

var email = $("#email");
var password = $("#password");

$("#signin").on("click", () => {
  if (email.val() === "" || password.val() === "") {
    showModal("All Fields Are Required")
  } else {
    auth.signInWithEmailAndPassword(email.val(), password.val()).then(() => {
      document.location = "home/home.html";
    }).catch(error => {
      var errorCode = error.code.replace("auth/", "")
      showModal(errorCode);
    })
  }
})