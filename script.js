
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Blog category filters
const filters = document.querySelectorAll('.filter');
const posts = document.querySelectorAll('.post-card');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');

let activeFilter = 'all';

function updatePosts() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  posts.forEach(post => {
    const categoryMatch =
      activeFilter === 'all' ||
      post.dataset.category === activeFilter;

    const searchMatch =
      post.dataset.title.toLowerCase().includes(term) ||
      post.textContent.toLowerCase().includes(term);

    const show = categoryMatch && searchMatch;

    post.hidden = !show;

    if (show) visible++;
  });

  emptyState.hidden = visible !== 0;
}

// Filter buttons
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));

    button.classList.add('active');
    activeFilter = button.dataset.filter;

    updatePosts();
  });
});

// Search articles
searchInput.addEventListener('input', updatePosts);

// Current year
document.getElementById('year').textContent =
  new Date().getFullYear();
