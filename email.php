<?php

// Passando os dados obtidos pelo formulário para as variáveis abaixo
$contact_name     = $_POST['contact_name'];
$contact_email    = trim($_POST['contact_email']);
$emaildestinatario = 'contato@skyvendastv.com'; // Digite seu e-mail aqui, lembrando que o e-mail deve estar em seu servidor web
$contact_subject    	   = $_POST['contact_subject'];
$contact_message         = $_POST['contact_message'];


/* Montando a mensagem a ser enviada no corpo do e-mail. */
$mensagemHTML = '<P>FORMULARIO PREENCHIDO NO SITE SKYVENDASTV.COM</P>
<p><b>Nome:</b> '.$contact_name.'
<p><b>E-Mail:</b> '.$contact_email.'
<p><b>Servico:</b> '.$contact_subject.'
<p><b>Mensagem:</b> '.$contact_message.'</p>
<hr>';


// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers = "MIME-Version: 1.1\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $contact_email\r\n"; // remetente
$headers .= "Return-Path: $emaildestinatario \r\n"; // return-path
$envio = mail($emaildestinatario, $contact_message, $mensagemHTML, $headers);

if($envio)
    echo "<script>location.href='sucesso.html'</script>"; // Página que será redirecionada

?>
