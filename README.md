## Aplicação web (arquitetura "típica")

Os componentes inclem:

- Cliente (web) usando JavaScrit, HTML, CSS e Handlebars.
- Servidor (backend) usando Expressjs.

Cliente faz requisição para obter temperatura para determinado endereço.
Servidor, ao receber a requisição, dispara outras duas requisições,
uma para localizar (latitute e longitde) e outra, de posse da localização,
para recuperar a temperatra.

O primeiro serviço é oferecido pelo Google. O segundo pela WeatherStack.
A hospedagem do servidor fica por conta do Heroku, configurado com as chaves
necessárias para acesso aos serviços do Google e WeatherStack.

Felizmente o Heroku é um serviço com extensa documentação. Consulte,
por exemplo, como realizar o [deploy](https://devcenter.heroku.com/articles/deploying-nodejs) de um projeto NodeJS neste serviço.

## Acesso ao Heroku

- https://kyriosdata-weather.herokuapp.com/
