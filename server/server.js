const express = require('express');
var cors = require('cors');
const logic = require('./logic');

const app = express();
app.use(express.json());
app.use(cors());
const port = 8085;

let users = {
    admin: { password: "123456", name: "Admin", surname: "Admin", email: "admin@admin.pl" },
    jan: { password: "jan1234", name: "Jan", surname: "Kowalski", email: "jan@kowalski.pl" },
    test: { password: "test123", name: "Test", surname: "Test", email: "test@test.pl" }
};

app.post('/auth/login', cors(), (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    let login = request.body.login;
    let password = request.body.password;
    if (!users[login]) {
        response.json({ logged: false, message: `User not exists ${login}.` });
        return null;
    } else {
        if (users[login].password != password) {
            response.json({ logged: false, message: `Password is not valid.` });
        } else {
            response.json({ logged: true, message: `User login success ${login}.` });
        }
    }
});

let mathTools = new logic.MathTools();
app.post('/calc/add', (request, response) => {
    let a = request.body.a;
    let b = request.body.b;
    response.json(mathTools.add(a, b));
});

app.post('/calc/subtract', (request, response) => {
    let a = request.body.a;
    let b = request.body.b;
    response.json(mathTools.subtract(a, b));
});

app.post('/calc/multiply', (request, response) => {
    let a = request.body.a;
    let b = request.body.b;
    response.json(mathTools.multiply(a, b));
});

app.post('/calc/divide', (request, response) => {
    let a = request.body.a;
    let b = request.body.b;
    response.json(mathTools.divide(a, b));
});

app.post("/calc/power", (request, response) => {
    let a = request.body.a;
    let b = request.body.b;
    response.json(mathTools.power(a, b));
});

app.get('/userDetails/:login', cors(), function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    let login = request.params.login;
    let data = users[login];
    response.status(200).send(data);
});

app.get('/allUsers', cors(), function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200).send(users);
});

app.listen(port, () => console.log(`Aplikacja działa na porcie ${port}`));