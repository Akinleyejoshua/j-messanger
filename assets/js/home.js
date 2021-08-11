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

// backend operations
var username, userID, lastMessage;

var thread = document.querySelector(".chatroom main");


const loadData = () => {
  db.ref("users/" + userID).once("value").then(snapshot => {
    username = snapshot.val().username;
  }).then(() => {
    $(".username").html(username);
  })



  db.ref("public_group/").on("child_added", snapshot => {
    var i = 0;
    snapshot.forEach(value => {
      senderID.push(value.val().sender)

      if (senderID[i] !== username) {
        userMessages.push(value.val().text);
        $(".thread").append(`
          <div class="msg-recieved">
            <h4>${value.val().sender}</h4>
            <p class="msg">${value.val().text}</p>
          </div>`)

      } else {
        senderMessages.push(value.val().text)
        $(".thread").append(`
        <div class="msg-sent">
          <p class="msg">${value.val().text}</p>
        </div>`)
      }
      i++;
    })
  })

  db.ref("public_group/messages").limitToLast(1).on("child_added", snapshot => {
    snapshot.forEach(value => {
      lastMessage = value.val();
    });
    $(".last-msg").html(lastMessage);
    if (snapshot.val().sender !== username) {
      userMessages.push(snapshot.val().text);
      $(".thread").append(`
        <div class="msg-recieved">
          <h4>${snapshot.val().sender}</h4>
          <p class="msg">${snapshot.val().text}</p>
        </div>`)

    } else {
      senderMessages.push(value.val().text)
      $(".thread").append(`
      <div class="msg-sent">
        <p class="msg">${snapshot.val().text}</p>
      </div>`)
    }
  })
  thread.scrollTo(0, thread.scrollHeight)
}

var senderMessages = [],
  userMessages = [],
  senderID = [];

auth.onAuthStateChanged(user => {
  if (user) {
    userID = user.uid;
    loadData();
  } else {

    document.location = "../signin.html";

  }
})

$(".user-pic").on("click", () => {
  $(".side-bar").css({
    transform: "translateX(0rem)"
  })
})

$(".fa-arrow-left").on("click", () => {
  $(".side-bar").css({
    transform: "translateX(-100rem)"
  })
  $(".chatroom").css("transform", "translate(100rem)")
})

// open chat and meet people tab
function openTab(event, tab, title) {
  $(`.tab-page`).css("display", "none");
  $("#section").html(title)
  $(`#${tab}`).css("display", "block");
}

const openChatRoom = () => {
  thread.scrollTo(0, thread.scrollHeight)
  $(".chatroom").css("transform", "translateX(0)");
}

var main = document.querySelectorAll("main");

for (i = 0; main.length > i; i++) {
  main[i].onscroll = () => {
    $("header").addClass("onscroll")
    $("footer").addClass("onscroll")
  }
}

var chatMain = document.querySelector(".chatroom main");

$(".send-msg").on("click", () => {
  db.ref("public_group/messages").push({
    text: $("#msg-value").val(),
    sender: username,
  }).then(() => {
  thread.scrollTo(0, thread.scrollHeight)
    $(".thread").append(`
    <div class="msg-sent">
      <p class="msg">${$("#msg-value").val()}</p>
    </div>
    `)
  })

})

const darkmode = () => {
  $("*").toggleClass("darkmode")
}