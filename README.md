# Guia Examen API - SIB

El exámen está compuesto por dos aplicaciones, un backend escrito en NodeJS el cual expondráuna API REST para la interacción con la aplicación frontend

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

### Ejemplos de peticiones.

```http
GET https://sib-api.herokuapp.com
```
|Request| Parameter | Type | Description |
| ---- | --------- | ---- | ----------- |
| `GET` | [example](cuerpo-del-body-peticion-POST)| `string` |retorna todos los campos de una tabla |
| `POST` | [example](cuerpo-del-body-peticion-POST) | `object` |retorna todos los campos de una tabla |
| `PUT` | [example](cuerpo-del-body-peticion-PUT) | `object` |retorna respuesta del servidor |
| `DELETE` | [example](cuerpo-del-body-peticion-DELETE) | `object` |retorna respuesta del servidor |

### Documentacion

SIB Versions by Postman 

URL
[https://documenter.getpostman.com/view/473681/SVSLpTkd](https://documenter.getpostman.com/view/473681/SVSLpTkd)