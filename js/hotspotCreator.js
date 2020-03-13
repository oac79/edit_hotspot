var krpano;
var objSpot;
var isSaved = false;
var isDraggable = false;
var isInfoEditable = false;
var isSizeEditable = false;
var createMode = false;
var areSpotsCreated = false;
var modalSpots = new Array();
var listHotspots = new Array();
var globalSpotCount = 0;

jQuery(document).ready(function() {
    krpano = document.getElementById("krpanoID");
    onClicktoStart();
    onClickDraggable();
    onClickEditInfo();
    onClickEditSize();
    spotsGetter();
});

function onClicktoStart() {
    $("#createHotspots").on("click", function() {
        // $("#createHotspots").addClass("isDisabled");
        $("#createHotspots").off("click");
        modalCreator("create");
        // sceneSelector();
    });
}

function onClickDraggable() {
    $("#moveHotspots").on("click", function() {
        if (!isDraggable) {
            isDraggable = true;
            beforeDragging($(this));
        } else {
            // isDraggable = false;
            // onClicktoStart();
            Swal.fire({
                title: '¿Quieres salir sin guardar los cambios?',
                text: "Al salir de este modo, los cambios no serán guardados.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#13c18e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, descartar cambios'
            }).then((result) => {
                if (result.value) {
                    location.reload();
                    // isDraggable = false;
                    // onClicktoStart();
                    // beforeDragging($(this));
                } else {
                    isDraggable = true;
                }
            });
        }

    });
}

function onClickEditInfo() {
    $("#changeInfoHotspot").on("click", function() {
        $("#changeInfoHotspot").off("click");
        isInfoEditable = true;
        activateEditable();
        setFrontClassesEditInfo($("#editHotspots"));
    });
}

function onClickEditSize() {
    $("#resizeHotspot").on("click", function() {
        $("#changeInfoHotspot").off("click");
        isSizeEditable = true;
        resizeHotspot();
        setFrontClassesEditInfo($("#editHotspots"));
    });
}

function beforeDragging(el) {
    setFrontClassesDragging(el);

    for (var i = 0; i < modalSpots.length; i++) {
        startDragging(modalSpots[i].name);
    }
}

function setFrontClassesCreating(element) {
    if (createMode) {
        element.addClass("selectedOption");
        $("#editHotspots").addClass("isDisabled");
        $("#moveHotspots").addClass("isDisabled");
        $("#editHotspots").off("click");
        $("#moveHotspots").off("click");
        // activateSavingSpots();
    } else {
        element.removeClass("selectedOption");
        $("#editHotspots").removeClass("isDisabled");
        $("#moveHotspots").removeClass("isDisabled");
        $("#saveHotspots").addClass("isDisabled");
        onClickDraggable();
    }
}

function setFrontClassesDragging(element) {
    if (isDraggable) {
        element.addClass("selectedOption");
        $("#editHotspots").addClass("isDisabled");
        $("#createHotspots").addClass("isDisabled");
        $("#createHotspots").off("click");
        $("#editHotspots").off("click");
        $("#createHotspots").off("click");
        activateSavingSpots();
    } else {
        element.removeClass("selectedOption");
        $("#editHotspots").removeClass("isDisabled");
        $("#createHotspots").removeClass("isDisabled");
        $("#saveHotspots").addClass("isDisabled");
    }
}

function setFrontClassesEditInfo(element) {
    if (isInfoEditable || isSizeEditable) {
        element.addClass("selectedOption");
        element.off("click");
        element.on("click", function() {
            $(".editSpotDropDown").remove();
            Swal.fire({
                title: '¿Quieres salir sin guardar los cambios?',
                text: "Al salir de este modo, los cambios no serán guardados.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#13c18e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, descartar cambios'
            }).then((result) => {
                if (result.value) {
                    isInfoEditable = false;
                    isSizeEditable = false;
                    location.reload();
                    // isDraggable = false;
                    // onClicktoStart();
                    // beforeDragging($(this));
                } else {
                    isInfoEditable = true;
                    isSizeEditable = true;
                }
            });
        });
        $("#moveHotspots").addClass("isDisabled");
        $("#createHotspots").addClass("isDisabled");
        $("#createHotspots").off("click");
        $("#moveHotspots").off("click");
        $("#createHotspots").off("click");
        activateSavingSpots();
    } else {
        element.removeClass("selectedOption");
        $("#moveHotspots").removeClass("isDisabled");
        $("#createHotspots").removeClass("isDisabled");
        $("#saveHotspots").addClass("isDisabled");
    }
}

function modalCreator(mode, index) {
    $(".modalNewBtnClass").remove();
    // Creamos el modal para seleccionar el tipo de hotspot
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
        } else {
            switch (mode) {
                case "create":
                    $(".close-modal").click(function() {
                        $(".close-modal").off("click");
                        $("#createHotspots").removeClass("isDisabled");
                        restoreEverything();
                    });
                    $(".saveBtn").click(function() {
                        $(".saveBtn").off("click");
                        startCreating();
                    });
                    break;

                case "edit":
                    setInfoByType(index);

                    $(".close-modal").off("click").click(function() {
                        $("#modalQuickView").remove();
                        restoreEverything();
                    });
                    $(".saveBtn")
                        .off("click")
                        .text("Guardar")
                        .removeClass("blue-gradient")
                        .addClass("aqua-gradient")
                        .click(function() {
                            modalSpots[index].title = "GREAAATTT!!!";
                            console.log('%c Changes are saved!', 'color: green; font-weight: bold;');
                        });
                    break;
            }
        }
    });
}

function setInfoByType(index) {
    var type = modalSpots[index].type;

    $('#head').html("Tipo de Hotspot seleccionado: " + type);
    $('#select').val(type);
    $('#text').hide();
    $('#pdf').hide();
    $('#link').hide();
    $('#image').hide();
    $('#scene').hide();

    switch (type) {
        case "text":
            $('#text').show();
            $('.titletext').val(modalSpots[index].title);
            $('.imgtext').val(modalSpots[index].image);
            // $("#editor").val(modalSpots[index].message);
            $(".trumbowyg-editor").append(modalSpots[index].message);
            $('.icontext').val(modalSpots[index].icon);
            break;

        case "link":
            $('#link').show();
            $('.urllink').val(modalSpots[index].link);
            $('.iconlink').val(modalSpots[index].icon);
            break;

        case "image":
            $('#image').show();
            $('.titleimage').val(modalSpots[index].title);
            $('.imgimage').val(modalSpots[index].image);
            $('.iconimage').val(modalSpots[index].icon);
            break;

        case "pdf":
            $('#pdf').show();
            $('.titlepdf').val(modalSpots[index].title);
            $('.urlpdf').val(modalSpots[index].link);
            $('.iconpdf').val(modalSpots[index].icon);
            break;

        case "scene":
            $('#scene').show();
            $(".sceneSelect input").val(modalSpots[index].link);
            $('.iconscene').val(modalSpots[index].icon);
            break;
    }
}

function spotsGetter() {
    getAllHotspots().done(function(response) {
        // console.log('response: ', response);

        setTimeout(function() {
            if (response.length > 0) {
                var listHotspots = response;
                globalSpotCount += response.length;
                // paintSpots(listHotspots);
                showInfoSpot(listHotspots);
            }
        }, 100);
    }).fail(function(err) {
        // console.log('err____: ', err);
    })
}

function activateEditable() {
    if (isInfoEditable) {
        for (var i = 0; i < modalSpots.length; i++) {
            krpano.call("set(hotspot[" + i + "].onclick, js(launchEditableModal(" + i + "));)");
        }
    }
}

function launchEditableModal(index) {
    modalCreator("edit", index);
    $("#modalQuickView").modal();

}

function startCreating() {
    createMode = true;
    setFrontClassesCreating($("#createHotspots"));
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
        case "scene":
            if ($(".sceneSelect input").val() == "") {
                Swal.fire("Escena no especificada", "Por favor especifique escena", "info");
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
    var spotname = "spot" + globalSpotCount;
    // Declaramos el objeto para pasar a la funcion createSpot()
    var objSpot = { "krpano": krpano, "spotname": spotname, "spotIcon": spotIcon };
    // Por cada tipo de botón ejecuta una función diferente para la creación del mismo
    createSpot(spoType, objSpot);
    // Escondemos el modal de creación de Hotspot
    $(`.modalNewBtnClass`).hide();
}

function createSpot(type, obj) {
    var krpano = obj.krpano;
    var title = "";
    var img = "";
    var body = ``;
    var link = "";
    var video = "";
    createMode = true;
    // Evento para crear el botón al clickar dentro de la imagen
    $("body").mousedown(function() {
        var str = "";
        // Creamos el Hotspot y le ponemos el nombre, icono y coordenadas.
        var standardObj = standardSpot(str, obj);
        str += standardObj.str;

        var spotInfo = objSpotGetter(type, obj);

        objSpot = {
            "project": "TERQUIMSA",
            "scene": krpano.get("xml.scene"),
            "name": obj.spotname,
            "title": spotInfo.title,
            "message": spotInfo.body,
            "icon": obj.spotIcon,
            "image": spotInfo.image,
            "video": spotInfo.video,
            "type": type,
            "link": spotInfo.link,
            "coordinate_x": standardObj.ath,
            "coordinate_y": standardObj.atv
        }

        str = assignOnClick(str, objSpot);

        globalSpotCount++;
        areSpotsCreated = true;
        // Reseteamos los eventos.
        document.onselectstart = null // ie
        document.onmousedown = null // mozilla
        krpano.call(str);
    });
    // Quitamos el MouseDown Event al Body
    resetBodyEvent();
}

function objSpotGetter(type, obj) {
    var title = "";
    var img = "";
    var video = "";
    var body = "";
    var link = "";
    switch (type) {
        case "text":
            title = $('.titletext').val();
            img = $('.imgtext').val() || "";
            body = $("#editor").val().replace(/["']/g, "'");
            break;

        case "link":
            link = $('.urllink').val() || "https://www.ges-emer.com";
            break;

        case "image":
            title = $('.titleimage').val() || "";
            img = $('.imgimage').val();
            break;

        case "pdf":
            title = $('.titlepdf').val() || "";
            link = $('.urlpdf').val();
            break;

        case "scene":
            link = $(".sceneSelect input").val();
            break;

    }

    return { "image": img, "title": title, "body": body, "video": video, "link": link };
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
    str += "set(hotspot[" + obj.spotname + "].keep,true);";
    // str += "set(hotspot[" + spotname + "].onhover,showtit(););";
    var returnedObj = { "str": str, "ath": mouse_at_h, "atv": mouse_at_v }
    return returnedObj;
}

function resetBodyEvent() {
    $("body").keyup(function(event) {
        if (event.keyCode === 13) {
            if (createMode) {
                activateSavingSpots();
                modalSpots.push(objSpot);
                listHotspots.push(objSpot);
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
        // isSaved = true;
        if (createMode) {
            createListHotspots(Object.assign({}, listHotspots))
                .done(function(response) {
                    $("#saveHotspots").addClass("isDisabled");
                    Swal.fire(
                        "¡Hotspot creado!",
                        "Se ha creado correctamente el Hotspot: en la Base de datos",
                        "success"
                    );
                    listHotspots = [];
                    $("#saveHotspots").off();
                    createMode = false;
                    setFrontClassesCreating($("#createHotspots"));
                }).fail(function(err) {
                    // console.log('err____', err);
                });
        }
        if (isDraggable) {
            Swal.fire({
                title: '¿Guardar los cambios?',
                text: "Al confirmar guardaremos todos los cambios en la base de datos",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#13c18e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Guardar cambios'
            }).then((result) => {
                if (result.value) {
                    isDraggable = false;
                    beforeDragging($("#moveHotspots"));
                    updateHotspotByName(Object.assign({}, listHotspots)).done(function(response) {
                        // console.log('response update: ', response);
                        // setTimeout(function() {
                        location.reload();
                        // }, 5000);

                    }).fail(function(err) {
                        // console.log('error update: ', err);
                    })

                } else {
                    // isSaved = false;
                }
            });

        }
        if (isInfoEditable) {
            Swal.fire({
                title: '¿Guardar los cambios?',
                text: "Al confirmar guardaremos todos los cambios en la base de datos",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#13c18e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Guardar cambios'
            }).then((result) => {
                if (result.value) {
                    isInfoEditable = false;
                    // Update en la base de datos


                    // beforeDragging($("#moveHotspots"));
                    // updateHotspotByName(Object.assign({}, listHotspots)).done(function(response) {
                    // console.log('response update: ', response);
                    // setTimeout(function() {
                    location.reload();
                    // }, 5000);

                    // }).fail(function(err) {
                    //     // console.log('error update: ', err);
                    // })

                } else {
                    // isSaved = false;
                }
            });

        }
        if (isSizeEditable) {
            Swal.fire({
                title: '¿Guardar los cambios?',
                text: "Al confirmar guardaremos todos los cambios en la base de datos",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#13c18e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Guardar cambios'
            }).then((result) => {
                if (result.value) {
                    $(this).addClass("isDisabled");
                    $(this).off();
                    isSizeEditable = false;
                    // Update en la base de datos


                    // beforeDragging($("#moveHotspots"));
                    // updateHotspotByName(Object.assign({}, listHotspots)).done(function(response) {
                    // console.log('response update: ', response);
                    // setTimeout(function() {
                    location.reload();
                    // }, 5000);

                    // }).fail(function(err) {
                    //     // console.log('error update: ', err);
                    // })

                } else {
                    // isSaved = false;
                }
            });

        }
    });

}

function restoreEverything() {
    $("body").off("keyup");
    $(".modal-backdrop").remove();
    // $("#createHotspots").removeClass("isDisabled");
    onClicktoStart();
    // Eliminamos el modal de creación de Hotspot
    $(`.modalNewBtnClass`).remove();
}

function getSceneType() {
    var imagetype = "";

    for (var index = 0; index < krpano.get("scene.count"); index++) {
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

function getSceneTypeFromDB(spotScene) {
    var imagetype = "";

    var xmlContent = "<scene>" + krpano.get('scene[' + spotScene + '].content') + "</scene>";
    xmlDoc = $.parseXML(xmlContent);
    if ($(xmlDoc).find("flat").length > 0) {
        imagetype = "flat";
    } else if ($(xmlDoc).find("cube").length > 0) {
        imagetype = "cube";
    }


    return imagetype
}

function modalSpotsCreator(currentSpotName, spoType) {
    $(".modalSpotTitle").empty();
    $(".modalSpotBody").empty();
    for (var i = 0; i < modalSpots.length; i++) {
        if (modalSpots[i].name == currentSpotName) {
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
    var textToHtml = ``;
    // Creamos el modal para seleccionar el tipo de hotspot
    textToHtml = currentSpot.message.replace(/["']/g, "'");
    $(`.modalSpotTitle`).text(currentSpot.title);

    if (currentSpot.image != "") {
        textToHtml += `<img src='` + currentSpot.image + `' width='500px'>`;
    }
    $(`.modalSpotBody`).html(textToHtml);
}

function modalImage(currentSpot) {
    var textToHtml = "";
    // Creamos el modal para seleccionar el tipo de hotspot
    textToHtml += "<img src='" + currentSpot.image + "' width='100%'>";

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

function showInfoSpot(listHotspots) {
    var str = "";
    for (var i = 0; i < listHotspots.length; i++) {
        str = paintSpots(str, listHotspots[i]);
        str = assignOnClick(str, listHotspots[i]);
        // str = str + assignOnClick(str, listHotspots[i]);

    }

    // var str = obj.str;
    krpano.call(str);
    return str;
}

function paintSpots(str, spot) {
    var currentSceneType = getSceneTypeFromDB(spot.scene);

    str += "addhotspot(" + spot.name + ");";
    str += "set(hotspot[" + spot.name + "].url," + spot.icon + ");";
    str += "set(hotspot[" + spot.name + "].ath," + spot.coordinate_x + ");";
    str += "set(hotspot[" + spot.name + "].atv," + spot.coordinate_y + ");";
    if (currentSceneType == "flat") {
        str += "set(hotspot[" + spot.name + "].scale,0.2);"; //0015
        str += "set(hotspot[" + spot.name + "].height, 1px);";
        str += "set(hotspot[" + spot.name + "].width, 1px);";
    } else if (currentSceneType == "cube") {
        str += "set(hotspot[" + spot.name + "].scale,1);"; //0015
        str += "set(hotspot[" + spot.name + "].height, 50);";
        str += "set(hotspot[" + spot.name + "].width, 50);";
    }
    // str += "set(hotspot[" + spot.name + "].scale,0.2);"; //0015
    // str += "set(hotspot[" + spot.name + "].height, 1px);";
    // str += "set(hotspot[" + spot.name + "].width, 1px);";
    str += "set(hotspot[" + spot.name + "].zoom, true);";
    str += "set(hotspot[" + spot.name + "].scene_EL, " + spot.scene + ");";
    str += "set(hotspot[" + spot.name + "].title," + spot.title + ");";
    str += "set(hotspot[" + spot.name + "].onhover,showtit());";
    str += "set(hotspot[" + spot.name + "].hovering,true);";
    str += "set(hotspot[" + spot.name + "].keep,true);";
    // var obj = { 'str': str }
    // krpano.call(str);
    return str;
}

function assignOnClick(str, param) {
    switch (param.type) {
        case "text":
            // ************************* START ONCLICK *************************
            str += "set(hotspot[" + param.name + "].onclick, js(showModalonSpot());";
            str += "js(modalSpotsCreator('" + param.name + "', '" + param.type + "'));";
            str += "js(document.getElementById('modalSpot').style.display = 'block');";
            // str += "js(console.log('final ', " + param.name + "););"
            str += ");";
            // ************************* END ONCLICK *************************
            break;

        case "link":
            // ************************* START ONCLICK *************************
            str += "set(hotspot[" + param.name + "].onclick,";
            str += "js(window.open(" + param.link + ", `_blank`););";
            // str += "js(modalCreator(););";
            // str += "js(console.log('final ', " + spotname + "););"
            str += ");";
            // ************************* END ONCLICK *************************
            break;

        case "image":
            // ************************* START ONCLICK *************************
            str += "set(hotspot[" + param.name + "].onclick, js(showModalonSpot());";
            str += "js(modalSpotsCreator('" + param.name + "', '" + param.type + "'));";
            str += "js(document.getElementById('modalSpot').style.display = 'block');";
            // str += "js(console.log('final ', " + spotname + "););"
            str += ");";
            // ************************* END ONCLICK *************************
            break;

        case "pdf":
            // ************************* START ONCLICK *************************
            str += "set(hotspot[" + param.name + "].onclick, js(showModalonSpot());";
            str += "js(modalSpotsCreator('" + param.name + "', '" + param.type + "'));";
            str += "js(document.getElementById('modalSpot').style.display = 'block');";
            // str += "js(console.log('final ', " + spotname + "););"
            str += ");";
            // ************************* END ONCLICK *************************
            break;

        case "scene":
            // ************************* START ONCLICK *************************
            str += "set(hotspot[" + param.name + "].onclick, loadscene(" + param.link + "););";
            // ************************* END ONCLICK *************************
            break;
    }
    modalSpots.push(param);
    return str;
}

function sceneSelector() {
    var sceneCount = krpano.get("scene.count");
    var sceneName = "";
    for (var i = 0; i < sceneCount; i++) {
        sceneName = krpano.get("scene[" + i + "].name");
        $('<option value="' + sceneName + '">' + sceneName + '</option>').insertAfter($("#scenePlaceholder"));
    }
}

function resizeHotspot() {
    for (var i = 0; i < modalSpots.length; i++) {
        krpano.call("set(hotspot[" + modalSpots[i].name + "].onclick, js(showModalResize());)");
    }
}

function showModalResize() {
    $(".modalResizeClass").remove();
    // Creamos el modal para cambiar el tamaño del Hotspot

    $('<div class="modal fade modalResizeClass" id="modalResize" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<a href="#" class="close" data-dismiss="modal" aria-label="close">&times;</a>' +
        '<h4 align="center"><font color="black">Resize Hotspot</font></h4>' +
        '<div id="modalNewBtn" class="row">' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>').appendTo("body");
    $('#modalResize').modal();

    var type = getSceneType();
    if (type == 'flat') {
        $('<div class="d-flex justify-content-center my-4">' +
            '<span class="font-weight-bold blue-text mr-2 mt-1">0.0</span>' +
            '<form class="range-field w-50">' +
            ' <input class="border-0" type="range" min="0.0" max="0.5" step="0.1" />' +
            '</form>' +
            '<span class="font-weight-bold blue-text ml-2 mt-1">0.5</span>' +
            '</div>'
        ).appendTo("#modalNewBtn");
    } else if (type == 'cube') {
        $('<div class="d-flex justify-content-center my-4">' +
            '<span class="font-weight-bold blue-text mr-2 mt-1">0</span>' +
            '<form class="range-field w-50">' +
            ' <input class="border-0" type="range" min="0" max="10"/>' +
            '</form>' +
            '<span class="font-weight-bold blue-text ml-2 mt-1">10</span>' +
            '</div>'
        ).appendTo("#modalNewBtn");
    } else {
        console.log('type not found');
    }
}