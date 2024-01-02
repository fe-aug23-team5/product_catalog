export const removeScrollForBody = (value: boolean) => {
  const body = document.querySelector('body') as HTMLElement;

  if (value) {
    body.classList.add('disable_scroll');
  } else {
    body.classList.remove('disable_scroll');
  }
};
