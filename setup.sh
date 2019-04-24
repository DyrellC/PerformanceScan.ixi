echo "Downloading apt requirments "
sed 's/#.*//' requirements.txt | xargs sudo apt-get install -y

echo "Starting Venv"
python3 -m venv ./venv
cd ./venv/bin/
source ./activate
cd ../

echo "Installing python requirements"
pip install --upgrade pip
pip install -e .

deactivate 
