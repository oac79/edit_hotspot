var krpano;
var objSpot;
var createMode = false;
var areSpotsCreated = false;
var modalSpots = new Array();

jQuery(document).ready(function() {
    krpano = document.getElementById("krpanoID");
    onClicktoStart();
});

function onClicktoStart() {
    $("#createHotspots").on("click", function() {
        // $("#createHotspots").addClass("isDisabled");
        $("#createHotspots").off("click");
        modalCreator();
    });
}

function modalCreator() {
    // Creamos el modal para seleccionar el tipo de hotspot
    // $('<div class="jquery-modal current modalNewBtnClass">' +
    //     '<div align="center" class="modal" id="modalNewBtn">' +
    //     '<a href="#" onclick="restoreEverything()" class="close-modal " style=""><i class="fas fa-times-circle"></i></a>' +
    //     '</div>' +
    //     '</div>').appendTo('body');

    $('<div class="modal fade modalNewBtnClass" id="modalQuickView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<div id="modalNewBtn" class="row"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>').appendTo("body");


    // Cargamos el HTML de creación del Modal
    $('#modalNewBtn').load('hotspotModal.html', function(response, status, xhr) {
        if (status == "error") {
            // console.log("Sorry but there was an error: " + xhr.status + " ---- " + xhr.statusText);
        }
    });
    // $("#modalNewBtn").load("hotspotModal.html");

    // addhotspotonkrpano("link");
}

function startCreating() {
    $(".modal-backdrop").remove();
    var spoType = $(`#select`).val().toLowerCase();

    // Verifica si los campos obligatorios están seleccionados
    if (checkErrors(spoType)) {
        addhotspotonkrpano(spoType);
    }
}

function checkErrors(spoType) {
    var goAhead = false;
    switch (spoType) {
        case "":
            Swal.fire("Tipo no seleccionado", "Por favor seleccione un tipo de Hotspot", "info");
            break;
        case "pdf":
            if ($(`.pdf` + spoType).val() == "") {
                Swal.fire("URL no especificada", "Por favor especifique la dirección del PDF", "info");
            } else {
                goAhead = true;
            }
            break;
        case "text":
            if ($("#editor").val() == "") {
                Swal.fire("Descripción obligatoria", "Parece que no has escrito nada en la descripción", "info");
            } else if ($(`.title` + spoType).val() == "") {
                Swal.fire("Título obligatorio", "Parece que no has especificado un título", "info");
            } else {
                goAhead = true;
            }
            break;
        case "link":
            if ($(`.url` + spoType).val() == "") {
                Swal.fire("URL no especificada", "Por favor especifique la dirección de destino", "info");
            } else {
                goAhead = true;
            }
            break;
        case "image":
            if ($(`.img` + spoType).val() == "") {
                Swal.fire("Imagen no especificada", "Por favor especifique la URL de la imagen", "info");
            } else {
                goAhead = true;
            }
            break;
    }
    return goAhead;
}

function addhotspotonkrpano(spoType) {
    var spotIcon = "";

    // update mouse info 30 times per second
    var lookat_interval = setInterval('getlookat()', 1000.0 / 30.0);

    // Evento importante para obtener las coordenadas, ACORDARSE de quitar el evento en el MouseDown.
    // disable text selection to avoid cursor flickering
    document.onselectstart = function() { return false; } // ie
    document.onmousedown = function() { return false; } // mozilla

    // Si no se facilita un icono, se pone uno por defecto.
    spotIcon = ($('.icon' + spoType).val() == "" || $('.icon' + spoType).val() == undefined ? "assets/images/fotos360.jpg" : $('.icon' + spoType).val());

    // Generamos el nombre del Hotspot (calculando el numero de spots ya creados)
    var spotname = "spot" + krpano.get('hotspot.count');
    // Declaramos el objeto para pasar a la funcion createSpot()
    var objSpot = { "krpano": krpano, "spotname": spotname, "spotIcon": spotIcon };
    // Por cada tipo de botón ejecuta una función diferente para la creación del mismo
    createSpot(spoType, objSpot);
    // switch (spoType) {
    //     case "Select":
    //         Swal.fire("Tipo no seleccionado", "Por favor seleccione un tipo de Hotspot", "error");
    //         break;
    //     case "pdf":
    //         createPDFHtspt(krpano, spotname, spotIcon);
    //         break;
    //     case "text":
    //         createTextHtspt(krpano, spotname, spotIcon, spoType);
    //         break;
    //     case "link":
    //         createLinkHtspt(krpano, spotname, spotIcon);
    //         break;
    //     case "image":
    //         createImageHtspt(krpano, spotname, spotIcon, spoType);
    //         break;
    // }

    // Escondemos el modal de creación de Hotspot
    $(`.modalNewBtnClass`).hide();
}

function createSpot(type, obj) {
    var krpano = obj.krpano;
    var title = "";
    var img = "";
    var body = "";
    var link = "";
    var pdf = "";
    var video = "";
    createMode = true;
    // Evento para crear el botón al clickar dentro de la imagen
    $("body").mousedown(function() {
        var str = "";
        // Creamos el Hotspot y le ponemos el nombre, icono y coordenadas.
        var standardObj = standardSpot(str, obj);
        str += standardObj.str;
        switch (type) {
            case "text":
                title = $('.titletext').val();
                img = $('.imgtext').val() || "";
                body = $("#editor").val(); //editor.getData();
                // ************************* START ONCLICK *************************
                str += "set(hotspot[" + obj.spotname + "].onclick, js(showModalonSpot());";
                str += "js(modalSpotsCreator('" + obj.spotname + "', '" + type + "'));";
                str += "js(document.getElementById('modalSpot').style.display = 'block');";
                // str += "js(console.log('final ', " + obj.spotname + "););"
                str += ");";
                // ************************* END ONCLICK *************************
                break;

            case "link":
                link = $('.urllink').val() || "https://www.ges-emer.com";
                // ************************* START ONCLICK *************************
                str += "set(hotspot[" + obj.spotname + "].onclick,";
                str += "js(window.open(" + link + ", `_blank`););";
                // str += "js(modalCreator(););";
                // str += "js(console.log('final ', " + spotname + "););"
                str += ");";
                // ************************* END ONCLICK *************************
                break;

            case "image":
                title = $('.titleimage').val() || "Imagen";
                img = $('.imgimage').val();
                // ************************* START ONCLICK *************************
                str += "set(hotspot[" + obj.spotname + "].onclick, js(showModalonSpot());";
                str += "js(modalSpotsCreator('" + obj.spotname + "', '" + type + "'));";
                str += "js(document.getElementById('modalSpot').style.display = 'block');";
                // str += "js(console.log('final ', " + spotname + "););"
                str += ");";
                // ************************* END ONCLICK *************************
                break;

            case "pdf":
                title = $('.titlepdf').val() || "Imagen";
                link = $('.urlpdf').val();
                // ************************* START ONCLICK *************************
                str += "set(hotspot[" + obj.spotname + "].onclick, js(showModalonSpot());";
                str += "js(modalSpotsCreator('" + obj.spotname + "', '" + type + "'));";
                str += "js(document.getElementById('modalSpot').style.display = 'block');";
                // str += "js(console.log('final ', " + spotname + "););"
                str += ");";
                // ************************* END ONCLICK *************************
                break;

        }
        krpano.call(str);
        areSpotsCreated = true;
        // Reseteamos los eventos.
        document.onselectstart = null // ie
        document.onmousedown = null // mozilla
        objSpot = {
            "spotName": obj.spotname,
            "type": type,
            "ath": standardObj.ath,
            "atv": standardObj.atv,
            "icon": obj.spotIcon,
            "title": title || "",
            "body": body || "",
            "img": img || "",
            "link": link || "",
            "video": video || ""
        }
    });
    // Quitamos el MouseDown Event al Body
    resetBodyEvent();
}

function standardSpot(str, obj) {
    // Obtenemos el tipo de la escena actual (si es plana o foto 360º)
    var currentSceneType = getSceneType();
    // Obtenemos la coordenadas
    var mouse_at_h = obj.krpano.get("mouseath");
    var mouse_at_v = obj.krpano.get("mouseatv");

    // Creamos el Hotspot y le ponemos el nombre, icono y coordenadas.
    str += "addhotspot(" + obj.spotname + ");";
    str += "set(hotspot[" + obj.spotname + "].url," + obj.spotIcon + ");";
    str += "set(hotspot[" + obj.spotname + "].ath," + mouse_at_h + ");";
    str += "set(hotspot[" + obj.spotname + "].atv," + mouse_at_v + ");";
    // Definimos las dimensiones del Hotspot depende del tipo de escena
    // Si es Plano las dimensiones son menores que una foto 360º
    if (currentSceneType == "flat") {
        str += "set(hotspot[" + obj.spotname + "].scale,1);"; //0015
        str += "set(hotspot[" + obj.spotname + "].height, 0.2);";
        str += "set(hotspot[" + obj.spotname + "].width, 0.2);";
    } else if (currentSceneType == "cube") {
        str += "set(hotspot[" + obj.spotname + "].scale,1);"; //0015
        str += "set(hotspot[" + obj.spotname + "].height, 50);";
        str += "set(hotspot[" + obj.spotname + "].width, 50);";
    }
    // Seguimos con la creación del botón
    str += "set(hotspot[" + obj.spotname + "].zoom, true);";
    str += "set(hotspot[" + obj.spotname + "].zorder, 5);";
    str += "set(hotspot[" + obj.spotname + "].scene_EL, get(xml.scene));";
    str += "set(hotspot[" + obj.spotname + "].title, 'Nuevo Hotspot');";
    str += "set(hotspot[" + obj.spotname + "].onhover,showtext('ssss'));";
    str += "set(hotspot[" + obj.spotname + "].hovering,true);";
    str += "set(hotspot[" + obj.spotname + "].keep,false);";
    // str += "set(hotspot[" + spotname + "].onhover,showtit(););";
    var returnedObj = { "str": str, "ath": mouse_at_h, "atv": mouse_at_v }
    return returnedObj;
}

function resetBodyEvent() {
    $("body").keyup(function(event) {
        if (event.keyCode === 27) {
            if (createMode) {
                createMode = false;
                activateSavingSpots();

                modalSpots.push(objSpot);
                $("body").off("mousedown");
                // $("#trumbowyg-icons").remove();
                restoreEverything();
            }
        }
    });
}

function activateSavingSpots() {
    $("#saveHotspots").removeClass("isDisabled");
    $("#saveHotspots").off();
    $("#saveHotspots").on("click", function() {
        createListHotspots(Object.assign({}, modalSpots))
            .done(function(response) {
                // if (response.length == modalSpots.length) {
                //     console.log('ha entrado en el if res___: ', response);
                // } else {
                //     console.log('ha entrado en el else___: ', response);
                // }
            }).fail(function(err) {
                // console.log('err____', err);
            });
    });
}

function restoreEverything() {
    $(".modal-backdrop").remove();
    $("#createHotspots").removeClass("isDisabled");
    onClicktoStart();
    // Eliminamos el modal de creación de Hotspot
    $(`.modalNewBtnClass`).remove();
}

function getSceneType() {
    var imagetype = "";

    for (index = 0; index < krpano.get("scene.count"); index++) {
        if (krpano.get("scene[" + index + "].name") == krpano.get("xml.scene")) {
            var xmlContent = "<scene>" + krpano.get("scene[" + index + "].content") + "</scene>";
            xmlDoc = $.parseXML(xmlContent);
            if ($(xmlDoc).find("flat").length > 0) {
                imagetype = "flat";
            } else if ($(xmlDoc).find("cube").length > 0) {
                imagetype = "cube";
            }
            break;
        }
    }
    // krpano.set("imagetype", imagetype);
    return imagetype
}

function modalSpotsCreator(currentSpotName, spoType) {
    $(".modalSpotTitle").empty();
    $(".modalSpotBody").empty();
    for (var i = 0; i < modalSpots.length; i++) {
        if (modalSpots[i].spotName == currentSpotName) {
            switch (spoType) {
                case "pdf":
                    modalPdf(modalSpots[i]);
                    break;
                case "text":
                    modalText(modalSpots[i]);
                    break;
                case "image":
                    modalImage(modalSpots[i]);
                    break;
            }
            break;
        }
    }
    document.getElementById('modalSpot').style.display = 'block';
}

function modalPdf(currentSpot) {
    $('.modalSpotTitle').text(currentSpot.title);
    $('<iframe id="myframe" class="embed-responsive-item" src="' + currentSpot.link + '" height="700px" width="100%" allowfullscreen></iframe>').appendTo('.modalSpotBody');
}

function modalText(currentSpot) {
    var textToHtml = "";
    // Creamos el modal para seleccionar el tipo de hotspot
    textToHtml = currentSpot.body;
    $('.modalSpotTitle').text(currentSpot.title);

    if (currentSpot.img != "") {
        textToHtml += "<img src='" + currentSpot.img + "' width='500px'>";
    }
    $('.modalSpotBody').html(textToHtml);
}

function modalImage(currentSpot) {
    var textToHtml = "";
    // Creamos el modal para seleccionar el tipo de hotspot
    textToHtml += "<img src='" + currentSpot.img + "' width='100%'>";

    $('.modalSpotTitle').text(currentSpot.title);
    $('.modalSpotBody').html(textToHtml);
}

function showmouseinfo() {
    var mouse_at_x = krpano.get("mouse.x");
    var mouse_at_y = krpano.get("mouse.y");
    var mouse_at_h = krpano.get("mouseath");
    var mouse_at_v = krpano.get("mouseatv");

    document.getElementById("mouse_x").innerHTML = mouse_at_x + "px";
    document.getElementById("mouse_y").innerHTML = mouse_at_y + "px";
    document.getElementById("mouse_ath").innerHTML = mouse_at_h.toFixed(2) + "°";
    document.getElementById("mouse_atv").innerHTML = mouse_at_v.toFixed(2) + "°";


    // update mouse info 30 times per second
    var lookat_interval = setInterval('getlookat()', 1000.0 / 30.0);


    // disable text selection to avoid cursor flickering
    window.onload = function() {
        document.onselectstart = function() { return false; } // ie
        document.onmousedown = function() { return false; } // mozilla
    }
}

function getlookat() {

    if (krpano && krpano.get) { // it can take some time until krpano is loaded and ready
        krpano.call("screentosphere(mouse.x, mouse.y, mouseath, mouseatv); js( showmouseinfo() );");
    }
}

function showModalonSpot() {
    $("#modalSpot").modal();
}