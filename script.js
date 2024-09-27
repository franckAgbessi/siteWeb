const words = ["BIG DATA!", "IA!"];
let currentWordIndex = 0;
let currentCharIndex = 0;
const delay = 150; 
const pauseBetweenWords = 1500; 
const textElement = document.getElementById('changing-text');

function changeText() {
  let currentWord = words[currentWordIndex];
  let displayedText = currentWord.slice(0, currentCharIndex);
  let targetChar = currentWord[currentCharIndex];

  if (currentCharIndex < currentWord.length) {
    textElement.innerHTML = displayedText + `<span class="fade-in">${targetChar}</span>`;
    
    setTimeout(() => {
      const span = textElement.querySelector('span');
      span.classList.add('visible'); 
      currentCharIndex++;
      
      if (currentCharIndex === currentWord.length) {
        setTimeout(() => {
          currentCharIndex = 0;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          setTimeout(changeText, delay);
        }, pauseBetweenWords);
      } else {
        setTimeout(changeText, delay);
      }
    }, delay);
  }
}

changeText();



/* MISE EN DU SUIVIE HEADER MAIN */

document.addEventListener('mousemove', (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const flowers = document.querySelectorAll('.flowerElementMove');

-    flowers.forEach(flower => {
        flower.style.transform = `translate(${deltaX * 0.02}px, ${deltaY * 0.02}px)`;
    });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let mouseX = 0;
  let mouseY = 0;

  const updateMousePosition = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  document.addEventListener('mousemove', updateMousePosition);

  const updateTransformations = () => {

    const section2 = document.querySelector('.mainSection2');
    const elements2 = {
      el1: document.querySelector('.mainSection2 .el1'),
      el2: document.querySelector('.mainSection2 .el2')
    };
    
    const section3 = document.querySelector('.mainSection3');
    const elements3 = {
      el1: document.querySelector('.mainSection3 .el1'),
      el2: document.querySelector('.mainSection3 .el2'),
      el3: document.querySelector('.mainSection3 .el3'),
      el4: document.querySelector('.mainSection3 .el4')
    };

    const updateSectionTransformations = (section, elements, transforms) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const scrollPercentage = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
      
      for (const [elementKey, transform] of Object.entries(transforms)) {
        const [x, y] = transform(scrollPercentage, mouseX, mouseY);
        elements[elementKey].style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    updateSectionTransformations(
      section2,
      elements2,
      {
        el1: (scrollPercentage, mouseX, mouseY) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,  // Mouvement horizontal limité à 15px
          scrollPercentage * 30
        ],
        el2: (scrollPercentage, mouseX, mouseY) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20, // Mouvement horizontal limité à 15px
          -scrollPercentage * 30
        ]
      }
    );

    updateSectionTransformations(
      section3,
      elements3,
      {
        el1: (scrollPercentage, mouseX, mouseY) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 40
        ],
        el2: (scrollPercentage, mouseX, mouseY) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 50
        ],
        el3: (scrollPercentage, mouseX, mouseY) => [
          Math.sin(scrollPercentage * Math.PI) * 15 + (mouseX - window.innerWidth / 2) / 20,
          scrollPercentage * 40
        ],
        el4: (scrollPercentage, mouseX, mouseY) => [
          -Math.sin(scrollPercentage * Math.PI) * 15 - (mouseX - window.innerWidth / 2) / 20,
          -scrollPercentage * 60
        ]
      }
    );
  };

  const animate = () => {
    updateTransformations();
    requestAnimationFrame(animate);
  };
  
  animate();
});


document.addEventListener('DOMContentLoaded', function() {
    const scrollingText = document.getElementById('scrollingText');
    const preFooter = document.querySelector('.preFooter');
    
    function adjustAnimationDuration() {
        const textWidth = scrollingText.scrollWidth;
        const containerWidth = preFooter.offsetWidth;
        const duration = textWidth / 50; // Ajustez la vitesse en modifiant la valeur 50
        scrollingText.style.animationDuration = `${duration}s`;
    }
    
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
})


document.getElementById('myButton').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};

document.getElementById('myButton2').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};


document.getElementById('myButton3').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};

document.getElementById('myButton4').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};

document.getElementById('myButton5').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};

document.getElementById('myButton6').onclick = function() {
  var button = this;
  if (button.classList.contains('expanded')) {
      button.classList.remove('expanded');
  } else {
      var expanded = document.querySelector('.elementHover.expanded');
      if (expanded) expanded.classList.remove('expanded');
      button.classList.add('expanded');
  }
};

window.onload = function() {
  var elementSection = document.querySelector('.mainSection1');
    setTimeout(function() {
      elementSection.classList.remove('loader-wrapper'); 
      document.getElementById('arrowButton').click();
  }, 5000); // 10 000 ms = 10s
};
