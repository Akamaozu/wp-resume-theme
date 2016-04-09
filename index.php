<?php
  
  // load stylesheet
    wp_enqueue_style( 'theme-base-style' );
?>

<!doctype html>

<html>
  <head>
    <title>Uzo Olisemeka's Resume</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <script src="https://use.fonticons.com/556f9c16.js"></script>
    <?php wp_head(); ?>
  </head>
  <body>
    <div id="main-header">
      
      <div class="about-me">
        <div class="name">Uzo Olisemeka</div>
        <div class="title">Full-Stack Developer</div>
        <div class="intro">
          <p>I <span class="fa fa-heart"></span> JavaScript</p>
          <p class='subtext'>A wealth of experience using it server-side (<span class="emphasis">Node.js</span>, <span class="emphasis">Meteor</span>), in the browser (<span class="emphasis">web apps</span>, <span class="emphasis">React</span>) and for desktop applications (<span class="emphasis">Electron.js</span>).</p>
          <p>I <span class="fa fa-heart"></span> WordPress</p>
          <p class='subtext'>If you're building <span class="emphasis">themes</span> from scratch, maintaining or extending existing ones, I'd love to help.</p>
      </div>
    </div>

    <div id="experience">
      <div class="title">Previous Experience</div>
      <div class="subtitle">Filter my experiences to quickly find what's relevant to you</div>
      <ul class="filter">
        <li class="active">All</li>
        <li>JavaScript</li>
        <li>Wordpress</li>
      </ul>
    </div>

    <?php wp_footer(); ?>
  </body>
</html>