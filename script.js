const cartIcons = document.querySelectorAll(".cart");
const productPage = document.querySelector("#product-page");
const cartPage = document.querySelector("#cart-page");
const badge = document.querySelectorAll(".badge");
const itemList = document.querySelector(".item-list");
const cartItem_list = document.querySelector(".cart-item-list");
const totalPrice = document.querySelector(".totalItem-price");
const backBtn = document.querySelector(".backTocart");
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
  let html = "";
  products.forEach((product) => {
    html += `
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
  itemList.innerHTML = html;
}

renderProducts();

function renderCart() {
  let html = "";
  cart.forEach((item) => {
    html += `
    <div class="cart-item" data-id=${item.id}>
            <img src="${item.image}" />
            <div class="item-info">
              <p class="product-name">${item.name}</p>
              <span class="clr"
                ><i class="fa-solid fa-indian-rupee-sign"></i>${item.price}</span
              >
            </div>
            <div class="quantity-box">
              <button class="minus">−</button>

              <span class="count">${item.quantity}</span>

              <button class="plus">+</button>
            </div>
            <div class="price-item">
              <span class="clr total-price"
                ><i class="fa-solid fa-indian-rupee-sign"></i>${item.price * item.quantity} </span
              >
              <i class="fa-regular fa-trash-can cancel-item"></i>
            </div>
          </div>
    `;
  });
  cartItem_list.innerHTML = html;
}

function updateTotalPrice() {
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalPrice.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${total}`;
}

function addToCart(product) {
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

function updateBadge() {
  badge.forEach((count) => {
    count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
}

function updateUI() {
  updateBadge();
  renderCart();
  renderProducts();
  updateTotalPrice();
}

itemList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("item-add")) return;

  const item = e.target.closest(".item");
  const id = Number(item.dataset.id);

  const product = products.find((p) => p.id === id);

  if (product.stock > 0) {
    product.stock--;
    addToCart(product);
    updateUI();
  } else {
    alert(`Sorry, ${product.name} is not Available yet :(`);
  }
});

function showProductPage() {
  productPage.classList.remove("hidden");
  cartPage.classList.add("hidden");
}

function showCartPage() {
  productPage.classList.add("hidden");
  cartPage.classList.remove("hidden");
}

cartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    showCartPage();
  });
});

backBtn.addEventListener("click", showProductPage);

function getProductAndCartItem(id) {
  return {
    cartItem: cart.find((item) => item.id === id),
    product: products.find((p) => p.id === id),
  };
}

function increaseQuantity(id) {
  const { product, cartItem } = getProductAndCartItem(id);

  if (product.stock > 0) {
    cartItem.quantity++;
    product.stock--;
    updateUI();
  } else {
    alert(`${product.name} is out of stock`);
  }
}

function decreaseQuantity(id) {
  const { product, cartItem } = getProductAndCartItem(id);

  cartItem.quantity--;
  product.stock++;

  if (cartItem.quantity === 0) {
    const index = cart.findIndex((item) => item.id === id);
    cart.splice(index, 1);
  }

  updateUI();
}

function removeFromCart(id) {
  const { product, cartItem } = getProductAndCartItem(id);
  product.stock += cartItem.quantity;

  const index = cart.findIndex((item) => item.id === id);
  cart.splice(index, 1);
  updateUI();
}

cartItem_list.addEventListener("click", (e) => {
  const cartElement = e.target.closest(".cart-item");
  if (!cartElement) return;
  const id = Number(cartElement.dataset.id);
  const { product, cartItem } = getProductAndCartItem(id);

  if (e.target.classList.contains("plus")) {
    increaseQuantity(id);
  }

  if (e.target.classList.contains("minus")) {
    decreaseQuantity(id);
  }

  if (e.target.classList.contains("cancel-item")) {
    removeFromCart(id);
  }
});
