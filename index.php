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
          <p>I <span class="fa fa-heart"></span> JavaScript.</p>
          <p class='subtext'>If your projects involve using it on your server (<span class="emphasis">Node.js</span>, <span class="emphasis">Meteor</span>, <span class="emphasis">microservices</span>) or in the browser (<span class="emphasis">Web Apps</span>, <span class="emphasis">React.js</span>, <span class="emphasis">Browserify</span>), I can be a valuable team member.</p>
          <p>I <span class="fa fa-heart"></span> WordPress.</p>
          <p class='subtext'>If you're building <span class="emphasis">themes</span> / <span class="emphasis">plugins</span> from scratch, maintaining or extending existing ones, I'd love to help.</p>
      </div>
    </div>
    <?php wp_footer(); ?>
  </body>
</html>