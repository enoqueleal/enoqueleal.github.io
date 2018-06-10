<?php
    $para = "enoquefelipe@gmail.com";
    $subject = "Contato do Site enoqueleal.com";
    $mensagem = "<strong>Nome: </strong>" . $_POST['nome'];
    $mensagem .= "<br><br>";
    $mensagem .= "<strong>E-mail: </strong>" . $_POST['email'];
    $mensagem .= "<br><br><br><br>";
    $mensagem .= "<strong>Mensagem: </strong>" . $_POST['message'];
    $headers = "Content-type: text/html; charset=UTF-8";
    $headers .= "From: Contato do Site: <contato@enoqueleal.com>";
    $headers .= "X-Sender: <contato@enoqueleal.com>";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "X-IP: " . $_SERVER['REMOTE_ADDR'];
    $headers .= "Return-Path:  <contato@enoqueleal.com>";
    $headers .= "MIME-Version: 1.0";
    mail($para, $subject, $mensagem, $headers);
    echo
    '<center>'
    . '<div class="alert alert-warning alert-dismissible" role="alert">'
    . '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    . '<strong>E-mail enviado com Sucesso!</strong>'
    . '</div>'
    . '</center>';
    // header('Location: index.html');
?>