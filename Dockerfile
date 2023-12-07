# Use a base image with Node.js and a specific version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json or yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application files
COPY . .

# Expose the port Next.js uses (default is 3000)
EXPOSE 3000

# Command to start the Next.js application in production mode
CMD ["yarn", "dev"]
