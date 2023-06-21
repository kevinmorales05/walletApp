# utils

## Descripción

En **utils** metemos todos los archivos que nos sirven en la aplicación y que no entra en ninguna de las otras secciones, Ej. archivos de validaciones que pueden usarse en muchos formularios, también definimos aquí tipos que no se relacionan a redux, por ejemplo los tipos de los parámetros de navegación.

    export type AuthStackParams = {
      SignUp: undefined;
      Login: undefined;
      ForgotPassword: undefined;
    }
O podemos definir funciones de uso general como podría ser una transformación de texto, de fechas, algún manejador de errores, etc.
