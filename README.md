## Instrucciones

0. Seguimos las intrucciones en el readme.md que está en la carpeta del api para arrancar esta, antes de empezar con el frontend.
1. Corremos npm install en terminal para instalar los modulos necesarios.
2. Ejectuamos ng serve para arrancar en local la aplicacion, en el puerto 4200 (localhost:4200)

## Servidor de desarrollo


# Explicacion parte 2 del ejercicio

He decidido utilizar Angular, ya que tengo entendido que es lo que utilizais en Armadillo Amarillo y que, además de tener experiencia con ello, hace poco termine un curso, asi que tomo esta prueba como una oportunidad para practicar mis conocimientos. 

Para darle un poco de "brillo" a la página, utilizo Material, ya que prefiero dedicar el tiempo de la prueba a la parte funcional más que la estética.

## EXPLICACIÓN DE ESTRUCTURA DEL EJERCICIO 

### RAIZ
- App.component.ts: Componente principal que contiene los demás. También contiene la barra de navegacion, la cual podría haber encapsulado en otro componente. Sus contenidos cambian segun si el usuario esta logeado o no gracias a ngIf.
- App.routes.ts : Rutas de nuestra aplicación, servidas con la librería de router de Angular.
- App.config.ts: Define la configuración de la aplicación, declarando librerias que importamos y ciertas partes del comportamiento de nuestro proyecto.

### Carpetas
-Components: Los componentes web son el bloque de construccion básico de UI en Angular. En mi proyecto tenemos los siguientes:

    -Login: Pantalla de login, la cual se comunica con mi API que comunica con Firebase.
    -Register: Formulario de registro. Estos datos se almacenan en Firebase.
    -Movie-list: Listado de peliculas
    -Movie-detail: Infomación de pelicula

- Config - firebase.config.ts: Contiene la configuracion necesaria para accede a mi Firebase, guardada en un JSON.

- Guards - auth.guard.ts : Nos permite impedir el acceso a ciertas partes de la aplicacion segun ciertas condiciones. En este caso, que el usuario acceda a peliculas si no se ha logeado.

- Models - user.model.ts : Contiene la interfaz de usuario y sus atributos correspondientes, la cual utilizamos para registrarle y leer sus datos de la BBDD.

- Services : Los servicios contienen funciones a las que accedemos desde otras partes de la aplicación. Tenemos dos aquí:
    - Auth service: Contiene varias funciones relacionadas con autenticarse, registarse, logearse, ver si el usuario esta logeado...
    - Movie service: Para acceder a nuestra API y recibir datos de peliculas.




