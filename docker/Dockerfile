# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the Next.js default port
EXPOSE 4000

# Start the Next.js server
CMD ["npm", "start"]
