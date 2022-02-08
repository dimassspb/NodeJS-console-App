// const http = require("http");
// const chalk = require("chalk");
// const fs = require("fs/promises");
// const path = require("path");
// const { addNote } = require("./notes.controller");

// const port = 4000;
// const basePath = path.join(__dirname, "pages");

// const server = http.createServer(async (req, res) => {
//     if (req.method === "GET") {
//         const content = await fs.readFile(path.join(basePath, "index.html"));
//         res.setHeader("Content-Type", "text/html");
//         res.writeHead(200);
//         res.end(content);
//     } else if (req.method === "POST") {
//                 res.setHeader("Content-Type", "text/plain", "utf8");
//                 res.writeHead(200);
//         const body = [];
//         req.on("data", (data) => {
//             body.push(Buffer.from(data));
//         });
//         req.on("end", () => {
//             const title = body.toString().split("=")[1].replaceAll("+", " ");
//             console.log();
//             addNote(title);
//             res.end(`Title = ${title}`);
//         });

//     }
// });

// server.listen(port, () => {
//     console.log(chalk.green(`Server has been started on port ${port}`));
// });

const fs = require("fs/promises");
const path = require("path");

const express = require("express");
const chalk = require("chalk");
const {
    addNote,
    getNotes,
    removeNote,
    editNote,
} = require("./notes.controller");

const port = 4000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true,
    });
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.put("/:id", async (req, res) => {
    await editNote(req.params.id, req.body.title);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`));
});
