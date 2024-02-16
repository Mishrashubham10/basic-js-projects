const itemsElement = document.getElementById('items');
const item = document.getElementById('itemInput');
const storageKey = 'items';

let items = [];

function renderItems() {
  itemsElement.innerHTML = null;

  for (const [idx, item] of Object.entries(items)) {
    const container = document.createElement('div');
    container.classList.add('item');

    const text = document.createElement('p');
    text.textContent = item;

    const button = document.createElement('button');
    button.textContent = 'X';
    button.classList.add('remove');
    button.onclick = () => removeItem(idx);

    container.appendChild(text);
    container.appendChild(button);

    itemsElement.appendChild(container);
  }
}

renderItems();

function loadItems() {
  const oldItems = localStorage.getItem(storageKey);
  if (oldItems) items = JSON.parse(oldItems);
  renderItems();
}

function saveItems() {
  const stringItem = JSON.stringify(items);
  localStorage.setItem(storageKey, stringItem);
}

function addItem() {
  const value = item.value;

  if (!value) {
    alert('You cannot add an empty item');
    return;
  }

  items.push(value);
  renderItems();
  item.value = '';
  saveItems();
}

function removeItem(idx) {
  items.splice(idx, 1);
  renderItems();
  saveItems();
}

document.addEventListener('DOMContentLoaded', loadItems);