// lavet efter denne darkmode tutorial
// https://dev.to/wrux/super-simple-light-dark-mode-switch-38nl


document.addEventListener('DOMContentLoaded', () =>
  document.querySelectorAll('[toggle-dark-mode]').forEach((item) =>
    item.addEventListener('click', () => {
      localStorage.setItem('theme', localStorage.theme == 'dark' ? 'light' : 'dark');
      document.documentElement.classList.toggle('dark');
    })
  )
);

document.addEventListener('DOMContentLoaded', () =>
  document.querySelectorAll('[toggle-white-mode]').forEach((item) =>
    item.addEventListener('click', () => {
      localStorage.setItem('theme', localStorage.theme == 'dark' ? 'light' : 'dark');
      document.documentElement.classList.toggle('dark');
    })
  )
);