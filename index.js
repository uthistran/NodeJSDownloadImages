var fs = require('fs'),
    request = require('request');
    cron = require("node-cron");
    async = require("async");


var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function downloadImage(url, fileName){
    download(url, fileName, function(){
        console.log('done');
    });
}


function getFileName(url){
    var arraySplit = url.split('/');
    return arraySplit[arraySplit.length - 1]
}

function callBackFunction(){
    try{
        iteration ++;
        download(array[iteration], "downloads/test_" + iteration + ".png",callBackFunction)
    }
    catch(e){
        console.log(e);
        iteration ++;
        download(array[iteration], "downloads/test_" + iteration + ".png",callBackFunction)
    }
}

var iteration = 0;

var filesArray = fs.readFileSync('Example Download File.txt').toString().split("\n");
    // for(let i = 0; i < 20; i++) {
    //     if(array[i] != "" && array[i]){
    //         downloadImage(array[i],"test_" + interation + ".png");
    //         interation++;
    //     }
    //     console.log(array[i]);
    // }

    //download(array[iteration], "downloads/test_" + iteration + ".png",callBackFunction)
    let fileNumber = 1;
    async.eachLimit(
        filesArray,
        5,
        (filesArray, next) => {
            download(
                filesArray,
                'downloads/test_' + fileNumber + '.png',
                next
            );
            fileNumber += 1;
        }
        ,
        () => {
    
            console.log("Finished downloading");
    
        }
    );
    

// cron.schedule("* * * * *", function() {
//     var array = fs.readFileSync('urls.txt').toString().split("\n");
//     for(i in array) {
//         console.log(array[i]);
//     }
//     downloadImage("test_" + interation + ".png");
//     interation++;
//     console.log("running a task every minute");
//   });