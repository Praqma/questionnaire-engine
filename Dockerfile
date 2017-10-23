# Use node 4.4.5 LTS
FROM node:6.9.4

# Change working directory
WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install

# Fix issue with dev package (node sass)
RUN npm rebuild node-sass

# Expose API port to the outside
EXPOSE 3000

# Launch application
CMD ["npm","start"]
