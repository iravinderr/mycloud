// IMPORTING THE .env CONFIGURATION
require("dotenv").config();
const dbConnect = require("./config/database.config");
const cdConnect = require("./config/cloudinary.config");
const PORT = process.env.PORT || 3001;


// INITIALISING THE EXPRESS APP/SERVER
const app = require("./app");


// CONNECTING THE SERVER WITH CLOUDINARY
cdConnect();


// CONNECTING THE SERVER WITH THE DATABASE
dbConnect()
.then(() => {
    // ACTIVATING THE SERVER TO LISTEN
    app.listen(PORT, () => {
        console.log(`\nServer is listening at the port no. ${PORT}. Checkout at http://localhost:${PORT}`);
    })
})


app.get('/', (req, res) => {
    res.send(`<h1>HOMEPAGE</h1>`)
})
