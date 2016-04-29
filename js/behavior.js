var state = {};

    state.body = jQuery( document.body );

// BOOTSTRAP ENVIRONMENT
  
  setup_header_module( state );
  setup_about_me_module( state ); 
  setup_experience_module();
  setup_contact_form( state );

  // on start ...
    jQuery( document ).ready( function(){

      // set default filter to all
        jQuery.publish( 'update-experience-filter', 'all' );
    });

function setup_header_module( state ){

  state.header = {};  
  state.header.dom = jQuery('#main-header');
  state.header.contact_me_dom = jQuery( '#main-header > .contact-me' );

  setup_detacher();
  setup_resize_sensor();
  setup_contact_form_controls();

  state.header.contact_me_dom.on('click', function(){

    jQuery.publish( 'toggle-contact-form' );
  });

  function setup_detacher(){

    var page = jQuery( window );

    page.on( 'scroll', jQuery.throttle( 20, function(){

      if( page.scrollTop() > 0 ) state.header.dom.addClass( 'detached' );
      else state.header.dom.removeClass( 'detached' );
    }));
  }

  function setup_resize_sensor(){
    
    ResizeSensor( state.header.dom[0], jQuery.debounce( 20, function(){
    
      jQuery.publish( 'main-header-resized', state.header.dom[0] );
    }));
  }

  function setup_contact_form_controls(){
    
    jQuery.subscribe('show-contact-form', function(){

      var contact_btn = state.header.contact_me_dom;

      contact_btn
        .addClass('fa fa-times')
        .html('');
    });

    jQuery.subscribe('hide-contact-form', function(){

      var contact_btn = state.header.contact_me_dom;

      contact_btn
        .html('Contact Me')
        .removeClass('fa fa-times');
    });
  }
}

function setup_about_me_module( state ){

  state.about_me = {};
  state.about_me.dom = jQuery( '#about-me' );

  // auto-adjust top padding of about me section as header resizes
    jQuery.subscribe('main-header-resized', function( e, header ){

      var header_dom; 

      if ( state.header.dom ) header_dom = state.header.dom;
      else if( header ) header_dom = jQuery( header );
      else return;

      var total_offset = jQuery( header_dom.offsetParent()[0] ).offset().top + header_dom.innerHeight();

      state.about_me.dom.css( 'padding-top', total_offset + 'px' );
    });  
}

function setup_experience_module(){

  state.experience = {};

  setup_filter_module();
  setup_item_module();
  setup_tag_module();

  function setup_filter_module(){

    // change state of experience filter
    // -> #update-experience-filter | string
    // <- #experience-filter-updated | string
      jQuery.subscribe('update-experience-filter', function( e, filter ){

        if( typeof filter === 'undefined' ) return;
        if( state.experience.filter === filter ) return;

        state.experience.filter = filter;

        jQuery.publish('experience-filter-updated', filter);      
      });

    // update active filter in dom when experience filter is changed
    // -> #experience-filter-updated | string
      jQuery.subscribe('experience-filter-updated', function update_experience_filter_ui( e, filter ){

        var current_active_tab = jQuery( '#experience > .filter  > li.active' ),
            next_tab;

        switch( filter ){

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
      });

    // filter option click behavior 
    // <- #update-experience-filter | string
      jQuery( '#experience > .filter' ).click( function( event ){

        var filter_params = jQuery( event.target ).attr( 'data-filter' );

        if( !filter_params ) return;

        jQuery.publish('update-experience-filter', filter_params);
      });
  }

  function setup_tag_module(){

    state.experience.persist_tag_state = {};

    // change state of experience tag
    // -> #update-experience-tag | string
    // <- #experience-tag-updated | string
      jQuery.subscribe('update-experience-tag', function( e, tag ){

        if( typeof tag === 'undefined' ) return;
        if( state.experience.tag === tag ) return;

        state.experience.tag = tag;

        jQuery.publish('experience-tag-updated', tag);      
      });

    // persist tag state when filter state updates
      jQuery.subscribe('experience-tag-updated', function preserve_tag_state( e, tag ){

        state.experience.persist_tag_state[ state.experience.filter ] = tag;
      });

    // update active tag in dom when experience tag is changed
      jQuery.subscribe('experience-tag-updated', function highlight_active_tag( e, tag ){

        var tag_module = jQuery( '#experience > .tags' ),
            current_tag_dom = tag_module.find('.active'),
            next_tag_dom = tag_module.find('[data-tag="' + tag.toLowerCase() + '"]');

        if( current_tag_dom.length > 0 ) jQuery( current_tag_dom[0] ).removeClass('active');
        if( next_tag_dom.length > 0 ) jQuery( next_tag_dom[0] ).addClass('active');
        else{

          var all_tag_dom = tag_module.find('[data-tag="all"]');

          if( all_tag_dom.length < 1 ) return;

          all_tag_dom = jQuery( all_tag_dom[0] );

          all_tag_dom.addClass('active');
        }
      });

    // update tag module ui when filter state updates
      jQuery.subscribe('experience-filter-updated', function render_tag_module( e, filter ){

        var tag_module = jQuery( '#experience > .tags' );

        switch( filter ){

          case 'js':

            tag_module.addClass('active');

            var active_tag;

            switch( state.experience.tag ){

              case 'meteor':
              case 'node.js':
              case 'electron':
                
                active_tag = state.experience.tag;
              break;

              default:

                active_tag = 'all';
              break;
            }

            tag_module.html(

              "<li data-tag='all' " + ( active_tag == 'all' ? 'class="active"' : '' ) + ">All</li>" +
              "<li data-tag='node.js' " + ( active_tag == 'node.js' ? 'class="active"' : '' ) + ">Node.js</li>" +
              "<li data-tag='electron' " + ( active_tag == 'electron' ? 'class="active"' : '' ) + ">Electron</li>" +
              "<li data-tag='meteor' " + ( active_tag == 'meteor' ? 'class="active"' : '' ) + ">Meteor</li>"
            );

          break;

          default:
                   
            tag_module.removeClass('active');      
          break;
        }
      });

    // reload previous tag state when returning to a new filter state
      jQuery.subscribe('experience-filter-updated', function reload_previous_tag_state(){

        var filter = state.experience.filter;

        switch( filter ){

          case 'js':
            jQuery.publish('update-experience-tag', ( state.experience.persist_tag_state[ filter ] ? state.experience.persist_tag_state[ filter ] : 'all'));
          break;

          default:
            jQuery.publish('update-experience-tag', ( state.experience.persist_tag_state[ filter ] ? state.experience.persist_tag_state[ filter ] : 'n/a'));
          break;
        }
      });

    // tag option click behavior
    // <- #update-experience-tag | string
      jQuery( '#experience > .tags' ).click( function( event ){

        var tag = jQuery( event.target ).attr( 'data-tag' );

        if( !tag ) return;

        jQuery.publish('update-experience-tag', tag);
      });
  }

  function setup_item_module(){

    state.experience.items = jQuery( '#experience > .items' );
    
    // setup masonry
      state.experience.items.masonry({

        itemSelector: '.visible'
      });

    // update ui when experience filter is updated
    // -> #experience-filter-updated | string
      jQuery.subscribe('experience-filter-updated', function filter_experience_items( e, filter ){

        var filtered = null;

        switch( filter ){

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

        jQuery.publish('filter-experience-completed');
      });

    // update ui when experience tag is updated
    // -> #experience-tag-updated | string      
      jQuery.subscribe('experience-tag-updated', function filter_experience_by_tag( e, tag ){

        var tag_module = jQuery( '#experience > .tags' );

        switch( state.experience.filter ){

          case 'js':

            var tag_filter = tag,
                js_experiences = jQuery( '#experience > .items > .item[data-type=javascript]' );

            for( var i = 0; i < js_experiences.length; i++ ){
              
              var experience = jQuery( js_experiences[i] ),
                  tags = experience.attr('data-tags').split(', ');

              if( !tag_filter || tag_filter == 'all' ){

                experience.addClass('visible');
                continue;
              }

              if( tags.indexOf( tag_filter ) > -1 ){

                experience.addClass('visible');
                continue;
              }
                  
              experience.removeClass('visible'); 
            };
          break;

          default:
                         
          break;
        }

        jQuery.publish( 'filter-experience-by-tag-completed' );
      });

    var debounced_update_experience_masonry = jQuery.debounce( 50, update_experience_masonry );

    // neatly align items with masonry after filters are completed
      jQuery.subscribe('filter-experience-completed', debounced_update_experience_masonry );
      jQuery.subscribe('filter-experience-by-tag-completed', debounced_update_experience_masonry );

    function update_experience_masonry( forced ){

      var experiences = state.experience.items;

      experiences.masonry('reloadItems');
      experiences.masonry('layout');
    }
  }
}

function setup_contact_form( state ){

  state.contact_form = {};
  state.contact_form.dom = jQuery( '#contact-form' );

  setup_contact_form_controls();

  // maintain alignment with resized header
    jQuery.subscribe('main-header-resized', function( e, header ){

      var header = jQuery( header ),
          total_offset = jQuery( header.offsetParent()[0] ).offset().top + header.innerHeight();

      state.contact_form.dom.css( 'padding-top', total_offset + 'px' );
    });

  // prevent body from having scroll bars when contact form is visible
    jQuery.subscribe('show-contact-form', function(){

      state.body.addClass( 'scroll-lock' );
    });

    jQuery.subscribe('hide-contact-form', function(){

      state.body.removeClass( 'scroll-lock' );
    });

  function setup_contact_form_controls(){

    jQuery.subscribe('show-contact-form', function(){

      state.contact_form.dom.addClass('active');
    });

    jQuery.subscribe('hide-contact-form', function(){

      state.contact_form.dom.removeClass('active');
    });

    jQuery.subscribe('toggle-contact-form', function(){

      var is_active = state.contact_form.dom.hasClass( 'active' );

      if( is_active ) jQuery.publish( 'hide-contact-form' );
      else jQuery.publish( 'show-contact-form' );
    });
  }
}
