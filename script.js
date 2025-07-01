const openModalBtn = document.getElementById("add-book-btn");
const exitModalBtn = document.getElementById("form-exit-btn");
const submitModalBtn = document.getElementById("form-submit");
const modal = document.getElementById("modal");
const form = document.getElementById("form-modal");
const bookshelf = document.getElementById("bookshelf");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const ratingInput = document.getElementById("rating");
const readInput = document.getElementById("read-select");
const deleteBookBtn = document.getElementById("delete-btn");

const myLibrary = [];
const colorList = [
    "#f9f9f9",
    "#f0f0f0",
    "#fdf6e3",
    "#ffe5b4",
    "#d0f0c0",
    "#d3e5ff",
    "#e0ffff",
    "#fce1e4",
    "#e6f2ff",
    "#ffffcc",
    "#e7f5e1",
    "#dbeafe",
    "#f8d7da",
    "#ffe4e1",
    "#f3f4f6"
];;

// Modal

function exitModal() {
    modal.close();
    form.reset();
}

function openModal() {
    modal.showModal();
}

function submitForm(e) {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const rating = Number(ratingInput.value);
    const read = readInput.value === "read" ? true : false;

    const book = new Book(title, author, pages, rating, read);

    addBookToShelf(book);
    exitModal();

    // test

    console.log(title);
    console.log(author);
    console.log(pages);
    console.log(rating);
    console.log(read);
    console.log(book);
}

// Create Book

function Book(title, author, pages, rating, read) {

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.read = read;
    this.color = randomColor();
}

// Bookshelf Functions

function addBookToShelf(book) {

    myLibrary.push(book);

    const bookLayout = document.createElement("div");
    const bookDesign = document.createElement("div");
    const tempDeleteBtn = document.createElement("button");

    tempDeleteBtn.classList.add("delete-btn");
    tempDeleteBtn.id = `delete-btn-${book.id}`;
    bookLayout.classList.add("one-book-input");
    bookLayout.id = `book-layout-${book.id}`;
    bookDesign.classList.add("book");
    bookDesign.style.backgroundColor = book.color;

    bookDesign.innerHTML = `<div class="book">
                        <div class="upper-book">
                            <p class="book-title">${book.title}
                            </p>
                            <p class="subtext">By: ${book.author}</p>
                        </div>
                        <div class="lower-book">
                            <p class="subtext">Pages: ${book.pages}</p>
                            <p class="subtext">Status: ${book.read ? "Read" : "Plan to Read"}</p>
                            <p class="subtext">Your Rating: ${book.rating}/10</p>
                        </div>
                    </div>`;

    bookLayout.appendChild(bookDesign);
    bookLayout.appendChild(tempDeleteBtn);
    bookshelf.appendChild(bookLayout);
}

function randomColor() {
    const num = Math.floor(Math.random() * 15);
    return colorList[num];
}

// Event Listeners

openModalBtn.addEventListener("click", openModal);
exitModalBtn.addEventListener("click", exitModal);
form.addEventListener("submit", (e) => submitForm(e));
