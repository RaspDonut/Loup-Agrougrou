<?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();

    if(isset($_POST['room_id'])){
        $room_id = filter_var($_POST['room_id'], FILTER_SANITIZE_NUMBER_INT);
        $room = $database->getRoomById($room_id);
        if ($room == NULL) {
            echo json_encode("Existn't");
        } else {
            $room_data = array("room_id" => $room->getId(), "room_name" => $room->getRoomName(), "room_creator" => $room->getCreatorId());
            echo json_encode($room_data);
        }
    }
?>
