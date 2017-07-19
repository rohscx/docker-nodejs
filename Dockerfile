# Build:
# docker build -t nodejs .
#
# Run:
# docker run -it nodejs
#
# Compose:
# docker-compose up -d

FROM ubuntu:latest
MAINTAINER RoHscx


# 80 = HTTP, 443 = HTTPS, 3000 = Meteor.JS server 8080 = node-inspector
EXPOSE 80 8080 443 3000


# Set development environment as default
ENV NODE_ENV development


# Install Utilities
RUN apt-get update \
&& apt-get install -qy curl \
 locales \
 git \
 apt-utils\
 build-essential \
 vim
RUN apt-get clean \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
&& locale-gen en_US.UTF-8


# Install Nodejs on Ubuntu systems
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update \
&& apt-get install -y nodejs 


# Run Entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
RUN chmod 755 /docker-entrypoint.sh


# Add Meteor user
RUN adduser --disabled-password --gecos "" node_dev
USER node_dev
RUN cd ~/ \
&& mkdir nodeProjects
WORKDIR /home/node_dev/nodeProjects

# Run bash
CMD [ "-s" ]
