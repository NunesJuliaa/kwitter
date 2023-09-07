const firebaseConfig = {
  apiKey: "AIzaSyBh2w9m5epgz8gRo0QCcQnYuodYme-lQP0",
  authDomain: "kwitter-f14d7.firebaseapp.com",
  databaseURL: "https://kwitter-f14d7-default-rtdb.firebaseio.com",
  projectId: "kwitter-f14d7",
  storageBucket: "kwitter-f14d7.appspot.com",
  messagingSenderId: "75355501211",
  appId: "1:75355501211:web:e16e3a3be095e882e04c3e",
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
  "Bem-vindo(a), " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala",
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Nome da sala: " + Room_names);
        row =
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)' >#" +
          Room_names +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
