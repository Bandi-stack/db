function addToCart(name, weight, quantity, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, weight, quantity: parseInt(quantity), image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${quantity} x ${weight} of ${name} added to cart`);
}

// cart js

        function loadCart() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const cartItemsDiv = document.getElementById("cart-items");
            let totalAmount = 0;

            if (cart.length === 0) {
                cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
                document.getElementById("cart-total").textContent = "0.00";
                return;
            }

            cartItemsDiv.innerHTML = "";

            cart.forEach((item, idx) => {
                totalAmount += item.totalPrice;
                cartItemsDiv.innerHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.product}" />
            <div class="cart-item-details">
              <strong>${item.product}</strong><br />
              Weight: ${item.weight}<br />
              Quantity: ${item.quantity}<br />
              Unit Price: ₹${item.unitPrice.toFixed(2)}<br />
              Total: ₹${item.totalPrice.toFixed(2)}
            </div>
            <div class="col-3 text-end">
            <button class="btn btn-outline-danger remove-btn" onclick="removeFromCart(${idx})">Remove</button>
        </div>
          </div>
        `;
            });

            document.getElementById("cart-total").textContent = totalAmount.toFixed(2);
        }

        function removeFromCart(index) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }

        function buyNow() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0) {
                alert("Cart is empty");
                return;
            }

            let message = "Hi, I would like to order the following:\n";
            let totalCost = 0;
            cart.forEach((item, i) => {
                let itemTotal = item.totalPrice;  
                totalCost += itemTotal;
                message += `${i + 1}. ${item.product} - ${item.weight} × ${item.quantity} item(s)  @ ₹${item.unitPrice.toFixed(2)} each = ₹${itemTotal.toFixed(2)}\n`;
            });
            message += `\nTotal Cost: ₹${totalCost.toFixed(2)}`;
            let encodedMsg = encodeURIComponent(message);
            let phone = "9951072555"; 
            window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank");
        }
        loadCart();
