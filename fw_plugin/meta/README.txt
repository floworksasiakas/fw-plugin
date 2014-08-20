README

    File       : README.txt
    Time-stamp : 2014-08-20T11:31 Sami Joutsijoki
    Description: Contains general information about the product.

GENERAL INFO

    Product name  : Floworks WordPress plugin
    Developer     : Sami Joutsijoki, sami.joutsijoki@cs.tamk.fi

DESCRIPTION OF THE PRODUCT

    FW_plugin is a WordPress plugin that allows user to create a project management
    environment for kanban -projects. As of WordPress version 3.9.2 this plugin
    requires JSON REST API (https://wordpress.org/plugins/json-rest-api/)
    and Basic Authentication (https://github.com/WP-API/Basic-Auth)
    plugins to work.

FILES

    fw_plugin/
    |
    +-- README.txt            // This file.
    |
    +-- PRODUCTBACKLOG.txt    // List of features for each release.
    |
    +-- admin/                // Contains code used in the admin side.
    |
    +-- widget/               // Contains code to create the widgets.
    |
    +-- comment/              // Contains code used to handle commenting section in posts.
    |
    +-- index.php             // The index file of the plugin.
    |
    +-- JRAHandler.js         // File that raises the level of abstraction from the 
                              // JSON REST API to a more user friendly stage.

End of file.