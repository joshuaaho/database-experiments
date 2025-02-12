FROM mongo

COPY *.js /docker-entrypoint-initdb.d/
CMD ["--port", "27017","--replSet", "rs0"]
# CMD ["--port", "27017"]