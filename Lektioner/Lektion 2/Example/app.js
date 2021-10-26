// Importera
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const faker = require("faker/locale/sv"); // fake data (in swedish)
const app = express();

// Port för anslutning
const port = process.env.PORT || 3000; // Heroku sparar använd port i process.env.PORT 

// Skapa en instans av express


// Alla användare
const users = { "users": [] }; // tom array av användare

// Generera 10 slumpmässiga användare vid start
generateUsers(10);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Skapa statisk sökväg
app.use(express.static(path.join(__dirname, 'public')));

// GET: Alla användare
app.get('/api/users', function (req, res) {
    res.status(200).send(users);
});

// POST: Lägg till ny användare
app.post('/api/users/add', function (req, res) {
    const random = req.body.random;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    let user = null;

    if (random) {
        // Skapa en helt slumpad användare
        user = generateUser();
    }
    else if (firstName && lastName && email) {
        // Skapa en användare (kommer bara lägga till ett slumpat uuid)
        user = generateUser(firstName, lastName, email);
    }

    // Skapades någon användare?
    if (user) {
        users.users.push(user);
        res.status(201).send({ user: user });  // 201 Created
    }
    else {
        res.status(400).send({ message: "First name, last name and / or email are missing." });  // 400 Bad Request
    }
});

// Genererar x st användare och lägger in i vår users
function generateUsers(numberOfUsers) {
    for (let index = 0; index < numberOfUsers; index++) {
        users.users.push(generateUser());
    }
}

// Genererar och returnerar en användare
function generateUser(firstName = null, lastName = null, email = null) {
    const newFirstName = firstName ? firstName : faker.name.firstName();
    const newLastName = lastName ? lastName : faker.name.lastName();
    const newEmail = email ? email :
        newFirstName.toLowerCase() + '.' +
        newLastName.toLowerCase() + '@' +
        faker.internet.domainWord() + '.' +
        faker.internet.domainSuffix();

    const user = {
        "uuid": faker.random.uuid(),
        "firstName": newFirstName,
        "lastName": newLastName,
        "email": newEmail
    };

    return user;
}

// Starta servern
app.listen(port, function () {
    console.log("Server running on port " + port);
});