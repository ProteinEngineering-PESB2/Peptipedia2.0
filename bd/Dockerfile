FROM postgres:14

ENV POSTGRES_USER=user \
	POSTGRES_PASSWORD=${DB_PASS} \
	POSTGRES_DB=peptipedia_db

COPY backup_dump.sql /docker-entrypoint-initdb.d/backup.sql