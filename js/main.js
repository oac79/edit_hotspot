$(document).ready(function() {
    $("#enter").click(function() {
        var activeInfo = { "usuario": $('#usuario').val(), "contrasena": $('#contrasena').val() };
        var request = $.ajax({
            url: "php/login.php",
            type: "post",
            dataType: 'json',
            data: activeInfo
        });
        request.done((response, _textStatus, _jqXHR) => {
            var dataRes = response;
            if (dataRes.length > 0) {
                document.cookie = "iam=6Af3B@dR";
                location.href = "tour.html";
            } else {
                alert('Las credenciales no son correctos, por favor revíselos y vuelve a intentarlo.')
            }
        });
        request.fail((_jqXHR, textStatus, errorThrown, response) => {
            // console.log("response Fail: ", response);
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown);
        });
    });
});

// ****************registrar usuario*******************************
// $("#registraUser").click(function(){
//   var activeInfo = {"usuario": $('#usuario').val(), "contrasena": $('#contrasena').val()};
//      var request = $.ajax({
//          url: "php/login.php",
//          type: "post",
//          dataType: 'json',
//          data: activeInfo
//      });
//      request.done((response, textStatus, jqXHR) => {
//          var dataRes = response;
//          if (dataRes.length > 0) {
//           location.href = "tour.html";
//          }
//          else{
//           alert('No existe en la base de datos')
//          }
//      });
//      request.fail((jqXHR, textStatus, errorThrown, response) => {
//          console.log("response Fail: ", response);
//          console.error(
//              "The following error occurred: " +
//              textStatus, errorThrown);     
//      });
// });

function entrar() {
    var sessionTimeout = 2; //time in milliseconds
    var loginDuration = new Date();
    document.cookie = "iam=6Af3B@dA";
    document.cookie = "path=admin.html";
    loginDuration.setTime(loginDuration.getTime() + (sessionTimeout));
    document.cookie = "expires=" + loginDuration.toGMTString() + "";
    location.href = "admin.html";

}

function returnToLogin() {
    document.cookie = "iam=badboy";
    location.href = "index.html";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var locationScene = "pano10";

function enseniaflecha(bool) {
    if (bool == 'validado') {
        document.getElementById('atrasico').style.display = 'block';
        document.getElementById('goToLogin').style.display = 'none';
    } else {
        document.getElementById('atrasico').style.display = 'none';
        document.getElementById('goToLogin').style.display = 'block';
    }
}

function volver() {
    // enseniaflecha('nope');
    //krpano.call('loadscene(pano10,null, MERGE, BLEND(0,5));');
    location.reload();
    document.getElementById('titulonavbar').innerHTML = "Plano Maxion";
}

function salir() {
    if (locationScene == "pano10") {
        locationScene = 'pano10';
    }
}

function changeTittle(param) {
    document.getElementById('titulonavbar').innerHTML = param;
}