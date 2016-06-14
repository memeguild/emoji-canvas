#!/bin/bash

set -e

if [[ `pwd` = *scripts* ]]; then
    echo "This script should be run from the root directory of the project."\
        "Try cd ../ then run ./scripts/bootstrap.sh."
    exit 1
fi

if [[ ! `which node` ]]; then
    echo "You must have node installed to continue."\
        "See https://github.com/creationix/nvm#install-script for details"\
        "on how to install node using nvm."
    exit 1
fi

if [[ ! `which pip` ]]; then
    echo "You must have pip installed to continue."\
        "See https://pip.pypa.io/en/stable/installing/ for details on how"\
        "to install pip."
    exit 1
fi

if [[ ! `which virtualenv` ]]; then
    echo "You must have virtualenv installed to continue."\
        "See https://virtualenv.pypa.io/en/stable/installation/ for details"\
        "on how to install virtualenv using pip."
    exit 1
fi

echo "Creating virtualenv..."

virtualenv emojicanvasenv

source emojicanvasenv/bin/activate

pip install -r requirements.txt

deactivate

echo "Installing node modules..."

npm install

echo "Bootstrap Complete! See README.md for instructions on running."
