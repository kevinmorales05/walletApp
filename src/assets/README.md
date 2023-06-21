# assets

## Descripción

En los **assets** se almacenan todos los archivos que requiera la aplicación, deben ordenarse según el tipo de archivo, Ej. los archivos de imagen (.png, .jpg, etc.) van dentro de **images/** los archivos svg van dentro de **svgs/** todas las rutas que generemos deben llevar su archivo **index.ts** el cual debe incluir los export de estos archivos.

Ej. **images/index.ts**

    import EXAMPLE_IMAGE from  './example-image.png';
    
    export {
      EXAMPLE_IMAGE
    };

Los nombres van en mayúsculas ya que son constantes.
