<?php
// define("DB_HOST","localhost");
// define("DB_USER","edt_spts");
// define("DB_PASS","3dIt48L.e");
// define("DB_NAME","editable_hotspots");

define("DB_HOST","localhost");
define("DB_USER","TerquimsA");
define("DB_PASS","AsmiuqresT!19");
define("DB_NAME","demo_terquimsa");

// define("DB_HOST","localhost");
// define("DB_USER","pregesem_Terquim");
// define("DB_PASS","AsmiuqresT!19");
// define("DB_NAME","pregesem_terquimsa");

function connection() {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    mysqli_set_charset($conn, "utf8");
    if ( !$conn ) {
        die('No connection: ' . mysqli_connect_error());
    } else {
        return $conn;
    }
}
?>