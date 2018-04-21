<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 2/04/2018
 * Time: 18:50
 */

$token = openssl_random_pseudo_bytes(50);
$token = bin2hex($token);

//Print it out for example purposes.
echo $token;