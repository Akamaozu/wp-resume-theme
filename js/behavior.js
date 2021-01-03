var state = {};

cache_jquery_wrapper_of_commonly_used_dom_elements( state );
setup_header_module( state );
setup_about_me_module( state );
setup_experience_module( state );
setup_contact_form( state );
setup_telemetry( state );
start_app( state );

function cache_jquery_wrapper_of_commonly_used_dom_elements( state ){
  state.jquery_dom_cache = {};

  state.jquery_dom_cache.html = jQuery( 'html' );
  state.jquery_dom_cache.body = jQuery( document.body );
  state.jquery_dom_cache.document = jQuery( document );
  state.jquery_dom_cache.window = jQuery( window );

  state.jquery_dom_cache.main_header = jQuery( '#main-header' );
  state.jquery_dom_cache.main_header_contact_btn = state.jquery_dom_cache.main_header.find( '.contact-me' );

  state.jquery_dom_cache.about_me = jQuery( '#about-me' );

  state.jquery_dom_cache.experience_items_wrapper = jQuery( '#experience > .items' );
  state.jquery_dom_cache.experience_items = jQuery( '#experience > .items> .item' );
}

function setup_header_module( state ){
  state.header = {};

  manage_header_detachment_on_scroll( state );
  detect_header_size_changes( state );
  manage_contact_form_btn_display_state( state );
  activate_contact_form_btn( state );

  function manage_header_detachment_on_scroll( state ){
    var window_dom = state.jquery_dom_cache.window,
        main_header_dom = state.jquery_dom_cache.main_header;

    window_dom.on( 'scroll', jQuery.throttle( 20, function(){
      if( window_dom.scrollTop() > 0 ){
        main_header_dom.addClass( 'detached' );
        state.header.detached = true;

        jQuery.publish( 'main-header-detached' );
      }

      else {
        main_header_dom.removeClass( 'detached' );
        state.header.detached = false;

        jQuery.publish( 'main-header-attached' );
      }
    }));
  }

  function detect_header_size_changes( state ){
    var main_header = state.jquery_dom_cache.main_header,
        main_header_dom = main_header.get( 0 );

    ResizeSensor( main_header_dom, jQuery.debounce( 20, function(){
      jQuery.publish( 'main-header-resized' );
    }));
  }

  function manage_contact_form_btn_display_state( state ){
    var main_header_contact_btn = state.jquery_dom_cache.main_header_contact_btn;

    jQuery.subscribe( 'show-contact-form', function(){
      main_header_contact_btn.addClass( 'fa fa-times' ).html( '' );
    });

    jQuery.subscribe( 'hide-contact-form', function(){
      main_header_contact_btn.html( 'Contact Me' ).removeClass( 'fa fa-times' );
    });
  }

  function activate_contact_form_btn( state ){
    var main_header_contact_btn = state.jquery_dom_cache.main_header_contact_btn;

    main_header_contact_btn.on( 'click', function(){
      jQuery.publish( 'toggle-contact-form' );
    });
  }
}

function setup_about_me_module( state ){

  state.about_me = {};
  state.about_me.dom = jQuery( '#about-me' );

  // activate intro links
    jQuery( '#about-me > .intro .filter' ).on('click', function( e ){

      var link = jQuery( e.target ),
          filter = link.attr('data-filter'),
          tag = link.attr('data-tag');

      if( !filter || !state.jquery_dom_cache.main_header ) return;

      jQuery.publish( 'update-experience-filter', filter );

      if( tag ) jQuery.publish( 'update-experience-tag', tag );
    });
}

function setup_experience_module( state ){
  state.experience = {};

  setup_filter_module();
  setup_item_module();
  setup_tag_module();
  setup_autoscroll_on_filter_module();

  function setup_filter_module(){

    // change state of experience filter
    // -> #update-experience-filter | string
    // <- #experience-filter-updated | string
      jQuery.subscribe('update-experience-filter', function( e, filter ){
        if( typeof filter === 'undefined' ) return;

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

        state.experience.tag = tag;

        jQuery.publish('experience-tag-updated', tag );
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
      });

    // update tag module ui when filter state updates
      jQuery.subscribe( 'experience-filter-updated', function render_tag_module( e, filter ){
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
            tag_module.removeClass( 'active' );
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
        if( ! tag ) return;

        jQuery.publish('update-experience-tag', tag );
      });
  }

  function setup_item_module(){
    state.experience.items = jQuery( '#experience > .items' );
    
    // setup masonry
      state.jquery_dom_cache.experience_items_wrapper.masonry({ itemSelector: '.visible' });

    // update ui when experience filter is updated
    // -> #experience-filter-updated | string
      jQuery.subscribe('experience-filter-updated', function filter_experience_items( e, filter ){

        var is_filtered = false,
            filter_name;

        switch( filter ){

          case 'wp':
            is_filtered = true;
            filter_name = 'wordpress';
          break;

          case 'js':
            is_filtered = true;
            filter_name = 'javascript';
          break;
        }

        var experience_items = state.jquery_dom_cache.experience_items;

        if( ! is_filtered ){
          experience_items.each( function( index, experience_dom ){
            jQuery( experience_dom ).addClass( 'visible' );
          });
        }

        else {
          experience_items.each( function( index, experience_dom ){
            var jquery_experience_dom = jQuery( experience_dom ),
                stringified_experience_types = jquery_experience_dom.attr( 'data-type' ),
                stringified_experience_types = stringified_experience_types.toLowerCase(),
                experience_types = stringified_experience_types.split( ',' );

            // trim experience types
            experience_types.forEach( function( experience_type, experience_type_index ){
              experience_types[ experience_type_index ] = experience_type.trim();
            });

            if( experience_types.indexOf( filter_name ) > -1 ) jquery_experience_dom.addClass( 'visible' );
            else jquery_experience_dom.removeClass( 'visible' );
          });
        }

        jQuery.publish( 'filter-experience-completed' );
      });

    // update ui when experience tag is updated
    // -> #experience-tag-updated | string
      jQuery.subscribe('experience-tag-updated', function filter_experience_by_tag( e, tag ){

        var tag_module = jQuery( '#experience > .tags' );

        switch( state.experience.filter ){

          case 'js':

            var tag_filter = tag,
                experience_items = state.jquery_dom_cache.experience_items,
                js_experiences = [];

            experience_items.each( function( index, experience_dom ){
              var jquery_experience_dom = jQuery( experience_dom ),
                  stringified_experience_types = jquery_experience_dom.attr( 'data-type' ),
                  stringified_experience_types = stringified_experience_types.toLowerCase(),
                  experience_types = stringified_experience_types.split( ',' );

              // trim experience types
              experience_types.forEach( function( experience_type, experience_type_index ){
                experience_types[ experience_type_index ] = experience_type.trim();
              });

              if( experience_types.indexOf( 'javascript' ) > -1 ) js_experiences.push( jquery_experience_dom );
            });

            for( var i = 0; i < js_experiences.length; i++ ){
              var experience = js_experiences[i],
                  tags = experience.attr('data-tags').split(', ');

              if( ! tag_filter || tag_filter == 'all' ){
                experience.addClass('visible');
                continue;
              }

              if( tags.indexOf( tag_filter ) > -1 ){
                experience.addClass('visible');
                continue;
              }

              experience.removeClass( 'visible' );
            };
          break;
        }

        jQuery.publish( 'filter-experience-by-tag-completed' );
      });

    var debounced_update_experience_masonry = jQuery.debounce( 50, update_experience_masonry );

    // neatly align items with masonry after filters are completed
      jQuery.subscribe('filter-experience-completed', debounced_update_experience_masonry );
      jQuery.subscribe('filter-experience-by-tag-completed', debounced_update_experience_masonry );

    function update_experience_masonry( forced ){
      var experience_items_wrapper = state.jquery_dom_cache.experience_items_wrapper;

      experience_items_wrapper.masonry( 'reloadItems' );
      experience_items_wrapper.masonry( 'layout' );

      jQuery.publish( 'new-layout-rendered' );
    }
  }

  function setup_autoscroll_on_filter_module(){
    var debounced_scroll_to_items = jQuery.debounce( 50, scroll_to_experience_items );

    jQuery.subscribe( 'enable-autoscroll-on-filter', function(){
      if( state.experience.autoscroll_on_filter == true ) return;

      jQuery.subscribe( 'filter-experience-completed', debounced_scroll_to_items );
      jQuery.subscribe( 'filter-experience-by-tag-completed', debounced_scroll_to_items );

      state.experience.autoscroll_on_filter = true;
    });

    jQuery.subscribe( 'disable-autoscroll-on-filter', function(){
      jQuery.unsubscribe( 'filter-experience-completed', debounced_scroll_to_items );
      jQuery.unsubscribe( 'filter-experience-by-tag-completed', debounced_scroll_to_items );

      state.experience.autoscroll_on_filter = false;
    });
  }

  function scroll_to_experience_items(){
    var html = state.jquery_dom_cache.html,
        experience_offset_top = jQuery( '#experience' ).offset().top,
        main_header_outer_height = state.jquery_dom_cache.main_header.outerHeight(),
        buffer_from_top = state.header.detached == true ? 42 : 24,
        next_scroll_top = ( experience_offset_top - main_header_outer_height - buffer_from_top ).toFixed(0);

    html.animate({ scrollTop: next_scroll_top }, 242 );
  }
}

function setup_contact_form( state ){

  state.contact_form = {};
  state.contact_form.dom = jQuery( '#contact-form' );

  setup_contact_form_controls();

  // maintain alignment with resized header
    jQuery.subscribe('main-header-resized', function( e, header ){

      var header = state.jquery_dom_cache.main_header,
          total_offset = jQuery( header.offsetParent()[0] ).offset().top + header.innerHeight();

      state.contact_form.dom.css( 'padding-top', total_offset + 'px' );
    });

  // prevent body from having scroll bars when contact form is visible
    jQuery.subscribe('show-contact-form', function(){
      state.jquery_dom_cache.body.addClass( 'scroll-lock' );
    });

    jQuery.subscribe('hide-contact-form', function(){
      state.jquery_dom_cache.body.removeClass( 'scroll-lock' );
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

function setup_telemetry(){

  // report as pageview when experience items view is modified
    jQuery.subscribe('new-layout-rendered', function record_experience_pageview(){

      var filter, tag, page;

          filter = state.experience.filter;
          tag = state.experience.tag;

          page = '/experience/' + filter + ( tag ? '/' + tag : '' );

      ga('send', 'pageview', page);
    });

  // handle contact form views as different pages
    jQuery.subscribe('show-contact-form', function record_contactform_pageview(){

      ga('send', 'pageview', '/contact-me');
    });

    jQuery.subscribe('hide-contact-form', function record_main_pageview(){

      ga('send', 'pageview', '/');
    });
}

function start_app( state ){
  state.jquery_dom_cache.document.ready( function(){
    jQuery.subscribe( 'experience-filter-updated', enable_autoscroll_on_filter_once );
    jQuery.publish( 'update-experience-filter', 'all' );

    function enable_autoscroll_on_filter_once(){
      jQuery.publish( 'enable-autoscroll-on-filter' );
      jQuery.unsubscribe( 'experience-filter-updated', enable_autoscroll_on_filter_once );
    }
  });
}