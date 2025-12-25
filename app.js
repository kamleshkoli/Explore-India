const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 8081;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/SignUpForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema for the Data
const ItemSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Phone: String,
    Message:String,
});

// Create a Model
const Item = mongoose.model('Item', ItemSchema);

// Route to handle GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/signup.htm'));
});

// Route to handle POST request
app.post('/formdata',async(req, res) => {
    const newItem = new Item({
        UserName: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        Message: req.body.message

    });
    console.log(newItem);
    newItem.save()
        .catch(err => console.log(err));

    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});