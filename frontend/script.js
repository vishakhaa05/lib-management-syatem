// ===== GLOBAL VARIABLES =====
let currentRole = "";

// Default Book Data (Frontend Only)
let books = [
    { id: 1, name: "Java Basics", author: "James Gosling" },
    { id: 2, name: "Python Guide", author: "Guido van Rossum" },
    { id: 3, name: "HTML & CSS", author: "John Smith" }
];

let issuedBooks = [];


// ===== LOGIN FUNCTION =====
function login() {
    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (role === "" || username === "" || password === "") {
        alert("All fields are mandatory!");
        return;
    }

    currentRole = role;

    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    document.getElementById("welcomeText").innerText =
        "Welcome " + username + " (" + role.toUpperCase() + ")";

    // Hide Add Book button for user
    if (role === "user") {
        document.getElementById("addBookBtn").style.display = "none";
    }
}


// ===== LOGOUT =====
function logout() {
    location.reload();
}


// ===== SHOW SECTIONS =====
function showSection(id) {
    document.querySelectorAll(".container").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    if (id === "booksSection") {
        displayBooks();
    }
}


// ===== BACK TO DASHBOARD =====
function back() {
    document.querySelectorAll(".container").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById("dashboard").classList.remove("hidden");
}


// ===== DISPLAY BOOKS =====
function displayBooks() {
    let list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach(book => {
        list.innerHTML += `<li>${book.name} - ${book.author}</li>`;
    });
}


// ===== SEARCH BOOK =====
function searchBook() {
    let keyword = document.getElementById("search").value.toLowerCase();
    let list = document.getElementById("bookList");
    list.innerHTML = "";

    if (keyword === "") {
        alert("Please enter book name to search!");
        displayBooks();
        return;
    }

    let found = false;

    books.forEach(book => {
        if (book.name.toLowerCase().includes(keyword)) {
            list.innerHTML += `<li>${book.name} - ${book.author}</li>`;
            found = true;
        }
    });

    if (!found) {
        list.innerHTML = "<li>No book found!</li>";
    }
}


// ===== ISSUE BOOK =====
function issueBook() {
    let name = document.getElementById("issueBookName").value;
    let issueDate = document.getElementById("issueDate").value;
    let returnDate = document.getElementById("returnDate").value;
    let remarks = document.getElementById("remarks").value;

    if (name === "" || issueDate === "" || returnDate === "") {
        alert("All fields except remarks are mandatory!");
        return;
    }

    if (returnDate <= issueDate) {
        alert("Return date must be after issue date!");
        return;
    }

    let bookExists = books.some(book => book.name === name);

    if (!bookExists) {
        alert("Book not found in library!");
        return;
    }

    issuedBooks.push({
        name: name,
        issueDate: issueDate,
        returnDate: returnDate,
        remarks: remarks
    });

    alert("Book Issued Successfully!");

    // Clear fields
    document.getElementById("issueBookName").value = "";
    document.getElementById("issueDate").value = "";
    document.getElementById("returnDate").value = "";
    document.getElementById("remarks").value = "";
}


// ===== RETURN BOOK =====
function returnBook() {
    let name = document.getElementById("returnBookName").value;

    if (name === "") {
        alert("Enter book name!");
        return;
    }

    let index = issuedBooks.findIndex(book => book.name === name);

    if (index !== -1) {
        issuedBooks.splice(index, 1);
        alert("Book Returned Successfully!");
    } else {
        alert("This book was not issued!");
    }

    document.getElementById("returnBookName").value = "";
}


// ===== ADD BOOK (ADMIN ONLY) =====
function addBook() {
    if (currentRole !== "admin") {
        alert("Only Admin can add books!");
        return;
    }

    let name = document.getElementById("newBookName").value;
    let author = document.getElementById("authorName").value;

    if (name === "" || author === "") {
        alert("All fields are mandatory!");
        return;
    }

    books.push({
        id: books.length + 1,
        name: name,
        author: author
    });

    alert("Book Added Successfully!");

    document.getElementById("newBookName").value = "";
    document.getElementById("authorName").value = "";
}
