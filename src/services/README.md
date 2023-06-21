# services

## Descripción

En los servicios se hace todo el llamado a los endpoints, a las apis, toda la lógica que se tiene en **Api/** se llama en los servicios, aquí se hace el procesado de data, el procesado de las respuestas y se retorna, estos servicios normalmente deben ser llamados en las acciones.

El formato del nombre del archivo debe ser **section.services.ts** donde section es el nombre que identifica al servicio, por ejemplo todos los servicios relacionados a la autenticación van en **auth.services.ts**.

En el archivo **index.ts** se exportan todos los archivos de services definidos.
