
<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	echo json_encode(['success' => false, 'message' => 'Только POST запросы']);
	exit;
}

$to_email = 'ladyelizaveta19@gmail.com';

$body = "Новая заявка с квиза\n\n";
$body .= "Дата: " . date('d.m.Y H:i:s') . "\n\n";

if (isset($_POST['location']) && !empty($_POST['location'])) {
	$body .= '1. Какой дом вы хотите построить? ' . $_POST['location'] . "\n";
}

if (isset($_POST['size']) && !empty($_POST['size'])) {
	$body .= '2. Какая нужна площадь дома? ' . $_POST['size'] . "\n";
}

if (isset($_POST['facade']) && !empty($_POST['facade'])) {
	$body .= '3. Есть ли у Вас участок? ' . $_POST['facade'] . "\n";
}

if (isset($_POST['telegram']) && !empty($_POST['telegram'])) {
	$body .= '4. Сколько этажей хотите? ' . $_POST['telegram'] . "\n";
}

if (isset($_POST['max_name']) && !empty($_POST['max_name'])) {
	$body .= '5. Способ оплаты? ' . $_POST['max_name'] . "\n";
}

if (isset($_POST['phone']) && !empty($_POST['phone'])) {
	$body .= "\nТелефон: " . $_POST['phone'] . "\n";
}

if (empty($_POST) || strlen($body) < 50) {
	$body .= "\nДополнительная информация\n";
	$body .= "POST данные: " . print_r($_POST, true);
}

$subject = '=?UTF-8?B?' . base64_encode('Новая заявка с квиза - ' . date('d.m.Y H:i')) . '?=';

$headers = "From: noreply@liza.ru\r\n";
$headers .= "Reply-To: noreply@liza.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";

if (mail($to_email, $subject, $body, $headers)) {
	echo json_encode(['success' => true, 'message' => 'Данные успешно отправлены!']);
} else {
	error_log("Ошибка отправки письма на $to_email");
	error_log("POST данные: " . print_r($_POST, true));

	echo json_encode([
		'success' => false,
		'message' => 'Ошибка отправки письма. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
	]);
}
