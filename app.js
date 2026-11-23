'use strict';

// CyberShield: sitio informativo estático. No se conecta al backend ni solicita datos privados.
const steps = [
  {
    icon: 'ico-radar', tag: 'SEÑAL IDENTIFICADA',
    title: 'Cada incidente comienza con una señal.',
    description: 'CyberShield recibe y organiza información de seguridad para reconocer actividad relevante.'
  },
  {
    icon: 'ico-brain', tag: 'RIESGO CONTEXTUALIZADO',
    title: 'Convertimos datos en información útil.',
    description: 'Las reglas, la severidad y las técnicas MITRE ATT&CK permiten comprender mejor el incidente.'
  },
  {
    icon: 'ico-shield', tag: 'MEDIDA REGISTRADA',
    title: 'La respuesta forma parte del proceso.',
    description: 'Cada medida defensiva se asocia al incidente correspondiente y conserva su estado de ejecución.'
  },
  {
    icon: 'ico-search', tag: 'RESULTADO COMPROBADO',
    title: 'Actuar importa. Verificar también.',
    description: 'La plataforma relaciona el resultado de la medida con comprobaciones concretas y registros técnicos.'
  },
  {
    icon: 'ico-check', tag: 'EVIDENCIA CONSERVADA',
    title: 'Un cierre respaldado por evidencia.',
    description: 'El incidente puede consultarse con su estado, acción, verificación y trazabilidad para futuras revisiones.'
  }
];

const scenarios = {
  1: {
    name: 'Fuerza bruta',
    description: 'Una secuencia de intentos de autenticación puede revelar actividad que requiere atención y límites de acceso.',
    action: 'Detecta solicitudes reiteradas, las clasifica y activa la política de límite de intentos del receptor de laboratorio.',
    proof: 'Respuesta HTTP 429 ante una solicitud que excede el límite, con asociación al incidente y su acción defensiva.',
    mitre: 'MITRE ATT&CK · T1110'
  },
  2: {
    name: 'Dispositivo no autorizado',
    description: 'No basta con identificar a un usuario: también importa la confianza del dispositivo desde el que solicita acceso.',
    action: 'Evalúa un identificador de equipo mediante Device Trust y restringe el acceso cuando no está registrado o autorizado.',
    proof: 'Decisión de acceso restringido registrada y correlacionada con la acción RESTRICT_DEVICE_ACCESS.',
    mitre: 'MITRE ATT&CK · T1078'
  },
  3: {
    name: 'Cambio de archivo crítico',
    description: 'La integridad de archivos relevantes requiere identificar cambios y conservar una referencia verificable.',
    action: 'Registra cambios en archivos señuelo y aplica una protección de escritura sobre el archivo controlado.',
    proof: 'Permisos del archivo comprobados y huellas SHA-256 asociadas a la evidencia técnica del incidente.',
    mitre: 'MITRE ATT&CK · T1565.001'
  },
  4: {
    name: 'Abuso de privilegios',
    description: 'Una solicitud de operación administrativa fuera de los permisos autorizados debe ser rechazada y documentada.',
    action: 'Evalúa solicitudes de una operación protegida y aplica una política de denegación de permisos.',
    proof: 'Dos rechazos HTTP 403 y registro de la medida LAB_PRIVILEGE_DENY con resultado verificado.',
    mitre: 'Control · privilegios'
  },
  5: {
    name: 'Conexión saliente sospechosa',
    description: 'Las solicitudes hacia destinos que no forman parte de una política de salida merecen una evaluación de seguridad.',
    action: 'Inspecciona solicitudes de prueba de una pasarela HTTP y niega un reenvío hacia un destino no permitido.',
    proof: 'Denegación HTTP 403, constancia de que no hubo reenvío y acción LAB_EGRESS_POLICY_DENY.',
    mitre: 'Control · conexiones de salida'
  },
  6: {
    name: 'Exfiltración de datos',
    description: 'El volumen y el destino de las transferencias pueden aportar señales para limitar movimientos de información.',
    action: 'Gestiona una transferencia de datos sintéticos y aplica un límite de volumen en el receptor.',
    proof: 'Conteo de bytes, huellas SHA-256 y rechazo HTTP 403 al superar el límite configurado.',
    mitre: 'MITRE ATT&CK · T1041'
  },
  7: {
    name: 'Actividad tipo ransomware',
    description: 'Cambios masivos y rápidos sobre archivos pueden ser señales de riesgo para su disponibilidad e integridad.',
    action: 'Observa renombrados de archivos señuelo y detiene nuevos renombrados mediante un control de acceso del laboratorio.',
    proof: 'Rechazo HTTP 423 y comprobación del contenido de los archivos mediante SHA-256.',
    mitre: 'Control · integridad de archivos'
  },
  8: {
    name: 'Movimiento lateral',
    description: 'Los intentos de pasar de un nodo a otro deben respetar las políticas de acceso interno y quedar registrados.',
    action: 'Evalúa solicitudes de salto entre nodos del laboratorio y aplica una política de denegación de acceso.',
    proof: 'Dos intentos rechazados con HTTP 403 y evidencia asociada a LAB_LATERAL_SSH_DENY.',
    mitre: 'MITRE ATT&CK · T1021.004'
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('#menu-toggle');
const menu = $('#main-nav');
const setMenu = (open) => {
  if (!menu || !menuButton) return;
  menu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};
menuButton?.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('#main-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => { if (menu?.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false); });

function selectStep(index, focus = false) {
  const step = steps[index];
  if (!step) return;
  $$('.journey-step').forEach((button, position) => {
    const active = position === index;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  $('#journey-panel').setAttribute('aria-labelledby', `tab-${index}`);
  $('#journey-count').textContent = `${String(index + 1).padStart(2, '0')} / 05`;
  $('#journey-tag').textContent = step.tag;
  $('#journey-title').textContent = step.title;
  $('#journey-description').textContent = step.description;
  $('#journey-icon use').setAttribute('href', `#${step.icon}`);
  $$('.journey-progress i').forEach((bar, position) => bar.classList.toggle('filled', position <= index));
  if (focus) $(`#tab-${index}`).focus();
}
$$('.journey-step').forEach(button => {
  button.addEventListener('click', () => selectStep(Number(button.dataset.step)));
  button.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = Number(button.dataset.step);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 4 : (current + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + 5) % 5;
    selectStep(next, true);
  });
});

$$('.filter-chip').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  $$('.filter-chip').forEach(chip => {
    const selected = chip === button;
    chip.classList.toggle('active', selected);
    chip.setAttribute('aria-pressed', String(selected));
  });
  $$('.scenario-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

const dialog = $('#scenario-dialog');
$$('.scenario-more').forEach(button => button.addEventListener('click', () => {
  const number = Number(button.dataset.scenario);
  const info = scenarios[number];
  if (!info || !dialog) return;
  $('#dialog-id').textContent = `SC–${String(number).padStart(2, '0')} / ESCENARIO DE SEGURIDAD`;
  $('#dialog-title').textContent = info.name;
  $('#dialog-description').textContent = info.description;
  $('#dialog-action').textContent = info.action;
  $('#dialog-proof').textContent = info.proof;
  $('#dialog-mitre').textContent = info.mitre;
  if (dialog.showModal) {
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
}));
const closeDialog = () => dialog?.close();
$('#close-dialog')?.addEventListener('click', closeDialog);
$('#dialog-accept')?.addEventListener('click', closeDialog);
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog?.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });

let toastId;
function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastId);
  toastId = setTimeout(() => toast.classList.remove('show'), 3600);
}
$('#share-site')?.addEventListener('click', async () => {
  const data = {title: 'CyberShield | Seguridad visible, respuesta verificable', text: 'Conoce CyberShield y sus 8 escenarios de ciberseguridad.', url: location.href.split('#')[0]};
  if (navigator.share && /^https?:/.test(location.protocol)) {
    try { await navigator.share(data); return; } catch (error) { if (error.name === 'AbortError') return; }
  }
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(data.url); showToast('Enlace copiado. ¡Compártelo!'); return; } catch { /* mostrar enlace manualmente */ }
  }
  showToast('Copia la dirección de esta página desde tu navegador.');
});
$('#current-year').textContent = new Date().getFullYear();
