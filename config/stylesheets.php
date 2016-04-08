<?php

  $theme_stylesheet_directory = get_template_directory_uri();

  return array(
    
    array(

      'src' =>  $theme_stylesheet_directory . '/css/reset.css',
      'name' => 'meyerweb-reset'
    ),
    
    array(

      'src' =>  'https://fonts.googleapis.com/css?family=Exo:900|Allura',
      'name' => 'google-fonts'
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/css/base-style.css',
      'name' => 'theme-base-style',
      'deps' => array('meyerweb-reset', 'google-fonts')
    )
  );

?>