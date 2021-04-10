<?php
    //use mysqli
    include 'user.php';
    include 'room.php';
    include 'message.php';

    class DatabaseAccess {
        /**
         * @var mysqli $mysqli A mysqli connection to the database.
         */
        private $mysqli;

        /**
         * AuthDB constructor. Connects AuthDB to the database
         */
        public function __construct() {
            //Connection to the database
            $this->mysqli = new mysqli('mysql-raspdonut.alwaysdata.net', 'raspdonut', 'apqmwn794613', 'raspdonut_agrougrou_db');

            if ($this->mysqli->connect_errno) {
                error_log('Connection error with mysqli (file: DatabaseAccess.php)', 3, 'logs');
            }
        }

        /**
         * Create a new user in the database.
         * @param string $username Username of the new user
         * @param string $password Hashed password of the new user
         */
        public function registerUser(string $username, string $password) {
            $prepared_query = $this->mysqli->prepare('INSERT INTO USERS (name, password) VALUES (?, ?)');
            $prepared_query->bind_param('ss', $username, $password);
            if(!$prepared_query->execute()) {
                error_log("Error adding a new user (file: DatabaseAccess.php)", 3, "logs");
            }
        }

        public function getUserById(int $id): User {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM USERS WHERE user_Id = ?');
            $prepared_query->bind_param('i', $id);
            if(!$prepared_query->execute()) {
                error_log("Error requesting a user from id (file: DatabaseAccess.php)", 3, "logs");
            }
            $result = $prepared_query->get_result();
            $user_data = $result->fetch_array(MYSQLI_ASSOC);
            return new User($user_data['user_Id'], $user_data['name'], $user_data['password']);
        }

        public function getUsersByUsername(string $username): ?array {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM USERS WHERE name = ?');
            $prepared_query->bind_param('s', $username);
            if(!$prepared_query->execute()) {
                error_log("Error requesting users from username (file: DatabaseAccess.php)", 3, "logs");
            }
            $result = $prepared_query->get_result();
            while ($user_data = $result->fetch_array(MYSQLI_ASSOC)) {
                $users_array[] = new User($user_data['user_Id'], $user_data['name'], $user_data['password']);
            }
            if (isset($users_array)) {
                return $users_array;
            }
            return null;
        }

        public function getLoggedInUser(): ?User {
            if(!is_int($_SESSION['current_user'])) {
                //no one is logged in
                return null;
            }

            try {
                return $this->getUserById($_SESSION['current_user']);
            } catch(Exception $e) {
                // Stored logged in user is invalid, fix this
                unset($_SESSION['current_user']);
                return null;
            }
        }

        public function getRoomById(int $id): ?Room {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM ROOMS WHERE room_Id = ?');
            $prepared_query->bind_param('i', $id);
            if(!$prepared_query->execute()) {
                error_log("Error requesting a room from id (file: DatabaseAccess.php)", 3, "logs");
            }
            $result = $prepared_query->get_result();
            $room_data = $result->fetch_array(MYSQLI_ASSOC);
            if($room_data == NULL) {
                return NULL;
            }

            return new Room($room_data['room_Id'], $room_data['room_name'], $room_data['creator_Id']);
        }

        private function randomRoomID(): int {
            return mt_rand(100, 999);
        }

        /**
         * Create a new user in the database.
         * @param string $room_name Name of the new room
         * @param int $creator_id Creator of the new room
         */
        public function addRoom(string $room_name, int $creator_id): ?Room {
            while (true) {
                $rand_id = $this->randomRoomID();
                if ($this->getRoomById($rand_id) == NULL) {
                    break;
                }
            }

            $prepared_query = $this->mysqli->prepare('INSERT INTO ROOMS (room_Id, room_name, creator_Id) VALUES (?, ?, ?)');
            $prepared_query->bind_param('isi', $rand_id, $room_name, $creator_id);
            if(!$prepared_query->execute()) {
                error_log("Error adding a new room (file: DatabaseAccess.php)", 3, "logs");
            }

            return new Room($rand_id, $room_name, $creator_id);
        }

        public function getMessagesByRoomId(int $room_id, int $last_id): ?array {
            $prepared_query = $this->mysqli->prepare('SELECT * FROM MESSAGES WHERE room_id = ? AND msg_id > ? ORDER BY msg_id ASC');
            $prepared_query->bind_param('ii', $room_id, $last_id);
            if(!$prepared_query->execute()) {
                error_log("Error adding a new room (file: DatabaseAccess.php)", 3, "logs");
            }

            $result = $prepared_query->get_result();
            while ($message_data = $result->fetch_array(MYSQLI_ASSOC)) {
                $messages_array[] = new Message($message_data['msg_id'], $message_data['room_id'], $message_data['user_id'], $message_data['message']);
            }
            if (isset($messages_array)) {
                return $messages_array;
            }
            return null;
        }

        public function addMessage(int $room_id, int $user_id, string $message) {
            $prepared_query = $this->mysqli->prepare('INSERT INTO MESSAGES (room_id, user_id, message) VALUES (?, ?, ?)');
            $prepared_query->bind_param('iis', $room_id, $user_id, $message);

            if(!$prepared_query->execute()) {
                error_log("Error adding a new room (file: DatabaseAccess.php)", 3, "logs");
            }
        }

        /**
         * AuthDB destructor. Closes the mysqli connection to the database.
         */
        public function __destruct(){
            $this->mysqli->close();
        }
    }
?>