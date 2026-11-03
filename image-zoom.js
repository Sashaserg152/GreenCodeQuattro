(() => {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-zoom';
    dialog.setAttribute('aria-label', 'Увеличенное изображение');

    const image = document.createElement('img');
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'image-zoom-close';
    closeButton.setAttribute('aria-label', 'Закрыть изображение');
    closeButton.textContent = '×';
    dialog.append(closeButton, image);
    document.body.append(dialog);

    function openImage(source) {
        if (dialog.open) return;
        image.src = source.currentSrc || source.src;
        image.alt = source.alt || 'Увеличенное изображение';
        dialog.showModal();
    }

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog || event.target === image) dialog.close();
    });
    dialog.addEventListener('close', () => {
        if (!dialog.open) image.removeAttribute('src');
    });

    // Capture the click before links and expandable exercise headers handle it.
    document.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLImageElement) || dialog.contains(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        openImage(event.target);
    }, true);
})();
