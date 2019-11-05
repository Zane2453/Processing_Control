var socket = io();

var acc_flag = false;

var cooldown_interval = 750;
var cooldown = true;

var higher_threshold = 75.0;
var lower_threshold = 10.0;

function deviceMotionHandler(event){
    if(acc_flag){
        sendAccData(event['accelerationIncludingGravity']);
    }
}

function get_sensor_data(){
    cooldown = true;
    acc_flag = true;
}

function stop_sensor_data(){
    acc_flag = false;
    console.log("successfully removeEventListener");
}

function clear_cooldown(){
    cooldown = true;
}

function sendAccData(raw_data){
    if(cooldown){
        //console.log(raw_data.x, raw_data.y, raw_data.z);
        var data = Math.sqrt(raw_data.x * raw_data.x + raw_data.y * raw_data.y + raw_data.z * raw_data.z);
        // console.log(data);
        if(data > higher_threshold){
            data = higher_threshold;
        }
        else if(data < lower_threshold){
            data = lower_threshold;
        }
        socket.emit("Acceleration", data);
    }
}


$(document).ready(function(){
    get_sensor_data();

    // add for Acceleration
    window.addEventListener('devicemotion', deviceMotionHandler, false);
})