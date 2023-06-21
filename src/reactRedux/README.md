# reactRedux

## Descripción

Se almacena todo lo necesario para la estructura de redux

### actions

En **actions** van todos los archivos donde se definen las acciones requeridas, la estructura del nombre del archivo es **section.actions.ts** donde section es el nombre que identifica a la acción, por ejemplo todas las acciones relacionadas a la autenticación van en **auth.actions.ts** dentro de estos archivos encontramos las acciones que cambian el estado en redux.

    export  const  setIsLogged  = (data:  boolean): AuthActionTypes => ({
      type: SET_IS_LOGGED,
      data
    });
Estas acciones van en la parte superior del archivo, terminando este tipo de acciones se definen los middleware (thunks) para poder procesar la data necesaria de los servicios.

En el archivo **index.ts** se exportan todos los archivos de actions definidos.

### reducers

Se definen los estados que almacenará redux, la estructura del nombre es **section.reducer.ts** donde section es el nombre que identifica al reducer, por ejemplo el reducer que llevara todo el estado relacionado con la autenticación van en **auth.reducer.ts**

En el archivo **index.ts** se combinan todos los reducers y se exportan en el rootReducer.

### types

En los **types** definimos todos los tipos relacionados con el state de redux, todo lo usado en redux se define aquí, los objetos de los reducers, el tipado de las actions, las constantes (types) de las acciones etc.
El tipo de las acciones las definimos de la siguiente manera

    interface SetIsLoggedAction {
      type:  typeof SET_IS_LOGGED;
      data:  boolean;
    }
Al final definimos los tipos de las acciones en un solo tipo

    export  type AuthActionTypes = SetIsLoggedAction;

Así al crear las acciones de autenticación las definimos con el tipo **AuthActionTypes**

En el archivo **index.ts** se exportan todos los archivos de types definidos.

En **reactRedux/** también tenemos el archivo **store.ts** en la cual se crea la store con la configuración necesaria para la persistencia de datos.

Por último en el archivo **index.ts** exportamos las actions, reducers, y types.
