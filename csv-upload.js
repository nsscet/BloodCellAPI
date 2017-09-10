var fs = require('fs')
var stream = fs.createReadStream("my.csv");
var csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });
stream.pipe(csvStream);
