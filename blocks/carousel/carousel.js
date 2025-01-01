export default function decorateCarousel(block) {
    // 1. Get all rows from the block (each row is a <div>)
    const rows = Array.from(block.children);
  
    // 2. The FIRST row is your "Next" button (>>)
    //    The LAST row is your "Previous" button (<<)
    //    Everything in between is a slide.
    const nextRow = rows.shift(); // first row
    const prevRow = rows.pop();   // last row
  
    // Now the remaining rows are your actual slides
    const slides = rows;
  
    // 3. Build the carousel track
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    // Move each “slide row” into the track
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
      track.appendChild(slide);
    });
  
    // 4. Create the .carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel';
    carouselContainer.appendChild(track);
  
    // Replace the block’s HTML with our new structure
    block.innerHTML = '';
    block.appendChild(carouselContainer);
  
    // 5. Create a controls container
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
  
    // 6. Build the actual button elements from the row text
    //    If your Docs row literally has >> for the first row, then nextRow.innerText should be ">>"
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button carousel-next';
    nextButton.textContent = nextRow?.innerText.trim() || '>>'; // fallback if empty
  
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button carousel-prev';
    prevButton.textContent = prevRow?.innerText.trim() || '<<'; // fallback if empty
  
    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    carouselContainer.appendChild(controls);
  
    // 7. Simple slide logic
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    function showSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }
  
    // 8. Button events
    prevButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    // Initialize
    showSlide(0);
  }
  