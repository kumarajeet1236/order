# Get the image with NodeJS and NPM
FROM node:20.5.0

# Create a working directory
WORKDIR /backend

# A wilcard is used to ensure both package.json and package-lock.json are copied
COPY . .

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --unsafe-perm
RUN npm install -g @nestjs/cli
RUN npm run build

# Install Postgres Client
RUN apt-get update -y ; apt-get install -y postgresql-client

# The app is binding to port 3000
EXPOSE 3030
