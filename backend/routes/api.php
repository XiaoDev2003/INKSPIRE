<?php
// Định nghĩa các routes cho API

// Nhập các controllers
require_once __DIR__ . '/../controllers/CommentController.php';

$request = $_SERVER['REQUEST_URI'];

switch (true) {
    // Page Views API endpoints
    case preg_match('/\/api\/page-views\/get$/', $request):
        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->getPageViews();
        break;

    case preg_match('/\/api\/page-views\/increment$/', $request):
        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->incrementPageViews();
        break;

    case preg_match('/\/api\/admin\/page-views\/all$/', $request):
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->getAllCounters();
        break;

    case preg_match('/\/api\/admin\/page-views\/get$/', $request):
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->getCounterById();
        break;

    case preg_match('/\/api\/admin\/page-views\/create$/', $request):
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->createCounter();
        break;

    case preg_match('/\/api\/admin\/page-views\/update$/', $request):
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->updateCounter();
        break;

    case preg_match('/\/api\/admin\/page-views\/delete$/', $request):
        require_once __DIR__ . '/../middleware/AdminMiddleware.php';
        $adminMiddleware = new AdminMiddleware();
        $adminMiddleware->checkAdminAccess();

        require_once __DIR__ . '/../controllers/PageViewController.php';
        (new PageViewController())->deleteCounter();
        break;
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

    case preg_match('/\/api\/user\/profile$/', $request):
        require_once __DIR__ . '/../controllers/UserController.php';
        (new UserController())->getUserProfile();
        break;
        
    case preg_match('/\/api\/user\/update-profile$/', $request):
        require_once __DIR__ . '/../controllers/UserController.php';
        (new UserController())->updateProfile();
        break;
        
    case preg_match('/\/api\/user\/change-password$/', $request):
        require_once __DIR__ . '/../controllers/UserController.php';
        (new UserController())->changePassword();
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
        $userController = new UserController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $userController->getUsers();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userController->createUser();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $userController->updateUser();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $userController->deleteUser();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    case preg_match('/\/api\/categories/', $request):
        require_once __DIR__ . '/../controllers/CategoryController.php';
        $categoryController = new CategoryController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $categoryController->getCategories();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $categoryController->createCategory();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $categoryController->updateCategory();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $categoryController->deleteCategory();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    case preg_match('/\/api\/items/', $request):
        require_once __DIR__ . '/../controllers/ItemController.php';
        $itemController = new ItemController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $itemController->getItems();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $itemController->createItem();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $itemController->updateItem();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $itemController->deleteItem();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    case preg_match('/\/api\/gallery/', $request):
        require_once __DIR__ . '/../controllers/GalleryController.php';
        $galleryController = new GalleryController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $galleryController->getGalleries();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $galleryController->createGallery();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $galleryController->updateGallery();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $galleryController->deleteGallery();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    case preg_match('/\/api\/feedback/', $request):
        require_once __DIR__ . '/../controllers/FeedbackController.php';
        $feedbackController = new FeedbackController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $feedbackController->getFeedbacks();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $feedbackController->createFeedback();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $feedbackController->deleteFeedback();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    // Đã require CommentController ở đầu file, không cần require lại
    case preg_match('/\/api\/comments/', $request) && !preg_match('/\/api\/comments(\/|$)/', $request):
        // Xử lý các route comments khác nếu cần
        break;

    case preg_match('/\/api\/queries/', $request):
        require_once __DIR__ . '/../controllers/QueryController.php';
        $queryController = new QueryController();
        
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $queryController->getQueries();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $queryController->createQuery();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $queryController->updateQuery();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $queryController->deleteQuery();
        } else {
            jsonResponse(['error' => 'Phương thức không hỗ trợ'], 405);
        }
        break;

    // Nếu truy cập trực tiếp vào root backend
    case preg_match('/\/backend(\/)?$/', $request):
        echo json_encode(['message' => 'Chào mừng bạn đến với Inkspire API. Vui lòng sử dụng các endpoint bắt đầu bằng /api/']);
        break;
    // Comments API endpoints
    case preg_match('/\/api\/comments$/', $request) && $_SERVER['REQUEST_METHOD'] === 'GET':
        $commentController = new CommentController();
        $commentController->getComments();
        break;

    case preg_match('/\/api\/comments$/', $request) && $_SERVER['REQUEST_METHOD'] === 'POST':
        $commentController = new CommentController();
        $commentController->addComment();
        break;

    case preg_match('/\/api\/comments\/(\d+)$/', $request, $matches) && $_SERVER['REQUEST_METHOD'] === 'PUT':
        $commentController = new CommentController();
        $commentController->updateComment($matches[1]);
        break;

    case preg_match('/\/api\/comments\/(\d+)$/', $request, $matches) && $_SERVER['REQUEST_METHOD'] === 'DELETE':
        $commentController = new CommentController();
        $commentController->deleteComment($matches[1]);
        break;

    // Comment Reactions API endpoints
    case preg_match('/\/api\/comment-reactions$/', $request) && $_SERVER['REQUEST_METHOD'] === 'POST':
        $commentController = new CommentController();
        $commentController->addReaction();
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found']);
}
