const list = document.querySelector(".bar-list");

function createCard(bar) {
  // one avatar per friend: first letter of the name, cycling through 4 colours
  const avatars = bar.friends
    .map((name, i) => `<span class="avatar avatar--${(i % 4) + 1} text-avatar">${name[0]}</span>`)
    .join("");

  const chips = bar.tags
    .map((tag) => `<li class="chip text-chip">${tag.label} · ${tag.count}</li>`)
    .join("");

  return `
    <li>
      <article class="bar-card">
        <img class="bar-card-photo" src="${bar.photo}" alt="${bar.name}">
        <div class="bar-card-body">
          <div class="bar-card-title">
            <h2 class="text-card-title">${bar.name}</h2>
            <p class="text-body">${bar.subtitle}</p>
          </div>

          <div class="friends-box">
            <div class="avatar-stack" aria-hidden="true">${avatars}</div>
            <div>
              <p class="text-body-strong">Recommended by ${bar.friends.length} friends</p>
              <p class="text-small">${bar.friends.join(" and ")}</p>
            </div>
          </div>

          <ul class="chip-list">${chips}</ul>

          <blockquote class="text-body-quote">“${bar.quote}”</blockquote>
        </div>
      </article>
    </li>
  `;
}

async function loadBars() {
  const response = await fetch("data/bars.json");
  const bars = await response.json();
  list.innerHTML = bars.map(createCard).join("");
}

loadBars();