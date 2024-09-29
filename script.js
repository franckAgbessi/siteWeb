const words = ["BIG DATA!", "IA!"];
let currentWordIndex = 0, currentCharIndex = 0;
const delay = 150, pauseBetweenWords = 1500;
const textElement = document.getElementById('changing-text');

function changeText() {
  const currentWord = words[currentWordIndex];
  const displayedText = currentWord.slice(0, currentCharIndex);
  const targetChar = currentWord[currentCharIndex];

  textElement.innerHTML = currentCharIndex < currentWord.length 
    ? `${displayedText}<span class="fade-in">${targetChar}</span>` 
    : currentWord;

  if (currentCharIndex < currentWord.length) {
    setTimeout(() => {
      textElement.querySelector('span').classList.add('visible');
      currentCharIndex++;
      setTimeout(changeText, delay);
    }, delay);
  } else {
    setTimeout(() => {
      currentCharIndex = 0;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      changeText();
    }, pauseBetweenWords);
  }
}

changeText();

document.addEventListener('mousemove', (event) => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  const { clientX: mouseX, clientY: mouseY } = event;
  const deltaX = mouseX - windowWidth / 2, deltaY = mouseY - windowHeight / 2;
  document.querySelectorAll('.flowerElementMove').forEach(flower => {
    flower.style.transform = `translate(${deltaX * 0.02}px, ${deltaY * 0.02}px)`;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const sections = [
    {
      section: document.querySelector('.mainSection2'),
      elements: {
        el1: document.querySelector('.mainSection2 .el1'),
        el2: document.querySelector('.mainSection2 .el2')
      },
      transforms: {
        el1: (scrollPercentage, mouseX) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,
          scrollPercentage * 30
        ],
        el2: (scrollPercentage, mouseX) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 30
        ]
      }
    },
    {
      section: document.querySelector('.mainSection3'),
      elements: {
        el1: document.querySelector('.mainSection3 .el1'),
        el2: document.querySelector('.mainSection3 .el2'),
        el3: document.querySelector('.mainSection3 .el3'),
        el4: document.querySelector('.mainSection3 .el4')
      },
      transforms: {
        el1: (scrollPercentage, mouseX) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 40
        ],
        el2: (scrollPercentage, mouseX) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 50
        ],
        el3: (scrollPercentage, mouseX) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,
          scrollPercentage * 40
        ],
        el4: (scrollPercentage, mouseX) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 60
        ]
      }
    }
  ];

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
           rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  };

  const updateSectionTransformations = (section, elements, transforms) => {
    if (!isElementInViewport(section)) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;
    const scrollPercentage = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));

    Object.entries(transforms).forEach(([elementKey, transform]) => {
      const [x, y] = transform(scrollPercentage, mouseX);
      elements[elementKey].style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  const animate = () => {
    sections.forEach(({ section, elements, transforms }) => {
      updateSectionTransformations(section, elements, transforms);
    });
    requestAnimationFrame(animate);
  };

  animate();

  const scrollingText = document.getElementById('scrollingText');
  const preFooter = document.querySelector('.preFooter');
  const adjustAnimationDuration = () => {
    scrollingText.style.animationDuration = `${scrollingText.scrollWidth / 50}s`;
  };
  adjustAnimationDuration();
  window.addEventListener('resize', adjustAnimationDuration);
});

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    document.querySelector(`.${target}`).classList.add('active');
  });
});

document.querySelectorAll('[id^="myButton"]').forEach(button => {
  button.onclick = () => {
    const expanded = document.querySelector('.elementHover.expanded');
    if (expanded && expanded !== button) expanded.classList.remove('expanded');
    button.classList.toggle('expanded');
  };
});

window.onload = () => {
  const elementSection = document.querySelector('.mainSection1');
  setTimeout(() => {
    elementSection.classList.remove('loader-wrapper');
    document.getElementById('arrowButton').click();
  }, 5000);
};
