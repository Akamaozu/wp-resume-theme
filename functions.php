<?php
  
  // register theme stylesheets      
    foreach( include( 'config/stylesheets.php' ) as $stylesheet ){

      if( !$stylesheet['name'] || !$stylesheet['src'] ){

        throw new Exception("Improperly defined stylesheet object in " . get_template_directory() . '/config/styesheets.php' , 1);
      }
      
      if( !$stylesheet['deps'] ) $stylesheet['deps'] = array();
      if( !$stylesheet['media'] ) $stylesheet['media'] = 'all';
      if( !$stylesheet['version'] ) $stylesheet['version'] = '0.0.1';

      wp_register_style( $stylesheet['name'], $stylesheet['src'], $stylesheet['deps'], $stylesheet['version'], $stylesheet['media'] );
    }
?>