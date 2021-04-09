<?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();
    if(isset($_POST['room_name']) && isset($_POST['creator_id'])){
        $room_name = filter_var($_POST['room_name'], FILTER_SANITIZE_STRING);
        $creator_id = $_POST['creator_id'];

        $database->addRoom($room_name, $creator_id);
    }
?>
