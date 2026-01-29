const track = document.getElementById("card-container");

const handleOnDown = e => {
  if (!track.contains(e.target)) return;
  track.dataset.mouseDownAt = e.clientX
  track.style.cursor = 'grabbing';
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
  track.style.cursor = 'grab';
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -50);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



const toggleButton = document.querySelector(".hamburger-button");
const menu = document.querySelector(".menu");
const links = menu.querySelectorAll("a");

function openMenu() {
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  toggleButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  toggleButton.setAttribute("aria-expanded", "false");
}

// Kliknięcie hamburgera
toggleButton.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Kliknięcie linka w menu - zamyka menu
links.forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Opcjonalnie: jeśli chcesz, żeby tab focusował tylko hamburgera i linki menu,
// nie trzeba nic dodatkowego, bo display: none automatycznie wyklucza elementy z tab-order.
