FROM postgres:14.2

ENV POSTGRES_PASSWORD=password
ENV POSTGRES_USER=user
ENV POSTGRES_DB=peptipedia_db
COPY backup.sql /docker-entrypoint-initdb.d/backup.sql
