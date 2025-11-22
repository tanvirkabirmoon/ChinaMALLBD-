// 🛒 Cart Setup
const cart = {
  "Smart Ice Maker": { qty: 0, price: 20000 },
  "Mini Projector": { qty: 0, price: 7000 }
};

// ➕ Add to Cart
function addToCart(productName, price) {
  if (!cart[productName]) {
    cart[productName] = { qty: 1, price };
  } else {
    cart[productName].qty += 1;
  }
  syncFormWithCart();
  updateCart();
}

// 🔄 Sync Form Inputs
function syncFormWithCart() {
  document.getElementById("iceQty").value = cart["Smart Ice Maker"].qty;
  document.getElementById("projectorQty").value = cart["Mini Projector"].qty;
}

// 🧾 Update Cart Summary
function updateCart() {
  const district = document.getElementById("district")?.value.trim().toLowerCase() || "";
  const deliveryCharge = district === "dhaka" ? 60 : 120;

  cart["Smart Ice Maker"].qty = parseInt(document.getElementById("iceQty").value) || 0;
  cart["Mini Projector"].qty = parseInt(document.getElementById("projectorQty").value) || 0;

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
      const subtotal = data.qty * data.price;
      productSummary += `${data.qty} x ${product} (৳${subtotal})\n`;
    }
  }
  if (!productSummary) productSummary = "None selected";

  const message =
    "🛒 *New Order Received*\n" +
    "👤 Name: " + name + "\n" +
    "📞 Phone: " + phone + "\n" +
    "📍 Address: " + address + ", District: " + district + ", Area: " + area + ", House: " + house + "\n" +
    "📦 Products:\n" + productSummary +
    "🎨 Variant: " + (variant || "None") + "\n" +
    "🚚 Delivery Type: " + delivery + "\n" +
    "💳 Payment Method: " + payment + "\n" +
    "📝 Note: " + (note || "None");

  const whatsappNumber = "8801632789807";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.location.href = url; // ✅ Force WhatsApp Web instead of App
}


// 🧹 Confirm Clear Cart
function confirmClearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    clearCart();
    showToast("Cart cleared successfully!");
  }
}

// 🧼 Clear Cart
function clearCart() {
  for (const product in cart) {
    cart[product].qty = 0;
  }
  document.getElementById("iceQty").value = 0;
  document.getElementById("projectorQty").value = 0;
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

// 🖼️ Carousel Navigation
function changeImage(button, direction) {
  const carousel = button.closest(".image-carousel");
  const images = carousel.querySelectorAll(".carousel-img");
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

  images[currentIndex].classList.remove("active");
  let newIndex = (currentIndex + direction + images.length) % images.length;
  images[newIndex].classList.add("active");
}
