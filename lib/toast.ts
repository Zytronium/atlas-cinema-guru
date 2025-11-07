export default function showToast(message: string, duration: number = 2000, bg: string = 'teal', text: string = 'dark-blue') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
        z-index:9999; transition: 0.75s;
      `;
  toast.classList.add(`bg-${bg}`, `text-${text}`, 'text-lg', 'fixed', 'bottom-4', 'right-4', 'rounded-lg', 'px-3', 'py-2', 'shadow-lg');
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 750);
  }, duration);
}
