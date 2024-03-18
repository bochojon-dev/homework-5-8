const form = document.querySelector(".form");
const text = document.querySelector(".input-todo");
const ul = document.querySelector(".ul");

const DATA = [
  {
    id: "2005",
    text: "watching tv",
    time: "23:25",
    valid: false,
  },
  {
    id: "2004",
    text: "sleeping",
    time: "23:26",
    valid: true,
  },
];

class User {
  constructor(text, valid) {
    this.id = new Date().getTime();
    this.text = text;
    this.valid = valid;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let newUser = new User(text.value);
  DATA.push(newUser);
  createList(DATA);
  text.value = "";
});
function check(checkbox, task) {
  if (checkbox.checked) {
    task.style.textDecorationLine = "line-through";
  } else {
    task.style.textDecorationLine = "none";
  }
}
function createList(data) {
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  let fragment = document.createDocumentFragment();
  data.forEach((user, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="card">
          <div class="card-wrap">
          <input type="checkbox" onchange="check(this, this.nextElementSibling)" id="checkbox${index}"/>
            <p class="card-text" id="text">${user.text}</p>
            <p class="time">${time()}</p>
          </div>
          <button style="background:none;border:0" onclick='deleteUser(${index})' class="close-btn"><img src="./images/x.svg"/></button>
        </div>
        <hr />
    `;
    fragment.appendChild(div);
    // li.style.padding = "10px 0";
    // li.style.display = "flex";
  });
  ul.appendChild(fragment);
}
createList(DATA);
function deleteUser(index) {
  DATA.splice(index, 1);
  createList(DATA);
}
function time() {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  return `${hour}:${minute}`;
}
// function createCard(data) {
//   data.forEach((el) => {
//     const div = document.createElement("div");
//     div.classList.add("card");
//     div.innerHTML = `
//         <input type="checkbox" ${el.volid ? "checked" : ""}>
//         <span> ${el.text} </span>
//         `;
//     inputCheckbox.appendChild(div);
//   });
// }
ul.addEventListener("click", (e) => {
  if (e.target.name === "delete") {
    let id = e.target.closest("[data-id]").dataset.id;
    let index = DATA.findIndex((el) => el.id === id);
    DATA.splice(index, 1);
    createList(DATA);
  }
});
