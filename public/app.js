document.addEventListener("click", (e) => {
    if (e.target.dataset.type === "remove") {
        const id = e.target.dataset.id;

        remove(id).then(() => {
            e.target.closest(".list-group-item").remove();
        });
    }

    if (e.target.dataset.type === "edit") {
        const title = prompt();
        const id = e.target.dataset.id;
        console.log(id, title);
        edit(id, title).then(
            (e.target.closest("div").previousElementSibling.textContent =
                title),
        );
    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
}
