const copyBtn = document.querySelector('.copy-btn');
const codeEl = document.getElementById('install-cmd');

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
