#FROM phusion/baseimage:0.10.0

# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.1.2

RUN mkdir /usr/src/ui
WORKDIR /usr/src/ui

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s public
EXPOSE 5000

# Copy npm config
COPY .npmrc .npmrc

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production