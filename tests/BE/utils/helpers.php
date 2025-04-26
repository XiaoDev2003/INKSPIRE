<?php
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function sanitizeInput($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}
