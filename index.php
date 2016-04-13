<?php
  
  // load default css & js
    wp_enqueue_style( 'theme-base-style' );
    wp_enqueue_script( 'theme-behavior' );
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
          <p class='subtext'>A wealth of experience using it server-side (<span class="emphasis">Node.js</span>, <span class="emphasis">Meteor</span>), in the browser (<span class="emphasis">web apps</span>, <span class="emphasis">React</span>) and for desktop applications (<span class="emphasis">Electron</span>).</p>
          <p>I <span class="fa fa-heart"></span> WordPress</p>
          <p class='subtext'>If you're building <span class="emphasis">themes</span> from scratch, maintaining or extending existing ones, I'd love to help.</p>
        </div>
      </div>
    </div>

    <div id="experience">
      <div class="title">Previous Experience</div>
      <div class="subtitle">Filter my experiences to quickly find what's relevant to you</div>
      <ul class="filter">
        <li data-filter="all">All</li>
        <li data-filter="js">JavaScript</li>
        <li data-filter="wp">Wordpress</li>
      </ul>
      <ul class="items">
        <li class="item" data-type="javascript" data-tags="meteor, web app">
          <div class="header">
            <div class="when">2015</div>
            <div class="title">CyclusBreak</div>
            <ul class="tags">
              <li>Web App</li>
              <li>Meteor</li>
              <li>MongoDB</li>
              <li>Mandrill</li>
            </ul>
          </div>          
          <div class="notes">
            <p>CyclusBreak is a Student-Counsellor Relationship Manager built by <a href="http://blueportsoftware.com">Blueport Software</a>. It connects university students with their counsellors, making it easier for students to get the help needed for optimal academic and social success.</p> 
            <p>I automated report generation of Cyclus Break's business objectives. The reports were exported as Excel documents and emailed to appropriate stakeholders on a schedule.</p>
            <p>I also implemented the app's invitation system, notifications (in-app and via email) and some admin config interfaces.</p>
          </div>
        </li>
        <li class="item" data-type="javascript" data-tags="electron, node.js">
          <div class="header">
            <div class="when">2015</div>
            <div class="title">PDF Page Counter</div>
            <ul class="tags">
              <li>Desktop App</li>
              <li>Electron</li>
              <li>Node.js</li>
            </ul>
          </div>          
          <div class="notes">
            <p>I <a href="http://designbymobi.us/how-i-built-my-first-desktop-app-in-3-days/">created a desktop app</a> to programmatically generate a report on all PDFs in a folder (and arbitrarily nested subfolders).</p> 
            <p>Instead of taking three staff members an entire weekend, the PDF Page Counter reduced it to a 20 minute job for one individual.</p>
          </div>
        </li>
        <li class="item" data-type="wordpress" data-tags="theme">
          <div class="header">
            <div class="when">2015</div>
            <div class="title">Zikoko Polls</div>
            <ul class="tags">
              <li>WordPress</li>
              <li>Theme</li>
            </ul>
          </div>          
          <div class="notes">
            <p><a href="http://zikoko.com">Zikoko, the Nigerian equivalent of BuzzFeed</a>, wanted to build a simple yet engaging <a href="http://polls.zikoko.com">web app for Polls</a>. Since the rest of the their digital properties are powered by WordPress, it made sense to build it as a WordPress app.</p> 
            <p>I worked closely with their technical lead to design and implement the APIs and data structures needed for the app.</p>
            <p>I implemented a system for polls to insert ads and prompts to share after the user has shown a certain level of engagement.</p>
          </div>
        </li>
        <li class="item" data-type="wordpress" data-tags="theme">
          <div class="header">
            <div class="when">2011</div>
            <div class="title">YKNightlights</div>
            <ul class="tags">
              <li>WordPress</li>
              <li>Theme</li>
              <li>Photoshop</li>
              <li>Illustrator</li>
              <li>JavaScript</li>
            </ul>
          </div>          
          <div class="notes">
            <p>I was commissioned to build <a href="http://yknightlights.designbymobi.us">a unique theme for a lifestyle blog</a>.We focused on building little details that created a delightful experience for the readers.</p> 
            <ol> 
              <li>When your mouse hovered on a preview card, other page elements dimmed to create more emphasis.</li> 
              <li>Keyboard arrow keys were augmented to scroll through the post preview cards.</li> 
              <li>When you visit a post page, the interface scrolls you directly to the content.</li> 
              <li>Up and down arrow keys on the keyboard were context-aware, automatically scrolling to sections unless it was in the article body, in which case it behaved normally.</li>
            </ol>
            <p>In addition to building the theme from scratch, I also illustrated their logo.</p>
          </div>
        </li>
      </ul>
    </div>

    <?php wp_footer(); ?>
  </body>
</html>