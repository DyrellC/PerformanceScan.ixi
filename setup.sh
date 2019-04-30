echo "Downloading apt requirments "
cd ixi/PerformanceScan
ls 
echo "Below will be the requirements....."
echo "*********"
cat requirements.txt
echo "**********"
echo "Installing requirements"
whoami

apt-get update

#cat requirements.txt | xargs apt-get install -y 
echo "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
apt-get install python3-venv -y
echo "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
#apt-get install python3-tk -y
apt-get install python3-pip -y
echo "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
#apt-get install python3-dev -y
#apt-get install build-essentials -y


echo "Installed requirements"
echo "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Starting Venv"
python3 -m venv ./venv
cd ./venv/bin/
source ./activate
cd ../../

echo "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Installing python requirements"
pip install --upgrade pip
echo "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Upgraded PIP"
pip install -e .

cd ../../
deactivate 
