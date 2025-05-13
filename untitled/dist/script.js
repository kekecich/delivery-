// === Element References ===
const cart = [];
const cartItemsEl = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartToggle = document.getElementById("cart-toggle");
const cartSection = document.getElementById("cart");
const formEl = document.getElementById("delivery-form");
const themeToggle = document.getElementById("theme-toggle");

// === Cart Toggle ===
if (cartToggle && cartSection) {
  cartToggle.addEventListener("click", () => {
    cartSection.classList.toggle("hidden");
  });
}

// === Add to Cart ===
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".food-item");
    const id = item.dataset.id;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    if (!id || !name || isNaN(price)) return;

    const existing = cart.find((i) => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
  });
});

// === Render Cart Items ===
function renderCart() {
  if (!cartItemsEl || !cartCount || !cartTotal) return;

  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty} ($${(item.price * item.qty).toFixed(2)})`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.title = "Remove one";
    removeBtn.onclick = () => {
      if (confirm(`Remove one "${item.name}" from cart?`)) {
        item.qty--;
        if (item.qty <= 0) {
          const index = cart.indexOf(item);
          if (index !== -1) cart.splice(index, 1);
        }
        renderCart();
      }
    };

    li.appendChild(removeBtn);
    cartItemsEl.appendChild(li);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

// === Form Submission ===
if (formEl) {
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const confirmed = confirm("Are you sure you want to place the order?");
    if (!confirmed) return;

    alert("Thank you! Your order is being processed.");
    cart.length = 0;
    renderCart();
    formEl.reset();
  });
}

// === Theme Toggle ===
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}