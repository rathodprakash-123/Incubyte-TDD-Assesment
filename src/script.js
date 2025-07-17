const shop = new SweetShop();

function addSweet() {
  try {
    const sweet = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      category: document.getElementById("category").value,
      price: parseFloat(document.getElementById("price").value),
      quantity: parseInt(document.getElementById("quantity").value)
    };
    shop.addSweet(sweet);
    renderSweets();
    document.querySelectorAll("input").forEach(i => i.value = "");
  } catch (e) {
    alert(e.message);
  }
}

function renderSweets() {
  const nameFilter = document.getElementById("searchName").value.trim().toLowerCase();
  const catFilter = document.getElementById("searchCategory").value.trim().toLowerCase();
  const sortField = document.getElementById("sortField").value;
  const sortOrder = document.getElementById("sortOrder").value;

  let sweets = shop.getAllSweets();

  if (nameFilter) {
    sweets = sweets.filter(s => s.name.toLowerCase().includes(nameFilter));
  }
  if (catFilter) {
    sweets = sweets.filter(s => s.category.toLowerCase().includes(catFilter));
  }
  if (sortField) sweets = shop.sortBy(sortField, sortOrder);
 
  const table = document.getElementById("sweetTableBody");
  table.innerHTML = "";

  sweets.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="cell">${s.id}</td>
      <td class="cell">${s.name}</td>
      <td class="cell">${s.category}</td>
      <td class="cell">${s.price}</td>
      <td class="cell">${s.quantity}</td>
      <td class="cell action-buttons">
        <button class="btn delete-btn" onclick="deleteSweet('${s.id}')">Delete</button>
        <button class="btn restock-btn" onclick="restock('${s.id}')">Restock</button>
        <button class="btn purchase-btn" onclick="purchase('${s.id}')">Purchase</button>
      </td>`;
    table.appendChild(row);
  });
}


function deleteSweet(id) {
  try {
    shop.deleteSweet(id);
    renderSweets();
  } catch (e) {
    alert(e.message);
  }
}

function restock(id) {
  const qty = prompt("Enter quantity to restock:");
  if (qty) {
    try {
      shop.restockSweet(id, parseInt(qty));
      renderSweets();
    } catch (e) {
      alert(e.message);
    }
  }
}

function purchase(id) {
  const qty = prompt("Enter quantity to purchase:");
  if (qty) {
    try {
      shop.purchaseSweet(id, parseInt(qty));
      renderSweets();
    } catch (e) {
      alert(e.message);
    }
  }
}

// Initial render
renderSweets();