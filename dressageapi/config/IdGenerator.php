
<?php

class IdGenerator{

    //generate id
    static function generateId(){
        $id = openssl_random_pseudo_bytes(25);
        $id = bin2hex($id);
        return $id;
    }

}