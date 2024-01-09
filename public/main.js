const socket = io();

const userName = "Ricardo";

const input = document.getElementById("msg");
const chat = document.querySelector(".chat");

//emit - излучение повідомлення (відправка з браузера)
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("send_msg", { name: userName, body: input.value });
  input.value = "";
});

//отримання повідомлення від сокета (телеграму) 
socket.on("new_msg", (obj) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="name">${obj.name}</div>
                  <div class="body">${obj.body}</div>`;
  chat.appendChild(li);
});
