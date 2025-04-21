<?php
// --- Configuration ---
$admin_email = "bhimbhajenish77@gmail.com"; // IMPORTANT: Replace with the actual admin email address
$email_subject = "New mailing list registration"; // Email subject
$success_message = "Thank you for signing up! You have been added to the mailing list.";
$error_message = "An error occurred. Please try again later.";
$missing_fields_message = "Please fill in all fields marked with *.";
$invalid_email_message = "Please enter a valid email address.";

// --- Set Header for JSON Response ---
// header('Content-Type: application/json');

// --- Check if the request method is POST ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Get and Sanitize Form Data ---
    // Use filter_input for better security and trimming whitespace
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS); // Sanitize phone number as well

    // --- Basic Server-Side Validation ---
    if (empty($name) || empty($email)) {
        echo json_encode(['status' => 'error', 'message' => $missing_fields_message]);
        exit; // Stop script execution
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => $invalid_email_message]);
        exit; // Stop script execution
    }

    // --- Prepare Email Content ---
    $email_body = "Ný skráning barst frá vefsíðunni:\n\n";
    $email_body .= "name: " . $name . "\n";
    $email_body .= "email: " . $email . "\n";
    $email_body .= "message: " . $message . "\n";

    // --- Prepare Email Headers ---
    // Using the sender's email in 'From' can cause deliverability issues (SPF/DKIM).
    // It's often better to use a fixed 'From' address from your domain
    // and set the 'Reply-To' header to the user's email.
    $headers = "From: bhimbhajenish77@gmail.com" . "\r\n" . // Replace with a valid email from your domain
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion() . "\r\n" .
               "MIME-Version: 1.0" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8"; // Ensure proper encoding for special characters

    // --- Send Email ---
    // The built-in mail() function's reliability depends heavily on server configuration.
    // For production, consider using a library like PHPMailer with SMTP.
    if (mail($admin_email, $email_subject, $email_body, $headers)) {
        // Email sent successfully
        echo json_encode(['status' => 'success', 'message' => $success_message]);
    } else {
        // Email sending failed
        // Log the error on the server for debugging if possible
        error_log("Mail function failed for contact form submission from: " . $email);
        echo json_encode(['status' => 'error', 'message' => $error_message]);
    }

} else {
    // Not a POST request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

?>