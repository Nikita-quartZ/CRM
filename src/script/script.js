import { fetchJson } from "./apiFunc.js";
import { changeFormatDate, changeContact } from "./helperFunc.js";
import { createNewUser, deleteBlock } from "./createWindows.js";
import { debounce } from "./debounce.js";
import {
  sortingId,
  sortingCreatedDate,
  sortingUpdatedDate,
  sortingName,
  searchClients,
} from "./sortingAll.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".catalog__btn-create-client")
    .addEventListener("click", () => {
      if (!(window.innerWidth < 1000)) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "17px";
      }
      createNewUser("Новый клиент");
      document.querySelector(".blur").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".blur").style.opacity = "1";
        document.querySelector(".new-client").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".new-client").style.opacity = "1";
          document.querySelector(".new-client").style.transform = "scale(1)";
        }, 300);
      }, 300);
    });

  let searchTiming = debounce(search, 300);
  document
    .querySelector(".header__search")
    .addEventListener("input", searchTiming);

  function search() {
    fetchJson("http://localhost:3000/api/clients").then((e) => {
      removeFilters();
      for (const item of document.querySelectorAll(".catalog__row")) {
        item.remove();
      }
      createTableUsers(
        searchClients(document.querySelector(".header__search").value, e)
      );
    });
  }

  function createTableUsers(users) {
    const table = document.querySelector(".catalog__main-table");
    for (const user in users) {
      const info = users[user];
      const dateCreate = new Date(info.createdAt);
      const dateUpdate = new Date(info.updatedAt);
      let row = document.createElement("tr");
      row.classList.add("catalog__row");
      row.classList.add("row");
      let colomn = document.createElement("td");
      colomn.classList.add("catalog__id");
      colomn.innerHTML = info.id;
      row.appendChild(colomn);
      colomn = document.createElement("td");
      colomn.classList.add("catalog__name");
      colomn.innerHTML = `${info.surname} ${info.name} ${info.lastName}`;
      row.appendChild(colomn);
      colomn = document.createElement("td");
      colomn.classList.add("catalog__create");
      colomn.innerHTML = `${changeFormatDate(dateCreate)}`;
      row.appendChild(colomn);
      colomn = document.createElement("td");
      colomn.classList.add("catalog__update");
      colomn.innerHTML = `${changeFormatDate(dateUpdate)}`;
      row.appendChild(colomn);
      colomn = document.createElement("td");
      colomn.classList.add("catalog__contacts");
      colomn.appendChild(changeContact(info.contacts));
      row.appendChild(colomn);
      colomn = document.createElement("td");
      colomn.classList.add("catalog__changes");
      const btns = changeUser();
      btns[0].addEventListener("click", () => {
        if (!(window.innerWidth < 1000)) {
          document.body.style.overflow = "hidden";
          document.body.style.paddingRight = "17px";
        }
        btns[0].innerHTML =
          '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg> Изменить';
        btns[0].classList.add("active-spinner");
        fetchJson(`http://localhost:3000/api/clients/${info.id}`).then((e) => {
          btns[0].innerHTML =
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g></svg> Изменить';
          btns[0].classList.remove("active-spinner");
          createNewUser("Изменить данные", e, row);
          document.querySelector(".blur").style.display = "flex";
          setTimeout(() => {
            document.querySelector(".blur").style.opacity = "1";
            document.querySelector(".new-client").style.display = "flex";
            setTimeout(() => {
              document.querySelector(".new-client").style.opacity = "1";
              document.querySelector(".new-client").style.transform =
                "scale(1)";
            }, 300);
          }, 300);
        });
      });
      colomn.appendChild(btns[0]);
      btns[1].addEventListener("click", () => {
        if (!(window.innerWidth < 1000)) {
          document.body.style.overflow = "hidden";
          document.body.style.paddingRight = "17px";
        }
        deleteBlock(info.id, row);
        document.querySelector(".blur").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".blur").style.opacity = "1";
          document.querySelector(".delete-window").style.display = "flex";
          setTimeout(() => {
            document.querySelector(".delete-window").style.opacity = "1";
            document.querySelector(".delete-window").style.transform =
              "scale(1)";
          }, 300);
        }, 300);
      });
      colomn.appendChild(btns[1]);
      row.appendChild(colomn);
      table.appendChild(row);
      setTimeout(() => {
        document.querySelectorAll(".catalog__row").forEach((e) => {
          e.style.opacity = "1";
        });
        document.querySelector(".catalog__btn-create-client").style.opacity =
          "1";
      }, 100);
    }
  }

  function changeUser() {
    const penSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g></svg>`;
    const closeSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g></svg>`;
    const changeBtn = document.createElement("button");
    changeBtn.innerHTML = `${penSvg} Изменить`;
    changeBtn.classList.add("change-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `${closeSvg} Удалить`;
    deleteBtn.classList.add("delete-btn");
    return [changeBtn, deleteBtn];
  }

  function getCatalog() {
    return fetchJson(`http://localhost:3000/api/clients`).then((e) => {
      document.querySelector(".filter-btn-id").addEventListener("click", () => {
        const btn = document.querySelector(".filter-btn-id");
        for (const item of document.querySelectorAll(".catalog__row")) {
          item.remove();
        }
        if (btn.classList.contains("filter-active")) {
          removeFilters();
          btn.classList.add("filter-active-reverse");
          createTableUsers(sortingId(e, true));
        } else {
          removeFilters();
          btn.classList.add("filter-active");
          createTableUsers(sortingId(e, false));
        }
      });
      document
        .querySelector(".filter-btn-name")
        .addEventListener("click", () => {
          const mainBtn = document.querySelector(".filter-btn-name");
          for (const item of document.querySelectorAll(".catalog__row")) {
            item.remove();
          }
          if (mainBtn.classList.contains("filter-active")) {
            removeFilters();
            mainBtn.classList.add("filter-active-reverse");
            document.querySelector(".catalog__filter-letter").innerText = "Я-А";
            createTableUsers(sortingName(e, true));
          } else {
            removeFilters();
            mainBtn.classList.add("filter-active");
            document.querySelector(".catalog__filter-letter").innerText = "А-Я";
            createTableUsers(sortingName(e, false));
          }
        });
      document
        .querySelector(".filter-btn-create")
        .addEventListener("click", () => {
          const mainBtn = document.querySelector(".filter-btn-create");
          for (const item of document.querySelectorAll(".catalog__row")) {
            item.remove();
          }
          if (mainBtn.classList.contains("filter-active")) {
            removeFilters();
            mainBtn.classList.add("filter-active-reverse");
            createTableUsers(sortingCreatedDate(e, true));
          } else {
            removeFilters();
            mainBtn.classList.add("filter-active");
            createTableUsers(sortingCreatedDate(e, false));
          }
        });
      document
        .querySelector(".filter-btn-updated")
        .addEventListener("click", () => {
          const mainBtn = document.querySelector(".filter-btn-updated");
          for (const item of document.querySelectorAll(".catalog__row")) {
            item.remove();
          }
          if (mainBtn.classList.contains("filter-active")) {
            removeFilters();
            mainBtn.classList.add("filter-active-reverse");
            createTableUsers(sortingUpdatedDate(e, true));
          } else {
            removeFilters();
            mainBtn.classList.add("filter-active");
            createTableUsers(sortingUpdatedDate(e, false));
          }
        });
      if (typeof e !== "undefined") {
        if (document.querySelector(".spinner-block")) {
          document.querySelector(".spinner-block").style.opacity = "0";
          setTimeout(() => {
            document.querySelector(".spinner-block").remove();
            createTableUsers(sortingId(e, false));
          }, 300);
        }
      } else {
        console.log("Вознила проблема сервара");
      }
    });
  }
  getCatalog();
});

function removeFilters() {
  for (const btn of document.querySelectorAll(".filter-btn")) {
    btn.classList.remove("filter-active");
    btn.classList.remove("filter-active-reverse");
  }
}
