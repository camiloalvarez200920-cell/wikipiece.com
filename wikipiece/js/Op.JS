const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('Imagenes-Cargadas');

	// --- FILTRO POR CATEGORÍA ---
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase();
			grid.filter(`[data-categoria="${categoria}"]`);
		});
	});

	// --- BÚSQUEDA POR ETIQUETAS ---
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value.toLowerCase().trim();
		grid.filter((item) => {
			const etiquetas = item.getElement().dataset.etiquetas.toLowerCase();
			return etiquetas.includes(busqueda);
		});
	});

	// --- OVERLAY + DESCARGA DE IMAGEN ---
	const overlay = document.getElementById('overlay');
	const overlayImg = document.querySelector('#overlay img'); // asegúrate que tenga id="overlay-img" si quieres
	const overlayDescription = document.querySelector('#overlay .description');
	const btnCerrar = document.querySelector('#btn-cerrar-popup');
	const btnDescargar = document.getElementById('btn-descargar'); // <a id="btn-descargar">

	// Listener para imágenes de la grid
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const description = elemento.parentNode.parentNode.dataset.description;
			const alt = elemento.getAttribute('alt') || 'personaje-one-piece';

			// Mostrar overlay con imagen y descripción
			overlay.classList.add('activo');
			overlayImg.src = ruta;
			overlayImg.alt = alt;
			overlayDescription.innerHTML = description;

			// Configurar botón de descarga
			btnDescargar.href = ruta;

			// nombre de archivo basado en el alt
			const nombreBase = alt.trim() !== '' ? alt : 'personaje-one-piece';
			const nombreLimpio = nombreBase.toLowerCase().replace(/\s+/g, '_');
			btnDescargar.download = nombreLimpio + '.png';
		});
	});

	// Botón cerrar
	btnCerrar.addEventListener('click', () => {
		overlay.classList.remove('activo');
	});

	// Cerrar haciendo clic fuera del contenido
	overlay.addEventListener('click', (evento) => {
		if (evento.target.id === 'overlay') {
			overlay.classList.remove('activo');
		}
	});
});

// --- SCROLL LATERAL DE CATEGORÍAS ---
const catContainer = document.getElementById('categorias');
const btnPrev = document.getElementById('catPrev');
const btnNext = document.getElementById('catNext');

const scrollAmount = 150; // píxeles por clic

btnPrev.addEventListener('click', () => {
	catContainer.scrollBy({
		left: -scrollAmount,
		behavior: 'smooth'
	});
});

btnNext.addEventListener('click', () => {
	catContainer.scrollBy({
		left: scrollAmount,
		behavior: 'smooth'
	});
});
