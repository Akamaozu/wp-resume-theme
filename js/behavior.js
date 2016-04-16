var state = {};

    state.experience = {};
    state.experience.filter = null;
    state.experience.tag = null;

// BOOTSTRAP ENVIRONMENT

  // behavior on click for previous experience filter items
    jQuery( '#experience > .filter > li' ).click( function( event ){

      var filter_params = jQuery( this ).attr( 'data-filter' );

      if( !filter_params ) return;

      state.experience.filter = filter_params;

      jQuery.publish('experience-filter-updated', filter_params);
    });

  // behavior on click for previous experience item tags
    jQuery( '#experience > .tags' ).click( function( event ){

      var filter_params = jQuery( event.target ).attr( 'data-tag' );

      if( !filter_params ) return;

      state.experience.tag = filter_params;

      jQuery.subscribe('tag-filter-completed', on_complete);
      jQuery.publish('experience-tag-updated', filter_params);

      function on_complete(){

        jQuery.unsubscribe('tag-filter-completed', on_complete);
        jQuery.publish('experience-items-filtered');
      }
    });

  // instantiate masonry
    state.experience.items = jQuery( '#experience > .items' ).masonry({

      itemSelector: '.visible'
    });

  // update ui when experience filter is changed
    jQuery.subscribe('experience-filter-updated', update_experience_filter_ui );
    jQuery.subscribe('experience-filter-updated', filter_experience_items );
  
  // update ui when filtering is completed
    jQuery.subscribe('experience-items-filtered', update_experience_masonry );

  // update ui when experience tag is changed
    jQuery.subscribe('experience-tag-updated', tag_filter_experience_items);
  
  // tag filter experience items
    jQuery.subscribe('tag-filter-experience-items', tag_filter_experience_items );

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

  jQuery.subscribe( 'tag-filter-completed', complete_filtering );
  jQuery.publish( 'tag-filter-experience-items' );
  
  function complete_filtering(){

    jQuery.publish('experience-items-filtered'); 
    jQuery.unsubscribe('tag-filter-completed', complete_filtering);   
  }
}

function tag_filter_experience_items(){

  var tag_module = jQuery( '#experience > .tags' );

  switch( state.experience.filter ){

    case 'js':

      var tag_filter = state.experience.tag,
          js_experiences = jQuery( '#experience > .items > .item[data-type=javascript]' );

      for( var i = 0; i < js_experiences.length; i++ ){
        
        var experience = jQuery( js_experiences[i] ),
            tags = experience.attr('data-tags').split(', ');

        if( !tag_filter ){

          experience.addClass('visible');
          continue;
        }

        if( tags.indexOf( tag_filter ) > -1 ){

          experience.addClass('visible');
          continue;
        }
            
        experience.removeClass('visible'); 
      };

      tag_module.addClass('active');

      tag_module.html(

        "<li data-tag='node.js' " + (tag_filter === "node.js" ? "class=\"active\"" : "") + ">Node.js</li>" +
        "<li data-tag='electron' " + (tag_filter === "electron" ? "class=\"active\"" : "" ) + ">Electron</li>" +
        "<li data-tag='meteor' " + (tag_filter === "meteor" ? "class=\"active\"" : "") + ">Meteor</li>"
      );
       
    break;

    default:
      
      state.experience.tag = null;       
      tag_module.removeClass('active');      
    break;
  }

  jQuery.publish( 'tag-filter-completed' );
}

function update_experience_masonry(){

  state.experience.items.masonry('reloadItems');
  state.experience.items.masonry('layout');
}