<?php
session_start();

// Database configuration
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "awaara_travel";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get destination_id based on trip_name
    $trip_name = $_POST['trip_name'];
    $get_dest = $conn->prepare("SELECT destination_id FROM destinations WHERE name = ?");
    $get_dest->bind_param("s", $trip_name);
    $get_dest->execute();
    $result = $get_dest->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $destination_id = $row['destination_id'];
        
        // Get user_id if logged in, otherwise use NULL
        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : NULL;
        $rating = $_POST['rating'];
        $comments = $_POST['comments'];
        
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO reviews (user_id, destination_id, rating, comment) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiis", $user_id, $destination_id, $rating, $comments);
        
        // Execute and check
        if ($stmt->execute()) {
            echo "Review submitted successfully! It will be visible after approval.";
        } else {
            echo "Error: " . $stmt->error;
        }
        
        $stmt->close();
    } else {
        echo "Error: Invalid trip name";
    }
    $get_dest->close();
}

$conn->close();
?>
