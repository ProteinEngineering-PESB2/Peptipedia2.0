FROM postgres:14

ARG POSTGRES_PASSWORD=password

ENV POSTGRES_USER=user \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
	POSTGRES_DB=peptipedia_db

COPY backup.sql /docker-entrypoint-initdb.d/backup.sql