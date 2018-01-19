# Contributions Guidelines

## Prerequisites

If you want to edit the source code you will need `npm`

```shell
# Update your packages
sudo apt-get update && sudo apt-get upgrade

# Install `npm`
sudo apt-get install npm

# Verify npm version
npm --version
```
### Getting the source code to your device

```shell
# Clone this repo
git clone <this-repo>

# Move to dir
cd <cloned-repo>

# Install dependencies
npm install
```

#### Gotchas

If you installed `npm` with a package manager, there might be a misnaming error and node will be called nodejs. 
Run the following command to solve this:

```shell
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

## NPM scripts:

Run in developer mode:
`npm run dev`

Run in production mode:
`npm start` - to be implemented

## Building the Docker images
Creating a new image from the questionnaire engine is easy as running a command. Everything needed for the environment is defined in the `Dockerfile`. This command will build the image and tag it with the name `questionnaire-engine` under version `1.0`.

```shell
docker build -t questionnaire-engine:1.0 .
```
