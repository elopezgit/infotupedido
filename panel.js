/* ==========================================================================
   TUPEDIDO! CRM & KANBAN DASHBOARD DEMO - LOGIC & INTERACTIVITY
   ========================================================================== */

// 1. MOCK DATASETS
let mockOrders = [
  { id: '#ORD-845', client: 'Martín Rodríguez', vip: true, vipTag: '⭐ VIP (8vo pedido)', phone: '5493815001122', items: '2x Combo Burger Doble + Papas Cheddar + 2x Coca-Cola 1.5L', total: '$22.500', status: 'pending', time: 'Hace 3 min' },
  { id: '#ORD-844', client: 'Camila Ríos', vip: false, vipTag: '🟢 Nuevo Cliente', phone: '5493814112233', items: '1x Box Sushiparty 45 Piezas + Salsa de Soja Extra', total: '$34.000', status: 'pending', time: 'Hace 8 min' },
  { id: '#ORD-843', client: 'Gonzalo Fernández', vip: true, vipTag: '⭐ Habitual (5to pedido)', phone: '5493816445566', items: '3x Pizza Napolitana + 1x Fugazzeta Rellena + 6 Cervezas', total: '$41.000', status: 'prep', time: 'Hace 16 min' },
  { id: '#ORD-842', client: 'Sofía Gómez', vip: false, vipTag: '🟡 2do pedido', phone: '5493815998877', items: '2x Lomo Completo Especial con Huevo + Papas Noisette', total: '$19.800', status: 'prep', time: 'Hace 22 min' },
  { id: '#ORD-841', client: 'Lucas Domínguez', vip: true, vipTag: '⭐ VIP (12vo pedido)', phone: '5493814887766', items: '1x Parrillada Completa para 2 + Ensalada Mixta + Vino Malbec', total: '$38.500', status: 'dispatch', time: 'Hace 35 min' },
  { id: '#ORD-840', client: 'Valentina Peralta', vip: false, vipTag: '🟢 Nuevo Cliente', phone: '5493816223344', items: '1x Torta Chocolate Intenso 1 Kg + 12x Empanadas Carne', total: '$26.000', status: 'dispatch', time: 'Hace 42 min' },
  { id: '#ORD-839', client: 'Nicolás Herrera', vip: true, vipTag: '⭐ Habitual (4to pedido)', phone: '5493815332211', items: '4x Hamburguesa Triple Cheddar y Bacon + 4x Cerveza IPA', total: '$36.000', status: 'done', time: 'Hace 1 hora' },
  { id: '#ORD-838', client: 'Marina Sosa', vip: false, vipTag: '🟡 2do pedido', phone: '5493814556677', items: '2x Wok Pollo Teriyaki + 1x Arroz Chow Fan', total: '$21.200', status: 'done', time: 'Hace 1 hora 20 min' },
  { id: '#ORD-837', client: 'Sebastián Morales', vip: true, vipTag: '⭐ VIP (15vo pedido)', phone: '5493816110099', items: '1x Tabla Quesos y Fiambres Premium + 2x Pan de Masa Madre', total: '$29.500', status: 'done', time: 'Hace 2 horas' }
];

let mockClients = [
  { name: 'Martín Rodríguez', phone: '+54 9 381 500-1122', ordersCount: 8, totalSpent: '$184.500', tag: 'VIP ⭐', tagClass: 'tag-vip', lastOrder: 'Hoy, 20:45 hs' },
  { name: 'Gonzalo Fernández', phone: '+54 9 381 644-5566', ordersCount: 5, totalSpent: '$142.000', tag: 'Habitual', tagClass: 'tag-regular', lastOrder: 'Hoy, 20:30 hs' },
  { name: 'Lucas Domínguez', phone: '+54 9 381 488-7766', ordersCount: 12, totalSpent: '$310.000', tag: 'VIP ⭐', tagClass: 'tag-vip', lastOrder: 'Hoy, 20:10 hs' },
  { name: 'Sebastián Morales', phone: '+54 9 381 611-0099', ordersCount: 15, totalSpent: '$420.000', tag: 'VIP ⭐', tagClass: 'tag-vip', lastOrder: 'Hoy, 18:40 hs' },
  { name: 'Sofía Gómez', phone: '+54 9 381 599-8877', ordersCount: 2, totalSpent: '$38.300', tag: 'Habitual', tagClass: 'tag-regular', lastOrder: 'Hoy, 20:22 hs' },
  { name: 'Camila Ríos', phone: '+54 9 381 411-2233', ordersCount: 1, totalSpent: '$34.000', tag: 'Nuevo 🟢', tagClass: 'tag-new', lastOrder: 'Hoy, 20:38 hs' },
  { name: 'Valentina Peralta', phone: '+54 9 381 622-3344', ordersCount: 1, totalSpent: '$26.000', tag: 'Nuevo 🟢', tagClass: 'tag-new', lastOrder: 'Hoy, 20:04 hs' },
  { name: 'Nicolás Herrera', phone: '+54 9 381 533-2211', ordersCount: 4, totalSpent: '$115.000', tag: 'Habitual', tagClass: 'tag-regular', lastOrder: 'Hoy, 19:45 hs' },
  { name: 'Marina Sosa', phone: '+54 9 381 455-6677', ordersCount: 2, totalSpent: '$42.400', tag: 'Habitual', tagClass: 'tag-regular', lastOrder: 'Hoy, 19:20 hs' },
  { name: 'Florencia Castro', phone: '+54 9 381 499-1122', ordersCount: 7, totalSpent: '$168.000', tag: 'VIP ⭐', tagClass: 'tag-vip', lastOrder: 'Ayer' }
];

let mockProducts = [
  { id: 1, name: 'Combo Burger Doble Cheddar', desc: 'Doble medallón de carne 180g, cheddar fundido, panceta crujiente, salsa casera y papas fritas.', price: '$11.250', category: 'Hamburguesas', active: true },
  { id: 2, name: 'Pizza Napolitana Gourmet', desc: 'Masa madre horneada a la piedra, salsa de tomates italianos, mozzarella fior di latte, tomate y ajo.', price: '$14.000', category: 'Pizzas', active: true },
  { id: 3, name: 'Box Sushiparty 45 Piezas', desc: '15 rolls salmón palta, 15 nigiris langostino y 15 makis queso Philadelphia crocantes con salsa teryaki.', price: '$34.000', category: 'Sushi', active: true },
  { id: 4, name: 'Lomo Completo Especial', desc: 'Bife de lomo tierno, jamón cocido, queso, huevo a la plancha, lechuga, tomate y mayonesa casera.', price: '$9.900', category: 'Sándwiches', active: true },
  { id: 5, name: 'Parrillada Premium para 2', desc: 'Asado de tira, vacío, chorizo artesanal, morcilla, riñón y chinchulín crujiente + papas a la provenzal.', price: '$26.500', category: 'Carnes', active: true },
  { id: 6, name: 'Cerveza Artesanal IPA 1 Litro', desc: 'Growler de cerveza IPA con intenso aroma cítrico y amargor refrescante equilibrado.', price: '$6.500', category: 'Bebidas', active: true },
  { id: 7, name: 'Wok Pollo Teriyaki con Arroz', desc: 'Tiras de pechuga salteadas al wok con vegetales frescos, salsa teriyaki, sésamo tostado y arroz.', price: '$10.600', category: 'Wok / Asiática', active: true },
  { id: 8, name: 'Torta Chocolate Intenso 1 Kg', desc: 'Bizcochuelo húmedo de cacao con ganache de chocolate semiamargo y dulce de leche casero.', price: '$18.000', category: 'Postres', active: false }
];

// 2. DOM INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Live Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Render Core Views
  renderKanban();
  renderCRM(mockClients);
  renderCatalog();
  initCharts();

  // Setup Navigation Tabs
  setupTabs();

  // Setup Live Search and Filters
  setupInteractions();

  // Setup Live Simulated Notifications
  setTimeout(() => {
    showToast('🔔 Nuevo pedido recibido en vivo: #ORD-846 vía WhatsApp!');
  }, 6000);
});

// Update Clock Topbar
function updateClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  clockEl.innerHTML = `<i data-lucide="clock"></i> En vivo: ${timeStr} hs`;
  if (window.lucide) lucide.createIcons();
}

// 3. TAB NAVIGATION
function setupTabs() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

// 4. KANBAN RENDER & DRAG AND DROP
let draggedCardId = null;

function renderKanban() {
  const statuses = ['pending', 'prep', 'dispatch', 'done'];
  
  statuses.forEach(status => {
    const colContainer = document.getElementById(`kanban-${status}`);
    const countBadge = document.getElementById(`count-${status}`);
    if (!colContainer) return;

    const filtered = mockOrders.filter(o => o.status === status);
    if (countBadge) countBadge.innerText = filtered.length;

    colContainer.innerHTML = filtered.map(order => `
      <div class="kanban-card" draggable="true" data-id="${order.id}">
        <div class="kc-top">
          <span class="kc-id">${order.id}</span>
          <span class="kc-time">${order.time}</span>
        </div>
        <div class="kc-client">
          ${order.client}
          ${order.vip ? `<span class="vip-pill">${order.vipTag}</span>` : ''}
        </div>
        <div class="kc-items">${order.items}</div>
        <div class="kc-footer">
          <span class="kc-total">${order.total}</span>
          <div class="kc-actions">
            <button class="btn-kc-action" onclick="openOrderModal('${order.id}')" title="Ver Detalle / Comanda">
              <i data-lucide="printer"></i>
            </button>
            <button class="btn-kc-action" onclick="advanceOrderStatus('${order.id}')" title="Pasar al siguiente estado">
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  });

  if (window.lucide) lucide.createIcons();
  setupDragAndDrop();
}

function setupDragAndDrop() {
  const cards = document.querySelectorAll('.kanban-card');
  const columns = document.querySelectorAll('.kanban-cards-container');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCardId = card.getAttribute('data-id');
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', draggedCardId);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
      column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();
      column.classList.remove('drag-over');
      const targetStatus = column.getAttribute('data-status');
      if (draggedCardId && targetStatus) {
        updateOrderStatus(draggedCardId, targetStatus);
      }
    });
  });
}

function updateOrderStatus(orderId, newStatus) {
  const order = mockOrders.find(o => o.id === orderId);
  if (order && order.status !== newStatus) {
    order.status = newStatus;
    renderKanban();
    const statusNames = { pending: '⌛ Pendiente', prep: '🍳 En Preparación', dispatch: '🚀 Despachado', done: '✅ Entregado' };
    showToast(`✅ Pedido ${orderId} movido a: ${statusNames[newStatus]}`);
  }
}

function advanceOrderStatus(orderId) {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) return;
  const flow = { pending: 'prep', prep: 'dispatch', dispatch: 'done', done: 'pending' };
  updateOrderStatus(orderId, flow[order.status]);
}

// 5. CRM CLIENTS RENDER & FILTERS
function renderCRM(clientList) {
  const tbody = document.getElementById('crmTableBody');
  if (!tbody) return;

  tbody.innerHTML = clientList.map(client => `
    <tr>
      <td>
        <div class="client-name-cell">
          <div class="client-avatar">${client.name.charAt(0)}</div>
          <div>
            <strong style="color:#fff; display:block;">${client.name}</strong>
            <span style="color:var(--text-muted); font-size:0.8rem;">${client.lastOrder}</span>
          </div>
        </div>
      </td>
      <td><span style="color:var(--brand-cyan); font-weight:700;">${client.phone}</span></td>
      <td><strong>${client.ordersCount} pedidos</strong></td>
      <td><span style="color:#10b981; font-family:var(--font-display); font-weight:800; font-size:1.05rem;">${client.totalSpent}</span></td>
      <td><span class="badge-tag ${client.tagClass}">${client.tag}</span></td>
      <td>
        <div style="display:flex; gap:8px;">
          <a href="https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(client.name)},%20te%20escribimos%20desde%20nuestro%20comercio%20para%20ofrecerte%20un%20descuento%20VIP!" target="_blank" class="btn-icon-sm">
            <i data-lucide="message-circle"></i> WhatsApp VIP
          </a>
          <button class="btn-icon-sm" onclick="showToast('📋 Historial completo de ${client.name} cargado.')">
            <i data-lucide="file-text"></i> Historial
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 6. CATALOG RENDER
function renderCatalog() {
  const grid = document.getElementById('catalogGridContainer');
  if (!grid) return;

  grid.innerHTML = mockProducts.map(prod => `
    <div class="product-card">
      <div class="product-img">
        <span>${prod.category === 'Hamburguesas' ? '🍔' : prod.category === 'Pizzas' ? '🍕' : prod.category === 'Sushi' ? '🍣' : prod.category === 'Sándwiches' ? '🥪' : prod.category === 'Carnes' ? '🥩' : prod.category === 'Bebidas' ? '🍺' : prod.category === 'Postres' ? '🍰' : '🍲'}</span>
        <span class="product-category-tag">${prod.category}</span>
      </div>
      <div class="product-body">
        <div class="product-title">${prod.name}</div>
        <div class="product-desc">${prod.desc}</div>
        <div class="product-price">${prod.price}</div>
      </div>
      <div class="product-footer">
        <div class="switch-wrapper">
          <span>${prod.active ? '✅ Disponible' : '❌ Agotado'}</span>
          <label class="switch">
            <input type="checkbox" ${prod.active ? 'checked' : ''} onchange="toggleProductStock(${prod.id}, this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <button class="btn-icon-sm" onclick="openEditProductModal(${prod.id})" style="background:transparent;">
          <i data-lucide="edit-3"></i> Editar
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function toggleProductStock(prodId, isChecked) {
  const prod = mockProducts.find(p => p.id === prodId);
  if (prod) {
    prod.active = isChecked;
    showToast(isChecked ? `✅ Producto habilitado: ${prod.name}` : `⚠️ Producto marcado como Agotado: ${prod.name}`);
    renderCatalog();
  }
}

// 7. CHARTS INITIALIZATION (CHART.JS)
function initCharts() {
  if (!window.Chart) return;

  // Global defaults for sleek dark UI
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';

  // Chart 1: Ventas por Día (Bar Chart)
  const ctxBar = document.getElementById('salesBarChart');
  if (ctxBar) {
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Facturación por Día ($ ARS)',
          data: [280000, 340000, 420000, 580000, 890000, 1150000, 940000],
          backgroundColor: '#fd8c02',
          borderRadius: 8,
          hoverBackgroundColor: '#e07b00'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: val => '$' + (val/1000) + 'k' }
          }
        }
      }
    });
  }

  // Chart 2: Pedidos por Rubro / Categoría (Doughnut Chart)
  const ctxDonut = document.getElementById('categoryDonutChart');
  if (ctxDonut) {
    new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: ['Hamburguesas', 'Pizzas', 'Sushi Boxes', 'Carnes & Parrilla', 'Bebidas & Extras'],
        datasets: [{
          data: [35, 25, 18, 14, 8],
          backgroundColor: ['#fd8c02', '#02baee', '#10b981', '#a855f7', '#f59e0b'],
          borderWidth: 2,
          borderColor: '#1b2230'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, padding: 16 } }
        }
      }
    });
  }

  // Chart 3: Eficiencia y Rendimiento Operativo (Radar Chart)
  const ctxRadar = document.getElementById('performanceRadarChart');
  if (ctxRadar) {
    new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: ['Velocidad Cocina', 'Precisión Pedido', 'Satisfacción VIP', 'Ticket Promedio', 'Recurrencia'],
        datasets: [{
          label: 'TuPedido! Dashboard',
          data: [96, 98, 95, 90, 94],
          backgroundColor: 'rgba(2, 186, 238, 0.25)',
          borderColor: '#02baee',
          pointBackgroundColor: '#fd8c02',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255,255,255,0.1)' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            pointLabels: { font: { size: 11, weight: '700' } },
            ticks: { display: false, max: 100 }
          }
        }
      }
    });
  }

  // Chart 4: Horarios Pico del Día (Line Chart)
  const ctxLine = document.getElementById('hoursLineChart');
  if (ctxLine) {
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['12 hs', '14 hs', '16 hs', '18 hs', '20 hs', '22 hs', '00 hs'],
        datasets: [{
          label: 'Volumen de Pedidos Recibidos',
          data: [18, 35, 12, 28, 65, 92, 45],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}

// 8. INTERACTIONS & LIVE FILTERING
function setupInteractions() {
  // Kanban Search
  const kanbanSearch = document.getElementById('kanbanSearchInput');
  if (kanbanSearch) {
    kanbanSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.kanban-card');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // CRM Search
  const crmSearch = document.getElementById('crmSearchInput');
  if (crmSearch) {
    crmSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = mockClients.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
      renderCRM(filtered);
    });
  }

  // CRM Filter Chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const tag = chip.getAttribute('data-tag');
      if (tag === 'all') {
        renderCRM(mockClients);
      } else {
        const filtered = mockClients.filter(c => c.tag.includes(tag));
        renderCRM(filtered);
      }
    });
  });

  // Banner Live Preview Sync
  const bannerInput = document.getElementById('bannerTextInput');
  const previewBar = document.getElementById('livePhoneOfferText');
  if (bannerInput && previewBar) {
    bannerInput.addEventListener('input', (e) => {
      previewBar.innerText = e.target.value || '🔥 20% OFF en todos los Combos y Pizzas';
    });
  }
}

// 9. MODALS & TOASTS
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="color:#10b981;"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function openOrderModal(orderId) {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) return;
  const modalEl = document.getElementById('comandaModal');
  const bodyEl = document.getElementById('comandaModalBody');
  if (!modalEl || !bodyEl) return;

  bodyEl.innerHTML = `
    <div style="background:var(--bg-subtle); padding:20px; border-radius:var(--r-md); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
        <div>
          <span style="font-family:var(--font-display); font-size:1.4rem; font-weight:800; color:var(--brand-orange);">${order.id}</span>
          <span style="display:block; font-size:0.82rem; color:var(--text-muted);">${order.time}</span>
        </div>
        <span class="badge-tag tag-vip">${order.vipTag || 'Habitual'}</span>
      </div>
      <div>
        <strong style="color:#fff; font-size:1.1rem;">Cliente: ${order.client}</strong>
        <span style="display:block; color:var(--brand-cyan); font-weight:700;">WhatsApp: +${order.phone}</span>
      </div>
      <div style="background:var(--bg-card); padding:14px; border-radius:var(--r-sm); border:1px solid var(--border-subtle);">
        <strong style="color:var(--text-secondary); font-size:0.8rem; text-transform:uppercase;">Detalle del Pedido:</strong>
        <p style="color:#fff; font-size:0.95rem; margin-top:6px; line-height:1.5;">${order.items}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid var(--border-subtle);">
        <span style="font-size:1rem; font-weight:700; color:var(--text-secondary);">TOTAL A COBRAR:</span>
        <span style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; color:#10b981;">${order.total}</span>
      </div>
    </div>
  `;
  modalEl.classList.add('active');
  if (window.lucide) lucide.createIcons();
}

function closeOrderModal() {
  const modalEl = document.getElementById('comandaModal');
  if (modalEl) modalEl.classList.remove('active');
}

function openEditProductModal(prodId) {
  const prod = mockProducts.find(p => p.id === prodId);
  if (!prod) return;
  const nameInput = document.getElementById('editProdName');
  const priceInput = document.getElementById('editProdPrice');
  if (nameInput && priceInput) {
    nameInput.value = prod.name;
    priceInput.value = prod.price;
  }
  const modalEl = document.getElementById('editProductModal');
  if (modalEl) modalEl.classList.add('active');
}

function closeEditProductModal() {
  const modalEl = document.getElementById('editProductModal');
  if (modalEl) modalEl.classList.remove('active');
}

function triggerPrint() {
  showToast('🖨️ Generando comanda lista para imprimir...');
  setTimeout(() => {
    window.print();
  }, 500);
}
