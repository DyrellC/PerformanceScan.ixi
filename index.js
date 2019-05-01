var System = java.lang.System;

var iri = com.iota.iri;
var Callable = iri.service.CallableRequest;
var Response = iri.service.dto.IXIResponse;
var ErrorResponse = iri.service.dto.ErrorResponse;
var Reader = java.io.BufferedReader;
var Builder = java.lang.ProcessBuilder;
var InputReader = java.io.InputStreamReader;

var Runtime = java.lang.Runtime.getRuntime();
//var RuntimeObject = Java.type("java.lang.Runtime");
var Process = Java.type("java.lang.Process");
var charset = java.nio.charset.StandardCharsets;


var file = java.io.File;
var files = java.nio.file.Files;
var paths = java.nio.file.Paths;
var double = Java.type("java.lang.Double");
var string = Java.type("java.lang.String");
var Thread = java.lang.Thread;


function runScan(request){
    try{
        var apiCall = request.get("apiCall");    
        var command = new Builder('nohup', 'bash', 'ixi/PerformanceScan/runScan.sh', apiCall, '&>', 'runScanLog.log', '&');   
        command.redirectErrorStream(true);        
        var pr = command.start();  
        Thread.sleep(200000);    

        var today = new Date();
        dd = string.format("%1$" + 2 + "s", new string(today.getDate())).replace(' ', '0');
        mm = string.format("%1$" + 2 + "s", new string((today.getMonth() + 1))).replace(' ', '0');
        var yyyy = today.getFullYear();
  
        today = yyyy + "-" + mm + "-" + dd + "/";  

        var rawPath = paths.get("./ixi/PerformanceScan/Logs/" + today + "/" + apiCall + "/raw.log");
        var logFile = new file(rawPath);
        var lines = new string(files.readAllLines(rawPath, charset.UTF_8));     
        if(lines.length == 0){
            lines = new string("Empty file");
        }        
        return Response.create({ 
            output: lines
        });    
            
    } catch (err) {
        var command = new Builder('cat', './ixi/PerformanceScan/runScanLog.log');   
        command.redirectErrorStream(true);        
        var pr = command.start();  
        var reader = new Reader(new InputReader(pr.getInputStream()));        
        var lines = "";
        var line;
        while((line = reader.readLine()) != null){
            lines += line;
        }
                
        return ErrorResponse.create(new string(lines));
    }
}

function setup() {
    try{
        var command = new Builder('bash', 'ixi/PerformanceScan/setup.sh');
        var pr = command.start();          
        Thread.sleep(120000);      
        var reader = new Reader(new InputReader(pr.getInputStream()));        
        var status = "";
        var line;
        while((line = reader.readLine()) != null){
            status += line;
        }//var status = new string("Complete");
        return Response.create({
            status: status,
        });
    } catch (err) {
        return ErrorResponse.create(new string(err));
    }
}

API.put("startScan", new Callable({ call: runScan }))
API.put("setup", new Callable({ call: setup }))
