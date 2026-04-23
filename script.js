const API = "http://localhost:5000";

// Fetch products
async function loadProducts() {
  const res = await fetch(API + "/products");
  const data = await res.json();

  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  data.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

// Cart
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = "";

  cart.forEach(item => {
    container.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });
}

async function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  await fetch(API + "/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart })
  });

  localStorage.removeItem("cart");
  alert("Order placed!");
}

// Admin add product
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await fetch(API + "/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, price })
  });

  alert("Product added");
}

// Load functions
loadProducts();
loadCart();