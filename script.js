const addBookBtn = document.getElementById("add-book-btn");
const closeBtn = document.getElementById("close-btn");

const modal = document.getElementById("modal");

addBookBtn.addEventListener("click",
    () => modal.showModal()
);

closeBtn.addEventListener("click", () => modal.close());