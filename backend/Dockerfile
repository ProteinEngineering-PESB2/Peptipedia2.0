FROM python:3.9-buster

#Instalación de programas y librerías necesarias
RUN apt-get update && \
apt-get -y install --no-install-recommends libpath-tiny-perl && \
apt-get -y install --no-install-recommends metastudent && \
apt-get -y install --no-install-recommends clustalo && \
apt-get -y install --no-install-recommends zip &&\
apt-get -y install --no-install-recommends wget &&\
apt-get -y install --no-install-recommends pp-popularity-contest && \
rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./install_requisites ./install_requisites
RUN pip3 install -r ./install_requisites/requirements.txt

#Instalación de Hmmer y Pfamscan
WORKDIR /app/install_requisites/hmmer-3.3.2
RUN ./configure
RUN make
RUN make install
WORKDIR /app/install_requisites/hmmer-3.3.2/easel
RUN make install

WORKDIR /app/databases
RUN wget ftp://ftp.ebi.ac.uk:21/pub/databases/Pfam/current_release/Pfam-A.hmm.gz
RUN wget ftp://ftp.ebi.ac.uk:21/pub/databases/Pfam/current_release/Pfam-A.hmm.dat.gz 
RUN wget ftp://ftp.ebi.ac.uk:21/pub/databases/Pfam/current_release/active_site.dat.gz 
RUN gzip -d Pfam-A.hmm.gz
RUN gzip -d Pfam-A.hmm.dat.gz
RUN gzip -d active_site.dat.gz
RUN hmmpress Pfam-A.hmm

#Instalación de Blast+ y Swissprot
WORKDIR /app/blast
RUN wget ftp://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/ncbi-blast-2.13.0+-src.tar.gz
RUN ls
RUN tar -xvf ncbi-blast-2.13.0+-src.tar.gz
WORKDIR /app/blastdb
RUN wget ftp://ftp.ncbi.nlm.nih.gov/blast/db/swissprot.tar.gz 
RUN tar zxvpf swissprot.tar.gz
RUN rm *.gz

#Instalación librerías bioperl
RUN cpan Moose
RUN cpan bioperl-1.4
RUN cpan IPC:Run

#Variables de entorno
ENV PATH="/app/blast/ncbi-blast-2.12.0+/bin:${PATH}"
ENV BLASTDB="/app/blastdb"
ENV PERL5LIB="/app/install_requisites/PfamScan:${PERL5LIB}"
ENV PATH="/app/install_requisites/PfamScan:${PATH}"

WORKDIR /app
#Ejecución de la api
COPY ./src /app/src
WORKDIR /app/src
CMD ["python3", "main.py"]