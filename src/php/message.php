<?php
    class Message
    {
        /**
         * @var int $id Message's ID
         */
        private $id;

        /**
         * @var int $room_id Room's ID
         */
        private $room_id;

        /**
         * @var int $user_id Message's user ID
         */
        private $user_id;

        /**
         * @var string $message Message
         */
        private $message;

        /**
         * Constructs a new room
         * @param int $id
         * @param int $room_id
         * @param int $user_id
         * @param string $message
         */
        public function __construct(int $id, int $room_id, int $user_id, string $message) {
            $this->id = $id;
            $this->room_id = $room_id;
            $this->user_id = $user_id;
            $this->message = $message;
        }

        /**
         * @return int
         */
        public function getId(): int
        {
            return $this->id;
        }

        /**
         * @return int
         */
        public function getRoomID(): int
        {
            return $this->room_id;
        }

        /**
         * @return int
         */
        public function getUserID(): int
        {
            return $this->user_id;
        }

        /**
         * @return string
         */
        public function getMessage(): string
        {
            return $this->message;
        }
}
?>
