const copyBtn = document.querySelector('.copy-btn');
const codeEl = document.getElementById('install-cmd');

if (copyBtn && codeEl) {
  copyBtn.addEventListener('click', async () => {
    const text = codeEl.textContent.replace(/\s*\n\s*/g, ' ').trim();
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<i class="fa-regular fa-clipboard"></i>';
      }, 2000);
    } catch {
      copyBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
  });
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const isInViewport = (el) => el.getBoundingClientRect().top < window.innerHeight - 60;

  const groups = [
    { selector: '.hero-inner > *', anim: 'blur-reveal', stagger: 130 },
    { selector: '.hero-code', anim: 'fade-up', stagger: 0 },
    { selector: '.feat', anim: 'slide-in', stagger: 80, dir: (i) => i % 2 === 0 ? 'left' : 'right' },
    { selector: '.usage-section .usage-card', anim: 'fade-up', stagger: 150 },
    { selector: '.contribute-section .usage-card', anim: 'fade-up', stagger: 150 },
    { selector: '.next-inner', anim: 'fade-scale', stagger: 0 },
  ];

  groups.forEach(({ selector, anim, stagger, dir }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      const delay = stagger * i;
      const direction = dir ? dir(i) : null;

      el.style.setProperty('--delay', `${delay}ms`);
      el.classList.add(anim);

      if (direction === 'left') el.classList.add('from-left');
      else if (direction === 'right') el.classList.add('from-right');
      else if (anim === 'fade-up') el.classList.add('from-below');
      else if (anim === 'fade-scale') el.classList.add('from-scale');
      else if (anim === 'blur-reveal') el.classList.add('from-blur');

      if (isInViewport(el)) {
        el.classList.add('animate-in');
      } else {
        el.classList.add('will-animate');
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('will-animate');
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.will-animate').forEach((el) => observer.observe(el));
}
