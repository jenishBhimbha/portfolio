// Sticky header toggle on scroll
$(window).on('scroll', function() {
  const scrollTop = $(this).scrollTop();
  $('.sticky').toggleClass('fixed', scrollTop >= 10);
});

$(document).ready(function() {
    const navbarCollapse = $('.navbar-collapse');

    // Function to check screen size and apply styles
    function applyMobileStyles() {
        if (window.innerWidth <= 991) { // Check if screen width is <= 991px
            navbarCollapse.addClass('mobile'); // Add mobile class
        } else {
            navbarCollapse.removeClass('mobile'); // Remove mobile class
        }
    }

    // Initial check
    applyMobileStyles();

    // Update on resize
    $(window).on('resize', function() {
        applyMobileStyles();
    });
});

// Initialize hero review slider
$('.hero-review-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
  ]
});

$('.slick-footer-slider').on('beforeChange', function() {
  $(this).css('margin-left', 'calc(((100vw - 100%) / 2.2)* -1)');
});

// Initialize footer slider
$('.slick-footer-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
  ]
});

// Footer slider prev/next buttons
$('.footerPrevButton').on('click', function() {
  $('.slick-footer-slider').slick('slickPrev');
});

$('.footerNextButton').on('click', function() {
  $('.slick-footer-slider').slick('slickNext');
});

// Initialize process slider
$('.process-slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: false,
  variableWidth: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
  ]
});

// Form validation on submit
$(document).ready(function() {
  $('.cta-form').on('submit', function(event) {
    event.preventDefault();

    // Remove existing error messages and styles
    $('.error-msg').remove();
    $('.is-invalid').removeClass('is-invalid');

    let formIsValid = true;

    // Validation helper function
    function showError(element, message) {
      element.addClass('is-invalid');
      const errorMsg = $('<div class="error-msg mt-2 text-danger small"></div>').text(message);
      element.closest('.form-group, .form-check').append(errorMsg);
    }

    // Validate First Name
    const firstNameInput = $("input[placeholder='First Name']");
    if (!firstNameInput.val().trim()) {
      showError(firstNameInput, 'First name is required');
      formIsValid = false;
    }

    // Validate Last Name
    const lastNameInput = $("input[placeholder='Last Name']");
    if (!lastNameInput.val().trim()) {
      showError(lastNameInput, 'Last name is required');
      formIsValid = false;
    }

    // Validate Email
    const emailInput = $("input[type='email']");
    const emailValue = emailInput.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue) {
      showError(emailInput, 'Email is required');
      formIsValid = false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailInput, 'Enter a valid email');
      formIsValid = false;
    }

    // Validate Telephone
    const phoneInput = $("input[type='number']");
    const phoneValue = phoneInput.val().trim();
    const phoneRegex = /^[0-9]{7,15}$/;
    
    if (!phoneValue) {
      showError(phoneInput, 'Phone number is required');
      formIsValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
      showError(phoneInput, 'Enter a valid phone number');
      formIsValid = false;
    }

    // Validate Message
    const messageInput = $('#inputMessage');
    if (!messageInput.val().trim()) {
      showError(messageInput, 'Message is required');
      formIsValid = false;
    }

    // Validate Checkbox
    const privacyCheckbox = $('#checkDefault');
    if (!privacyCheckbox.is(':checked')) {
      showError(privacyCheckbox.parent(), 'You must accept the privacy policy');
      formIsValid = false;
    }

    // If form valid, submit
    if (formIsValid) {
      alert('Form is valid! Submitting...');
      this.submit();
    }
  });
});