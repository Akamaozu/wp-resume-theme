<?php

  $theme_stylesheet_directory = get_template_directory_uri();

  return array(
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/behavior.js',
      'name' => 'theme-behavior',
      'deps' => array('jquery', 'jquery-tiny-pubsub', 'jquery-throttle-debounce', 'masonry-layout', 'transformie')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/jquery-tiny-pubsub.js',
      'name' => 'jquery-tiny-pubsub',
      'deps' => array('jquery')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/jquery-throttle-debounce.js',
      'name' => 'jquery-throttle-debounce',
      'deps' => array('jquery')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/masonry-layout.js',
      'name' => 'masonry-layout',
      'deps' => array('jquery')
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/sylvester.js',
      'name' => 'sylvester-vector-math'
    ),
    
    array(

      'src' =>  $theme_stylesheet_directory . '/js/transformie.js',
      'name' => 'transformie',
      'deps' => array('sylvester-vector-math', 'jquery')
    )
  );
?>