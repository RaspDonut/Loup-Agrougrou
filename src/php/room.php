<?php
class Room
{
    /**
     * @var int $id Room's ID
     */
    private $id;

    /**
     * @var string $room_name Room's Name
     */
    private $username;

    /**
     * @var int $creator_id Room creator's ID
     */
    private $creator_id;

    /**
     * Constructs a new room
     * @param int $id
     * @param string $username
     * @param int $creator_id
     */
    public function __construct(int $id, string $username, int $creator_id) {
        $this->id = $id;
        $this->username = $username;
        $this->creator_id = $creator_id;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getRoomName(): string
    {
        return $this->room_name;
    }

    /**
     * @return int
     */
    public function getCreatorId(): int
    {
        return $this->creator_id;
    }
}
?>
