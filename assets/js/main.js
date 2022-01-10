/**
* Template Name: Company - v4.7.0
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/*-------------------------user defined-------------------------*/
function search() 
{
    var id= document.getElementById("id1").value;

firebase.database().ref('Contact/'+ id).once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                     var name_ = snapshot.val().name;
                     var id_ = snapshot.val().id;
                    var mail_ = snapshot.val().email;
                    var branch_ = snapshot.val().branch;
                    var subject_ = snapshot.val().subject;
                    var message_ = snapshot.val().message;
                      document.getElementById("name").value = name_;
                      document.getElementById("id").value = id_;
                      document.getElementById("email").value =  mail_;
                      document.getElementById("branch").value = branch_;
                      document.getElementById("subject").value = subject_;
                      document.getElementById("message").value = message_;
                }
                else
                {

                }
        }, function(error) {
            if (error) {

            } else {

            }
          });
}

function delete_()
{
    var del_user = document.getElementById("for_del").value;
    let userRef = firebase.database().ref('Contact/' + del_user);
    userRef.remove();
    alert("Successfully Removed");
}
function all_student_view()
{

    firebase.database().ref('Contact/').once('value').then(function(snapshot) {
        snapshot.forEach(function(child) {
            var m= child.val().id;
            var n= child.val().name;
            var o= child.val().email;
            var b = child.val().branch;
            var s = child.val().subject;
            var me = child.val().message;
            alert(m + " "+ n+ " "+ o +  " " + b + " " + s + " " + me);

        });
        }, function(error) {
            if (error) {
            } else {

            }
          });

}

function show_contact() {

  var name = document.getElementById("name").value;
  var email= document.getElementById("email").value;
  var id= document.getElementById("id").value;
  var branch= document.getElementById("branch").value;
  var subject= document.getElementById("subject").value;
  var message= document.getElementById("message").value;

   firebase.database().ref('Contact/' + id).set({
          name : name,
          id : id,
          email : email,
          branch : branch,
          subject : subject,
          message : message

        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("id").value = "";
            document.getElementById("branch").value ="";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
              alert("Done!");
         
          }
        });
} 

function show_comment() {

  var name = document.getElementById("name").value;
  var email= document.getElementById("email").value;
  var message= document.getElementById("message").value;
  var result = email.split(".", 1);
   firebase.database().ref('Comments/' + result).set({
          name : name,
          // id : id,
          email : email,
          
          message : message
          // branch : branch,
          // subject : subject,
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
              alert("Comment Posted!");
            
          }
        });
} 
 
function show_placeOrder() {

  var name = document.getElementById("name").value;
  var email= document.getElementById("email").value;
  var id= document.getElementById("id").value;
  var code= document.getElementById("code").value;
  var address= document.getElementById("address").value;
  var noOf= document.getElementById("noOf").value;

   firebase.database().ref('Order/' + id).set({
          name : name,
          // id : id,
          email : email,
          code : code,
          id : id,
          address : address,
          noOf : noOf
          // branch : branch,
          // subject : subject,
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
              alert("Successfully Place order!");
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("id").value = "";
              document.getElementById("code").value = "";
              document.getElementById("address").value = "";
              document.getElementById("noOf").value = "";

            
          }
        });
} 
