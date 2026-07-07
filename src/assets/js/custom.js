/* custom scroll bar */
$(function() {
    var windowWidth = $(window).width();
    $(".sidebar-menu-section").mCustomScrollbar({
        theme: "minimal",
        scrollInertia: 20
    });
});
/* custom scroll end */

/* toggle menu start */

$(document).ready(function() {
    // Menu Icon Toggle Js
    $(".sidebar-toggle").click(function(e) {
        e.preventDefault();
        $(".content-wrapper").toggleClass("toggled");
    });
});

/* toggle menu end */

/* menu toggle start */
$(document).ready(function () {
    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("show");
      if (_opened === true && !clickover.closest('.navbar-collapse, .navbar-toggler').length) {
        $(".navbar-toggler").click();
      }
    });
});
/* menu toggle end */

/* Accordina Js */
$("#sponsored").click(function(){
  $("#sponsored-plan").toggleClass("active");
  $("#featured-plan").removeClass("active");
});

$("#featured").click(function(){
  $("#sponsored-plan").removeClass("active");
  $("#featured-plan").toggleClass("active");
});

/* sibarbar submenu */
$(document).ready(function() {
    $('.submenu-toggle').click(function(e) {
      e.preventDefault();
      const parent = $(this).closest('.has-submenu');
      parent.toggleClass('open');
      parent.find('.submenu').slideToggle(200);
    });
});

/* Searchbar */
$(document).ready(function(){
    $('.search-toggle').on('click', function(){
      $('.searchbar,.search-toggle').toggleClass('active');
    });
});

/* view more content */
$(document).ready(function(){
    $('.view-toggle').click(function(){
      const paragraph = $(this).siblings('.content-viewmore');
      paragraph.toggleClass('expanded');
      $(this).text(paragraph.hasClass('expanded') ? 'Less' : 'View');
    });
});


/* chat js */
jQuery(document).ready(function() {

    $(".chat-list a").click(function() {
        $(".chatbox").addClass('showbox');
        return false;
    });

    $(".chat-icon").click(function() {
        $(".chatbox").removeClass('showbox');
    });


});


document.getElementById("contactNo").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove non-digits
});

document.getElementById('date').addEventListener('click', function () {
    this.showPicker?.(); // Optional: opens the calendar programmatically
});

const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');
  const fileCount = document.getElementById('fileCount');
  const chooseLabel = document.getElementById('chooseLabel');

  fileInput.addEventListener('change', function () {
    const files = Array.from(this.files);
    if (files.length > 0) {
      // Hide Choose Files label
      chooseLabel.classList.add('d-none');

      // Show file count input
      fileCount.classList.remove('d-none');
      fileCount.value = `${files.length} file${files.length > 1 ? 's' : ''}`;

      // List file names
      fileList.innerHTML = '';
      files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        fileList.appendChild(li);
      });
    }
  });
  