# Build:
# docker build -t nodejs .
#
# Run:
# docker run -it nodejs
#
# Compose:
# docker-compose up -d

FROM alpine:latest
MAINTAINER RoHscx


# 80 = HTTP, 443 = HTTPS, 3000 = Meteor.JS server 8080 = node-inspector
EXPOSE 80 8080 443 3000


# Set development environment as default
ENV NODE_ENV development


# Install Utilities
RUN apk update

RUN apk add curl

RUN apk add bash-completion

RUN apk add python

RUN apk add --update nodejs nodejs-npm -g

RUN apk add git


# Run Entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT [ "/docker-entrypoint.sh" ]
RUN chmod 755 /docker-entrypoint.sh


# Add Meteor user
RUN adduser node_dev -D
USER node_dev
RUN cd ~/ \
&& mkdir nodeProjects
WORKDIR /home/node_dev/nodeProjects

# Run bash
CMD [ "-s" ]
