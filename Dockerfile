# Use Node.js LTS (Long Term Support) version
FROM node:18-slim

# Create app directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy app source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

WORKDIR /usr/src/app/piefest_backend

RUN npm install

RUN npm run build

# Command to run the application
CMD [ "npm", "start" ]