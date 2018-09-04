var blobUri;
var CONTAINER_NAME;
var SAS_Token;
var QUEUE_NAME;

$("#send").click(function(){        
    // List container name  
    $.getJSON("./config.json", function(data) {
        queueUri = data.queueUri;
        QUEUE_NAME = data.queueName;
        blobUri = data.blobUri;
        SAS_Token = data.SASKey;
        CONTAINER_NAME = data.container;
    })
    console.log(queueUri);
    console.log(QUEUE_NAME);
    console.log(blobUri);
    console.log(SAS_Token);
    console.log(CONTAINER_NAME);
　　//create Azure storage queue object
    var queueService = AzureStorage.Queue.createQueueServiceWithSas(queueUri, SAS_Token);
 
    //Create Azure storage blob object
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
    // Send file name to Queue
    var MESSAGE = file.name; 
    queueService.listQueuesSegmented(null, function (error, results) {
        if (error) {
        // List queue error
        } else {
            for (var i = 0, queue; queue = results.entries[i]; i++) {
                console.log(queue.name);
            }
        }
    })
    // Encode message to Base64
    var encoder = new AzureStorage.Queue.QueueMessageEncoder.TextBase64QueueMessageEncoder();
    console.log("QueueNam: " + QUEUE_NAME); 
    console.log("Message : " + MESSAGE); 
    queueService.createMessage(QUEUE_NAME, encoder.encode(MESSAGE), function (error, results, response) {
        if (error) {
            // Create message error
        } else {
        // Create message successfully
        $("#msg").text("Sent blob to Azure");
        $("#msg").fadeIn().queue(function() {
            setTimeout(function(){$("#msg").dequeue();
            }, 3000);
        });
         $("#msg").fadeOut();
        console.log("Sent blob to Azure")
        }
    })
//    refreshProgress();
});

