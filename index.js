const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

const version = pkg.version;
console.log("version:", version);

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        await printNotes();
    },
});

yargs.command({
    command: "remove",
    describe: "Remove note",
    builder: {
        id: {
            type: "string",
            describe: "Remove note from list",
            demandOption: true,
        },
    },
    async handler({ id }) {
        await removeNote(id);
    },
});

yargs.parse();
