
echo "Creating virtualenv..."

virtualenv emojicanvasenv

source emojicanvasenv/bin/activate

pip install -r requirements.txt

deactivate

echo "Installing node modules..."

npm install

echo "Bootstrap Complete! See README.md for instructions on running."
