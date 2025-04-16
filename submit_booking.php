<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "root", "awaara_travel");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Handle POST request for bookings
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    session_start();
    
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(["success" => false, "error" => "User not logged in"]);
        exit;
    }
    
    $user_id = $_SESSION['user_id'];
    $package_type = $data['package'];
    $travel_date = $data['date'];
    $persons = $data['travelers'];
    $contact_info = $data['email'] . ', ' . $data['phone'];
    $destination = $data['destination'];
    
    // Determine which table to insert into based on destination
    $table_name = $destination . '_bookings';
    
    // Validate table exists
    $result = $conn->query("SHOW TABLES LIKE '$table_name'");
    if ($result->num_rows === 0) {
        echo json_encode(["success" => false, "error" => "Invalid destination"]);
        exit;
    }
    
    // Check if table has special_requests column
    $hasSpecialRequests = false;
    $columns = $conn->query("SHOW COLUMNS FROM $table_name LIKE 'special_requests'");
    if ($columns->num_rows > 0) {
        $hasSpecialRequests = true;
    }

    if ($hasSpecialRequests) {
        $stmt = $conn->prepare("INSERT INTO $table_name (user_id, package_type, travel_date, persons, contact_info, special_requests) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ississ", $user_id, $package_type, $travel_date, $persons, $contact_info, $data['special_requests']);
    } else {
        $stmt = $conn->prepare("INSERT INTO $table_name (user_id, package_type, travel_date, persons, contact_info) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issis", $user_id, $package_type, $travel_date, $persons, $contact_info);
    }
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    
    $stmt->close();
}

$conn->close();
?>
