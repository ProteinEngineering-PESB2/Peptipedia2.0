FROM python:3.10-slim as base

FROM base as build

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y wget curl build-essential cpio

WORKDIR /work

# Instalación de BLAST
RUN wget https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/2.13.0/ncbi-blast-2.13.0+-src.tar.gz
RUN tar -xzf ncbi-blast-2.13.0+-src.tar.gz
RUN cd ncbi-blast-2.13.0+-src/c++ && ./configure && make -j4 && make install

# Instalación de Hmmer
RUN wget http://eddylab.org/software/hmmer/hmmer-3.3.2.tar.gz
RUN tar -xzf hmmer-3.3.2.tar.gz
RUN cd hmmer-3.3.2 && ./configure && make -j4 && make install
RUN make -C hmmer-3.3.2/easel install

# Instalación de PfamScan
RUN wget -T 10 http://ftp.ebi.ac.uk/pub/databases/Pfam/Tools/PfamScan.tar.gz
RUN tar -xzf PfamScan.tar.gz
RUN cp -r PfamScan /usr/local/share
# Arreglar permisos
RUN find /usr/localshare/PfamScan -type f -exec chmod 644 {} \;
RUN find /usr/localshare/PfamScan -type d -exec chmod 755 {} \;
RUN ln -s /usr/local/share/PfamScan/pfam_scan.pl /usr/local/bin/
# Dependencias de PfamScan
RUN cd /usr/local/share/PfamScan && \
	cpan Moose && \
	cpan bioperl-1.4 && \
	cpan IPC:Run

# Instalación de Dependencias de Python
RUN curl -sSL https://install.python-poetry.org | python3 -
COPY pyproject.toml poetry.lock /src/
WORKDIR /src
RUN /root/.local/bin/poetry export --without-hashes --no-interaction --no-ansi -f requirements.txt -o requirements.txt
RUN pip install -r requirements.txt


FROM base as run

ARG DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

# Actualización de paquetes
RUN apt-get update && apt-get upgrade -y

# Instalación de programas y librerías necesarias
RUN apt-get install -y --no-install-recommends \
	zip pp-popularity-contest \
	libpath-tiny-perl \
	metastudent clustalo && \
	rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/local/ /usr/local/

COPY install_requisites/databases /databases
WORKDIR /databases/pfam
RUN hmmpress Pfam-A.hmm

# Variables de entorno
ENV BLASTDB="/databases/blastdb"
ENV PFAM_DB="/databases/pfam"
ENV PERL5LIB="/usr/local/share/PfamScan:${PERL5LIB}"

COPY ./src /app
WORKDIR /app

# Ejecución de la api
CMD ["sh","-c", "gunicorn wsgi:app -b 0.0.0.0 -w 4"]
