# GameAPI
API made in Node JS for the registration and management of game information and users cookies.

## Transacões

### GET /games

Este _endpoint_ é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### Parametros
Nenhum

##### OK! 200
Caso você receba esse código, você vai receber a listagem de todos os games.
Exemplo de resposta:
```
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
```

##### Falha de autenticação! 401
Caso isso aconteça, ocorreu alguma falha no processo de autenticação.
Exemplo de resposta:

```
{
    "err": "Token inválido!"
}
```

### POST /auth
Endpoint responsável pelo processo de login.

#### Parametros
**email**: E-mail do usuário cadastrado no sistema.

**password**: Senha do usuário cadastrado no sistema.

Exemplo:
```
{
    "email": "seuemail@outlook.com",
    "password": "12345"
}
```

##### OK! 200
Esta resposta é enviada juntamente com o token.

Exemplo:
```
{
    "token": "oasdafsd//cz{`b[233ga-="
}
```

##### Badrequest! 400
Falha acontece quando o usuário não informa o email na requisição ou quando ele vem com um valor nulo.

##### Notfound! 404
Ocorre quando o email utilizado como parametro não é encontrado no banco de dados.

##### Falha de autenticação! 401
Caso isso aconteça, ocorreu alguma falha no processo de autenticação.
