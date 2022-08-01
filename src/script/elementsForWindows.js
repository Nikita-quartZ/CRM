export function newContact(mainBtn, ListBlock, type, value) {
  // ListBlock.classList.add("contact-block-active");
  const contacts = ["Телефон", "Доп. телефон", "Email", "VK", "Facebook"];
  const mainBlock = document.createElement("li");
  mainBlock.classList.add("new-client__new-contacts-block");
  const select = document.createElement("select");
  for (const contact of contacts) {
    const childrenSelect = document.createElement("option");
    childrenSelect.value = contact;
    childrenSelect.innerText = contact;
    select.appendChild(childrenSelect);
  }
  if (type) {
    for (let i = 0; i < select.length; i++) {
      if (select[i].value === type) select[i].selected = true;
    }
  }
  mainBlock.appendChild(select);
  const element = select;
  // eslint-disable-next-line no-undef
  new Choices(element, {
    searchEnabled: false,
  });
  const input = document.createElement("input");
  input.classList.add("new-contacts-input");
  input.placeholder = "Введите данные контакта";
  if (value) input.value = value;
  input.addEventListener("input", () => {
    if (input.value) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  });
  mainBlock.appendChild(input);
  const btn = document.createElement("button");
  btn.classList.add("new-client__close-btn");
  if (input.value != "") {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
  btn.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>';
  btn.addEventListener("click", () => {
    mainBlock.remove();
    if (
      document.querySelectorAll(".new-client__new-contacts-block").length === 0
    ) {
      document
        .querySelector(".new-client_contact-block")
        .classList.remove("contact-block-active");
    }
    if (
      !(
        document.querySelectorAll(".new-client__new-contacts-block").length ===
        10
      )
    ) {
      document.querySelector(".new-client__add-contact").style.display = "flex";
    }
  });
  // eslint-disable-next-line no-undef
  tippy(btn, {
    content: "Удалить контакт",
    offset: [0, -3],
  });
  mainBlock.appendChild(btn);
  ListBlock.appendChild(mainBlock);
}

export function watchInputs(nameInput, surnameInput) {
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
  console.log(flags);
  return !(flags.name && flags.surname);
}
