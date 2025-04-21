<?php
// --- Configuration ---
$admin_email = "bhimbhajenish77@gmail.com"; // IMPORTANT: Replace with the actual admin email address
$email_subject = "New mailing list registration"; // Email subject
$success_message = "Thank you for signing up! You have been added to the mailing list.";
$error_message = "An error occurred. Please try again later.";
$missing_fields_message = "Please fill in all fields marked with *.";
$invalid_email_message = "Please enter a valid email address.";

// --- Set Header for JSON Response ---
header('Content-Type: application/json');

// --- Check if the request method is POST ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Get and Sanitize Form Data ---
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS); // Sanitize message

    // --- Basic Server-Side Validation ---
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => $missing_fields_message]);
        exit; // Stop script execution
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => $invalid_email_message]);
        exit; // Stop script execution
    }

    // --- Prepare Email Content ---
    $email_body = "Ný skráning barst frá vefsíðunni:\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message: " . $message . "\n";

    // --- Prepare Email Headers ---
    $headers = "From: bhimbhajenish77@gmail.com" .