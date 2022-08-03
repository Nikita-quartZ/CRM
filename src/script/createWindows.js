import { deleteClient, createUser, changeInfoUser } from "./apiFunc.js";
import { EventsForDeleteWindow, validateName } from "./helperFunc.js";
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
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"></svg> Добавить контакт';
  contactsBlock.appendChild(contactsList);
  contactsBlock.appendChild(contactBtn);
  const errorParagraph = document.createElement("p");
  errorParagraph.className = "error-paragraph";
  errorParagraph.innerText = "Что-то пошло не так...";
  mainBlock.appendChild(contactsBlock);
  mainBlock.appendChild(errorParagraph);
  if (info) {
    if (info.contacts) {
      for (const contact of info.contacts) {
        newContact(contactBtn, contactsList, contact.type, contact.value);
      }
    }
  }
  if (info) {
    if (info.contacts.length === 10) {
      contactBtn.style.display = "none";
    }
  }

  if (contactsList.querySelectorAll(".new-client__new-contacts-block").length) {
    contactsBlock.classList.add("contact-block-active");
  }

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("new-client__add-client");
  saveBtn.innerHTML =
    '<svg class="save-btn-spinner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg> <span class="new-client__text">Сохранить</span>';
  if (!info) {
    saveBtn.disabled = true;
  }
  nameInput.addEventListener("input", () => {
    saveBtn.disabled = watchInputs(nameInput, surnameInput);
    document.querySelector(".error-paragraph").style.opacity = "0";
    nameInput.classList.remove("new-client__error-input");
  });
  surnameInput.addEventListener("input", () => {
    saveBtn.disabled = watchInputs(nameInput, surnameInput);
    document.querySelector(".error-paragraph").style.opacity = "0";
    surnameInput.classList.remove("new-client__error-input");
  });
  lastNameInput.addEventListener("input", () => {
    document.querySelector(".error-paragraph").style.opacity = "0";
  });
  saveBtn.addEventListener("click", () => {
    document.querySelector(".save-btn-spinner").style.opacity = "1";
    document
      .querySelector(".new-client__text")
      .classList.add("new-client__text-active");
    document
      .querySelector(".new-client__add-client")
      .classList.add("delete-client__btn-active");
    const flags = {
      name: false,
      surname: false,
    };
    if (surnameInput.value.trim()) {
      flags.surname = true;
      if (!validateName(surnameInput.value.trim())) {
        flags.surname = false;
        surnameInput.classList.add("new-client__error-input");
      }
    }
    if (nameInput.value.trim()) {
      flags.name = true;
      if (!validateName(nameInput.value.trim())) {
        flags.name = false;
        nameInput.classList.add("new-client__error-input");
      }
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
    cancelBtn.addEventListener("click", () => {
      setTimeout(() => {
        deleteBlock(info.id, row);
        console.log(2);
      }, 600);
    });
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

  document.querySelector(
    ".scroll-bar"
  ).innerHTML = `<div class="display-bar" data-simplebar></div>`;
  document.querySelector(".display-bar").appendChild(mainBlock);

  if (info) {
    document.querySelector(".choices__input").addEventListener("focus", () => {
      document.querySelector(".choices__inner").classList.add("active-text");
    });
  }

  closeBtn.addEventListener("click", () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
    document.querySelector(".new-client").style.opacity = "0";
    document.querySelector(".new-client").style.transform = "scale(0.5)";
    setTimeout(() => {
      document.querySelector(".blur").style.opacity = "0";
      document.querySelector(".scroll-bar").innerHTML = "";
      setTimeout(() => {
        document.querySelector(".blur").style.display = "none";
      }, 300);
    }, 300);
  });

  contactBtn.addEventListener("click", () => {
    document.querySelector(".error-paragraph").style.opacity = "0";
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
        document.querySelector(".scroll-bar").innerHTML = "";
        deleteBlock(info.id, row);
        document.querySelector(".delete-window").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".delete-window").style.opacity = "1";
          document.querySelector(".delete-window").style.transform = "scale(1)";
        }, 100);
      }, 300);
    });
  } else {
    cancelBtn.addEventListener("click", () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.querySelector(".new-client").style.opacity = "0";
      document.querySelector(".new-client").style.transform = "scale(0.5)";
      setTimeout(() => {
        document.querySelector(".blur").style.opacity = "0";
        document.querySelector(".scroll-bar").innerHTML = "";
        setTimeout(() => {
          document.querySelector(".blur").style.display = "none";
        }, 300);
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
  const errorParagraph = document.createElement("p");
  errorParagraph.className = "error-paragraph";
  errorParagraph.innerText = "Что-то пошло не так...";
  mainBlock.appendChild(errorParagraph);
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("delete-client__add-client");
  saveBtn.innerHTML =
    '<svg class="save-btn-spinner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg> <span class="new-client__text">Удалить</span>';
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
  document.querySelector(".scroll-bar").appendChild(mainBlock);
  EventsForDeleteWindow();
  saveBtn.addEventListener("click", () => {
    document.querySelector(".save-btn-spinner").style.opacity = "1";
    document
      .querySelector(".new-client__text")
      .classList.add("new-client__text-active");
    document
      .querySelector(".delete-client__add-client")
      .classList.add("delete-client__btn-active");
    deleteClient(id, row);
  });
}
