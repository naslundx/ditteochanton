function rot13(message) {
  return message.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13 : -13)));
} 

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const addFirework = () => {
  let div = document.createElement('div');
  div.classList.add('firework');
  div.style.left = `${getRndInteger(30, 70)}%`;
  document.querySelector('#wedding').appendChild(div);
  if (document.querySelector('main').scrollTop > 10) {
    div.classList.add('hidden');
  }
}

const updateScroll = (id) => {
  const divContainer = document.querySelector(`#div-container-${id}`);
  const dotContainer = document.querySelector(`#dot-container-${id}`);
  const childDivs = document.querySelectorAll(`#div-container-${id} > div`);
  const childDots = document.querySelectorAll(`#dot-container-${id} .dot`);

  if (!divContainer || !dotContainer) {
    return;
  }
  
  childDots.forEach(el => el.classList.remove('active'));

  for (let i=0; i<childDivs.length; i++) {
    let div = childDivs[i];
    let dot = childDots[i];
    let mid = div.offsetLeft + div.clientWidth / 2;

    if (mid > divContainer.scrollLeft && mid <= divContainer.scrollLeft + divContainer.clientWidth) {
      dot?.classList.add('active');
    }
  }

  if (document.querySelectorAll(`#dot-container-${id} .dot.active`).length === childDots.length) {
    dotContainer.classList.add("hidden");
  } else {
    dotContainer.classList.remove("hidden");
  }
}

document.querySelectorAll('.div-container').forEach(el => {
  el.onwheel = () => updateScroll(0);
  el.onscroll = () => updateScroll(0);
});


const deobfuscateMail = () => {
  document.querySelectorAll("a.mailto").forEach(el => {
    const original = el.innerText;
    const rotated = rot13(original);

    el.innerText = rotated;
    el.href = `mailto:${rotated}`;
  })
}

const resizeMap = () => {
  const header = document.querySelector("header");
  const buffer = document.querySelector("div#buffer");

  buffer.style.height = header.clientHeight + 'px';
  
  const mapContainer = document.getElementById("map");
  const mapIframe = document.querySelector("#map iframe");

  mapIframe.style.width = mapContainer.clientWidth + 'px';
  mapIframe.style.height = (mapContainer.clientHeight - buffer.clientHeight) + 'px';
}

document.addEventListener('resize', (event) => resizeMap());

setTimeout(resizeMap, 10);

const dateAnimation = () => {
  const textElement = document.getElementById("dateText");
  const text = "2025 07 05";
  let index = 0;

  textElement.classList.add("fade-in");

  function typeCharacter() {
    if (index < text.length) {
      textElement.textContent += text[index];
      index++;
      setTimeout(typeCharacter, 250);
    } else {
      for (let i=0; i<20; i++) {
        setTimeout(addFirework, i * 50);
      }
    }
  }

  typeCharacter();
};

document.addEventListener('DOMContentLoaded', () => {
  dateAnimation();
  deobfuscateMail();
  updateScroll(0);

    const links = document.querySelectorAll('header nav ul li a');

    const listener = () => {
      let current = '';
      const main = document.querySelector('main');
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (main.scrollTop >= sectionTop - sectionHeight / 2) {
          current = section.getAttribute('id');
        }
      });
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });

      const firework = document.querySelectorAll(".firework");
      if (current != "wedding") {
        firework.forEach(f => f.classList.add("hidden"));
      } else {
        firework.forEach(f => f.classList.remove("hidden"));
      }
    };
  
    // Highlight current section
    document.querySelector('main').addEventListener('scroll', listener);
  
    // Smooth scrolling
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    listener();
  });
  
