var state = {};

    state.experience = {};
    state.experience.filter = null;

jQuery( '#experience > .filter > li' ).click( function( event ){

  var filter_params = this.getAttribute( 'data-filter' );

  if( !filter_params ) return;

  state.experience.filter = filter_params;

  update_experience_filter_ui(); 
});

jQuery( document ).ready( function(){

  update_experience_filter_ui();
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