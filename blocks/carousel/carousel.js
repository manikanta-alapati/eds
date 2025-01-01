/**
 * decorateCarousel(block)
 *  - Reads the rows (originally from a table in Google Docs) and transforms them into a “slide” structure.
 *  - Wraps those slides in a ‘track’.
 *  - Adds next/prev arrows that shift the track’s transform to move between slides.
 */

export default function decorateCarousel(block) {
    // 1. Gather the slide "rows" (each <div> in the block)
    const slides = Array.from(block.children);
  
    // Create a container (track) and move the slides into it
    const track = document.createElement('div');
    track.className = 'carousel-track';
  
    // Move each row into the track, give it a "slide" class
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
  
      // If the row uses a two-column table with an image and text, you can further refine structure
      // For example, wrap the second column in a .carousel-slide-content
      const columns = Array.from(slide.children);
      if (columns.length === 2) {
        const imgCol = columns[0];
        const textCol = columns[1];
  
        // If the first column is an image, ensure it’s an <img> tag
        const maybeImg = imgCol.querySelector('img');
        if (maybeImg) {
          maybeImg.style.width = '100%'; // or any styling you want
        }
        // Wrap text col in a content div for styling
        const contentWrap = document.createElement('div');
        contentWrap.className = 'carousel-slide-content';
        // Move textCol’s children into contentWrap
        while (textCol.firstChild) {
          contentWrap.appendChild(textCol.firstChild);
        }
        textCol.appendChild(contentWrap);
      }
  
      track.appendChild(slide);
    });
  
    // 2. Create a wrapper around the track for overflow control
    const container = document.createElement('div');
    container.className = 'carousel';
    container.appendChild(track);
  
    // 3. Insert the container back into the block
    block.innerHTML = '';
    block.appendChild(container);
  
    // 4. Create next/prev buttons
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
  
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-button carousel-prev';
    prevBtn.innerText = '‹'; // or use an icon
  
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-button carousel-next';
    nextBtn.innerText = '›'; // or use an icon
  
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    container.appendChild(controls);
  
    // 5. Slide logic
    let currentIndex = 0;
  
    function showSlide(index) {
      // Bound the index to valid slides
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
  
      // Move the track
      const offset = -(index * 100);
      track.style.transform = `translateX(${offset}%)`;
      currentIndex = index;
    }
  
    // 6. Button event listeners
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    // 7. Start on slide 0
    showSlide(0);
  }
  