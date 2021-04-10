<?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();
    if(isset($_POST['room_name']) && isset($_POST['creator_id'])){
        $room_name = filter_var($_POST['room_name'], FILTER_SANITIZE_STRING);
        $creator_id = $_POST['creator_id'];

        $room = $database->addRoom($room_name, $creator_id);
        $room_data = array("room_id" => $room->getId(), "room_name" => $room->getRoomName(), "room_creator" => $room->getCreatorId());
        echo json_encode($room_data);
    }
?>
