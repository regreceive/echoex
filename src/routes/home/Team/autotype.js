let timer;
export default function autotype(el, str) {
  let index = 0;

  clearInterval(timer);
  timer = setInterval(() => {
    index += 1;

    el.innerHTML = str.substring(0, index) + (index >= str.length ? '' : '_');

    if (index >= str.length) {
      clearInterval(timer);
    }
  }, 10);
}
