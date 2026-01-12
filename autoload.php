<?php

define('ROOT_PATH', __DIR__);

spl_autoload_register(function ($class) {
    $paths = [
        ROOT_PATH . '/config/' . $class . '.php',
        ROOT_PATH . '/src/Interfaces/' . $class . '.php',
        ROOT_PATH . '/src/Classes/' . $class . '.php'
    ];

    foreach ($paths as $path) {
        if (file_exists($path)) {
            require_once $path;
            return;
        }
    }
});
