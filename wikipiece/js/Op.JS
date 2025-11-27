

// --- INICIALIZAR GRID CON MUURI ---
const grid = new Muuri('.grid', { layout: { rounding: false } });

window.addEventListener('load', () => {
  // refrescar grid
  grid.refreshItems().layout();
  const gridElement = document.getElementById('grid');
  if (gridElement) gridElement.classList.add('Imagenes-Cargadas');

      // ------------------ MOSTRAR SOLO 6 / MOSTRAR MÁS / MOSTRAR MENOS (CON MUURI) ------------------
    // ------------------ MOSTRAR SOLO 6 / MOSTRAR MÁS / MOSTRAR MENOS (CON MUURI) ------------------
  const showMoreBtn = document.getElementById('show-more-btn');
  const showLessBtn = document.getElementById('show-less-btn');
  const visibleCount = 6;

  if (showMoreBtn && showLessBtn) {
    const items = grid.getItems(); // items de Muuri en orden

    // Estado inicial: solo 6 visibles
    items.forEach((item, index) => {
      if (index >= visibleCount) {
        grid.hide(item);
      } else {
        grid.show(item);
      }
    });
    grid.refreshItems().layout();


    // --- Mostrar menos: volver a SOLO 6 ---
    showLessBtn.addEventListener('click', () => {
      items.forEach((item, index) => {
        if (index >= visibleCount) {
          grid.hide(item);
        } else {
          grid.show(item);
        }
      });
      grid.refreshItems().layout();

      showLessBtn.style.display = 'none';
      showMoreBtn.style.display = 'inline-block';
      // Opcional: hacer scroll hacia la grid para que se vea bien el inicio
      // document.getElementById('grid').scrollIntoView({ behavior: 'smooth' });
    });
  }


  if (showMoreBtn && showLessBtn) {
    const items = grid.getItems(); // items de Muuri en orden

    // Estado inicial: solo 6 visibles
    items.forEach((item, index) => {
      if (index >= visibleCount) {
        grid.hide(item);
      } else {
        grid.show(item);
      }
    });
    grid.refreshItems().layout();

    // --- Mostrar más: mostrar TODOS ---
    showMoreBtn.addEventListener('click', () => {
      items.forEach(item => grid.show(item));
      grid.refreshItems().layout();

      showMoreBtn.style.display = 'none';
      showLessBtn.style.display = 'inline-block';
    });

    // --- Mostrar menos: volver a SOLO 6 ---
    showLessBtn.addEventListener('click', () => {
      items.forEach((item, index) => {
        if (index >= visibleCount) {
          grid.hide(item);
        } else {
          grid.show(item);
        }
      });
      grid.refreshItems().layout();

      showLessBtn.style.display = 'none';
      showMoreBtn.style.display = 'inline-block';
      // Opcional: hacer scroll hacia la grid para que se vea bien el inicio
      // document.getElementById('grid').scrollIntoView({ behavior: 'smooth' });
    });
  }


  // ------------------ MENÚ LATERAL (simple) ------------------
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('.contenedor');
  if (menuBtn && sidebar && mainContent) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('shift');
      menuBtn.style.left = sidebar.classList.contains('active') ? '250px' : '15px';
    });
  }

  // ------------------ FILTRO POR CATEGORÍA ------------------
  const enlaces = document.querySelectorAll('#categorias a');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();
      enlaces.forEach(a => a.classList.remove('activo'));
      e.currentTarget.classList.add('activo');
      const categoria = e.currentTarget.textContent.toLowerCase().trim();
      if (!categoria) grid.filter(() => true); else grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

  // ------------------ BÚSQUEDA POR ETIQUETAS ------------------
  const searchWrapper = document.getElementById('barra-busqueda');
  const searchInput = searchWrapper ? searchWrapper.querySelector('input') : null;
  if (searchInput) {
    searchInput.addEventListener('input', (ev) => {
      const q = ev.target.value.toLowerCase().trim();
      grid.filter(item => item.getElement().dataset.etiquetas.toLowerCase().includes(q));
    });
  }

  // ------------------ OVERLAY (imagen + descripción + descarga opcional) ------------------
  const overlay = document.getElementById('overlay');
  const overlayImg = overlay ? overlay.querySelector('img') : null;
  const overlayDesc = overlay ? overlay.querySelector('.description') : null;
  const btnCerrar = document.getElementById('btn-cerrar-popup');
  const btnDescargar = document.getElementById('btn-descargar'); // opcional

  if (overlay && overlayImg && overlayDesc) {
    document.querySelectorAll('.grid .item img').forEach(img => {
      img.addEventListener('click', () => {
        const item = img.closest('.item');
        const src = img.src;
        const desc = item ? item.dataset.description : '';
        const alt = img.alt || 'personaje-one-piece';

        overlay.classList.add('activo');
        overlayImg.src = src;
        overlayImg.alt = alt;
        overlayDesc.textContent = desc;

        if (btnDescargar) {
          btnDescargar.href = src;
          btnDescargar.download = alt.trim().toLowerCase().replace(/\s+/g,'_') + '.png';
        }
      });
    });

    if (btnCerrar) btnCerrar.addEventListener('click', () => overlay.classList.remove('activo'));
    overlay.addEventListener('click', e => { if (e.target.id === 'overlay') overlay.classList.remove('activo'); });
  }

  // ------------------ SCROLL LATERAL CATEGORÍAS (si existen botones) ------------------
  const catContainer = document.getElementById('categorias');
  const btnPrev = document.getElementById('catPrev');
  const btnNext = document.getElementById('catNext');
  const scrollAmount = 150;
  if (catContainer && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => catContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    btnNext.addEventListener('click', () => catContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }
});

// --- Acordeón de arcos ---
(function() {
  const arcoItems = document.querySelectorAll('.arco-item');

  if (!arcoItems.length) return;

  arcoItems.forEach(item => {
    const headerBtn = item.querySelector('.arco-header');
    const body = item.querySelector('.arco-body');

    if (!headerBtn || !body) return;

    headerBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Cerrar todos los demás (para que solo haya uno abierto)
      arcoItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBody = other.querySelector('.arco-body');
          if (otherBody) {
            otherBody.style.maxHeight = '0px';
          }
        }
      });

      // Toggle del actual
      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = '0px';
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
})();



