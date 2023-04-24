
# Fathom3 ApiRest

## [ Description of api development ]

#### The test specifications were as follows:

A [NodeJs](https://nodejs.org/en), [Fastify](https://www.fastify.io/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) and a [Docker Compose](https://docs.docker.com/compose/) for deployment.

The api consists of a Crud of *users* and user *review*:

###### *user*:
- Register a new user.
- Login of a user (this generates a jwt).


###### *review*:
- Add a user review (authenticated).
- View all reviews for one user (authenticated).
- Modify a user review (authenticated).
- Delete a user review (authenticated).

The nodeJs *crypto* module has been used to encrypt the user's password, adding salt to provide an extra layer of security.


***Note:***
```
 the .env file has been uploaded to the repository for easy implementation of the api.
```

## [ Api Deployment ]
### 1. Docker-compose
The *docker-compose.yml* file contains the configuration of the application services. To create and start all the services in the configuration we will execute the following command in the project folder:
```
docker-compose up -d
```
\
The following containers will be created:
- Container api_fathom3 for the api
- Container db_fathom3 for postgres database

Volumes will also be created to hold the data generated and used by the Docker containers.

\
Then we run **the migration of the database** with Prisma in the api container,  only the first time we lift the containers with the following command:
```
docker exec -it api_fathom3 npx prisma migrate dev
```

The default ports are as follows, for the api_fathom3 container: *3000* and for the db_fathom3 container: *5432*. 

*Ready!*

\
To stop the service, run the following command:
```
docker-compose down
```

### 2. Manual Installation

Change the environment variables for the connection with postgresql.
For installation, run the following commands in the project folder:
```
npm install
npx prisma migrate dev --name init
```

**Run Api**
*development mode*
```
npm run dev
```
*production mode*
```
npm start
```


## [ Api use ]

**POSTMAN COLLECTION**

Inside the postman_collection folder you will find the postman collection file and the environment variable file to add the access token automatically with each user login, making faster the testing of the application.

Import the two *.json* files into the Postman API platform and select fathom3_api_enviroment to test the application.

The base url is as follows:

```
http://localhost:port/api
```
Default **port**: 3000

