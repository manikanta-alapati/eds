export default function decorateCarousel(block) {
    // Grab all row <div>s from the block.
    const rows = Array.from(block.children);
  
    // If you have a top heading row (e.g. "Carousel"), remove it if you don’t want it:
    // e.g. if rows[0] has text "Carousel"
    if (rows[0] && rows[0].innerText.trim().toLowerCase() === 'carousel') {
      rows.shift();
    }
  
    // The first row is your NEXT button (">>")
    const nextRow = rows.shift();
  
    // The last row is your PREVIOUS button ("<<")
    const prevRow = rows.pop();
  
    // Everything left in between is a "slide"
    const slides = rows;
  
    // Create the track
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    // Move each slide into the track, and arrange columns so the image is on top, text is on bottom
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
      // If your table row has 2 columns, e.g. one for the image, one for text:
      const cols = Array.from(slide.children);
      if (cols.length === 2) {
        // Detect which col has an <img>
        const imgCol = cols.find((col) => col.querySelector('img'));
        const textCol = cols.find((col) => !col.querySelector('img'));
  
        // Clear the slide’s original content
        slide.innerHTML = '';
  
        // Append image first
        if (imgCol) {
          slide.appendChild(imgCol);
        }
        // Then append text
        if (textCol) {
          slide.appendChild(textCol);
        }
      }
      track.appendChild(slide);
    });
  
    // Create the .carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel';
    carouselContainer.appendChild(track);
  
    // Wipe out the original block content, add our container
    block.innerHTML = '';
    block.appendChild(carouselContainer);
  
    // Build the actual next/prev buttons from the rows
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
  
    // The text inside nextRow and prevRow is presumably ">>" and "<<"
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-next';
    nextButton.textContent = (nextRow?.innerText || '>>').trim();
  
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button carousel-prev';
    prevButton.textContent = (prevRow?.innerText || '<<').trim();
  
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    carouselContainer.appendChild(controls);
  
    // Simple slide logic
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    function showSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }
  
    // Button events
    nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    prevButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    // Initialize
    showSlide(0);
  }
  