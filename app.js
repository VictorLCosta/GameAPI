const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
});

app.listen(8080, () => 
{
    console.log('API iniciou');
});