# Peptipedia 2.0

## Funcionalidades y estado actual.

 - Blast: Alineamiento contra la base de datos swissprot. Pendiente: es necesario cambiar a la base de datos propia una vez esté terminada.
 - MSA: Alineamiento múltiple de secuencias utilizando clustalo. Pendiente: Generar filtros a la base de datos propia una vez esté terminada. 
 - Caracterización fisico química: Caracteriza secuencias empleando largo, peso molecular, carga, densidad de carga y punto isoelectrico. Pendiente: Gráficos.
 - Gene ontology: Caracteriza empleando términos gene ontology.
 - PFAM: Caracteriza empleando términos pfam.
 - Frequency: Caracteriza de acuerdo a las frecuencias aminoacídicas. Pendiente: Gráfico global.
 - Encoding: Codifica las secuencias de acuerdo a one hot encoding, propiedades físico químicas y fft
 - Búsqueda avanzada: Formulario de búsqueda, permite generar queries y llevar a cabo consultas complejas. Pendiente: Hacer el frontend de las consultas
 - Clustering: Realiza clustering de secuencias empleando codificaciones, propiedades y algoritmos deseados.

## Tareas a realizar.

Claudio

 - Mejorar home, incluir about us, tutoriales y submit sequences, contacto.
 - Generar gráficos y disponer de información relevante sobre la base de datos.
 - Formulario aprendizaje supervizado

 
David

- Aplicar supervised learning clásico y exportar modelos. En esto debemos conversar para ver cómo diseñamos esto desde la parte de almacenamiento.
 - Emplear modelos entrenados, quizás un pretrained. En esto debemos conversar para ver cómo hacemos conversar ambas partes.
 - Entrenar modelos con Deep Learning
 - Entrenar los clasificadores. 
 - Servicio de clasificación de secuencias.
 - Exploración de landscape y diseño de secuencias.


## Estructura de directorios.
```
.
├── app
│   ├── public
│   └── src
├── backend
│   └── src
├── bd
```
Archivos que no se encuentran en el repositorio:

 - peptipedia_psql.sql -> copiar en la carpeta ./bd/
 - peptipedia_install_requisites.zip -> copiar y descomprimir en la carpeta ./backend/


## Instalación y ejecución de la aplicación.

La aplicación utiliza docker-compose para manejar imagenes de la api y la aplicación web. Es necesario tener instalado docker en la máquina en la que se ejecutará la aplicación.

En la carpeta principal:

```
docker-compose build
docker-compose up
```
(Ver instrucciones de docker-compose para mas opciones).

Acceder a la aplicación en el navegador, en la dirección localhost:3000.
