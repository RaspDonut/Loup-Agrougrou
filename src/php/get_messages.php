<?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();
    if(isset($_POST['room_id'])) {
        $messages_list = $database->getMessagesByRoomId($_POST['room_id'], $_POST['last_message']);

        foreach ($messages_list as $message) {
            $username = $database->getUserById($message->getUserID())->getUsername();
            $messages_array[] = array("message_id" => $message->getId(), "room_id" => $message->getRoomID(), "user_id" => $message->getUserID(),"username" => $username, "message" => $message->getMessage());
        }

        if($messages_array == NULL) {
            echo json_encode("{}");
        }
        echo json_encode($messages_array);
    }
?>
