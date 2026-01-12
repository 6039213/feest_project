<?php

require_once __DIR__ . '/../autoload.php';

header('Content-Type: application/json');

$database = new Database();
$activity = new Activity($database);
$activities = $activity->getAll();

echo json_encode($activities);
