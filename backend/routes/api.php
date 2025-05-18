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

    case preg_match('/\/api\/logout$/', $request):
        require_once __DIR__ . '/../controllers/AuthController.php';
        (new AuthController())->logout();
        break;

    case preg_match('/\/api\/user$/', $request):
        require_once __DIR__ . '/../controllers/AuthController.php';
        (new AuthController())->getCurrentUser();
        break;
        
    case preg_match('/\/api\/auth\/verify-admin$/', $request):
        require_once __DIR__ . '/../controllers/AuthController.php';
        (new AuthController())->verifyAdmin();
        break;

    case preg_match('/\/api\/admin\/(.*?)$/', $request, $matches):
        // Kiểm tra quyền admin trước khi cho phép truy cập
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        // Nếu qua được middleware, tiếp tục xử lý route admin
        $adminPath = $matches[1] ?? '';

        // Xử lý các route admin dựa trên $adminPath
        // Ví dụ: /api/admin/users, /api/admin/categories, v.v.
        switch (true) {
            case preg_match('/^users/', $adminPath):
                require_once __DIR__ . '/../controllers/UserController.php';
                // Xử lý quản lý người dùng
                break;

            case preg_match('/^categories/', $adminPath):
                require_once __DIR__ . '/../controllers/CategoryController.php';
                // Xử lý quản lý danh mục
                break;

            default:
                jsonResponse(['error' => 'Admin route không hợp lệ'], 404);
        }
        break;

    case preg_match('/\/api\/users/', $request):
        require_once __DIR__ . '/../controllers/UserController.php';
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

    case preg_match('/\/api\/comments/', $request):
        require_once __DIR__ . '/../controllers/CommentsController.php';
        break;

    case preg_match('/\/api\/queries/', $request):
        require_once __DIR__ . '/../controllers/QueryController.php';
        break;

    // Nếu truy cập trực tiếp vào root backend
    case preg_match('/\/backend(\/)?$/', $request):
        echo json_encode(['message' => 'Chào mừng bạn đến với Inkspire API. Vui lòng sử dụng các endpoint bắt đầu bằng /api/']);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'API route not found']);
}
