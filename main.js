

var img = "";
objects = [];
var Status = "";
var Sound = "";

function preload()
{
    Sound = loadSound("emergency_alert.mp3");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modeLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modeLoaded()
{
    console.log("Model Loaded");
    Status=true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }    
    else
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video,0,0,380,380);
 
    if(Status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Baby detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects.y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    else
    {
        document.getElementById("status").innerHTML = "Status : Baby noy detected";

        Sound.play();
    }
    
}