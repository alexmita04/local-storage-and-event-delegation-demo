const tapasList = document.querySelector(".tapas-list");
const addItemForm = document.querySelector(".tapas form");
const items = JSON.parse(localStorage.getItem("items")) || [];

function printList(list = [], listEl) {
  localStorage.setItem("items", JSON.stringify(items));
  listEl.innerHTML = list
    .map((el, idx) => {
      return `
        <li class="tapas-element">
            <input data-idx="${idx}" id="el-${idx}" type="checkbox" ${
        el.done ? "checked" : ""
      }/>
            <label for="el-${idx}">${el.name}</label>
        </li>
        `;
    })
    .join("");
}

function addItem(e) {
  e.preventDefault();
  const name = this.querySelector("input").value;
  const item = {
    name,
    done: false,
  };
  addItemsStorage(item);
  printList(items, tapasList);

  this.reset();
}

function addItemsStorage(el) {
  console.log(typeof items);
  items.push(el);
  //   localStorage.setItem("items", JSON.stringify(items));
}

function checkTapasEl(e) {
  if (!e.target.matches("input")) return;
  items[e.target.dataset.idx].done = true;
  printList(items, tapasList);
}

printList(items, tapasList);

addItemForm.addEventListener("submit", addItem);
tapasList.addEventListener("click", checkTapasEl);
