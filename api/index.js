const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const lists = require('./routes/lists');
const tasks = require('./routes/tasks');
const app = express();

const PORT = process.env.PORT || 5000;

// midleware 
app.use(express.json());

// connect to database
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) throw new Error("k databazi se nejde pripojit");
    console.log("pripojeno uspesne k databazi");
});

app.use("/api/lists", lists);
app.use("/api/tasks", tasks);

app.listen(PORT, () => {
    console.log(`Server bezi na portu ${PORT}`);
}) 