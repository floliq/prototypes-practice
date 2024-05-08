const btn = document.querySelector('.find_btn');
const input = document.querySelector('.find__input');
const list = document.querySelector('.find__main');

async function moduleGet(value) {
  try {
    const module = await import(`./${value}`);
    const prototype = module.default.prototype;
    return prototype;
  } catch (error) {
    input.classList.add('is-invalid');
  }
}

function getPrototypesAndProperties(value) {
  const prototypeList = [];
  let prototype = value;
  while (prototype) {
    prototypeList.push(prototype);
    prototype = Object.getPrototypeOf(prototype);
  }
  const ol = document.createElement('ol');
  for (let i = 0; i < prototypeList.length; i++) {
    const li = document.createElement('li');
    const constructorName = prototypeList[i].constructor.name || 'Без названия';
    li.innerText = constructorName;
    const descriptors = Object.getOwnPropertyDescriptors(prototypeList[i]);
    if (descriptors) {
      const outerOl = document.createElement('ol');
      for (const [key, property] of Object.entries(descriptors)) {
        const outerLi = document.createElement('li');
        outerLi.innerText = `Имя свойства: ${key}, Тип свойства: ${
          property.get ? typeof property.get : typeof property.value
        }`;
        outerOl.append(outerLi);
      }

      li.append(outerOl);
    }
    ol.append(li);
  }

  list.append(ol);
}

async function showPrototypes(event) {
  event.preventDefault();
  input.classList.remove('is-invalid');
  const value = input.value.trim();
  let prototype = null;
  list.innerHTML = '';
  if (value.endsWith('.js')) {
    prototype = await moduleGet(value);
    getPrototypesAndProperties(prototype);
  } else if (typeof window[value] !== 'function') {
    input.classList.add('is-invalid');
  } else {
    prototype = window[value].prototype;
    getPrototypesAndProperties(prototype);
  }
  input.value = '';
}

btn.addEventListener('click', showPrototypes);
