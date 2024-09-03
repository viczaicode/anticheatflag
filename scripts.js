let currentPage = 1;
const rowsPerPage = 15;
let allData = []; // Az összes adat tárolása

function createTable(data, page) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; 

    const table = document.createElement('table');

    // fejléc
    const header = `
        <thead>
            <tr id="pls">
                <th>Name 📧</th>
                <th>Flag name 🎯</th>
                <th>Date 🗓️</th>
                <th>Info 📊</th>
            </tr>
        </thead>
    `;
    table.innerHTML = header;

    // Sorok hozzáadása az aktuális oldalhoz
    const tbody = document.createElement('tbody');
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);
    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td id="nigger">${item.name}</td>
            <td id="nigger">${item.flagName}</td>
            <td id="nigger">${item.date}</td>
            <td id="nigger">${item.additionalInfo}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    createPagination(data.length);
}

function createPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(totalItems / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('page-button');
        pageButton.addEventListener('click', () => {
            currentPage = i;
            createTable(allData, currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }
}

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allData = data; // Tároljuk az összes adatot
            createTable(data, currentPage); // Az első oldalt jelenítjük meg
            setupSearch(data); // Keresőmező beállítása
        })
        .catch(error => console.error('Hiba a JSON fájl beolvasása közben:', error));
}

function setupSearch(data) {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(query)
        );
        allData = filteredData; // Frissítjük az összes adatot a szűrt adatokkal
        currentPage = 1; // Az első oldalra állítjuk
        createTable(filteredData, currentPage); // Frissítjük a táblázatot
    });
}

export { loadData };