let books = [
    { name: "The Art of Programming", stock: 4 },
    { name: "Clean Code", stock: 3 },
    { name: "Introduction to Algorithms", stock: 2 },
    { name: "Web Development Basics", stock: 5 }
];

let bookList = document.getElementById("bookList");

for (let i = 0; i < books.length; i++) {

    let li = document.createElement("li");

    if (books[i].stock > 0) {
        li.innerText = books[i].name + " (In Stock: " + books[i].stock + ")";
    } else {
        li.innerText = books[i].name + " (Out of Stock)";
    }

    bookList.appendChild(li);
}

function searchBook() {

    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let result = document.getElementById("searchResult");

    let found = false;

    for (let i = 0; i < books.length; i++) {

        if (books[i].name.toLowerCase().includes(searchText)) {

            let savedStock = localStorage.getItem("stock_" + books[i].id);

            let currentStock = savedStock !== null
                ? parseInt(savedStock)
                : books[i].stock;

            if (currentStock > 0) {
                result.innerHTML = "Book Available (Stock: " + currentStock + ")";
                result.style.color = "#4CAF50";
            } else {
                result.innerHTML = "Out of Stock";
                result.style.color = "#ff4d4d";
            }

            found = true;
            break;
        }
    }

    if (!found) {
        result.innerHTML = "Book Not Available";
        result.style.color = "#ff4d4d";
    }
}

