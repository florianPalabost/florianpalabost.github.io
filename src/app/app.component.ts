import {Component, OnInit} from '@angular/core';
import 'magnific-popup';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
declare  var jQuery:  any;
import Darkmode from 'darkmode-js';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faChevronUp = faChevronUp;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const options = {
      bottom: '64px', // default: '32px'
      right: 'unset', // default: '32px'
      left: '32px', // default: 'unset'
      time: '0.5s', // default: '0.3s'
      mixColor: '#fff', // default: '#fff'
      backgroundColor: '#fff',  // default: '#fff'
      buttonColorDark: '#100f2c',  // default: '#100f2c'
      buttonColorLight: '#fff', // default: '#fff'
      saveInCookies: false, // default: true,
      label: '🌓', // default: ''
      autoMatchOsTheme: true // default: true
    };
    new Darkmode(options).showWidget();
    (function($) {
      'use strict'; // Start of use strict

      // const btn = document.querySelector('.darkmode-toggle');
      //
      // btn.setAttribute('style', 'z-index: 100;');


      // Smooth scrolling using jQuery easing
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 71)
            }, 1000, 'easeInOutExpo');
            return false;
          }
        }
      });

      // Scroll to top button appear
      $(document).scroll(function() {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
      });

      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
        target: '#mainNav',
        offset: 80
      });

      // Collapse Navbar
      const navbarCollapse = function() {
        if ($('#mainNav').offset().top > 100) {
          $('#mainNav').addClass('navbar-shrink');
        } else {
          $('#mainNav').removeClass('navbar-shrink');
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);

      // Floating label headings for the contact form
      $(function() {
        $('body').on('input propertychange', '.floating-label-form-group', function(e) {
          $(this).toggleClass('floating-label-form-group-with-value', !!$(e.target).val());
        }).on('focus', '.floating-label-form-group', function() {
          $(this).addClass('floating-label-form-group-with-focus');
        }).on('blur', '.floating-label-form-group', function() {
          $(this).removeClass('floating-label-form-group-with-focus');
        });
      });

    })(jQuery); // End of use strict

  }

}
