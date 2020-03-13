<?php
require '../Hotspot/hotspot.php';

$hotspot = new Hotspot();

echo json_encode($hotspot->updateHotspotByName($_POST), JSON_UNESCAPED_UNICODE);
