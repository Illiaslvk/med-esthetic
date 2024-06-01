# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server to serve the React app
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build"]
