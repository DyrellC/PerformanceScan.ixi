var iri = com.iota.iri;
var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;
var ErrorResponse = iri.service.dto.ErrorResponse;

var fs = require('fs');
const { exec } = require('child_process');

function runScan(request){
    exec('bash runScan.sh >> scan.log', (err, stdout, stderr) => {
        if(!err){ 
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
  
            today = yyyy + "-" + mm + "-" + dd + "/";          

            var apiCall = request.get("apiCall");
            var directory = "./Logs/" + apiCall + "/" + today;
            fs.readdir(directory, (err, files) => {         
                if(!err){
                    files.forEach((file) => {
                        fs.readFile(file, 'utf8', function(err, contents) { 
                            if(!err){
                                Response.create({ 
                                    output: contents
                                });
                            } else { 
                                ErrorResponse.create("Could not read scan file");    
                            }
                        });
                    }
                } else {
                    ErrorResponse.create("Failed to read output directory");
                }
            });
        } else {
            ErrorResponse.create(err);
        }    
    });
}

function setup() {
    exec('bash setup.sh >> setup.log', (err, stdout, stderr) => {
        if(!err){
            status = "Complete";
            Response.create({
                status: status,
                output: stdout
            });
        } else {
            ErrorResponse.create(err);
        }
    });
}

API.put("startScan", new Callable({ call: runScan })
API.put("setup", new Callable({ call: setup })
