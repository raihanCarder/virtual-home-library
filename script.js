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
const totalBooksStat = document.getElementById("total-book-stat");
const booksReadStat = document.getElementById("books-read-stat");
const planToReadStat = document.getElementById("not-read-stat");
const avgRatingStat = document.getElementById("average-score-stat");

const myLibrary = [];
const colorList = [
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
    "#ffd6d6",
    "#ffb3c6",
    "#fbc4ab",
    "#f3c4fb",
    "#e0bbff",
    "#dabfff"
];

// Testing

const exampleBook = new Book("Title", "Author", 10000, 10, true);
addBookToShelf(exampleBook);

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
    tempDeleteBtn.textContent = "Delete";

    bookLayout.classList.add("one-book-input");
    bookLayout.id = `book-layout-${book.id}`;

    bookDesign.classList.add("book");
    bookDesign.style.backgroundColor = book.color;

    bookDesign.innerHTML = `<div class="upper-book">
                            <p class="book-title">${book.title}
                            </p>
                            <p class="subtext">By: ${book.author}</p>
                        </div>
                        <div class="lower-book">
                            <p class="subtext">Pages: ${book.pages}</p>
                            <p class="subtext">Your Rating: ${book.rating}/10</p>
                            <p class="subtext read-status"><span class="subtext">Status:</span> <button class="${book.read ? "read" : "plan-to-read"} read-btn" id="read-btn-${book.id}">${book.read ? "Read" : "Plan to Read"}</button></p>
                        </div>`;

    bookLayout.appendChild(bookDesign);
    bookLayout.appendChild(tempDeleteBtn);
    bookshelf.appendChild(bookLayout);
    tempDeleteBtn.addEventListener("click", (e) => deleteBook(e.target.id));

    const readBtn = bookDesign.querySelector(".read-btn");
    readBtn.addEventListener("click", (e) => updateReadStatus(e));

    updateStats();
}

function updateReadStatus(e) {
    const id = e.target.id.substring(9);
    const btn = e.target;

    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary[index].read = !myLibrary[index].read;


    if (btn.classList.contains("read")) {
        btn.textContent = "Plan to Read";
        btn.classList.add("plan-to-read");
        btn.classList.remove("read");
    }
    else {
        btn.textContent = "Read"
        btn.classList.add("read");
        btn.classList.remove("plan-to-read");
    }

    updateStats();
}

function randomColor() {
    const num = Math.floor(Math.random() * 18);
    return colorList[num];
}

function deleteBook(oldId) {
    const id = oldId.substring(11);

    const element = document.getElementById(`book-layout-${id}`);
    element.remove();

    const index = myLibrary.findIndex(book => book.id === id);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    updateStats();
}

// Stats Functions

function updateStats() {

    if (myLibrary.length === 0) {
        totalBooksStat.textContent = 0;
        avgRatingStat.textContent = 0;
        booksReadStat.textContent = 0;
        planToReadStat.textContent = 0;
        return;
    }

    const totalBooks = myLibrary.length;
    const averageScore = Number((myLibrary.filter((book) => book.rating !== 0).map((book) => book.rating).reduce((acc, el) => acc + el, 0) / myLibrary.filter((book) => book.rating !== 0).length).toFixed(2));
    const booksRead = myLibrary.filter((book) => book.read === true).length;
    const planToRead = myLibrary.filter((book) => book.read === false).length;

    totalBooksStat.textContent = totalBooks;
    avgRatingStat.textContent = `${averageScore}/10`;
    booksReadStat.textContent = booksRead;
    planToReadStat.textContent = planToRead;
}

// Event Listeners

openModalBtn.addEventListener("click", openModal);
exitModalBtn.addEventListener("click", exitModal);
form.addEventListener("submit", (e) => submitForm(e));
