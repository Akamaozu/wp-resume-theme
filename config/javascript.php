<?php

  $theme_stylesheet_directory = get_template_directory_uri();

  return array(
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/behavior.js',
      'name' => 'theme-behavior',
      'deps' => array('jquery')
    )
  );

?>