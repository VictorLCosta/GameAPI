const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    ]
}

//Rotas
app.get('/games', (req, res) => 
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
            res.sendStatus(200);
        }
    }
});

app.listen(8080, () => 
{
    console.log('API iniciou');
});