import { changeContact, changeFormatDate } from "./helperFunc.js";

export function deleteClient(id) {
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((e) => console.log(e));
}

export function fetchJson(url) {
  const data = fetch(url).then((e) => e.json());
  return data;
}

export function createUser(name, surname, lastName, contacts) {
  let user;
  if (contacts != []) {
    user = {
      name: name,
      surname: surname,
      lastName: lastName,
      contacts: contacts,
    };
  } else {
    user = {
      name: name,
      surname: surname,
      lastName: lastName,
    };
  }
  fetch(`http://localhost:3000/api/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then((e) => console.log(e));
}

export function changeInfoUser(id, name, surname, lastName, contacts, row) {
  let user;
  if (contacts != []) {
    user = {
      name: name,
      surname: surname,
      lastName: lastName,
      contacts: contacts,
    };
  } else {
    user = {
      name: name,
      surname: surname,
      lastName: lastName,
    };
  }
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then((e) => {
    if (e.status === 200) {
      row.querySelector(".catalog__id").innerText = id;
      row.querySelector(".catalog__name").innerText =
        surname.value + " " + name.value + " " + lastName.value;
      row.querySelector(".catalog__update").innerHTML = changeFormatDate(
        new Date()
      );
      row.querySelector(".catalog__contacts").innerHTML = "";
      row
        .querySelector(".catalog__contacts")
        .appendChild(changeContact(contacts));
      document.querySelector(".new-client").style.opacity = "0";
      document.querySelector(".new-client").style.transform = "scale(0.5)";
      setTimeout(() => {
        document.querySelector(".blur").style.opacity = "0";
        document.querySelector(".blur").innerHTML = "";
        setTimeout(() => {
          document.querySelector(".blur").style.display = "none";
        }, 300);
      }, 300);
    }
  });
}
