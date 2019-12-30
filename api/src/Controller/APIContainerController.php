<?php
/**
 * @author Dennis Haseloff <dennis.haseloff@alemo.de>
 * @since: 27.12.19
 */
namespace App\Controller;


use App\Service\DockerService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class APIContainerController
{

    /**
     * @var DockerService
     */
    private DockerService $dockerService;

    public function __construct(DockerService $dockerService)
    {
        $this->dockerService = $dockerService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function get(Request $request): JsonResponse
    {
        return new JsonResponse($this->dockerService->getContainer($request->get("filter", null)));
    }
}
