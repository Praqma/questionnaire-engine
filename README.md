# Questionnaire Engine

[![CircleCI](https://circleci.com/gh/Praqma/questionnaire-engine.svg?style=svg)](https://circleci.com/gh/Praqma/questionnaire-engine)

Questionnaire Engine is a containerized web application that allows you to create and analyze forms written in YAML configuration files.

Praqma stores their content in the [questionnaire-models](https://github.com/Praqma/questionnaire-models) repository.

Read our [contributions guideline](/CONTRIBUTING.md) to learn more about how to make changes to the source code.

## Getting started

The web application is given as a Docker image which can be attached to any content. This guide will walk you through the architecture, deployment and usage of the engine.

### Prerequisites

You will need **Docker** to run the image. Follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) to install Docker on Ubuntu.

### Running the Web Application

The application can be found in the Docker store as `praqma/questionnaire-engine`, see the [tags on Dockerhub](https://hub.docker.com/r/praqma/questionnaire-engine/tags/). This is the core (*engine*) that contains the business logic. There are a few example questionnaires in the `content/` folder that you can use for inspiration.

If you want to serve the content, use the `praqma/questionnaire-models` image instead.

Run the following command to start the web application in a container

```shell
docker run --rm -it -p 8080:3000 -e DB_URI=<database_uri> praqma/questionnaire-engine:<version> npm start

# --rm            remove the container after exiting
# -it             run container with interactive terminal attached
# -p 8080:3000    expose container port 3000 and map it to the external port 8080
# -e DB_URI=<uri>      insert your database URI as env var. See §Credentials
# -e DB_PASSWORD=<pass>   [optional] insert your database password as env var. 
#                         See §Environment variables for more details
# praqma/questionnaire-engine:<version>   image name and version
# npm start       execute command to start the server - not needed for the models
```

Find the database password inside Praqma's password manager under the name `Database user on Mlab`


## Customize

> If you want to edit Praqma's questionnaires that are live on the website head over to the [`questionnaire-models`](https://github.com/Praqma/questionnaire-models) repository.

You can add, modify and delete questionnaires in `/content` where each questionnaire lives within its own directory. At the root level a questionnaire must have a `Layout.yml` file describing the meta information. 

A questionnaire consists of multiple forms which are defined in YAML files. These form description files can live in any subdirectory within the root folder of the questionnaire and are referenced by their filenames.

> See the template questionnaire in `/content/template` to learn more about folder and files structure, and how you can define your forms.

The ID attribute in the `Layout.yml` file defines the unique name of the questionnaire by which it's references in the URL:

```yml
# Layout.yml
id: your-questionnaire
```

```markup
Path to the questionnaire:
https://yourdomain.com/<your-questionnaire>

Path to the results:
https://yourdomain.com/results/<your-questionnaire>
```

## Deployment

We deploy our content to Amazon Elastic Container Service as a Docker image.

### Docker images

`questionnaire-engine` is the main image containing the business logic and it also has some example content.

`questionnaire-models` is built on top of the engine and holds Praqma's questionnaire content. Running docker build will take your questionnaires and couple it with the engine into an image. This is then deployed to AWS.

```Dockerfile
# Dockerfile
FROM praqma/questionnaire-engine:0.1.72
WORKDIR /usr/src/app
COPY ./content ./content
CMD [ "npm", "start" ]
```

### CI Pipeline

A [CI pipeline](https://circleci.com/gh/Praqma/questionnaire-engine) is running on Circle CI that checks out our source code on each commit. It installs the dependencies and builds the server and client side source code for production. After verifying that the tests pass it builds a new Docker image and pushes that to Praqma's repository on Dockerhub.

#### `questionnaire-engine` pipeline ([link](https://circleci.com/gh/Praqma/questionnaire-engine))

- Builds the client and server side code
- Run the tests
- Build a Docker image
- Push the image to [Dockerhub](https://hub.docker.com/r/praqma/questionnaire-engine/)

#### `questionnaire-models` pipeline ([link](https://circleci.com/gh/Praqma/questionnaire-models))

- Build a Docker image based on the engine
- Push this image to [Dockerhub](https://hub.docker.com/r/praqma/questionnaire-models/)
- Deploy that image to AWS Fargate

![Deployment Description](/docs/deployment-description.png)

#### Environment Variables

Both pipelines are using the same environment variables defined on Circle CI. Find the credentials in Praqma's password manager.

|Name|Description|
|--|--|
|DB_URI|Database connection string to mlab|
|DB_PASSWORD (*optional)|Password for Praqma's database user on mlab.com|
|AWS_ACCESS_KEY_ID|Acces key for the AWS account the pipeline deploys to|
|AWS_SECRET_ACCESS_KEY|Secret access key for AWS account|
|DOCKER_USER|Username to the Docker account where the image is pushed by the pipeline|
|DOCKER_PASS|Password for the Docker account|

> \* The `DB_PASSWORD` environment variable is optional. You can have the password in the database connection string (`DB_URI` env var) explicitly or you can have `<dbpassword>` in the URI and that will be replaced with the `DB_PASSWORD` env var you provide.

## Database

We are using the free sandbox plan of Mlab.com. It gives us 0.5 GB of storage which is ample as we only store textual content. 

Every new questionnaire is stored in a diferent collection inside the same database. The inserted records are JSON documents.

```json
_id: ObjectId("5a61c7cafef70a203f3e2469")
version: "1.0.0"
clientID: 7391
formID: "form2"
lastUpdated: "2018-01-19 11:26:18.665"
answers: Object
  "question1": "Praqma"
  "question2": Array
    0:
      "Red"
```

## API Protocol

|Method|URL|Params|Description|Example|
|---|---|---|---|---|
|**GET**|`/<questionnaire-id>`|`id=[String]`|Load site with matrix form by it's unique ID name|`forms.praqma.com/<maturity-model>`|
|**GET**|`/forms/<questionnaire-id>`|`id=[String]`|Request form data as JSON|`.../forms/<maturity-model>`|
|**POST**|`/forms/<questionnaire-id>/<form-id>`|`id=[String]`|Submit JSON form data with it's unique ID name|`.../forms/<maturity-model>/<automated-builds>`|
|**PUT**|`/forms/<questionnaire-id>/<form-id>`|`id=[String]`|Update a previously submitted answer|`.../forms/<maturity-model>/<automated-builds>`|
|**GET**|`/results/<questionnaire-id>`|`id=[String]`|See the results for a questionnaire with ID|`.../results/<maturity-model>`|

> *Questionnaire refers to the whole matrix including all the forms

> *Form reffers to an individual box's form data - a single yaml file.

## Project Structure

```text
.
├- api               # Backend logic and Rest API interface
├- build             # Backend transpiled to Common.js for production
├- src               # Frontend logic
├- dist              # Frontend built for production with Webpack
├- content           # Questionnaire data
├- buildScripts      # Scripts used for development
├- docs              # Documenatation and source dir for Readme
├- app.js            # Production server written in Common.js
├- Dockerfile        # Define environment for Docker image
└─ README.md
```

## npm scripts

|Script|Description|
|--|--|
|`npm start`|Run production server|
|`npm run dev`|Start dev server with hot-reload|
|`npm run build`|Build server and client for production|

## Built With

|Type|Package|
|---|---|
|Package management|npm|
|Package security|nsp|
|Web server|express|
|Sharing|localtunnel|
|Automation|npm scripts|
|Transpiling|babel|
|Bundling|webpack|
|Linting|eslint|
|Testing|mocha|
|Asserting|chai|
|MVC framework|Vue.js|
|CSS framework|Bootstrap 4|
|Database|MongoDB on mlab.com|
|Containerization|Docker|
|Continuous integration|Circle CI|
|Deployment|AWS Fargate|

