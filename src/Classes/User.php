<?php

class User extends Database
{
    private $id;
    private $name;
    private $email;

    public function __construct($id = null, $name = null, $email = null)
    {
        parent::__construct();
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    public static function getHardcodedUser()
    {
        return [
            'id' => 1,
            'name' => 'Demo Gebruiker',
            'email' => 'demo@feestje.nl'
        ];
    }

    public function getName()
    {
        return $this->name;
    }

    public function getEmail()
    {
        return $this->email;
    }
}
