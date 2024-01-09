const socket = io();

const userName = "Ricardo";

const input = document.getElementById("msg");
const chat = document.querySelector(".chat");
let chat_id;

//emit - излучение повідомлення (відправка з браузера)
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("send_msg", {
    name: userName,
    body: input.value,
    chat_id: chat_id,
  });
  input.value = "";
});

//отримання повідомлення від телеграму
socket.on("new_msg", (obj) => {
  chat_id = obj.chat_id;
  const li = document.createElement("li");
  li.innerHTML = `<div class="name">login: ${obj.name} chat_id: ${obj.chat_id}</div>
                  <div class="body">${obj.body}</div>`;
  chat.appendChild(li);
});
