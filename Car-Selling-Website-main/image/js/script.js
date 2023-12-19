let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let darkModeToggle = document.querySelector('#dark-mode-toggle');
let body = document.body;

function registerUser() {
  var username = document.getElementById('register-username').value;
  var password = document.getElementById('register-password').value;

  fetch('http://localhost:5000/register', {  // Update the URL with your Flask app's endpoint
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  });

  return false; // Prevent the form from submitting
}
function openContactModal() {
  document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
}
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () => {
  document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () => {
  document.querySelector('.login-form-container').classList.remove('active');
}

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.remove('active');
  }
};

document.querySelector('.home').onmousemove = (e) => {
  document.querySelectorAll('.home-parallax').forEach(elm => {
    let speed = elm.getAttribute('data-speed');
    let x = (window.innerWidth - e.pageX * speed) / 90;
    let y = (window.innerHeight - e.pageY * speed) / 90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;
  });
};

document.querySelector('.home').onmouseleave = () => {
  document.querySelectorAll('.home-parallax').forEach(elm => {
    elm.style.transform = 'translateX(0px) translateY(0px)';
  });
};

var swiperVehicles = new Swiper(".vehicles-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiperFeatured = new Swiper(".featured-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiperReview = new Swiper(".review-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});
