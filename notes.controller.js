const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const { log } = require("console");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    // const notes = require("./db.json")
    // const buffer = await fs.readFile(notesPath);
    // const notes = JSON.parse(Buffer.from(buffer).toString('utf-8'))
    const notes = await getNotes();
    const note = {
        id: Date.now().toString(),
        title,
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green.inverse("Note was added"));
}
// addNote("Test!!!");

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue("Here is the list of nodes:"));
    notes.forEach((note) =>
        console.log(
            chalk.green(`ID: ${note.id}`),
            chalk.blue(`TITLE: ${note.title}`),
        ),
    );
}

async function removeNote(id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.red("Note was removed"));
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function editNote(id, title) {
    console.log(id, title);
    const notes = await getNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);
    notes[noteIndex].title = title;
    await saveNotes(notes);
    console.log(chalk.bgGreen(` Note with id: ${id} updated successfully! `));
}

module.exports = {
    addNote,
    printNotes,
    removeNote,
    getNotes,
    editNote,
};
