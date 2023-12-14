./psql/build.sh \
    && ./node/build.sh \
    && ./nginx/build.sh

CANDIDATECLICKER_POSTGRES_PASSWORD=x34l01Id9vlsd2 docker-compose up
