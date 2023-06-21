# routes

## Descripción

En **routes** definimos todo lo relacionado a React Navigation, todas las rutas de la aplicación van aquí.

### NavContainer

Este archivo es prácticamente estático su estructura siempre es la misma, el NavigationContainer tiene el AppNavigator.

### AppNavigator

En el AppNavigator se meten todas las navegaciones "independientes" que tendrá el App, aquí se manejan las condiciones para renderizar una ruta u otra, ejemplo: según el estado de autenticación renderizamos las rutas de auth o las rutas de home.

### Stacks, BottomTabs, Drawer, etc

En **routes** se crean los archivos de navegación que necesitamos ya sean drawers, stacks, o cualquier otro disponible en React Navigation.
La forma de nombrar estos archivos es **SectionStack** donde Section es un titulo representativo de la navegación y Stack el tipo de navegación. Ej. **AuthStack** es el nombre para la navegación tipo stack de la autenticación las cuales pueden incluir el Login, Registro, Recuperar contraseña, etc.
