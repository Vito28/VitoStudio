  export function initTestimonials() {
    const track = document.querySelector("[data-js='testimonial-track']");
    const dots = document.querySelectorAll("[data-js='testimonial-dot']");

    if (!track || dots.length === 0 || track.children.length === 0) return;

    let index = 0;
    let gap = getGap(track);
    const slides = track.children;

    const setActive = (nextIndex) => {
      index = nextIndex;
      const slideWidth = slides[0].getBoundingClientRect().width;
      const offset = -index * (slideWidth + gap);
      console.log(gap);
      
      track.style.transform = "translateX(" + offset + "px)";

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("testimonials__dot--active", dotIndex === index);
        dot.setAttribute("aria-selected", String(dotIndex === index));
      });
    };

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        setActive(dotIndex);
      });
    });

    setActive(0);

    let timer = window.setInterval(() => {
      setActive((index + 1) % slides.length);
    }, 4000);

    track.addEventListener("mouseenter", () => window.clearInterval(timer));
    track.addEventListener("mouseleave", () => {
      timer = window.setInterval(() => {
        setActive((index + 1) % slides.length);
      }, 4000);
    });

    window.addEventListener("resize", () => {
      gap = getGap(track);
      setActive(index);
    });
  }

  function getGap(track) {
    const slides = track.children;
    if (slides.length < 2) return 0;
    const firstRect = slides[0].getBoundingClientRect();
    const secondRect = slides[1].getBoundingClientRect();
    const gap = secondRect.left - firstRect.right;
    return Number.isFinite(gap) ? gap : 0;
  }
