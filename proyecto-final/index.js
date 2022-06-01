const express = require('express')
const app = express()
 
app.use(express.static('assets'));
app.use(express.static('node_modules'));
app.use(express.static('views'));

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/views/login.html")
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/dashboard.html")
})
app.get('/user', function(req, res) {
    res.sendFile(__dirname + "/views/user.html")
})
app.get('/customer', function(req, res) {
    res.sendFile(__dirname + "/views/customer.html")
})
app.get('/interaction', function(req, res) {
    res.sendFile(__dirname + "/views/interaction.html")
})

app.listen(3000)
console.log("Express esta corriendo en el puerto: 3000");
console.log("http://localhost:3000")

