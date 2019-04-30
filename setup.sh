echo "Downloading apt requirments "
cd ixi/PerformanceScan
ls 
echo "Below will be the requirements....."
echo "*********"
cat requirements.txt
echo "**********"
echo "Installing requirements"
apt-get update
cat requirements.txt | xargs apt-get install -y

echo "Installed requirements"
echo "Starting Venv"
python3 -m venv ./venv
cd ./venv/bin/
source ./activate
cd ../../

echo "Installing python requirements"
pip install --upgrade pip
pip install -e .

cd ../../
deactivate 
