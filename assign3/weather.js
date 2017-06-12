var xhr = new XMLHttpRequest();

window.onload = function(e){
   getCurrentTemp()
}

function processWeatherRequest(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //alert(response[0].numtrucks);
        var temp =  document.getElementById('temp')
        temp.value = response.currentTemp
    }
}

function getCurrentTemp(){
    xhr.open('GET', "/api/weather", true);
    xhr.send();

    xhr.onreadystatechange = processWeatherRequest;
}