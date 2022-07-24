FROM postgres:14-alpine

ARG POSTGRES_PASSWORD=password

ENV POSTGRES_USER=postgres \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
	POSTGRES_DB=peptipedia_db
	
COPY backup.sql /docker-entrypoint-initdb.d/backup.sql
