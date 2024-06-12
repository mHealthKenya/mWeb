# Docker commands

## Build the image

Run docker build .

Please make sure you run this command at the root of the project

## Tag the image

Run docker tag mweb-mweb devmhk/mplusweb:1.0.0

Replace 1.0.0 with the latest version. For example for production builds increment to 2.0.0 and for development builds use 0.0.1

## Push the image

Run docker push devmhk/mplusweb:1.0.0

As always, replace 1.0.0 with the latest version depending on the build type

## Run the image on the server

Please refer to compose.server.yaml file to run the image on the server. Remember to replace the image with the latest version.

### Happy coding
