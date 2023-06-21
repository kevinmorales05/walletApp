# i18n

## Descripción

En **i18n** el archivo **index.ts** contiene la configuración necesaria para la internacionalización en los resources se incluyen todos los idiomas disponibles en la app.

En la carpeta **translations/** se colocan todos los json de traducciones, con la siguiente estructura

    {
      "screenName": {
        "title": "Titulo"
      }
    }

Donde **screenName** es el nombre de la screen o sección donde se usan estas traducciones y **title** es el nombre que le damos al texto de traducción.

Para las traducciones generales como pueden ser Aceptar, Cancelar, Sí, No, etc. Podemos incluirlas en **global**.

    {
      "global": {
        "accept": "Aceptar",
        "cancel": "Cancelar"
      }
    }
