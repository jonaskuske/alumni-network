export const wait = t => new Promise(r => setTimeout(r, t));
export const autofillCatch = {
  bind: function (el, binding, vnode) {
    let children = vnode.children;
    children.forEach(child => {
      if (child.tag === "input") {
        child.elm.onfocus = function () {
          setTimeout(function () {
            updateAllInputs(vnode);
          });
        };
      }
    });
  }
};
function updateAllInputs(vnode) {
  vnode.children.forEach(child => {
    if (child.tag === "input") {
      vnode.context[child.data.directives["0"].expression] = child.elm.value;
    }
  });
}
export function generateId(a) {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateId);
}
export const readFile = file => {
  return new Promise(res => {
    const reader = new FileReader();
    reader.addEventListener("load", f => res(f.target.result));
    reader.readAsDataURL(file);
  });
};
const imageFile = /^image\//;
export const readImageFromInput = ({ target }) => {
  const file = target.files[0];
  if (!imageFile.test(file.type)) return;

  return readFile(file);
};

export const readImagesFromInput = ({ target }) => {
  let files = [];
  for (const i in target.files) files.push(target.files[i]);
  const images = files.filter(file => imageFile.test(file.type)).map(readFile);

  return Promise.all(images);
};
