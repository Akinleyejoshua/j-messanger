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

setTimeout(()=>{
    auth.onAuthStateChanged(user => {
        if (user) {
            document.location = "home/home.html";
        } else {
            document.location = "signup.html";
        }
    })
}, 2000)
