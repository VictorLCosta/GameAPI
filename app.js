const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const jwtSecret = "ZU30o5HXQSzMknsH2dotE2ZwQqLqJxA8";

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function auth(req, res, next)
{
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined)
    {
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err)
            {
                res.sendStatus(401).send("Token inválido");
            }
            else
            {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    }
    else
    {
        res.sendStatus(401).send("Credenciais inválidas");
    }
}

var DB = 
{
    games: 
    [
        {
            id: 1,
            title: "Half Life 2",
            year: 2012,
            price: 20
        },
        {
            id: 2,
            title: "Metal Gear Solid 3 - Snake Eater",
            year: 2005,
            price: 20
        },
        {
            id: 3,
            title: "Elder Scrolls 5 - Skyrim",
            year: 2011,
            price: 40
        }
    ],
    users:
    [
        {
            id: 1,
            userName: "Victor Lima",
            email: "victorlc2019@outlook.com",
            password: "vulcan"
        }
    ]
}

//Rotas
app.get('/games', auth, (req, res) => 
{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/games/:id', (req, res) => 
{
    if(!isNaN(req.params.id))
    {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined)
        {
            res.statusCode = 200;
            res.json(game);
        }
        else
        {
            res.sendStatus(404);
        }
    }
    else
    {
        res.sendStatus(400);
    }
});

app.post('/games/save', (req, res) => 
{
    var { title, price, year } = req.body;

    DB.games.push = ({
        id: 4,
        title,
        price,
        year
    });

    res.sendStatus(201);
});

app.put('/games/update/:id', (req, res) => 
{
    if(isNaN(req.params.id))
    {
        var id = parseInt(req.params.id);

        var game = DB.games.findIndex(g => g.id == id);

        if(game != undefined)
        {
            var {title, price, year} = req.body;

            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price;
            }

            if(year != undefined){
                game.year = year;
            }
        }
        else
        {
            res.sendStatus(400).send('Game not exist')
        }
    }
    else
    {
        res.sendStatus(400);
    }
});

app.delete('/games/delete/:id', (req, res) => 
{
    if(isNaN(req.params.id))
    {
        res.sendStatus(400);
    }
    else
    {
        var id = parseInt(req.params.id);

        var index = DB.games.findIndex(g => g.id == id);
        if(index == -1)
        {
            res.sendStatus(404);
        }
        else
        {
            DB.games.splice(index, 1);
            res.sendStatus(200).send("Email inválido");
        }
    }
});

app.post('/auth', (req, res) => 
{
    var {email, password} = req.body;

    if(email != undefined)
    {
        var user = DB.users.find(u => u.email == email);

        if(user != undefined)
        {
            if(user.password == password)
            {
                jwt.sign
                (
                    {id: user.id, email: user.email}, 
                    jwtSecret, 
                    {
                        algorithm: "HS256",
                        expiresIn: '100h'
                    },
                (err, token) => {
                    if(err)
                    {
                        res.sendStatus(400).send("Falha interna");
                    }
                    else
                    {
                        res.sendStatus(200).send(token);
                    }
                });
            }
            else
            {
                res.sendStatus(401).send("Credenciais inválidas");
            }
        }
        else
        {
            res.sendStatus(404).send("Email não existe na base de dados");
        }
    }
    else
    {
        res.sendStatus(400);
    }

});

app.listen(8080, () => 
{
    console.log('API iniciou');
});