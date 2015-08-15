# To run:
#
# docker run \
#   -v ~/.env:/root/hapicasts/.env
#   -v /etc/ssl:/etc/ssl
#   -p 80:80
#   -p 443:443
#   hapicasts

FROM ubuntu:14.04

# Update ubuntu

RUN sudo apt-get update

# Download and install system dependencies

RUN cd /root && \
    sudo apt-get install -y wget

# Download and install node

RUN cd /root && \
    wget https://nodejs.org/dist/v0.10.40/node-v0.10.40-linux-x64.tar.gz && \
    tar -xvzf node-v0.10.40-linux-x64.tar.gz && \
    sudo ln -s /root/node-v0.10.40-linux-x64/bin/node /usr/bin/node && \
    sudo ln -s /root/node-v0.10.40-linux-x64/bin/npm /usr/bin/npm

# Bundle application

ADD . /root/hapicasts

# Install NPM dependencies

RUN cd /root/hapicasts && \
    npm install --production

ENV NODE_ENV production

WORKDIR /root/hapicasts

EXPOSE 80
EXPOSE 443
EXPOSE 8080

CMD ["node", "index"]
