<?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();
    if(isset($_POST['room_id']) && isset($_POST['user_id']) && isset($_POST['message'])){
        $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

        $database->addMessage($_POST['room_id'], $_POST['user_id'], $message);
        echo json_encode("{}");
}
?>
