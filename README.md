# Questionnaire Engine

Questionnaire Engine is a containerized web application that allows you to create and analyze forms written in YAML configuration files.

Content is stored in the [questionnaire-models](https://github.com/Praqma/questionnaire-models) repository.

## Getting started

These instructions will get you started with the web app.

Read our [contributions guideline](/CONTRIBUTING.md) to learn more about how to make changes to the source code.

### Prerequisites

If you want to run the image in a container then you will need Docker. Follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) to install Docker on Ubuntu.

### Running the Web Application

The application can be found in the docker store as `praqma/questionnaire-engine:<version>`, see the [tags on Dockerhub](https://hub.docker.com/r/praqma/questionnaire-engine/tags/). This is the core (*engine*) that contains the business logic. There are a few example questionnaires in the `content/` folder that you can use for inspiration.

Run this command to start the application. It will pull the image from Docker hub and start the app in a container

```shell
docker run --rm -it -p 3000:3000 --env DB_PASSWORD=<dbpassword> praqma/questionnaire-engine:0.1.50 npm start

# --rm            remove the container after exiting
# -it             run container with interactive terminal attached
# -p 8080:3000    expose port 3000 and map it to the external port 8080
# --env DB_PASSWORD=<dbpassword>    insert your database password. See Credentials seciton.
# praqma/questionnaire-engine:1.0   image name and version
# npm start       command to run inside container
```

Find the database password inside Praqma's password manager under the name `Database user on Mlab`

## Deployment

The web application is running in Docker containers. There is a main image containing the engine called `questionnaire-engine` which also contains some example content.

Another image called `questionnaire-models` that will contain the questionnaire content is created based on the engine image. This holds an arbitrary number of forms. Adding a new form under the `content/` folder of this repo will be deployed under the right domain. Read more about how to set up your own content repository for the engine [here](https://github.com/Praqma/questionnaire-models).

### CI Pipeline

A [CI pipeline](https://circleci.com/gh/Praqma/questionnaire-engine) is running on Circle CI that checks out our source code on each commit. It installs the dependencies and builds the server and client side source code for production. After verifying that the tests pass it builds a new Docker image and pushes that to Praqma's [repository on Dockerhub](https://hub.docker.com/r/praqma/questionnaire-engine/).

![Deployment Description](/docs/deployment-description.png)

## Database

We are using the free sandbox plan of Mlab.com. It gives us 0.5 GB of storage which is ample as we only store textual content. 

Every new questionnaire is stored in a diferent document inside the same database - think of it as a table in the SQL world.

Credentials to access Mlab.com are stored in our password manager. In order to authenticate with the database, see the password entry under `Database user on Mlab`. This password has to be provided to the docker image to be able to connect to our database.

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
|Continuous integration|AWS CodePipeline w/ Jenkins|
|MVC framework|Vue.js|
|CSS framework|Bootstrap 4|
|Database|MongoDB on mlab.com|
|Containerization|Docker|

