# Instrucciones

0. Seguimos las intrucciones en el readme.md que está en la carpeta del api para arrancar esta, antes de empezar con el frontend.
1. Corremos npm install en terminal para instalar los modulos necesarios.
2. Ejectuamos ng serve para arrancar en local la aplicacion, en el puerto 4200 (localhost:4200)


# Explicacion parte 2 del ejercicio

He decidido utilizar Angular, ya que tengo entendido que es lo que utilizais en Armadillo Amarillo y que, además de tener experiencia con ello, hace poco termine un curso, asi que tomo esta prueba como una oportunidad para practicar mis conocimientos. No seria el framework más adecuado para este tipo de proyecto, ya que está más pensado para aplicaciones grandes y medianas, gracias a lo completa que es la "caja de herramientas" con la que viene, pero creo que es interesante desarrollarlo así. He utilizado algunas de estas herramientas para sacarle provecho.

Para darle un poco de "brillo" a la página, utilizo Material y scss, ya que prefiero dedicar el tiempo de la prueba a la parte funcional más que la estética. 

TODO: Mejorar estructura de la pagina, añadir paginacion


## EXPLICACIÓN DE ESTRUCTURA DEL EJERCICIO 

### RAIZ

- App.component.ts: Componente principal que contiene los demás. También contiene la barra de navegacion, la cual podría haber encapsulado en otro componente. Sus contenidos cambian segun si el usuario esta logeado o no gracias a ngIf.
- App.routes.ts : Rutas de nuestra aplicación, servidas con la librería de router de Angular.
- App.config.ts: Define la configuración de la aplicación, declarando librerias que importamos y ciertas partes del comportamiento de nuestro proyecto.

### Carpetas

-Components: Los componentes web son el bloque de construccion básico de UI en Angular. En mi proyecto tenemos los siguientes:

    -Login: Pantalla de login, la cual se comunica con mi API que comunica con Firebase. He utilizado la librería de formularios reactivos de Angular, y esto interactua con la Autenticación de Firebase para el resto de la aplicación. 

    -Register: Formulario de registro. También he utilizado la librería de formularios reactivos de Angular, pero en este caso, interactuamos con Firestore para almacenar los datos. Cabe destacar que los formularios de Angular son muy potentes, aunque no sea necesario explimir ese potencial al máximo aquí.

    -Movie-list: Listado de peliculas, tanto las que están en cartelera como las populares. Este listado es dinamico segun los datos que esten en este momento en TMDB

    -Movie-detail: Información de pelicula detallada y su reparto. La ruta se genera dinamicamente segun el id de dicha pelicula.

- Config - firebase.config.ts: Contiene la configuracion necesaria para accede a mi Firebase, guardada en un JSON. Por seguridad, será eliminada en una semana desde la entrega de la prueba.

- Guards - auth.guard.ts : Nos permite impedir el acceso a ciertas partes de la aplicacion segun ciertas condiciones. En este caso, que el usuario acceda a peliculas si no se ha logeado.

- Models - user.model.ts : Contiene la interfaz de usuario y sus atributos correspondientes, la cual utilizamos para iniciar una instancia de su clase para registrarle y leer sus datos de la BBDD.

- Services : Los servicios contienen datos y funciones a las que accedemos desde multiples componentes en la aplicación. Tenemos dos aquí:
    - Auth service: Contiene varias funciones relacionadas con autenticarse, registarse, logearse, ver si el usuario esta logeado...
    - Movie service: Para acceder a nuestra API y recibir datos de peliculas.

-Pipes: Son funciones simples que permiten transformar un realizar transformaciones en un valor, como cambiar un formato de fecha o traducir un texto. En mi caso, solo he creado uno, mayus.pipe.ts, para convertir el nombre que se muestra del usuario logeado en mayúsculas.

-Interceptors: Funciones con varias capacidades para alterar el flujo de peticiones y respuestas. Entre otras cosas, nos permite autentificar headers, medir tiempo de respuestas del servidor, cachear respuestas...


