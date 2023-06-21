# Api

## Descripción

En **http** va la configuración a todos los endpoints/servicios a los que se tenga que apuntar, si solo se necesita un endpoint (Ej. api.citi.com) todo va sobre **Api.ts** todo va sobre este archivo, aquí se configuran los métodos http debidos para el endpoint (GET, POST, PUT, etc).

Si se llegan a tener varios endpoint (Ej. api.google.com, api.facebook.com) generamos un archivo de configuración con los verbos http para cada servicio.
Ejemplo: Google.ts, Facebook.ts

En **index.ts** se exponen todos los archivos de api que se tengan.
