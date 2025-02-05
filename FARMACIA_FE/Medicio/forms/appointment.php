<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = 'Online Appointment Form';

 

  $contact->add_message( $_POST['fecha_cita'], 'Fecha de la cita:');
  $contact->add_message( $_POST['nombre_dr'], 'Nombre del Doctor:');
  $contact->add_message( $_POST['nombre_paciente'], 'Nombre del Paciente:');
  $contact->add_message( $_POST['presion'], 'Presion:');
  $contact->add_message( $_POST['peso'], 'Peso:');
  $contact->add_message( $_POST['ritmo_cardiaco'], 'Ritmo cardiaco:');
  $contact->add_message( $_POST['temperatura'], 'Temperatura:');
  $contact->add_message( $_POST['sintomas'], 'Sintomas:');
  $contact->add_message( $_POST['recetas'], 'Recetas:');
  $contact->add_message( $_POST['observaciones'], 'Observaciones:');
  $contact->add_message( $_POST['nombre_medicamento'], 'Nombre del medicamento:');

  echo $contact->send();
?>
