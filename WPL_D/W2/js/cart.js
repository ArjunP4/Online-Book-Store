function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cartContainer");
    let emptyMessage = document.getElementById("emptyMessage");

    container.innerHTML = "";

    if (cart.length === 0) {

    emptyMessage.style.display = "block";
    document.getElementById("itemCount").innerHTML = "";
    document.getElementById("totalAmount").innerHTML = "";
    document.getElementById("discountAmount").innerHTML = "";
    document.getElementById("finalAmount").innerHTML = "";
    return;
    }


    document.getElementById("itemCount").innerHTML =
    "Items in Cart: " + cart.length;


    let total = 0;

    cart.forEach(function(item) {

        total += item.price;

        let div = document.createElement("div");
        div.className = "cart-card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
        `;

        container.appendChild(div);
    });

    document.getElementById("totalAmount").innerHTML =
        "Total Amount: ₹" + total;

    let discount = 0;
    let finalAmount = total;

    if (total > 1000) {
        discount = total * 0.10;
        finalAmount = total - discount;
    }

    document.getElementById("discountAmount").innerHTML =
        "Discount: ₹" + discount;

    document.getElementById("finalAmount").innerHTML =
        "Final Payable Amount: ₹" + finalAmount;
}

function clearCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(function(item) {

        let stockKey = "stock_" + item.id;

        let currentStock = localStorage.getItem(stockKey);

        if (currentStock !== null) {
            localStorage.setItem(
                stockKey,
                parseInt(currentStock) + 1
            );
        }
    });

    localStorage.removeItem("cart");

    displayCart();
}


window.onload = displayCart;
