#!/bin/bash -e
# =====================================================================
# Build script running NodeJS in Docker environment
#
# Source:
# Web:
#
# =====================================================================

START_DELAY=2

NODE_HOME=/home/meteor/
NODE_PROJECT_NAME=meteor-app
NODE_PROJECT_HOME=/home/meteor/meteor-app
NODE_PROJECT_APP=/home/meteor/meteor-app
NODE_PROJECT_CD="cd ~/meteor-app"
NODE_PROJECT_GIT_PULL="git pull"
NODE_PROJECT_START="meteor --settings settings.json debug > logs/stdout.log 2> logs/stderr.log"
NODE_FAKEOUT=~/tuoekaf


# Error codes
E_ILLEGAL_ARGS=126

# Help function used in error messages and -h option
usage() {
  echo ""
  echo "Docker entry script for Meteor service container"
  echo ""
  echo "-f: Start Node in foreground with existing configuration."
  echo "-h: Show this help."
  echo "-s: Initialize environment like -i and start Meteor in foreground." !!!!!
  echo ""
}


initConfig() {
  if [ ! "$(ls --ignore .keys --ignore .authoritative --ignore .recursive --ignore -A ${NODE_FAKEOUT})"  ]; then
    git clone https://github.com/rohscx/docker-nodejs.git
  else
    echo "Node configuration already initialized........."
  fi
}


start() {
  bash
}

# Evaluate arguments for build script.
if [[ "${#}" == 0 ]]; then
  usage
  exit ${E_ILLEGAL_ARGS}
fi

# Evaluate arguments for build script.
while getopts fhis flag; do
  case ${flag} in
    f)
      start
      exit
      ;;
    h)
      usage
      exit
      ;;
    s)
      initConfig
      start
      exit
      ;;
    *)
      usage
      exit ${E_ILLEGAL_ARGS}
      ;;
  esac
done

# Strip of all remaining arguments
shift $((OPTIND - 1));

# Check if there are remaining arguments
if [[ "${#}" > 0 ]]; then
  echo "Error: To many arguments: ${*}."
  usage
  exit ${E_ILLEGAL_ARGS}
fi
