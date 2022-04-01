# Peptipedia 2.0

## Funcionalidades y estado actual.

 - Blast: Alineamiento contra la base de datos swissprot. Pendiente: es necesario cambiar a la base de datos propia una vez esté terminada.
 - MSA: Alineamiento múltiple de secuencias utilizando clustalo. Pendiente: Generar filtros a la base de datos propia una vez esté terminada. 
 - Caracterización fisico química: Caracteriza secuencias empleando largo, peso molecular, carga, densidad de carga y punto isoelectrico. Pendiente: Gráficos.
 - Gene ontology: Caracteriza empleando términos gene ontology.
 - PFAM: Caracteriza empleando términos pfam.
 - Frequency: Caracteriza de acuerdo a las frecuencias aminoacídicas. Pendiente: Gráfico global.
 - Encoding: Codifica las secuencias de acuerdo a one hot encoding, propiedades físico químicas y fft. Pendiente: Arreglar la dependencia de fft con las propiedades físico químicas. 
 - Búsqueda avanzada: Formulario de búsqueda, permite generar queries y llevar a cabo consultas complejas. Pendiente: Conectar a la BD mediante una api y programar los joins correspondientes.
 - Clustering: Realiza clustering de secuencias empleando codificaciones, propiedades y algoritmos deseados. Pentiende: Corregir las codificaciones one hot encoding y physicochemical properties.
 
## Tareas a realizar.

Claudio

 - Mejorar home, incluir about us, tutoriales y submit sequences, contacto.
 - Agregar un formulario de clustering de secuencias. 
 - Generar gráficos y disponer de información relevante sobre la base de datos.
 
Gabriel

 - Incluir la base de datos propia para la búsqueda avanzada. 
 - Revisar flujo en las codificaciones. Incorporar la posibilidad de seleccionar propiedades en específico.
 - Incorporar la base de datos a la api. 
 
David

- Aplicar supervised learning clásico y exportar modelos. En esto debemos conversar para ver cómo diseñamos esto desde la parte de almacenamiento.
 - Emplear modelos entrenados, quizás un pretrained. En esto debemos conversar para ver cómo hacemos conversar ambas partes.
 - Entrenar modelos con Deep Learning
 - Entrenar los clasificadores. 
 - Servicio de clasificación de secuencias.
 - Exploración de landscape y diseño de secuencias.


## Instalación y ejecución de la aplicación.

La aplicación utiliza docker-compose para manejar imagenes de la api y la aplicación web. Es necesario tener instalado docker en la máquina en la que se ejecutará la aplicación.

En la carpeta principal:

```
docker-compose build
docker-compose up
```
(Ver instrucciones de docker-compose para mas opciones).

Acceder a la aplicación en el navegador, en la dirección localhost:3000.
