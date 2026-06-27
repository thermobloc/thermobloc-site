const sections = {
  concept: {
    title: "Notre concept",
    text: "Thermobloc propose une approche innovante pour faciliter les projets de construction en milieu urbain dense. Notre solution vise à réduire les contraintes liées à l’utilisation d’équipements lourds, tout en offrant une mise en œuvre efficace et adaptée aux réalités du terrain.",
    cards: [
      {
        title: "Milieux urbains",
        text: "Une approche pensée pour les endroits où l’espace, l’accès et la circulation compliquent les travaux."
      },
      {
        title: "Moins de contraintes",
        text: "Réduire la dépendance à certains équipements lourds et limiter les impacts sur l’environnement immédiat."
      },
      {
        title: "Solution modulaire",
        text: "Un concept basé sur des éléments adaptés à une mise en œuvre plus souple et progressive."
      }
    ]
  },

  solutions: {
    title: "Nos solutions",
    text: "Nos solutions sont pensées pour les projets où l’espace, l’accès et la logistique représentent un défi. Grâce à une approche modulaire et à des éléments de béton adaptés, Thermobloc vise à simplifier la construction dans les environnements exigeants.",
    cards: [
      {
        title: "Blocs adaptés",
        text: "Des éléments conçus pour faciliter la manipulation et l’installation dans des conditions réelles de chantier."
      },
      {
        title: "Pose mécanisée",
        text: "Une méthode visant à rendre la mise en place plus efficace sans dépendre systématiquement d’une grue."
      },
      {
        title: "Projets ciblés",
        text: "Une solution pertinente pour les secteurs denses, les accès restreints et les projets nécessitant une logistique simplifiée."
      }
    ]
  },

  partenariat: {
  title: "Partenariat",
  text: "Thermobloc souhaite s’entourer de partenaires capables de contribuer au développement et au déploiement d’une nouvelle approche de construction. Le projet s’adresse notamment aux entreprises qui possèdent une expertise en production, en préfabrication ou en construction, et qui souhaitent participer à la croissance d’une solution adaptée aux réalités des chantiers d’aujourd’hui.",
  cards: [
    {
      title: "Produire",
      text: "Développer un réseau de producteurs capables de fabriquer les éléments Thermobloc selon une approche structurée, fiable et adaptée aux besoins du marché."
    },
    {
      title: "Déployer",
      text: "Collaborer avec des partenaires qui comprennent les réalités du terrain et qui peuvent contribuer à rendre la solution accessible sur différents types de projets."
    },
    {
      title: "Innover",
      text: "Participer à une approche qui vise à simplifier la construction, réduire certaines contraintes de chantier et ouvrir de nouvelles possibilités."
    }
  ]
},

  equipe: {
    title: "Équipe",
    text: "Thermobloc s’appuie sur une équipe orientée vers l’innovation, la précision et la réalisation concrète de projets. Notre objectif est de réunir des gens compétents autour d’une vision simple : construire autrement.",
    cards: [
      {
        title: "Expérience terrain",
        text: "Une vision développée à partir de besoins réels observés dans le domaine de la construction."
      },
      {
        title: "Innovation pratique",
        text: "L’objectif n’est pas seulement d’innover, mais de proposer une solution utilisable et concrète."
      },
      {
        title: "Vision commune",
        text: "Réunir des personnes sérieuses autour d’un projet structuré, utile et durable."
      }
    ]
  },

  contact: {
    title: "Nous joindre",
    text: "Vous souhaitez discuter d’un projet, d’une collaboration ou d’un partenariat ? Communiquez avec nous. Nous vous répondrons rapidement.",
    cards: [
      {
        title: "Projet",
        text: "Présentez-nous brièvement le type de projet ou de besoin que vous souhaitez discuter."
      },
      {
        title: "Partenariat",
        text: "Vous êtes entrepreneur ou collaborateur potentiel ? Nous voulons vous connaître."
      },
      {
        title: "Information",
        text: "Pour toute question générale, nous vous invitons à communiquer avec notre équipe."
      }
    ]
  }
};

const content = document.getElementById("content");
const buttons = document.querySelectorAll(".menu button");

let hoverTimer = null;
let hoveredButton = null;

const hoverIndicator = document.createElement("div");
hoverIndicator.className = "hover-indicator";
hoverIndicator.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;
document.body.appendChild(hoverIndicator);

function moveHoverIndicator(event) {
  hoverIndicator.style.left = `${event.clientX + 12}px`;
  hoverIndicator.style.top = `${event.clientY + 12}px`;
}

function hideHoverIndicator() {
  hoverIndicator.classList.remove("active", "completed");
  hoverIndicator.style.left = "-9999px";
  hoverIndicator.style.top = "-9999px";
}

function cancelHoverChange() {
  clearTimeout(hoverTimer);
  hoverTimer = null;
  hoveredButton = null;
  hideHoverIndicator();
}

function startHoverChange(button, event) {
  cancelHoverChange();

  hoveredButton = button;

  moveHoverIndicator(event);

  // Force le redémarrage complet de l'animation
  hoverIndicator.classList.remove("active", "completed");
  void hoverIndicator.offsetWidth;
  hoverIndicator.classList.add("active");

  hoverTimer = setTimeout(() => {
    if (hoveredButton === button) {
      showSection(button.dataset.section);

      // À 3 secondes : les points deviennent verts
      hoverIndicator.classList.add("completed");

      // Après 0,5 seconde : les points disparaissent
      setTimeout(() => {
        cancelHoverChange();
      }, 500);
    }
  }, 3000);
}

function showSection(section) {
  content.classList.remove("fade-in");

  setTimeout(() => {
    const cardsHtml = sections[section].cards.map(card => `
      <div class="info-card">
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>
    `).join("");

    content.innerHTML = `
      <h2>${sections[section].title}</h2>
      <p class="intro-text">${sections[section].text}</p>
      <div class="cards">
        ${cardsHtml}
      </div>
    `;

    content.classList.add("fade-in");
  }, 150);

  buttons.forEach(button => {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(`[data-section="${section}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

buttons.forEach(button => {
  button.addEventListener("mouseenter", (event) => {
    startHoverChange(button, event);
  });

  button.addEventListener("mousemove", (event) => {
    if (hoveredButton === button) {
      moveHoverIndicator(event);
    }
  });

  button.addEventListener("mouseleave", () => {
    cancelHoverChange();
  });

  button.addEventListener("click", () => {
    cancelHoverChange();
    showSection(button.dataset.section);
  });
});

showSection("concept");