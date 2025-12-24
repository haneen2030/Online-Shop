document.addEventListener("DOMContentLoaded", () => {
    console.log("JS loaded");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /* ---------- PRODUCT PAGE ---------- */
    const buttons = document.querySelectorAll(".add-to-cart");
    const cartCount = document.querySelector(".cart-count"); // updated selector

    if (cartCount) {
        cartCount.innerText = cart.length;
        console.log("Initial cart count:", cart.length);
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const product = button.parentElement;
            const name = product.querySelector("h2").innerText;
            const price = parseFloat(
                product.querySelector(".price").innerText.replace("$", "")
            );

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));

            if (cartCount) {
                cartCount.innerText = cart.length;
                console.log("Updated cart count:", cart.length);
            }
        });
    });

    /* ---------- CART PAGE ---------- */
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems && cartTotal) {
        let total = 0;
        cartItems.innerHTML = "";

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.innerText = total.toFixed(2);
        console.log("Cart total updated:", total);
    }
});




const clearCartBtn = document.getElementById("clear-cart");

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        // Clear localStorage cart
        localStorage.removeItem("cart");
        // Clear local cart array
        cart = [];
        // Update UI
        if (cartItems) {
            cartItems.innerHTML = "<li>Your cart is empty.</li>";
        }
        if (cartTotal) {
            cartTotal.innerText = "0.00";
        }
        // Also update cart count on product page if open (optional, reload recommended)
        const cartCount = document.querySelector(".cart-count");
        if (cartCount) {
            cartCount.innerText = "0";
        }
    });
}

// Also show a friendly message if cart is empty on page load
if (cartItems && cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
}
