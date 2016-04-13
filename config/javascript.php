<?php

  $theme_stylesheet_directory = get_template_directory_uri();

  return array(
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/behavior.js',
      'name' => 'theme-behavior',
      'deps' => array('jquery', 'jquery-tiny-pubsub')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/jquery-tiny-pubsub.js',
      'name' => 'jquery-tiny-pubsub',
      'deps' => array('jquery')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/masonry-layout.js',
      'name' => 'masonry-layout',
      'deps' => array('jquery')
    )
  );
?>