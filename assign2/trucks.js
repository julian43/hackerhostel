var xhr = new XMLHttpRequest();

window.onload = function(e){
    xhr.open('GET', "/api/trucks", true);
    xhr.send();

    xhr.onreadystatechange = processTrucksRequest;
}

function processTrucksRequest(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //alert(response[0].numtrucks);
        var trucks_ele =  document.getElementById('Trucks')
        trucks_ele.value = response[0].numtrucks
    }
}

function decreaseTrucks(num){
    xhr.open('GET', "/api/trucks/" +num, true);
    xhr.send();

    xhr.onreadystatechange = processDecreaseTrucksRequest;
}

function processDecreaseTrucksRequest(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        //alert(response.numtrucks);
        var trucks_ele =  document.getElementById('Trucks')
        trucks_ele.value = response.numtrucks
    }
}