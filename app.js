const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => 
{
    
});

app.listen(8080, () => 
{
    console.log('API iniciou');
});