echo "Downloading apt requirments "
cd ixi/PerformanceScan

sed 's/#.*//' requirements.txt | xargs sudo apt-get install -y

echo "Startup Scan Started"

nohup python .${CWD}/runScan.py -i 1 -n 180 -o ./Logs/ -c $1 &> Scan.log &

for i in {1..20}
    do 
        sleep 18
        let "a = $i * 5"
        echo "$a%"    
    done

cd ../../
deactivate
