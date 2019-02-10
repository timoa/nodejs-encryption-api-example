# (WIP) Encryption API endpoints with Node.js

Example of encrypting/decrypting data thru an API using node.js

## Requirements

- API storing endpoint: encrypt data with the provided key and store it into a datastore
- API retrieval endpoint: decrypt data with the provided key and return the data

## Includes

- Dockerfile to generate the Docker image
- Health check endpoint to check if the app is still alive
- Logs with correlation ID

## Install

``` bash
node install
```

## Run

``` bash
npm start
```

## Tests

``` bash
npm test
```

## TODO

- ~~Create the http server~~
- ~~Create the Dockerfile~~
- Crypto library
- API storing endpoint
- API retrieval endpoint
- PM2 support for the Docker container