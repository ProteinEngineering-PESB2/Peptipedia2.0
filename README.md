# Peptipedia 2.0

## Funcionalidades y estado actual.

 - Blast: Alineamiento contra la base de datos peptipedia v2.
 - MSA: Alineamiento múltiple de secuencias utilizando clustalo. Pendiente: Generar filtros a la base de datos propia una vez esté terminada. (No se si lo haremos o lo dejaremos como está). 
 - Caracterización fisico química: Caracteriza secuencias empleando largo, peso molecular, carga, densidad de carga y punto isoelectrico. Pendiente: Gráficos.
 - Gene ontology: Caracteriza empleando términos gene ontology.
 - PFAM: Caracteriza empleando términos pfam.
 - Frequency: Caracteriza de acuerdo a las frecuencias aminoacídicas. Pendiente: Gráfico global.
 - Encoding: Codifica las secuencias de acuerdo a one hot encoding, propiedades físico químicas y fft.
 - Búsqueda avanzada: Formulario de búsqueda, permite generar queries y llevar a cabo consultas complejas.
 - Clustering: Realiza clustering de secuencias empleando codificaciones, propiedades y algoritmos deseados.
 - Supervised learning: Permite entrenar modelos predictivos. Da la opción de hacer train_test_split. Pendiente: Dar la opción de guardar el modelo, publicar el modelo o usar el modelo.

## Tareas a realizar.

Claudio

 - Mejorar home, incluir about us, tutoriales y submit sequences, contacto.
 - Generar gráficos y disponer de información relevante sobre la base de datos.
 
David

 - Entrenar modelos con Deep Learning.
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

 - backup.sql -> copiar en la carpeta ./bd/
 - peptipedia_install_requisites.zip -> copiar y descomprimir en la carpeta ./backend/
 - bd/dump_csv.zip -> falta hacer un script actualizador para este archivo
 - bd/dump.fasta -> falta hacer un script actualizador para este archivo

## Instalación y ejecución de la aplicación.

La aplicación utiliza docker-compose para manejar imagenes de la api y la aplicación web. Es necesario tener instalado docker en la máquina en la que se ejecutará la aplicación.

En la carpeta principal:

```
docker-compose build
docker-compose up
```

(Ver instrucciones de docker-compose para mas opciones).

Acceder a la aplicación en el navegador, en la dirección localhost:3000.
