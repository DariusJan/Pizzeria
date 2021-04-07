let addBtn = document.getElementById("add-btn");
let addName = document.getElementById("name");
let addPrice = document.getElementById("price");
let addHeat = document.getElementById("heat");
let parent = document.getElementById("images");

let img;
let x = 0;
let array = Array();

function add_element_to_array() {
  array[x] = document.getElementById("toppings").value;
  alert("Element: " + array[x] + " Added at index " + x);
  x++;
  document.getElementById("toppings").value = "";
}
addBtn.addEventListener("click", (e) => {
  if (addName.value == "" || addPrice.value == "" || addHeat.value == "") {
    return alert("Please fill form");
  }

  let orders = sessionStorage.getItem("orders");
  if (orders == null) {
    ordersObj = [];
  } else {
    ordersObj = JSON.parse(orders);
  }
  let myObj = {
    name: addName.value,
    price: addPrice.value,
    heat: addHeat.value,
    array,
  };

  ordersObj.push(myObj);
  sessionStorage.setItem("orders", JSON.stringify(ordersObj));
  addName.value = "";
  addPrice.value = "";
  addHeat.value = "";
});

function showOrders() {
  let orders = sessionStorage.getItem("orders");
  if (orders == null) {
    ordersObj = [];
  } else {
    ordersObj = JSON.parse(orders);
  }
  function heat(el) {
    for (i = 0; i < el; i++) {
      img = new Image();
      img.src =
        "https://cdn1.iconfinder.com/data/icons/vegetables-1-flat/33/chilli-512.png";
      parent.appendChild(img);
    }
  }

  let html = "";
  ordersObj.forEach(function (Element, index) {
    heat(Element.heat);

    html += `
    
    <div id="orders" >
    <h3 id="order-id">Order ${index + 1}</h3>
    <div id="order-name">${Element.name}</div>
    <div id="images">${parent.innerHTML}</div>
    <div id="order-price">price : ${Element.price} eur. </div>
    <div id="order-toppings">toppings : ${Element.array}</div>
    <button id="${index}" onclick="deleteOrder(this.id)"class="delete-btn">Delete order</button>
  </div>
    
    `;
  });

  let orderElm = document.getElementById("orders");
  if (ordersObj.length != 0) {
    orderElm.innerHTML = html;
  } else {
    orderElm.innerHTML = "No orders yet";
  }
}
showOrders();

function deleteOrder(index) {
  let confirmDel = confirm("You are deleting order");

  if (confirmDel == true) {
    let orders = sessionStorage.getItem("orders");

    if (orders == null) {
      ordersObj = [];
    } else {
      ordersObj = JSON.parse(orders);
    }

    ordersObj.splice(index, 1);
    sessionStorage.setItem("orders", JSON.stringify(ordersObj));
  }
  showOrders();
}
