# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


------------------------------------------------------------------

# Explicacion parte 1 del ejercicio

Aunque mi fuerte está más en el desarrollo front, si que tengo experiencia trabajando y manteniendo APIs.

He decidido utilizar Express.js porque es lo más rápido que conozoco, y para almacenar datos y autentificarme, he creado un proyecto en Firebase, que me parece ideal para pequeños proyectos como este. 



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




