const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    const item__texts = document.querySelectorAll('.item__text');
    const item__buttons = document.querySelectorAll('.item__button');
    const item__checkboxs = document.querySelectorAll('.item__checkbox');
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka

    for (let t of item__texts)
      if (!t.parentNode.classList.contains('item--done'))
        t.addEventListener('click', edit);
    for (let b of item__buttons)
      b.addEventListener('click', deleteItem);
    for (let c of item__checkboxs)
      c.addEventListener('click', finish);
  }

  function formHandler(e) {
    e.preventDefault();

    textNode = e.target.querySelector('.form__input');
    if (textNode.value.length > 0)
      add(textNode.value);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    node = e.target;
    item = node.parentNode;

    item.classList.toggle('item--done');

    if (item.classList.contains('item--done'))
      node.nextElementSibling.removeEventListener('click', edit);
    else
      node.nextElementSibling.addEventListener('click', edit);
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const span = e.target;
    const item = span.parentNode;
    const input = el('input', 'item__text', commit);

    input.value = span.textContent;
    item.insertBefore(input, span);
    item.removeChild(span);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const input = e.target;
    const item = input.parentNode;
    const span = el('span', 'item__text', edit);

    span.textContent = input.value;
    item.insertBefore(span, input);
    item.removeChild(input);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    endNode = items.lastChild.cloneNode(false);
    items.removeChild(items.lastChild);
    node = items.lastChild.cloneNode(true);
    node.querySelector('.item__text').textContent = value;

    items.appendChild(node);
    items.appendChild(endNode);

    init(document.querySelector('.form'), items);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    items.removeChild(e.target.parentNode);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const node = document.createElement(type);

    node.className = className;
    if (clickHandler == 'commit')
      node.addEventListener('blur', clickHandler);
    else
      node.addEventListener('click', clickHandler);

    if (className === 'item__checkbox')
      node.type = 'checkBox';

    return node;
  }

  return {
    init: init
  };
})();
