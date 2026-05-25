// Vault Sidebar Management System
(function() {
  const SIDEBAR_HTML = `
    <div class="vault-sidebar-header">
      <a href="/" title="Home">
        <img src="/logo.png" alt="Hunter Beezley Logo">
      </a>
      <div class="vault-sidebar-header-text">Hunter</div>
    </div>

    <nav>
      <ul class="vault-nav">
      <li class="vault-nav-item">
        <a href="/" class="vault-nav-link" data-path="/">
          Home
        </a>
      </li>
      <li class="vault-nav-item">
        <div class="vault-nav-section-header" data-section="visuals">
          <span>Visuals</span>
          <span class="vault-nav-section-toggle">▶</span>
        </div>
        <div class="vault-nav-section-content">
          <a href="/visuals/" class="vault-nav-link" data-path="/visuals">
            Overview
          </a>
          <a href="/visuals/atobin/" class="vault-nav-link" data-path="/visuals/atobin">
            aTOBIN
          </a>
          <a href="/visuals/liquidchrome/" class="vault-nav-link" data-path="/visuals/liquidchrome">
            Liquid Chrome
          </a>
          <a href="/visuals/sharpedges/" class="vault-nav-link" data-path="/visuals/sharpedges">
            Sharp Edges
          </a>
          <a href="/visuals/hydra/" class="vault-nav-link" data-path="/visuals/hydra">
            Hydra
          </a>
        </div>
      </li>
      <li class="vault-nav-item">
        <div class="vault-nav-section-header" data-section="scripts">
          <span>Scripts & Solutions</span>
          <span class="vault-nav-section-toggle">▶</span>
        </div>
        <div class="vault-nav-section-content">
          <a href="/scripts/" class="vault-nav-link" data-path="/scripts">
            Overview
          </a>
          <a href="/scripts/bulk-email/" class="vault-nav-link" data-path="/scripts/bulk-email">
            Bulk Email Update
          </a>
          <a href="/scripts/scim-delete/" class="vault-nav-link" data-path="/scripts/scim-delete">
            SCIM Delete Tool
          </a>
          <a href="/scripts/ooo-bot/" class="vault-nav-link" data-path="/scripts/ooo-bot">
            OOO Bot
          </a>
        </div>
      </li>
      <li class="vault-nav-item">
        <a href="/resume.html" class="vault-nav-link" data-path="/resume">
          Resume
        </a>
      </li>
      <li class="vault-nav-item">
        <a href="/contact.html" class="vault-nav-link" data-path="/contact">
          Contact
        </a>
      </li>
      </ul>
    </nav>
  `;

  function initSidebar() {
    const sidebarContainer = document.getElementById('vault-sidebar');
    if (!sidebarContainer) return;

    // Inject sidebar HTML
    sidebarContainer.innerHTML = SIDEBAR_HTML;

    // Set up section toggles
    document.querySelectorAll('.vault-nav-section-header').forEach(header => {
      header.addEventListener('click', function() {
        const section = this.dataset.section;
        const content = this.nextElementSibling;
        const toggle = this.querySelector('.vault-nav-section-toggle');

        if (content.classList.contains('collapsed')) {
          content.classList.remove('collapsed');
          toggle.classList.add('expanded');
          localStorage.setItem(`vault-section-${section}`, 'open');
        } else {
          content.classList.add('collapsed');
          toggle.classList.remove('expanded');
          localStorage.setItem(`vault-section-${section}`, 'closed');
        }
      });

      // Restore section state from localStorage
      const section = header.dataset.section;
      const savedState = localStorage.getItem(`vault-section-${section}`);
      const content = header.nextElementSibling;
      const toggle = header.querySelector('.vault-nav-section-toggle');

      if (savedState === 'closed') {
        content.classList.add('collapsed');
        toggle.classList.remove('expanded');
      } else {
        content.classList.remove('collapsed');
        toggle.classList.add('expanded');
      }
    });

    // Set active link
    setActiveLink();

    // Handle mobile sidebar toggle
    const mobileToggle = document.querySelector('.vault-mobile-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        sidebarContainer.classList.toggle('open');
      });

      // Close sidebar when clicking a link
      document.querySelectorAll('.vault-nav-link').forEach(link => {
        link.addEventListener('click', function() {
          sidebarContainer.classList.remove('open');
        });
      });

      // Close sidebar when clicking outside
      document.addEventListener('click', function(e) {
        if (!sidebarContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
          sidebarContainer.classList.remove('open');
        }
      });
    }
  }

  function setActiveLink() {
    const currentPath = window.location.pathname
      .toLowerCase()
      .replace(/\/$/, '') // Remove trailing slash
      .replace(/\.html$/, ''); // Remove .html extension

    document.querySelectorAll('.vault-nav-link').forEach(link => {
      const linkPath = link.dataset.path
        .toLowerCase()
        .replace(/\/$/, '')
        .replace(/\.html$/, '');

      if (currentPath === linkPath || (currentPath === '' && linkPath === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }

  // Update active link on navigation
  window.addEventListener('popstate', setActiveLink);
})();
