/** @format */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyApF9sapHTsVnr8Vv5YbndnVSU8FmfSin8",
  authDomain: "real-time-chat-applicati-e7c8b.firebaseapp.com",
  databaseURL:
    "https://real-time-chat-applicati-e7c8b-default-rtdb.firebaseio.com",
  projectId: "real-time-chat-applicati-e7c8b",
  storageBucket: "real-time-chat-applicati-e7c8b.appspot.com",
  messagingSenderId: "924736400544",
  appId: "1:924736400544:web:3fbed8e985fb169708edc5",
  measurementId: "G-TK0Y02574N",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const messageCollection = ref(db, "chats");
const chatContainer = document.querySelector(".chat-messages");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");
const users = document.querySelectorAll(".user");
let user = "user1";

users.forEach((userElement) => {
  const id = userElement.getAttribute("id");

  userElement.addEventListener("click", (e) => {
    user = e.target.getAttribute("id");
    // Remove "active" class from all user elements
    users.forEach((u) => {
      u.classList.remove("active");
    });
    // Add "active" class to the clicked user element
    userElement.classList.add("active");
  });
});

// Listen for incoming messages
onChildAdded(messageCollection, (snapshot) => {
  const timestamp = snapshot.val().timestamp;
  console.log(timestamp);
  const message = snapshot.val();
  appendMessageToUI(message);
});

// Function to append a message to the UI
function appendMessageToUI(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${
    message.sender === user ? "outgoing" : "incoming"
  }`;

  message.sender == user
    ? (messageDiv.innerHTML = `
    <div class="message-content">
      <img class="image" src="image.png" alt="" sizes="" srcset="" />
      <div class="details">
        <h3>Chulo</h3>
        <p>${message.text}</p>
         <p>${message.timestamp} </p>
      </div>
    </div>`)
    : (messageDiv.innerHTML = `
    <div class="message-content">
      <div class="details">
        <h3>Dr-MD</h3>
        <p>${message.text}</p>
        <p>${message.timestamp} </p>
       </div>
      <img class="image" src="image.png" alt="" sizes="" srcset="" />
    </div>
      `);
  s;
  chatContainer.appendChild(messageDiv);
}

// Function to send a message
function sendMessage() {
  console.log("sending message");
  const messageText = messageInput.value.trim();
  try {
    if (messageText !== "") {
      push(messageCollection, {
        sender: user, // Replace with actual sender identifier
        text: messageText,
        timestamp: new Date().toISOString(),
      });
      messageInput.value = "";
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

sendButton.addEventListener("click", sendMessage);

const openbtn = document.querySelector(".open");
const closebtn = document.querySelector(".close");
const sidebar = document.querySelector(".sidebar");

openbtn.addEventListener("click", () => {
  console.log(openbtn.style);
});
