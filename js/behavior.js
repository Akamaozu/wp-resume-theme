var state = {};

    state.experience = {};
    state.experience.filter = null;

// BOOTSTRAP ENVIRONMENT

  // behavior on click for previous experience filter items
    jQuery( '#experience > .filter > li' ).click( function( event ){

      var filter_params = jQuery( this ).attr( 'data-filter' );

      if( !filter_params ) return;

      state.experience.filter = filter_params;

      jQuery.publish('experience-filter-updated', filter_params);
    });

  // instantiate masonry
    state.experience.masonry = jQuery( '#experience > .items' ).masonry({

      itemSelector: '.visible'
    });

  // update ui when experience filter is changed
    jQuery.subscribe('experience-filter-updated', update_experience_filter_ui );
    jQuery.subscribe('experience-filter-updated', filter_experience_items );
    jQuery.subscribe('experience-items-filtered', update_experience_masonry );

jQuery( document ).ready( function(){

  jQuery.publish( 'experience-filter-updated', state.experience.filter );
});

function update_experience_filter_ui(){

  var current_active_tab = jQuery( '#experience > .filter  > li.active' ),
      next_tab;

  switch( state.experience.filter ){

    case 'wp':

      next_tab = jQuery( '#experience > .filter  > li[data-filter="wp"]' );
    break;

    case 'js':

      next_tab = jQuery( '#experience > .filter  > li[data-filter="js"]' );
    break;

    case 'all':
    default:

      next_tab = jQuery( '#experience > .filter  > li[data-filter="all"]' );
    break;
  }

  if( next_tab.length === 0 ) return;
  if( current_active_tab.length > 0 && current_active_tab[0] === next_tab[0] ) return;

  current_active_tab.removeClass('active');
  next_tab.addClass('active');
}

function filter_experience_items(){

  var filtered = null;

  switch( state.experience.filter ){

    case 'wp':

      filtered = 'wordpress';
    break;

    case 'js':

      filtered = 'javascript';
    break;
  }

  var all_experiences = jQuery( '#experience > .items > .item' );

  for( var i = 0; i < all_experiences.length; i++ ){
    
    var experience = jQuery( all_experiences[i] );

    if( !filtered ){

      console.log( 'showing item' );
      experience.addClass('visible');
      continue;
    }
        
    var experience_type = experience.attr('data-type');

    if( experience_type.toLowerCase() == filtered ){

      experience.addClass('visible');
      continue;
    }

    experience.removeClass('visible'); 
  };

  jQuery.publish('experience-items-filtered');
}

function update_experience_masonry(){

  state.experience.masonry.masonry('reloadItems');
  state.experience.masonry.masonry('layout');
}