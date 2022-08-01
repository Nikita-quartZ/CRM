import { deleteClient, createUser, changeInfoUser } from "./apiFunc.js";
import { EventsForDeleteWindow } from "./helperFunc.js";
import { newContact, watchInputs } from "./elementsForWindows.js";

export function createNewUser(title, info, row) {
  const mainBlock = document.createElement("div");
  mainBlock.classList.add("new-client");

  const header = document.createElement("h2");
  header.classList.add("new-client__header");
  if (title === "Изменить данные") {
    header.innerHTML = `${title} <span class="new-client__id">ID: ${info.id}</span>`;
  } else {
    header.innerText = title;
  }
  mainBlock.appendChild(header);

  const paragraphSurname = document.createElement("p");
  paragraphSurname.classList.add("new-client__placeholder-surname");
  paragraphSurname.classList.add("new-client__placeholder");
  paragraphSurname.innerHTML =
    'Фамилия<span class="span__placeholder">*</span>';
  mainBlock.appendChild(paragraphSurname);

  const surnameInput = document.createElement("input");
  surnameInput.classList.add("new-client__surname");
  surnameInput.classList.add("new-client__input");
  if (info) {
    surnameInput.value = info.surname;
    paragraphSurname.classList.add("active-placeholder");
  }
  mainBlock.appendChild(surnameInput);

  paragraphSurname.addEventListener("click", () => {
    surnameInput.focus();
  });

  surnameInput.addEventListener("focus", () => {
    paragraphSurname.classList.add("active-placeholder");
  });

  surnameInput.addEventListener("blur", () => {
    if (!surnameInput.value)
      paragraphSurname.classList.remove("active-placeholder");
  });

  const paragraphName = document.createElement("p");
  paragraphName.classList.add("new-client__placeholder-name");
  paragraphName.classList.add("new-client__placeholder");
  paragraphName.innerHTML = 'Имя<span class="span__placeholder">*</span>';
  mainBlock.appendChild(paragraphName);

  const nameInput = document.createElement("input");
  nameInput.classList.add("new-client__name");
  nameInput.classList.add("new-client__input");
  if (info) {
    nameInput.value = info.name;
    paragraphName.classList.add("active-placeholder");
  }
  mainBlock.appendChild(nameInput);

  paragraphName.addEventListener("click", () => {
    nameInput.focus();
  });

  nameInput.addEventListener("focus", () => {
    paragraphName.classList.add("active-placeholder");
  });

  nameInput.addEventListener("blur", () => {
    if (!nameInput.value) paragraphName.classList.remove("active-placeholder");
  });

  const paragraphLastName = document.createElement("p");
  paragraphLastName.classList.add("new-client__placeholder-lastName");
  paragraphLastName.classList.add("new-client__placeholder");
  paragraphLastName.innerHTML = "Отчество";
  mainBlock.appendChild(paragraphLastName);

  const lastNameInput = document.createElement("input");
  lastNameInput.classList.add("new-client__lastname");
  lastNameInput.classList.add("new-client__input");
  if (info) {
    lastNameInput.value = info.lastName;
    paragraphLastName.classList.add("active-placeholder");
  }
  mainBlock.appendChild(lastNameInput);

  paragraphLastName.addEventListener("click", () => {
    lastNameInput.focus();
  });

  lastNameInput.addEventListener("focus", () => {
    paragraphLastName.classList.add("active-placeholder");
  });

  lastNameInput.addEventListener("blur", () => {
    if (!lastNameInput.value)
      paragraphLastName.classList.remove("active-placeholder");
  });

  const contactsBlock = document.createElement("div");
  contactsBlock.classList.add("new-client_contact-block");
  const contactsList = document.createElement("ul");
  contactsList.classList.add("new-client_list-contacts-blocks");
  const contactBtn = document.createElement("button");
  contactBtn.classList.add("new-client__add-contact");
  contactBtn.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00001 4.66659C7.63334 4.66659 7.33334 4.96659 7.33334 5.33325V7.33325H5.33334C4.96668 7.33325 4.66668 7.63325 4.66668 7.99992C4.66668 8.36659 4.96668 8.66659 5.33334 8.66659H7.33334V10.6666C7.33334 11.0333 7.63334 11.3333 8.00001 11.3333C8.36668 11.3333 8.66668 11.0333 8.66668 10.6666V8.66659H10.6667C11.0333 8.66659 11.3333 8.36659 11.3333 7.99992C11.3333 7.63325 11.0333 7.33325 10.6667 7.33325H8.66668V5.33325C8.66668 4.96659 8.36668 4.66659 8.00001 4.66659ZM8.00001 1.33325C4.32001 1.33325 1.33334 4.31992 1.33334 7.99992C1.33334 11.6799 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.6799 14.6667 7.99992C14.6667 4.31992 11.68 1.33325 8.00001 1.33325ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.9399 2.66668 7.99992C2.66668 5.05992 5.06001 2.66659 8.00001 2.66659C10.94 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.94 13.3333 8.00001 13.3333Z" fill="#9873FF" /></svg> Добавить контакт';
  contactsBlock.appendChild(contactsList);
  contactsBlock.appendChild(contactBtn);
  mainBlock.appendChild(contactsBlock);
  if (info) {
    if (info.contacts) {
      for (const contact of info.contacts) {
        newContact(contactBtn, contactsList, contact.type, contact.value);
      }
    }
  }

  if (contactsList.querySelectorAll(".new-client__new-contacts-block").length) {
    contactsBlock.classList.add("contact-block-active");
  }

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("new-client__add-client");
  saveBtn.innerText = "Сохранить";
  if (!info) {
    saveBtn.disabled = true;
  }
  nameInput.addEventListener("input", () => {
    saveBtn.disabled = watchInputs(nameInput, surnameInput);
  });
  surnameInput.addEventListener("input", () => {
    saveBtn.disabled = watchInputs(nameInput, surnameInput);
  });
  saveBtn.addEventListener("click", () => {
    const flags = {
      name: false,
      surname: false,
    };
    if (surnameInput.value.trim()) {
      flags.surname = true;
    }
    if (nameInput.value.trim()) {
      flags.name = true;
    }
    if (flags.name && flags.surname) {
      const contacts = [];
      const contactsBlock = document.querySelectorAll(
        ".new-client__new-contacts-block"
      );
      for (const contact of contactsBlock) {
        const typeContact = {
          type: contact.querySelector("option").value,
          value: contact.querySelector("input").value,
        };
        contacts.push(typeContact);
      }
      if (info) {
        changeInfoUser(
          info.id,
          nameInput.value,
          surnameInput.value,
          lastNameInput.value,
          contacts,
          row
        );
      } else {
        createUser(
          nameInput.value,
          surnameInput.value,
          lastNameInput.value,
          contacts
        );
      }
    }
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("new_client__cancel");
  if (info) {
    cancelBtn.innerText = "Удалить клиента";
    setTimeout(() => {
      deleteBlock(info.id, row);
    }, 600);
  } else {
    cancelBtn.innerText = "Отмена";
  }
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("new_client__close-window");
  closeBtn.innerHTML =
    '<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2333 7.73333L21.2666 6.76666L14.4999 13.5334L7.73324 6.7667L6.76658 7.73336L13.5332 14.5L6.7666 21.2667L7.73327 22.2333L14.4999 15.4667L21.2666 22.2334L22.2332 21.2667L15.4666 14.5L22.2333 7.73333Z" fill="#B0B0B0" /></svg>';
  mainBlock.appendChild(saveBtn);
  mainBlock.appendChild(cancelBtn);
  mainBlock.appendChild(closeBtn);
  document.querySelector(".blur").appendChild(mainBlock);

  closeBtn.addEventListener("click", () => {
    document.querySelector(".new-client").style.opacity = "0";
    document.querySelector(".new-client").style.transform = "scale(0.5)";
    setTimeout(() => {
      document.querySelector(".blur").style.opacity = "0";
      document.querySelector(".blur").innerHTML = "";
      setTimeout(() => {
        document.querySelector(".blur").style.display = "none";
      }, 300);
    }, 300);
  });

  contactBtn.addEventListener("click", () => {
    const btn = document.querySelector(".new-client__add-contact");
    const block = document.querySelector(".new-client_list-contacts-blocks");
    newContact(btn, block);
    if (
      document.querySelectorAll(".new-client__new-contacts-block").length === 10
    ) {
      contactBtn.style.display = "none";
    }
    if (
      contactsList.querySelectorAll(".new-client__new-contacts-block").length
    ) {
      contactsBlock.classList.add("contact-block-active");
    }
  });

  if (info) {
    cancelBtn.addEventListener("click", () => {
      document.querySelector(".new-client").style.opacity = "0";
      document.querySelector(".new-client").style.transform = "scale(0.5)";
      setTimeout(() => {
        document.querySelector(".blur").innerHTML = "";
        deleteBlock(info.id, row);
        document.querySelector(".delete-window").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".delete-window").style.opacity = "1";
          document.querySelector(".delete-window").style.transform = "scale(1)";
        }, 100);
      }, 300);
    });
  }
}

export function deleteBlock(id, row) {
  const mainBlock = document.createElement("div");
  mainBlock.classList.add("delete-window");
  const header = document.createElement("h2");
  header.classList.add("delete-header");
  header.innerText = "Удалить клиента";
  mainBlock.appendChild(header);
  const paragraph = document.createElement("p");
  paragraph.innerText = "Вы действительно хотите удалить данного клиента?";
  paragraph.classList.add("delete-paragraph");
  mainBlock.appendChild(paragraph);
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("delete-client__add-client");
  saveBtn.innerText = "Удалить";
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("delete_client__cancel");
  cancelBtn.innerText = "Отмена";
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("delete_client__close-window");
  closeBtn.innerHTML =
    '<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2333 7.73333L21.2666 6.76666L14.4999 13.5334L7.73324 6.7667L6.76658 7.73336L13.5332 14.5L6.7666 21.2667L7.73327 22.2333L14.4999 15.4667L21.2666 22.2334L22.2332 21.2667L15.4666 14.5L22.2333 7.73333Z" fill="#B0B0B0" /></svg>';
  mainBlock.appendChild(saveBtn);
  mainBlock.appendChild(cancelBtn);
  mainBlock.appendChild(closeBtn);
  document.querySelector(".blur").appendChild(mainBlock);
  EventsForDeleteWindow();
  saveBtn.addEventListener("click", () => {
    deleteClient(id);
    document.querySelector(".delete-window").style.opacity = "0";
    document.querySelector(".delete-window").style.transform = "scale(0.5)";
    setTimeout(() => {
      document.querySelector(".blur").style.opacity = "0";
      document.querySelector(".blur").innerHTML = "";
      setTimeout(() => {
        document.querySelector(".blur").style.display = "none";
      }, 300);
    }, 300);
    row.remove();
  });
}
