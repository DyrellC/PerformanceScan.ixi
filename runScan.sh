echo "Downloading apt requirments "
source ./venv/bin/activate
cd ixi/PerformanceScan

echo "Startup Scan Started"
echo $1

nohup python3 .${CWD}/runScan.py -i 1 -n 180 -o ./Logs/ -c $1 &> Scan.log &

for i in {1..20}
    do 
        sleep 18
        let "a = $i * 5"
        echo "$a%"    
    done

cd ../../
deactivate
