# Praqma - Questionnaire

## Getting started
These instructions will get you a running copy of the questionnaire engine on your local machine for development and testing purposes.

### Prerequisites
**Skip if you have these installed:**
- `npm`
- `docker`

**Otherwise run:**
```shell
# Update your packages
$ sudo apt-get update && sudo apt-get upgrade

# Install `npm`
$ sudo apt-get install npm

# Verify npm version
$ npm --version
```

Follow [[this]](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) 
tutorial to install Docker on Ubuntu

#### Gotchas
If you installed `npm` with a package manager, there might be a misnaming error and node will be called nodejs. 
Run the following command to solve this:
```shell
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### Getting the source code to your device
Clone this repository and move dir:
```shell
# Clone this repo
$ git clone <this-repo>

# move to dir
$ cd <cloned-repo>

# Install dependencies
$ npm install
```

### Running the web application
The docker hub image `node:8` runs as developer and build environment.

Start the dockerized app:
```shell
$ sudo docker run --rm -it -v <repo-path>:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm start
```
Replace `<repo-path>` with the absolute path to the cloned repository.

This will expose the server running in Docker on port 3000 to localhost:3003.

It will also block the terminal. To stop the server press <kbd>control</kbd> + <kbd>C</kbd>

### Running the tests
Replace the command `npm start` with `npm test` to run the tests:
```shell
$ docker run --rm -it -v <repo-path>:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm test
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

## Tools used in this node developer environment

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
|Continuous integration|Jenkins|
