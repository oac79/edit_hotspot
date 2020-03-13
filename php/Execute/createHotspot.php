<?php
require '../Hotspot/hotspot.php';

$hotspot = new Hotspot();

echo json_encode($hotspot->createHotspot($_POST), JSON_UNESCAPED_UNICODE);
