# screens

## Descripción

En **screens** van todas las pantallas de la aplicación, se organizan de la siguiente manera:

    auth/
    ---Login/
    ------LoginController
    ------LoginScreen

La carpetas principales separan las navegaciones independientes (Ej. Flujo de autenticación, flujo de home).
Para el nombre de las carpetas deben ser nombre descriptivos, alusivos a la sección/página que va a contener, si esta carpeta contiene más carpetas debe iniciar con minúscula, si es una carpeta final debe iniciar con mayúscula, las carpetas finales contienen los archivos de código, el nombre de los archivos debe llevar el mismo nombre de carpeta ademas del sufijo Screen o Controller.
Ejemplo:

    Home/
    ---HomeController
    ---HomeScreen

El Screen lleva todo el código relacionado al UI, y lógica relacionada al render.
El Controller lleva toda la lógica de procesado de datos, lógica de negocio, aquí si es el caso se hace el llamado a los dispatch de redux, etc.
La estructura básica del render es

    <SafeArea>
      <HomeScreen />
    </SafeArea>

También en el Controller se ponen los modals, alerts que necesite la pantalla.
