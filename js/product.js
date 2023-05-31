const productToHtml = () => {
  const product_Html = [];

  for (let i of product) {
    product_Html.push(`
            <div class="product__card" data-aos="flip-up" data-aos-duration="1500">
                <img src="${i.image}" alt="">
                <div class="product__cost">
                    <h2>${i.title}</h2>
                    <span>${i.price}$</span>
                </div>
                <p>${i.text}</p>
                <div class="stars">${i.rate}</div>
                <div class="product__count">
                    ${
                      card.some((item) => item.id === i.id)
                        ? `<div>
                            <button onclick="minusCount(${
                              i.id
                            })" class="addBtn">-</button>
                            <span style="font-size:26px">
                                ${getCount(i.id)}
                            </span>
                            <button onclick="plusCount(${
                              i.id
                            })" class="addBtn ${
                            getCount(i.id) >= i.stock && "deactivate"
                          }">+</button>
                        </div>`
                        : `<button  onclick="addToCart(${i.id})" class="addBtn">+</button>`
                    }
                </div>
            </div>
        `);
  }

  document.getElementById("product__cards").innerHTML = product_Html.join("");
};

const renderOrderPrice = () => {
  let totalPrice = card.reduce(
    (acc, curr) => (acc += curr.count * curr.price),
    0
  );
  let tax = 2;
  const orderContent = `
        <div id="orderContent" class="my-5">
            <h3 class="px-3"> SubTotal: ${card.reduce(
              (acc, curr) => (acc += curr.count * curr.price),
              0
            )}$</h3>
            <h3 class="px-3"> Tax: 2%</h3>
            <h3 class="px-3"> Product count: ${card.reduce(
              (acc, curr) => (acc += curr.count),
              0
            )} </h3> <br> <hr>
            <h3 class="px-3"></h3>
            <div id="btnGroup" class="d-flex justify-content-between px-3 py-3">
            <h1> Total:  ${totalPrice * ((100 + tax) / 100)}$</h1>
            <button onclick="sendOrder()" id="order" class="order">Order</button>
            </div>
        </div>
    `;
  document.getElementById("orderPrice").innerHTML = orderContent;
};

function showPopup() {
  const popup = document.getElementById("thank");
  popup.style.display = "block";

  setTimeout(function () {
    popup.style.display = "none";
  }, 3000);
}

function sendOrder() {
  if (card.length === 0) {
    alert("No items selected!! Please, make sure to select something!!");
  } else {
    showPopup();
    card = [];
    productToHtml();
  }
  toggleModal();
}

const productToModal = () => {
  const Modal = [];
  let index = 0;
  for (let item of card) {
    index++;
    Modal.push(
      `
            <tr>
                <th class="text-center">${index}</th>
                <td class="text-center"><img style="width:83.5px;border-radius:10px;" src="${
                  item.image
                }" alt="nothing"></td>
                <td>${item.title}</td>
                <td>${item.count}</td>
                <td>${item.price}$</td>
                <td>${item.count * item.price}$</td>
                <td class="text-center"><button class="my-3" onclick="deleteBtn(${
                  item.id
                })" id="delete">Delete</button></td>
            </tr>
            `
    );
  }
  document.getElementById("tableBody").innerHTML = Modal.join(" ");
  renderOrderPrice();
};

const getCount = (id) => {
  return card.find((item) => item.id === id)?.count;
};

const addToCart = (id) => {
  const response = product.find((i) => i.id === id);
  card.push({ ...response, count: 1 });
  productToHtml();
};

const plusCount = (id) => {
  const index = card.findIndex((i) => i.id === id);
  card[index].count = card[index].count + 1;
  productToHtml();
};
const minusCount = (id) => {
  const index = card.findIndex((i) => i.id === id);
  if (card[index].count === 1) {
    card.splice(index, 1);
  } else {
    card[index].count = card[index].count - 1;
  }
  productToHtml();
};

const toggleModal = () => {
  document.getElementById("product_modal").classList.toggle("activeModal");
  productToModal();
};

const toDark = () => {
  document.body.classList.toggle("toDarkMode");
};

const deleteBtn = (id) => {
  const index = card.findIndex((item) => item.id === id);
  card.splice(index, 1);
  productToModal();
};

const closeBtn = () => {
  toggleModal();
  card = [];
  productToHtml();
};

productToHtml();
productToModal();
