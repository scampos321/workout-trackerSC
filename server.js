const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

app.use(require("./routes/apiRoute.js"))
app.use(require("./routes/htmlRoute.js"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static("public"));
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}!`);
})