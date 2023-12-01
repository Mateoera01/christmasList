var counter = 1;

window.onload = function () {
  loadItemsFromStorage();
  setupCountdown();
};

function loadItemsFromStorage() {
  if (localStorage.getItem('items')) {
    var items = JSON.parse(localStorage.getItem('items'));
    counter = items.length + 1;

    for (var i = 0; i < items.length; i++) {
      appendItem(items[i]);
    }
  }
}

function setupCountdown() {
  const targetTime = new Date('2023-12-25T12:00:00').getTime();
  
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = targetTime - currentTime;

    if (timeDiff <= 0) {
      clearInterval(intervalId);
      document.getElementById('countdown').innerHTML = "Merry Christler!";
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      document.getElementById('countdown').innerHTML = `Time  till Christmas!: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

function loadItemsFromStorage() {
  if (localStorage.getItem('items')) {
    var items = JSON.parse(localStorage.getItem('items'));
    counter = items.length + 1;

    for (var i = 0; i < items.length; i++) {
      appendItem(items[i]);
    }
  }
}

function addItem() {
  var itemText = document.getElementById("itemInput").value.trim();
  var itemName = document.getElementById("itemName").value.trim();

  if (itemText !== "" && itemName !== "") {
    var anchor = document.createElement("a");
    anchor.href = itemText;
    anchor.text = itemName;

    var listItem = document.createElement("li");
    listItem.appendChild(anchor);

    var deleteButton = document.createElement("span");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = " &#10006;";
    deleteButton.onclick = function () {
      deleteItem(listItem);
    };

    listItem.appendChild(deleteButton);

    document.getElementById("list").appendChild(listItem);

    saveItemToStorage({ text: anchor.text, link: anchor.href });

    counter++;

    document.getElementById("itemInput").value = "";
    document.getElementById("itemName").value = "";
  }
}

function saveItemToStorage(item) {
  var items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

  items.push(item);

  localStorage.setItem('items', JSON.stringify(items));
}

function appendItem(item) {
  var listItem = document.createElement("li");
  var anchor = document.createElement("a");
  anchor.href = item.link;
  anchor.text = item.text;

  listItem.appendChild(anchor);

  var deleteButton = document.createElement("span");
  deleteButton.className = "delete-button";
  deleteButton.innerHTML = " &#10006;";
  deleteButton.onclick = function () {
    deleteItem(listItem);
  };

  listItem.appendChild(deleteButton);

  document.getElementById("list").appendChild(listItem);

  counter++;
}

function deleteItem(item) {
  var items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

  var index = Array.from(item.parentNode.children).indexOf(item);
  items.splice(index, 1);

  localStorage.setItem('items', JSON.stringify(items));

  item.remove();
}

document.getElementById("itemInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});
