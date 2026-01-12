<?php

class Activity extends BaseModel implements JsonRenderable
{
    private $db;

    public function __construct(Database $database)
    {
        $this->db = $database;
    }

    public function getAll()
    {
        $stmt = $this->db->getConnection()->query("SELECT * FROM activities ORDER BY date ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function toJson()
    {
        return json_encode($this->data);
    }
}
