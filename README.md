# (WIP) Encryption API endpoints with Node.js

Example of encrypting/decrypting data thru an API using node.js.

The idea with this example is to test how to store encrypted data under a datastore (ex. MongoDB) and keep control of your data by providing the encryption key for each call.

This project doesn't cover encryption in transit (SSL) and not meant to be use in production.

## Requirements

- API storing endpoint: encrypt data with the provided key and store it into a MongoDB collection with AES-256-CBC encryption
- API retrieval endpoint: decrypt data with the provided key and return the data

## Includes

- AES-256-CBC encryption that uses a random Initialization Vector (IV)
- IV stored with the encrypted data (separate by a `:` character)
- Dockerfile to generate the Docker image
- Health check endpoint to check if the app is still alive
- Logs with correlation ID
- MongoDB as datastore (using Mongoose)
- Swagger support for API specifications/documentation

## Install

``` bash
node install
```

## Run

``` bash
npm start
```

## Documentation / Specifications

You can access Swagger here:

[http://localhost:3000/swagger][1]

## How to use it

### Generate an Encryption key (256 bit / 32 chars length)

You need to generate an encryption key that you will use to encrypt the data saved in MongoDB.

You can use this online website to create your key (256 bit):

[www.allkeysgenerator.com][2]

Fill the following curl command with your key and value is your JSON data you want to encrypt.

``` bash
curl -X POST \
  http://127.0.0.1:3000/api/secrets \
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

To get your data back thru a search by ID (`test-01` in this example), you can type this command:

``` bash
curl -X POST \
  http://127.0.0.1:3000/api/secrets/test-01 \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "encryption_key": "p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C"
}'
```

This will return this payload (the data has been stringify):

``` bash
[
    {
        "id": "test-01",
        "value": "{\"first_name\":\"firstname\",\"last_name\":\"lastname\",\"email\":\"email@email.com\",\"password\":\"app123\",\"password_confirmation\":\"app123\"}"
    }
]
```

## Tests

``` bash
npm test
```

## TODO

- ~~Create the http server~~
- ~~Create the Dockerfile~~
- ~~Crypto library~~
- ~~API storing endpoint~~
- ~~API retrieval endpoint~~
- Swagger detailled schema (WIP)
- PM2 support for the Docker container (to restart the app in case of failure)

[1]: http://localhost:3000/swagger
[2]: http://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx