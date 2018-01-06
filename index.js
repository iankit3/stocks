const express = require("express"),
bodyParser = require("body-parser"),
app = express();
router = require("./routes");

var connection = require('./database/connector');

app.set('port', (process.env.PORT || 9999) );
;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/app/build/index.html")
})
app.use("/api/", router);

app.use(express.static("public/app/build"));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/'));

app.listen(app.get("port"), () => {
console.info("Listening on port "+ app.get("port") );
});
