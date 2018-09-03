var blobUri;
var CONTAINER_NAME;
var SAS_Token;
$("#send").click(function(){        
    // List container name  
    $.getJSON("./config.json", function(data) {
        blobUri = data.host;
        SAS_Token = data.SASKey;
        CONTAINER_NAME = data.container;
    })
    console.log(blobUri);
    console.log(SAS_Token);
    console.log(CONTAINER_NAME);
　　
    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, SAS_Token);

    blobService.listContainersSegmented(null, function (error, results) {
        if (error) {
            // List container error
        } else {
            for (var i = 0, container; container = results.entries[i]; i++) {
                // Deal with container object
                console.log(results.entries[i].name)
            }
        }
    })
    console.log($("#fileinput").prop('files')[0]);
 
       
    // Upload Blob
    // If one file has been selected in the HTML file input element
    var file = $("#fileinput").prop('files')[0];
    var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    blobService.singleBlobPutThresholdInBytes = customBlockSize;

    var finishedOrError = false;
    var speedSummary = blobService.createBlockBlobFromBrowserFile(CONTAINER_NAME, file.name, file, {blockSize : customBlockSize}, function(error, result, response) {
        finishedOrError = true;
        if (error) {
            console.log("upload blob failed") 
        } else {
            console.log("upload blob successfully")
        }
    })
//    refreshProgress();
});

