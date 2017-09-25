# Praqma - Questionnaire

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Update your packages
```shell
$ sudo apt-get update && sudo apt-get upgrade
```

Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) tutorial to install Docker on Ubuntu


Then install npm
```shell
$ sudo apt-get install npm
```

Verify npm version
```shell
$ npm --version
```
If you installed `npm` with a package manager, there might be a misnaming error and node will be called nodejs. 
Run the following command to solve this:
```shell
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### Installing
Clone this repository
```shell
$ git clone <this_repos_url>
```

Move to the newly installed directory
```shell
$ cd <cloned_repo>
```

Install dependencies by running
```shell
$ npm install
```

### Running the app
The docker hub image `node:8` works fine as developer and build environment.

To start the dockerized app type
```shell
$ sudo docker run --rm -it -v /aboslute/path/to/cloned/repo:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm start
```
This will expose the server running in Docker on port 3000 to localhost:3003.

It will also block the terminal. To stop the server press <kbd>control</kbd> + <kbd>C</kbd>

### Running the tests
Replace the command `npm start` with `npm test` to run the tests:
```shell
$ docker run --rm -it -v /aboslute/path/to/cloned/repo:/usr/src/app -w /usr/src/app -p 3003:3000 node:8 npm test
```

## API Protocol

|Method|URL|Params|Description|Example|
|---|---|---|---|---|
|**GET**|`/<form-id>`|`id=[String]`|Load site with matrix form by it's unique ID name|`forms.praqma.com/<maturity-model>`|
|**POST**|`/forms/<form-id>`|`id=[String]`|Get JSON form data by it's unique ID name|`forms.praqma.com/forms/<maturity-model>`|
|**PUT**|`/forms/<form-id>`|`id=[String]`|Update a previously submitted answer|`.../forms/<maturity-model>`|
|**GET**|`/report/<form-id>`|`id=[String]`|See the result for a form with ID|`forms.praqma.com/report/<maturity-model>`|

## Tools used in this node developer environment

|Type|Package|
|---|---|
|Editor config|-|
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
|Helper library|jsdom, cheerio|
|Mocking|faker, chance, randexp|
|Code coverage|istanbul|
|Continuous integration|gitlab, travis, appveyor|
