# Use node 8.9.4 LTS
FROM node:8.9.4

# Change working directory
WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 3000
