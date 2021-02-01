<?php

  // register theme stylesheets
    foreach( include( 'config/stylesheets.php' ) as $stylesheet ){

      if( !$stylesheet['name'] || !$stylesheet['src'] ){
        throw new Exception("Improperly defined stylesheet object in " . get_template_directory() . '/config/stylesheets.php' , 1);
      }

      if( !$stylesheet['deps'] ) $stylesheet['deps'] = array();
      if( !$stylesheet['media'] ) $stylesheet['media'] = 'all';
      if( !$stylesheet['version'] ) $stylesheet['version'] = '0.0.1';

      wp_register_style( $stylesheet['name'], $stylesheet['src'], $stylesheet['deps'], $stylesheet['version'], $stylesheet['media'] );
    }

  // register theme javascript files
    foreach( include( 'config/javascript.php' ) as $script ){

      if( !$script['name'] || !$script['src'] ){
        throw new Exception("Improperly defined javascript object in " . get_template_directory() . '/config/javascript.php' , 1);
      }

      if( !$script['deps'] ) $script['deps'] = array();
      if( !$script['version'] ) $script['version'] = '0.0.1';
      if( !$script['in_footer'] ) $script['in_footer'] = true;

      wp_register_script( $script['name'], $script['src'], $script['deps'], $script['version'], $script['in_footer'] );
    }

  // contact form widget slot
    register_sidebar( array(
      'name' => 'Contact Form Widget',
      'id' => 'contact_form_widget',
      'before_widget' => '<div class="widget">',
      'after_widget' => '</div>',
      'before_title' => '<h3>',
      'after_title' => '</h3>',
    ));
?>