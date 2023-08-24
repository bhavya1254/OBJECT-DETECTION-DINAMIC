img = "";
status ="";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}

function draw()
{
    image(video, 0, 0, 3800, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.length; i++)
       {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Numbet of objects detected are : "+ objects.length;

        fill("#00FF00");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#00FF00");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height,);
       } 
    }
   
    
    
}

function modalLoaded()
{
    console.log("Modal Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}