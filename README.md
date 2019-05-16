# Encryption API endpoints with Node.js

[![Build Status][travis-badge]][travis-url]
[![Docker Pulls][docker-badge]][docker-url]
[![Quality Gate Status][sonarcloud-status-badge]][sonarcloud-url]
[![Security Rating][sonarcloud-security-badge]][sonarcloud-url]
[![Maintainability Rating][sonarcloud-maintainability-badge]][sonarcloud-url]

[![Bugs][sonarcloud-bugs-badge]][sonarcloud-url]
[![Code Smells][sonarcloud-codesmells-badge]][sonarcloud-url]
[![Coverage][sonarcloud-coverage-badge]][sonarcloud-url]
[![Duplicated Lines (%)][sonarcloud-duplicated-badge]][sonarcloud-url]

## Introduction

Example of encrypting/decrypting data thru an API using node.js.

The idea with this example is to test how to store encrypted data under a datastore (ex. MongoDB) and keep control of your data by providing the encryption key for each call.

> This project doesn't cover encryption in transit (SSL) and not meant to be used in production.

## Features

- API storing endpoint that encrypts data with the provided key and stores it into a MongoDB collection (AES-256-CBC encryption)
- API retrieval endpoint that decrypts data with the provided key and returns the data
- AES-256-CBC encryption that uses a random Initialization Vector (IV)
- IV stored with the encrypted data (separated by a `:` character)
- Logs with correlation ID
- MongoDB as a data store (using Mongoose)
- Swagger support for API specifications/documentation (WIP)
- Health check endpoint to check if the app is still alive
- Dockerfile to generate the Docker image
- Docker Compose file to launch the API and MongoDB official Docker images
- Build, test and deploy to Docker Hub with Travis CI
- SonarQube code quality check (SonarCloud)
- Unit tests and functional tests
- Postman collection and environment

## Run locally

### Install

``` bash
node install
```

### Run

``` bash
npm start
```

### Tests

``` bash
npm test
```

### Tests coverage

``` bash
npm run test:coverage
```

### Functional tests

``` bash
npm run test:functional
```

### Run all the tests

``` bash
npm run test:all
```

## Docker

### Docker Compose

> Be sure that you are not running MongoDB + another node.js app that uses the `3000` port

```bash
docker-compose up
```

## Test with Postman

First, you need to import the Postman environment.

There is a default encryption key and ID to have a quick look to the API.

### Download and Import the Postman environment

Download the [Postman Environment][postman-environment]

### Run the Postman collection

[![Run in Postman][postman-run-button]][postman-run-url]

## Documentation / Specifications

You can access the documentation (Swagger) here:

[http://localhost:3000/swagger][swagger]

## How it works

### Generate an Encryption key (256 bit / 32 chars length)

You need to generate an encryption key that you will use to encrypt the data saved in MongoDB.

You can use this online website to create your key (256 bit):

[https://www.allkeysgenerator.com][allkeysgenerator]

### Add secret

Fill the following curl command with your key and value is the JSON data you want to encrypt.

``` bash
curl -X POST \
  http://127.0.0.1:3000/api/secrets/add \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "test-01",
    "encryption_key": "p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C",
    "value": {
        "first_name": "firstname",
        "last_name": "lastname",
        "email": "email@email.com",
        "password": "app123",
        "password_confirmation": "app123"
    }
}'
```

Payload with the encryption key used in the example (will be different for you since we use a random IV):

``` bash
{
    "_id": "5c61979c82126860464dd0e8",
    "id": "test-01",
    "value": "42d0f6eb0810caaaaf5bad7477ebfc44:3572036ad7b4d77959cbc85feb364bf2c3442f7290ab210e88b00aae5a8122509df282db39ffcd092a927c4f302b93ba87f70563af8a51b29577196cc010d5514d29351ee74b64538d9004f581c911ea059be8769520075659e497a6b716ab95af692b56326a682b443d05150e90d8b75c43eabe15a27c01f240eae9edecf345436bb294b28c41087629754b01ada42c",
    "__v": 0
}
```

Note that the IV is in the first part fo the encrypted data (`42d0f6eb0810caaaaf5bad7477ebfc44`)

### Get secret(s)

#### Get a specific ID

You can search by ID (`test-01` in this example):

``` bash
curl -X POST \
  http://127.0.0.1:3000/api/secrets \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "test-01",
    "encryption_key": "p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C"
}'
```

This will return an array with a unique result:

``` json
[
    {
        "id": "test-01",
        "value": {
            "first_name": "firstname",
            "last_name": "lastname",
            "email": "email@email.com",
            "password": "app123",
            "password_confirmation": "app123"
        }
    }
]
```

#### Get ID with a wildcard `*`

You can also search by using a wildcard `*` at the end of your ID (`test-01-*` in this example):

``` bash
curl -X POST \
  http://127.0.0.1:3000/api/secrets \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "test-01-*",
    "encryption_key": "p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C"
}'
```

This will return an array of results:

``` json
[
    {
        "id": "test-01-01",
        "value": {
            "first_name": "firstname",
            "last_name": "lastname",
            "email": "email@email.com",
            "password": "app123",
            "password_confirmation": "app123"
        }
    },
    {
        "id": "test-01-02",
        "value": {
            "first_name": "firstname",
            "last_name": "lastname",
            "email": "email@email.com",
            "password": "app123",
            "password_confirmation": "app123"
        }
    },
    {
        "id": "test-01-03",
        "value": {
            "first_name": "firstname",
            "last_name": "lastname",
            "email": "email@email.com",
            "password": "app123",
            "password_confirmation": "app123"
        }
    }
]
```

## TODO

- Return an empty array if wrong encryption key instead of error
- Swagger detailed schema
- PM2 support under the Docker container (to restart the app in case of crash)
- Move from Travis-CI to CircleCI by support to the [#TravisAlumns][travis-alumns]

[swagger]: http://localhost:3000/swagger
[allkeysgenerator]: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
[postman-environment]: https://raw.githubusercontent.com/timoa/nodejs-encryption-api-example/master/src/config/postman.environment.json
[postman-run-button]: https://run.pstmn.io/button.svg
[postman-run-url]: https://app.getpostman.com/run-collection/e34aee6688c0937c6643
[sonarcloud]: https://sonarcloud.io/about
[travis-badge]: https://travis-ci.com/timoa/nodejs-encryption-api-example.svg?branch=master
[travis-url]: https://travis-ci.com/timoa/nodejs-encryption-api-example
[docker-badge]: https://img.shields.io/docker/pulls/timoa/nodejs-encryption-api-example.svg
[docker-url]: https://hub.docker.com/r/timoa/nodejs-encryption-api-example
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=timoa_nodejs-encryption-api-example
[sonarcloud-status-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=alert_status
[sonarcloud-security-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=security_rating
[sonarcloud-maintainability-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=sqale_rating
[sonarcloud-bugs-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=bugs
[sonarcloud-codesmells-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=code_smells
[sonarcloud-coverage-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=coverage
[sonarcloud-duplicated-badge]: https://sonarcloud.io/api/project_badges/measure?project=timoa_nodejs-encryption-api-example&metric=duplicated_lines_density
[travis-alumns]: https://twitter.com/ReinH/status/1098663375985229825