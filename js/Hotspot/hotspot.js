// *** Llamada ajax para añadir un nuevo HOTSPOT a la BDD***
function createHotspot(hotspot) {
    return $.ajax({
        url: "php/Execute/createHotspot.php",
        type: "POST",
        dataType: 'json',
        data: hotspot,
    });
}

function createListHotspots(listHotspots) {
    return $.ajax({
        url: "php/Execute/createListHotspots.php",
        type: "POST",
        dataType: 'json',
        data: listHotspots,
    });
}

function getAllHotspots() {
    return $.ajax({
        url: "php/Execute/getAllHotspots.php",
        type: "GET",
        dataType: 'json'
    });
}

function updateHotspotByName(listHotspots) {
    /**llamada ajax**/
    return $.ajax({
        url: "php/Execute/updateHotspots.php",
        type: "POST",
        dataType: 'json',
        data: listHotspots,
    });
}

function startDragging(spotname) {
    if (isDraggable) {
        krpano.call("set(hotspot[" + spotname + "].ondown, js(startDragging(" + spotname + ")); draggableHotspot)");
        $("body").off("mouseup");
        $("body").mouseup(function() {
            // var position = getPosition(spotname);
            // console.log("position: ", position);
            if (listHotspots.length === 0) {
                listHotspots.push(getPosition(spotname));
            } else if (!isOnTheList(spotname)) {
                listHotspots.push(getPosition(spotname));
            } else {
                updateCoordinate(spotname);
            }
        });
    } else {
        $("body").off("mouseup");
        krpano.call("set(hotspot[" + spotname + "].ondown, js(startDragging(" + spotname + "));)");
    }
}

function getPosition(name) {
    var position = {
        'name': krpano.get("hotspot[" + name + "]").name,
        'coordinate_x': krpano.get("hotspot[" + name + "]").ath,
        'coordinate_y': krpano.get("hotspot[" + name + "]").atv
    }
    return position;
}

function isOnTheList(nameHotspot) {
    var bool = false
    for (var i = 0; i < listHotspots.length; i++) {
        if (listHotspots[i].name === nameHotspot) {
            return bool = true;
        }
    }
    return bool;
}

function updateCoordinate(nameHotspot) {
    for (var i = 0; i < listHotspots.length; i++) {
        if (listHotspots[i].name === nameHotspot) {
            listHotspots[i] = (getPosition(nameHotspot));
        }
    }
}

// console.log('%c update coordinate', 'color: green; font-weight: bold;');
// console.log('ha entrado en el if');
// console.log('%c listHotspots[i]', 'color: blue; font-weight: bold;', listHotspots[i]);
// console.log('getPosition(nameHotspot)', 'color: green; font-weight: bold;', getPosition(nameHotspot));