const carouselSlider = (function () {
    let _slideIndex = 1;
  
    const _slides = document.querySelectorAll(".image-fade");
    const _dots = document.querySelectorAll(".dot");
  
    function _sliderInitState(slides, dots) {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
  
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
    }
  
    function _checkSlideIndexBoundary(slideIndex, slides) {
      if (slideIndex > slides.length) {
        _slideIndex = 1;
      }
      if (slideIndex === 0) {
        _slideIndex = slides.length;
      }
    }
  
    function _slideSelectionIndecator(dots, slideIndex) {
      dots[slideIndex - 1].classList.add("active");
    }
  
    function _activateSlide(slides, slideIndex) {
      slides[slideIndex - 1].style.display = "block";
      _slideSelectionIndecator(_dots, _slideIndex);
    }
  
    function _imageDirection(direction) {
      _sliderInitState(_slides, _dots);
      if (direction == "next") {
        _activateSlide(_slides, _slideIndex);
        _slideIndex++;
        _checkSlideIndexBoundary(_slideIndex, _slides);
      } else {
        _slideIndex--;
        _checkSlideIndexBoundary(_slideIndex, _slides);
        _activateSlide(_slides, _slideIndex);
      }
    }
  
    const _previousButton = document.querySelector(".previous");
    const _nextButton = document.querySelector(".next");
  
    _previousButton.addEventListener("click", function () {
      _imageDirection("previous");
    });
  
    _nextButton.addEventListener("click", function () {
      _imageDirection("next");
    });
  
    const slide = function () {
      _sliderInitState(_slides, _dots);
      _activateSlide(_slides, _slideIndex);
      _slideIndex++;
      _checkSlideIndexBoundary(_slideIndex, _slides);
      // Change image every 5 seconds
      setTimeout(slide, 5000);
    };
  
    return {
      slide
    };
  })();
  
  carouselSlider.slide();

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  const sliderImg = document.querySelectorAll('.slideIn');
  
  window.addEventListener('scroll', debounce(imageReveal));
  
  function imageReveal(){
     sliderImg.forEach(slideImg => {
       const slideInAt = (window.scrollY + window.innerHeight) - slideImg.height /2;
       const imageBottom = slideImg.offsetTop + slideImg.height;
       const isHalfShown = slideInAt > slideImg.offsetTop;
       const isNotScrollPast = window.scrollY < imageBottom;
       if(isHalfShown && isNotScrollPast){
         slideImg.classList.add('active');
       }else{
         slideImg.classList.remove('active');
       }
     })
  }



  