<?php
/**
 * @author Dennis Haseloff <dennis.haseloff@alemo.de>
 * @since: 27.12.19
 */
namespace App\Clients;



use GuzzleHttp\Client;

class DockerClient extends Client
{
    public function __construct(array $config = [])
    {
        $config["curl"] = [
            CURLOPT_UNIX_SOCKET_PATH => '/var/run/docker.sock'
        ];

        $config["base_uri"] = "http://v1.24";

        parent::__construct($config);
    }
}
