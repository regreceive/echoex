export default function serialize(form) {
  let inputs = Array.from(form.querySelectorAll('input'));
  inputs = inputs.filter(input => {
    let wantyou = true;

    if (
      (input.type === 'radio' && !input.checked) ||
      input.type === 'checkbox'
    ) {
      wantyou = false;
    }
    return wantyou;
  });

  const json = inputs.map(input => {
    let value;
    if (input.type === 'file') {
      value = input.files[0];
    } else {
      value = input.value;
    }
    return {
      name: input.name,
      value,
    };
  });

  const fd = new FormData();
  for (let i = 0, len = json.length; i < len; i++) {
    fd.set(json[i].name, json[i].value);
  }

  return fd;
}
