export default function decorateCarousel(block) {
    // 1. Convert all table rows (divs) to an array.
    const rows = Array.from(block.children);
  
    // If the very first row is a heading like "Carousel", remove it:
    if (rows[0] && rows[0].innerText.trim().toLowerCase() === 'carousel') {
      rows.shift();
    }
  
    // The first row becomes the NEXT button (">>")
    const nextRow = rows.shift();
  
    // The last row becomes the PREVIOUS button ("<<")
    const prevRow = rows.pop();
  
    // All rows in between are slides
    const slides = rows;
  
    // 2. Create the carousel track
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    // 3. Turn each “slide row” into a properly styled slide
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
  
      // If your row has 2 columns: one for the image, one for text
      // or if it’s just 1 column with both image & text.  
      // We’ll detect the <img>, turn it into a background, 
      // and overlay the rest of the text on top.
      const img = slide.querySelector('img');
  
      // Create an overlay text container
      const contentOverlay = document.createElement('div');
      contentOverlay.className = 'carousel-content';
  
      // Move all non-image content into the overlay container
      // (So “Slide 1”, “This is Slide 1”, etc. will appear as text)
      Array.from(slide.children).forEach((col) => {
        const foundImg = col.querySelector('img');
        if (!foundImg) {
          // Move this column’s children into contentOverlay
          while (col.firstChild) {
            contentOverlay.appendChild(col.firstChild);
          }
        }
      });
  
      // Clear the slide’s original content
      slide.innerHTML = '';
      // If we found an image, set it as a background
      if (img) {
        slide.style.backgroundImage = `url(${img.src})`;
      }
      // Add the overlay text container
      slide.appendChild(contentOverlay);
  
      track.appendChild(slide);
    });
  
    // 4. Create the .carousel container
    const carouselEl = document.createElement('div');
    carouselEl.className = 'carousel';
    carouselEl.appendChild(track);
  
    // Replace the block’s content with our carousel structure
    block.innerHTML = '';
    block.appendChild(carouselEl);
  
    // 5. Build the actual next/prev buttons from the row text
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
  
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-next';
    nextButton.textContent = (nextRow?.innerText || '>>').trim();
  
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button carousel-prev';
    prevButton.textContent = (prevRow?.innerText || '<<').trim();
  
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    carouselEl.appendChild(controls);
  
    // 6. Simple slider logic
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    function showSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }
  
    nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    prevButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    // 7. Initialize to the first slide
    showSlide(0);
  }
  