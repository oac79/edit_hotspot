<?php
require '../Hotspot/hotspot.php';

$hotspot = new Hotspot();

echo json_encode($hotspot->getAllHotspots($_GET), JSON_UNESCAPED_UNICODE);