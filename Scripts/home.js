const buyBtns = document.querySelectorAll(".ticket-buy-btn");
const closeModalBtn = document.querySelector(".ti-close");
const ticket_modal = document.querySelector(".ticket-modal");

buyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // const activatedPanel =  panel.closest(".navBar").querySelector(".active");
        openModal(ticket_modal);
    })
})

// closeModalBtn.addEventListener("click", closeModal(ticket_modal));

closeModalBtn.addEventListener("click", () => {
    closeModal(ticket_modal);
});

function closeModal(modal) {
    modal.classList.remove("active");
    console.log("Deactivate ", modal, " modal sucessfully.");
}

function openModal(modal) {
    modal.classList.add("active");
    console.log("Modal ", ticket_modal, " activated.");
}