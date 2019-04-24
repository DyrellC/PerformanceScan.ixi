echo "Starting Venv"
source ./venv/bin/activate

echo "Startup Scan Started"

nohup python .${CWD}/runScan.py -i 1 -n 180 -o ./Logs/ &> Scan.log &

for i in {1..20}
    do 
        sleep 18
        let "a = $i * 5"
        echo "$a%"    
    done


deactivate
