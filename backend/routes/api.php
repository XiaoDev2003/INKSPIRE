<?php
$request = $_SERVER['REQUEST_URI'];

switch (true) {
    case preg_match('/\/api\/register$/', $request):
        require_once __DIR__ . '/../controllers/AuthController.php';
        (new AuthController())->register();
        break;

    case preg_match('/\/api\/login$/', $request):
        require_once __DIR__ . '/../controllers/AuthController.php';
        (new AuthController())->login();
        break;

    case preg_match('/\/api\/categories/', $request):
        require_once __DIR__ . '/../controllers/CategoryController.php';
        break;

    case preg_match('/\/api\/items/', $request):
        require_once __DIR__ . '/../controllers/ItemController.php';
        break;

    case preg_match('/\/api\/gallery/', $request):
        require_once __DIR__ . '/../controllers/GalleryController.php';
        break;

    case preg_match('/\/api\/feedback/', $request):
        require_once __DIR__ . '/../controllers/FeedbackController.php';
        break;

    case preg_match('/\/api\/queries/', $request):
        require_once __DIR__ . '/../controllers/QueryController.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'API route not found']);
}
