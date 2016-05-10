- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04
- https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-ubuntu-14-04-servers

- https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

- install node dependencies in `/nginx` and `/node` dirs
- create `/node/config/secrets.js`
- use sudo to build the docker images

```sh
docker run -dP --name cc-psql -e POSTGRES_PASSWORD=cSLV092lD9A1vasl cc-psql
docker run -dP --name cc-node1 --link cc-psql:cc-psql cc-node
docker run -dP --name cc-node2 --link cc-psql:cc-psql cc-node
docker run -dP --name cc-node3 --link cc-psql:cc-psql cc-node
docker run -d -p 80:80 --name cc-nginx --link cc-node1:cc-node1 --link cc-node2:cc-node2 --link cc-node3:cc-node3 cc-nginx
```
