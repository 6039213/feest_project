<?php

class Database
{
    protected $connection;

    public function __construct()
    {
        $host = 'localhost';
        $dbname = 'feest_db';
        $username = 'root';
        $password = '';

        $this->connection = new PDO(
            "mysql:host=$host;dbname=$dbname;charset=utf8",
            $username,
            $password
        );
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}
