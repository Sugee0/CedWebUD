// EmailJS initialization
emailjs.init('7c4DjU8ZXzk2P9eeJ');

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbarMenu = document.getElementById('navbarMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navbarMenu.classList.remove('active');
    
    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Scrollspy - update active nav link based on scroll position
window.addEventListener('scroll', () => {
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) {
      navLinks.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const templateParams = {
    from_name: document.getElementById('from_name').value,
    from_email: document.getElementById('from_email').value,
    reply_to: document.getElementById('from_email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Send email via EmailJS
  emailjs.send('service_yr5bx8r', 'template_9axjm08', templateParams)
    .then(function(response) {
      console.log('EmailJS success:', response);
      alert('Message sent successfully!');
      document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
      console.error('EmailJS error:', error);
      var errMsg = (error && error.text) ? error.text : (error && error.status ? 'Status: ' + error.status : 'Unknown error');
      if (String(errMsg).toLowerCase().includes('public key is invalid') || String(errMsg).toLowerCase().includes('invalid public key')) {
        alert('Failed to send message: Invalid EmailJS Public Key. Replace the key in the script and try again.');
      } else {
        alert('Failed to send message. Check console and EmailJS Activity. Error: ' + errMsg);
      }
    });
});
