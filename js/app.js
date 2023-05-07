const body = document.querySelector('body');

const sections = document.querySelectorAll('.section--wrapper');

const nav = document.querySelector('nav');

const mains = document.querySelectorAll('.main--section');

const sectionTitles = [];

const contentHeight = document.querySelector('html').getBoundingClientRect().height;

const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerText = "Scroll to Top";
scrollToTopButton.classList.add('button--to-top');




// extracting titles for nav anchors and creating ids based off of section title
sections.forEach(e => {
  let title = e.childNodes[1];
  e.setAttribute('data-nav', title.innerText);
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

// Active class when section is in viewport
function makeActive(target) {
  const windowHeight = window.innerHeight;
  const clientRect = target.getBoundingClientRect();
  const size  = clientRect.height;

  if ((clientRect.y + size >= 0) && (clientRect.y < windowHeight)) {
    target.classList.add('main--section-active');
  }
  else {
    target.classList.remove('main--section-active');
  }
}

// Gets active sections
function getActive() {
  const arr = [];
  mains.forEach(e => {
    if (e.classList.contains('main--section-active')) {
      arr.push(`#${e.childNodes[1].firstElementChild.innerText}`);
    }
  })
  return arr;
}


function makeActiveNav(target) {
  const activeSections = getActive();
  if (activeSections.includes(target.getAttribute('href'))) {
    target.classList.add('nav-active')
  }
  else {
    target.classList.remove('nav-active')
  }
}

// Nav scroll to section
window.addEventListener('scroll', e => {
  const mains = document.querySelectorAll('.main--section')
  const navs = document.querySelectorAll('a');
  mains.forEach(makeActive)
  navs.forEach(makeActiveNav)
})

nav.addEventListener('click', e => {
  const target = e.target;
  const ref = document.querySelector(`[data-nav="${target.innerText}"]`);
  ref.scrollIntoView({behavior: "smooth", block: "center"});
})

// Collapse sections 
mains.forEach(e => {
  const button = document.createElement('button');
  button.innerText = "Collapse";
  button.classList.add('button--collapse');
  e.appendChild(button);
})

body.addEventListener('click', e => {
  const target = e.target;
  const parentChildren = target.parentNode.childNodes;
  if (target.nodeName === 'BUTTON') {
    parentChildren.forEach(e => {
      if (e.nodeName == 'DIV') {
        if (target.innerText == 'Collapse') {
          e.children[1].style.cssText = 'display: none';
          target.innerText = 'Expand'
        } else {
          target.innerText = 'Collapse';
          e.children[1].style.cssText = `display: initial`;
        }
      }
    })
  }
})

//Scroll to Top
window.addEventListener('scroll', e => {
  const scrollY = window.scrollY;

  if (scrollY >= (contentHeight / 2) && !body.contains(scrollToTopButton)) {
    body.appendChild(scrollToTopButton);
  }
  else if (scrollY < (contentHeight / 2) && body.contains(scrollToTopButton)) {
    body.removeChild(scrollToTopButton);
  }
})

body.addEventListener('click', e => {
  const target = e.target;
  const top = window.screenTop;
  if (target == scrollToTopButton) {
    window.scroll(0, top)
  }
})

// Hide scroll bar while not scrolling
window.addEventListener('scroll', () => {
  const bodyClass = body.classList;
  bodyClass.remove('hide-scrollbar')
  if (bodyClass.length === 0) {
    setTimeout(() => bodyClass.add('hide-scrollbar'), 2000);
  }
})
