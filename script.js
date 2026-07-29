const cartIcons = document.querySelectorAll(".cart");

const productPage = document.querySelector("#product-page");
const cartPage = document.querySelector("#cart-page");
const badge = document.querySelector(".badge");

const itemList = document.querySelector(".item-list");

const products = [
  {
    id: 1,
    name: "Coke",
    price: 40,
    stock: 5,
    image: "/assets/cokeImg.png",
  },
  {
    id: 2,
    name: "Chocolate",
    price: 30,
    stock: 7,
    image: "/assets/dairyImg.png",
  },
  {
    id: 3,
    name: "Chips",
    price: 20,
    stock: 10,
    image: "/assets/chipsImg.png",
  },
  {
    id: 4,
    name: "Sprite",
    price: 35,
    stock: 4,
    image: "/assets/spiteImg.png",
  },
];

const cart = [];

function renderProducts() {
  itemList.innerHTML = "";
  products.forEach((product) => {
    itemList.innerHTML += `
    <div class="item" data-id=${product.id}>
              <img src= ${product.image} />
              <div class="item-info">
                <p class="product-name">${product.name}</p>
                <p class="product-stock">Available: <span>${product.stock}</span></p>
              </div>
              <div class="price-item">
                <span class="price clr"
                  ><i class="fa-solid fa-indian-rupee-sign"></i>${product.price}</span
                >
                <i class="fa-solid fa-square-plus clr item-add"></i>
              </div>
            </div>
    `;
  });
}

renderProducts();

let cartVal = 0;

function cartItems(product) {
  const cartItem = cart.find((item) => {
    return item.id === product.id;
  });

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }
}

itemList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("item-add")) return;

  const item = e.target.closest(".item");
  const id = Number(item.dataset.id);

  const product = products.find((p) => p.id === id);

  const cartItem = cart.find((item) => {
    return item.id === product.id;
  });

  if (product.stock > 0) {
    product.stock--;
    badge.textContent = ++cartVal;
    cartItems(product);

    renderProducts();
  }
});

cartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    productPage.classList.toggle("hidden");
    cartPage.classList.toggle("hidden");
  });
});
