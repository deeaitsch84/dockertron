<?php
/**
 * @author Dennis Haseloff <dennis.haseloff@alemo.de>
 * @since: 27.12.19
 */

namespace App\Service;



use App\Clients\DockerClient;
use GuzzleHttp\ClientInterface;

class DockerService
{

    /**
     * @var DockerClient
     */
    private DockerClient $client;

    public function __construct(DockerClient $client)
    {
        $this->client = $client;
    }

    public function getContainer($filter = null): array
    {
        $response = $this->client->get("/containers/json");
        return \GuzzleHttp\json_decode((string)$response->getBody(), true);
    }
}
