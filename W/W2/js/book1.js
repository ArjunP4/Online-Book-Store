// ===== BOOK DATA =====
let book = {
    id: 1,
    name: "The Art of Programming",
    price: 999,
    stock: 4
};

// Load saved stock if exists
let savedStock = localStorage.getItem("stock_" + book.id);
if (savedStock !== null) {
    book.stock = parseInt(savedStock);
}

// Display Book Info
document.getElementById("book-title").innerHTML =
    "Title: " + book.name;

document.getElementById("book-price").innerHTML =
    "Price: ₹" + book.price;

document.getElementById("book-stock").innerHTML =
    "In Stock: " + book.stock;

let quantityInput = document.getElementById("quantity");
quantityInput.max = book.stock;


// ===== TOAST FUNCTION =====
function showToast(message) {

    let toast = document.getElementById("toast");

    toast.innerHTML = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2000);
}


// ===== CALCULATE + ADD TO CART =====
function calculateBill() {

    let quantity = parseInt(quantityInput.value);

    if (!quantity || quantity <= 0) {
        showToast("Enter valid quantity");
        return;
    }

    if (quantity > book.stock) {
        showToast("Cannot add more than available stock!");
        return;
    }

    // Task 3 - Calculate total
    let total = book.price * quantity;

    document.getElementById("totalPrice").innerHTML =
        "Total Price: ₹" + total;

    // Task 4 - Apply discount
    let finalPrice = total;

    if (total > 1000) {
        finalPrice = total - (total * 0.10);
    }

    document.getElementById("finalPrice").innerHTML =
        "Final Price (after discount): ₹" + finalPrice;

    // ===== ADD TO CART =====
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let i = 0; i < quantity; i++) {
        cart.push({
            id: book.id,
            name: book.name,
            price: book.price
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Reduce stock
    book.stock -= quantity;

    localStorage.setItem("stock_" + book.id, book.stock);

    // Update UI
    document.getElementById("book-stock").innerHTML =
        "In Stock: " + book.stock;

    quantityInput.max = book.stock;
    quantityInput.value = "";

    if (book.stock === 0) {
        showToast("Book is now Out of Stock!");
    } else {
        showToast("Added to cart!");
    }
}
