const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('Imagenes-Cargadas');

	// Agregamos los listener de los enlaces para filtrar por categoria.
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

    // Agregamos los listener de la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});

    //listener para imagenes

    const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const description = elemento.parentNode.parentNode.dataset.description;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .description').innerHTML = description;
		});
    });

    // Eventlistener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
    })

	// EventLIstener del overla
	overlay.addEventListener('click', (evento) => {	
		evento.target.id === 'overlay' ? overlay.classList.remove('activo'): '';
	})
 });


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

