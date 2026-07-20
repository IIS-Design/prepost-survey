/* Shared chrome for every Ipsos iSay screen.
   Icons via Font Awesome (CDN). Logos via Ipsos CDN.
   Styling comes from Bootstrap + the Ipsos override layer (see styles.css);
   markup below sticks to stock Bootstrap classes + design-token utilities. */

const LOGO_ISAY  = "https://cdn.ipsosinteractive.com/deploy/PanelOne/resources/logos/ipsos_isay_logo.svg";
const LOGO_IPSOS = "https://cdn.ipsosinteractive.com/deploy/PanelOne/resources/logos/ipsos_logo.svg";

/* Completion seal — the Ipsos "badge-check" SVG (ported from astra).
   Filled via a design token so the same shape serves success/primary. */
function seal(colorVar) {
  return `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path style="fill:var(${colorVar})" d="M18 0C20.5312 0 22.7812 1.47656 23.9062 3.65625C26.2266 2.88281 28.8281 3.44531 30.7266 5.27344C32.5547 7.10156 33.0469 9.77344 32.3438 12.0938C34.5234 13.2188 36 15.4688 36 18C36 20.6016 34.5234 22.8516 32.3438 23.9766C33.1172 26.2969 32.5547 28.8984 30.7266 30.7266C28.8281 32.5547 26.2266 33.1172 23.9062 32.4141C22.7812 34.5938 20.5312 36 18 36C15.3984 36 13.1484 34.5938 12.0234 32.4141C9.70312 33.1172 7.10156 32.5547 5.20312 30.7266C3.375 28.8984 2.88281 26.2969 3.58594 23.9766C1.40625 22.8516 0 20.6016 0 18C0 15.4688 1.40625 13.2188 3.58594 12.0938C2.8125 9.77344 3.375 7.10156 5.20312 5.27344C7.10156 3.44531 9.70312 2.88281 12.0234 3.65625C13.1484 1.47656 15.3984 0 18 0ZM24.75 15.8203C25.4531 15.1875 25.4531 14.1328 24.75 13.4297C24.1172 12.7969 23.0625 12.7969 22.4297 13.4297L15.75 20.1797L12.9375 17.3672C12.3047 16.7344 11.25 16.7344 10.6172 17.3672C9.91406 18.0703 9.91406 19.125 10.6172 19.7578L14.5547 23.6953C15.1875 24.3984 16.2422 24.3984 16.875 23.6953L24.75 15.8203Z"/>
  </svg>`;
}

const ICON = {
  star:       '<i class="fa-solid fa-star text-warning" aria-hidden="true"></i>',
  starHollow: '<i class="fa-solid fa-star text-main" aria-hidden="true"></i>',
  user:       '<i class="fa-solid fa-circle-user" aria-hidden="true"></i>',
  rateStar:   '<i class="fa-solid fa-star" aria-hidden="true"></i>',
  checkGreen: seal('--bg-success-default'),
  checkBlue:  seal('--bg-primary-default'),
};

/* Header. opts: { balance:Boolean, user:Boolean }  */
function header(opts = {}) {
  const { balance = true, user = true } = opts;
  let meta = '';
  if (balance) {
    meta += `<span class="acct-balance">Account Balance</span>
      <span class="balance">${ICON.star} 250</span>`;
  }
  if (user) {
    meta += `<span class="user"><span class="ico">${ICON.user}</span> Sebastian</span>`;
  }
  return `<header class="app-header">
    <div class="container-xl px-0 d-flex justify-content-between align-items-center gap-3">
      <a class="brand" href="../index.html"><img src="${LOGO_ISAY}" alt="Ipsos iSay"></a>
      <div class="header-meta">${meta}</div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="app-footer">
    <div class="container-xl px-0 d-flex align-items-center flex-wrap gap-3 gap-md-4">
      <span class="foot-logo"><img src="${LOGO_IPSOS}" alt="Ipsos"></span>
      <a class="foot-link" href="#">Privacy Policy</a>
      <a class="foot-help" href="#">Help</a>
    </div>
  </footer>`;
}

/* Reusable rating card — accessible radiogroup (keyboard + cumulative hover) */
function rateCard() {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="rate-star" role="radio" aria-checked="false" aria-label="${i} star${i > 1 ? 's' : ''}" tabindex="${i === 1 ? '0' : '-1'}">${ICON.rateStar}<span>${i}</span></span>`;
  }
  return `<div class="panel-default p-4 text-center">
    <h5 class="mb-3" id="rate-title">Please rate the survey you just took</h5>
    <div class="stars-row" role="radiogroup" aria-labelledby="rate-title">${stars}</div>
  </div>`;
}

/* Points progress card — flat gray surface (astra uses .alert-light). */
function pointsCard() {
  return `<div class="alert alert-light p-4 mb-0" role="alert">
    <div class="row g-3 align-items-start">
      <div class="col-12 col-md-8">
        <p class="h6 mb-2">You have ${ICON.star} 300 points</p>
        <div class="progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar w-50"></div>
        </div>
        <p class="small text-muted mt-2 mb-0">Take surveys, rack up points, and unlock your choice of rewards!</p>
      </div>
      <div class="col-12 col-md-4 text-md-end">
        <p class="h6 mb-1">Redeem at:</p>
        <p class="mb-0 fw-bold text-main">${ICON.starHollow} 600 points</p>
      </div>
    </div>
  </div>`;
}

/* Inject the shared chrome around page content. */
function mountScreen(opts = {}) {
  const host = document.getElementById('screen');
  const content = document.getElementById('screen-content').innerHTML;
  host.innerHTML =
    header(opts) +
    `<main class="screen-main"><div class="container-xl">${content}</div></main>` +
    footer();
  // Accessible star rating: click / hover (cumulative) / keyboard (radiogroup).
  document.querySelectorAll('.stars-row').forEach(group => {
    const stars = [...group.querySelectorAll('.rate-star')];
    let selected = -1;
    const paint = n => stars.forEach((s, j) => s.classList.toggle('lit', j <= n));
    const select = i => {
      selected = i;
      stars.forEach((s, j) => {
        s.setAttribute('aria-checked', j === i ? 'true' : 'false');
        s.tabIndex = j === i ? 0 : -1;
      });
      paint(i);
      stars[i].focus();
    };
    stars.forEach((star, i) => {
      star.addEventListener('click', () => select(i));
      star.addEventListener('mouseenter', () => paint(i));       // light 1..i on hover
      star.addEventListener('keydown', e => {
        let ni = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   ni = Math.min(stars.length - 1, i + 1);
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ni = Math.max(0, i - 1);
        else if (e.key === 'Home') ni = 0;
        else if (e.key === 'End')  ni = stars.length - 1;
        else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); select(i); return; }
        else return;
        e.preventDefault();
        select(ni);
      });
    });
    group.addEventListener('mouseleave', () => paint(selected)); // revert hover to selection
  });
}
