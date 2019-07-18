# Guia Examen API - SIB

El exámen está generado una api backend escrito en NodeJS y MongoDb el cual expondráuna API REST para la interacción con la aplicación frontend

## instalar el aplicativo

Se debe tener instalado

- nodejs
- npm

clonar el repositorio y ejecutar el comando `npm install`  

## Status Codes
devuelve los siguientes códigos de estado en el API:

| Status Code | Description |
|-------------| ----------- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR`|


## Responses
API devuelven la representación JSON de los recursos creados o editados. Sin embargo, si se envía una solicitud no válida o se produce algún otro error, devuelve una respuesta JSON en el siguiente formato:

```
{
  "message" : string,
  "success" : bool,
  "data"    : string
}
```

El atributo `mensaje` contiene un mensaje comúnmente utilizado para indicar errores o, en el caso de eliminar un recurso, el éxito de que el recurso se eliminó correctamente.

El atributo `status` describe si la transacción fue exitosa o no.

El atributo `data` contiene cualquier otro metadato asociado con la respuesta. Esta será una cadena escapada que contiene datos JSON.



### Despligue aplicacion cloud Heroku

el aplicativo se testeo con heroku subiendo el proyecto con un deploy en heroku manejando estandares de calidad en el desarrollo.

URL BACK-END
https://api-sib.herokuapp.com/


### Development Local

Ejecutar `npm run dev`  permite navegar localmente `http://localhost:3000/`. la aplicacion automaticamente se recarga segun los cambios que se afecten.

### Documentacion

SIB Versions by Postman 

URL
[https://documenter.getpostman.com/view/473681/SVSLpTkd](https://documenter.getpostman.com/view/473681/SVSLpTkd)