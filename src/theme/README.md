# theme

## Descripción

En **theme** se pone todo lo relacionado al UI, a la identidad de la aplicación, fuentes, colores, tamaños.

Normalmente solo se cuenta con estos archivos, en **Colors.ts** se definen todos los hexadecimales de los colores usados en el diseño proporcionado.

    const Colors = {
      PrimaryColor: '#000000',
      Accent: '#FFFFFF',
      PrimaryText: '#111111'
    };
**Fonts.ts** se define solo en caso de que el diseño tenga fuentes personalizadas, aquí se definen todas las variantes de la fuente proporcionada.

    const Fonts = {
      Regular: 'Roboto',
      Bold: 'Roboto-Bold',
      Light: 'Roboto-Light'
    };

En **Sizes.ts** se ponen todos los tamaños comunes, como el tamaño de los textos que normalmente según el tipo (titulo, subtitulo) siempre es el mismo tamaño, además de otros tamaños usados en muchas partes como podría ser el padding o margin horizontal en todas las pantallas.

    const Sizes = {
      Title: 20,
      Subtitle: 18,
      Padding: 16
    };

En el archivo **index.ts** se exportan todos los archivos que definamos en **theme**.
