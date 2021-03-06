- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04
- https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-ubuntu-14-04-servers

- https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

- install node dependencies in `nginx/` and `node/` dirs
- create `node/config/secrets.js`
- build services

    ```sh
    # repo root dir
    cd node
    ./build.sh
    cd ../nginx
    ./build.sh
    ```

- use sudo to build the docker images

    ```sh
    # from repo root dir
    sudo docker build -t cc-psql psql
    sudo docker build -t cc-nginx nginx
    sudo docker build -t cc-node node
    ```

- link the entry point nginx config into place

    ```sh
    sudo ln -s ~/mdv/candidateclicker/entry-nginx /etc/nginx/conf.d/candidateclicker.conf
    sudo service nginx restart
    ```

```sh
sudo docker run -dP --name cc-psql -e POSTGRES_PASSWORD=mysecretpassword cc-psql

# wait a bit for db to setup....

sudo docker run -dP --name cc-node1 --link cc-psql:cc-psql cc-node \
    && sudo docker run -dP --name cc-node2 --link cc-psql:cc-psql cc-node \
    && sudo docker run -dP --name cc-node3 --link cc-psql:cc-psql cc-node \
    && sudo docker run -d -p 3000:80 --name cc-nginx --link cc-node1:cc-node1 --link cc-node2:cc-node2 --link cc-node3:cc-node3 cc-nginx
```




# Development help

```sh
sudo docker stop cc-psql cc-node1 cc-node2 cc-node3 cc-nginx && sudo docker rm cc-psql cc-node1 cc-node2 cc-node3 cc-nginx
```
