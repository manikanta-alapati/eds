/**
 * decorateCarousel(block)
 *  - Reorganizes each row (from the Google Docs table) into a “slide.”
 *  - Ensures text is above the image (by reordering columns or using flex).
 *  - Adds prev/next buttons labeled "<<", ">>".
 */

export default function decorateCarousel(block) {
    // 1. Gather the slide “rows”
    const slides = Array.from(block.children);
  
    // Create a container track
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
  
      // Identify the 2 columns: text (col 0) and image (col 1) – or vice versa 
      const columns = Array.from(slide.children);
      if (columns.length === 2) {
        const [col1, col2] = columns;
  
        // Check if col1 or col2 contains an <img>. Decide which is text vs. image
        const img1 = col1.querySelector('img');
        const img2 = col2.querySelector('img');
  
        let textCol;
        let imgCol;
  
        // If col1 has the image, then col2 is text
        if (img1) {
          imgCol = col1;
          textCol = col2;
        } else if (img2) {
          textCol = col1;
          imgCol = col2;
        } else {
          // Fallback: assume first column is text, second is image
          textCol = col1;
          imgCol = col2;
        }
  
        // Clear the slide's original contents
        slide.innerHTML = '';
  
        // Add text first
        textCol.classList.add('carousel-text');
        slide.appendChild(textCol);
  
        // Add image second
        slide.appendChild(imgCol);
      }
  
      // Append the rearranged slide to the track
      track.appendChild(slide);
    });
  
    // 2. Create a wrapper .carousel
    const container = document.createElement('div');
    container.className = 'carousel';
    container.appendChild(track);
  
    // Replace block contents with the carousel container
    block.innerHTML = '';
    block.appendChild(container);
  
    // 3. Add next/prev buttons
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
  
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button carousel-prev';
    prevBtn.innerText = '<<';  // Updated label
  
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button carousel-next';
    nextBtn.innerText = '>>';  // Updated label
  
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    container.appendChild(controls);
  
    // 4. Simple slide logic
    const totalSlides = slides.length;
    let currentIndex = 0;
  
    function showSlide(index) {
      // Wrap around if index is out of bounds
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
  
      const offset = -(index * 100);
      track.style.transform = `translateX(${offset}%)`;
      currentIndex = index;
    }
  
    // 5. Button events
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    // 6. Start on the first slide
    showSlide(0);
  }
  