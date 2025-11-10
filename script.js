// 🛒 Global Cart Object
const cart = {
  "Smart Ice Maker": { qty: 0, price: 20000 },
  "Mini Projector": { qty: 0, price: 7000 }
};

// ➕ Add Product to Cart
function addToCart(productName, price) {
  if (!cart[productName]) {
    cart[productName] = { qty: 1, price };
  } else {
    cart[productName].qty += 1;
  }
  syncFormWithCart();
  updateCart();
}

// 🔄 Sync Form Inputs with Cart
function syncFormWithCart() {
  const iceInput = document.getElementById("iceQty");
  const projInput = document.getElementById("projectorQty");

  if (iceInput) iceInput.value = cart["Smart Ice Maker"].qty;
  if (projInput) projInput.value = cart["Mini Projector"].qty;
}

// 🧾 Update Cart Summary
function updateCart() {
  const district = document.getElementById("district")?.value.trim().toLowerCase() || "";
  const deliveryCharge = district === "dhaka" ? 60 : 120;

  // Sync cart with form values
  const iceInput = document.getElementById("iceQty");
  const projInput = document.getElementById("projectorQty");

  if (iceInput) cart["Smart Ice Maker"].qty = parseInt(iceInput.value) || 0;
  if (projInput) cart["Mini Projector"].qty = parseInt(projInput.value) || 0;

  let cartHTML = "";
  let total = 0;

  for (const [product, data] of Object.entries(cart)) {
    if (data.qty > 0) {
      const subtotal = data.qty * data.price;
      cartHTML += `<li>${data.qty} x ${product} — ৳${subtotal}</li>`;
      total += subtotal;
    }
  }

  if (!cartHTML) cartHTML = `<li>No items added yet.</li>`;
  const grandTotal = total + deliveryCharge;

  document.getElementById("cartItems").innerHTML = cartHTML;
  document.getElementById("cartTotal").innerText = `Total Price: ৳${total}`;
  document.getElementById("cartDelivery").innerText = `Delivery Charge: ৳${deliveryCharge}`;
  document.getElementById("cartGrandTotal").innerText = `Grand Total: ৳${grandTotal}`;
}

// 📤 Send Order to WhatsApp
function sendToWhatsApp(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const district = document.getElementById("district").value;
  const area = document.getElementById("area").value;
  const house = document.getElementById("house").value;
  const variant = document.getElementById("variant").value;
  const delivery = document.getElementById("deliveryType").value;
  const payment = document.getElementById("paymentMethod").value;
  const note = document.getElementById("note").value;

  let productSummary = "";
  for (const [product, data] of Object.entries(cart)) {
    if (data.qty > 0) {
      productSummary += `${data.qty} x ${product}\n`;
    }
  }

  if (!productSummary) productSummary = "None selected";

  const message = `
🛒 *New Order Received*
👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}, District: ${district}, Area: ${area}, House: ${house}
📦 Products:
${productSummary}
🎨 Variant: ${variant || "None"}
🚚 Delivery Type: ${delivery}
💳 Payment Method: ${payment}
📝 Note: ${note || "None"}
`;

  const whatsappNumber = "8801978595259";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  clearCart(); // Optional: clear cart after sending
}

// 🧹 Confirm Before Clearing Cart
function confirmClearCart() {
  const confirmClear = confirm("Are you sure you want to clear your cart?");
  if (confirmClear) {
    clearCart();
    showToast("Cart cleared successfully!");
  }
}

// 🧼 Clear Cart and Reset Form
function clearCart() {
  for (const product in cart) {
    cart[product].qty = 0;
  }

  const iceInput = document.getElementById("iceQty");
  const projInput = document.getElementById("projectorQty");

  if (iceInput) iceInput.value = 0;
  if (projInput) projInput.value = 0;

  updateCart();
}

// 🔔 Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
function changeImage(button, direction) {
  const carousel = button.closest(".image-carousel");
  const images = carousel.querySelectorAll(".carousel-img");
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

  images[currentIndex].classList.remove("active");
  let newIndex = (currentIndex + direction + images.length) % images.length;
  images[newIndex].classList.add("active");
}
