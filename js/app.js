const body = document.querySelector('body');

const sections = document.querySelectorAll('.section--wrapper');

const nav = document.querySelector('nav');

const sectionTitles = [];


// extracting titles for nav anchors and creating ids based off of section title
sections.forEach(e => {
  let title = e.childNodes[1];
  e.setAttribute('id', title.innerText);
  sectionTitles.push(title.innerHTML)
});


// Creating nav anchors and linking sections
sectionTitles.forEach(e => {
  let li = document.createElement('li');
  li.innerText = e;

  let a = document.createElement('a');
  a.className = 'nav--link';
  a.setAttribute('href', `#${li.innerText}`)
  a.setAttribute('target','_self');
  a.appendChild(li);
  nav.appendChild(a);
})

function makeActive(target) {
  const clientRect = target.getBoundingClientRect();

  const size  = clientRect.height;
  const half = clientRect.height / 2;
  
  if ((clientRect.y + size >= 0) && (clientRect.y <= size)) {
    target.classList.add('main--section-active')
  }

  else {
    target.classList.remove('main--section-active');
  }
}

window.addEventListener('scroll', e => {
  const mains = document.querySelectorAll('.main--section')
  mains.forEach(makeActive)
})
