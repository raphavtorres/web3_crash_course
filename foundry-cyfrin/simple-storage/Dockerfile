# Use the latest foundry image
FROM ghcr.io/foundry-rs/foundry

# Copy our source code into the container
WORKDIR /app

# Build and test the source code
COPY . .
RUN forge build
# RUN forge test


# build this docker image and watch forge build/run the tests within the container:
# docker build --no-cache --progress=plain .