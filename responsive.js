(() => {
    document.querySelectorAll('main table').forEach((table) => {
        const rows = Array.from(table.rows);
        const headers = rows[0] ? Array.from(rows[0].cells) : [];
        const isComparison = rows.length === 2 && headers.length > 1 &&
            rows[1].cells.length === headers.length &&
            headers.every((cell) => cell.textContent.trim() && !cell.querySelector('img, code')) &&
            rows.every((row) => Array.from(row.cells).every((cell) => cell.colSpan === 1 && cell.rowSpan === 1));

        // Keep headings next to their content when comparison columns stack on phones.
        if (isComparison) {
            table.classList.add('comparison-table');
            rows[0].classList.add('comparison-head');
            Array.from(rows[1].cells).forEach((cell, index) => {
                cell.dataset.label = headers[index].textContent.replace(/\s+/g, ' ').trim();
            });
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'table-scroll';
        wrapper.tabIndex = 0;
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', isComparison ? 'Пример с пояснениями' : 'Таблица с горизонтальной прокруткой');
        if (!isComparison) wrapper.classList.add('table-scroll-data');

        // Preserve floated comparison tables on desktop; mobile styles reset the float.
        if (table.style.cssFloat) {
            wrapper.style.cssFloat = table.style.cssFloat;
            wrapper.style.width = table.style.width;
            wrapper.style.margin = table.style.margin;
            table.style.cssFloat = 'none';
            table.style.width = '100%';
            table.style.margin = '0';
        }

        table.before(wrapper);
        wrapper.append(table);
    });
})();
