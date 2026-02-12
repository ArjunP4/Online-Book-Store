let book = {
    id: 4,
    name: "Web Development Basics",
    price: 650,
    stock: 5
};

let savedStock = localStorage.getItem("stock_" + book.id);
if (savedStock !== null) {
    book.stock = parseInt(savedStock);
}

document.getElementById("book-title").innerHTML =
    "Title: " + book.name;

document.getElementById("book-price").innerHTML =
    "Price: ₹" + book.price;

document.getElementById("book-stock").innerHTML =
    "In Stock: " + book.stock;

let quantityInput = document.getElementById("quantity");
quantityInput.max = book.stock;


function showToast(message) {
    let toast = document.getElementById("toast");
    toast.innerHTML = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}


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

    let total = book.price * quantity;
    document.getElementById("totalPrice").innerHTML =
        "Total Price: ₹" + total;

    let finalPrice = total;
    if (total > 1000) {
        finalPrice = total - (total * 0.10);
    }

    document.getElementById("finalPrice").innerHTML =
        "Final Price (after discount): ₹" + finalPrice;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    for (let i = 0; i < quantity; i++) {
        cart.push({
            id: book.id,
            name: book.name,
            price: book.price
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    book.stock -= quantity;
    localStorage.setItem("stock_" + book.id, book.stock);

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
