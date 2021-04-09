    <?php
    require 'DatabaseAccess.php';

    $database = new DatabaseAccess();

    if(isset($_POST['room_id'])){
        $room_id = filter_var($_POST['room_id'], FILTER_SANITIZE_NUMBER_INT);
        $room_data = $database->getRoomById($room_id);
        if ($room_data == NULL) {
            echo json_encode("Existn't");
        } else {
            $room_data_array = array("id" => "$room_data[0]");
            var_dump($room_data);
            //echo json_encode($room_data);
        }
    }
?>
