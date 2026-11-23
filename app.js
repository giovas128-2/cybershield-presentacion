'use strict';
/* CyberShield: micrositio informativo de una pantalla, sin conexión con el backend. */
const scenarios = {
  1: { title:'Fuerza bruta', overview:'Identifica ráfagas de intentos de autenticación y facilita la aplicación de límites de acceso.', defense:'El receptor de laboratorio aplica un límite de solicitudes y rechaza el intento que lo supera.', evidence:'Denegación HTTP 429, acción LAB_HTTP_RATE_LIMIT y registro asociado al incidente.', mitre:'MITRE ATT&CK · T1110' },
  2: { title:'Dispositivo no autorizado', overview:'Evalúa la confianza del equipo desde el que se solicita acceso, además de la identidad del usuario.', defense:'Device Trust restringe un identificador de dispositivo que no está registrado como confiable.', evidence:'Decisión de acceso restringido y acción RESTRICT_DEVICE_ACCESS vinculadas al incidente.', mitre:'MITRE ATT&CK · T1078' },
  3: { title:'Cambio de archivo crítico', overview:'Relaciona cambios en archivos con controles de integridad y protección de escritura.', defense:'Se aplican permisos de solo lectura al archivo señuelo del entorno controlado.', evidence:'Permisos comprobados, huellas SHA-256 y acción PROTECT_CRITICAL_FILE.', mitre:'MITRE ATT&CK · T1565.001' },
  4: { title:'Abuso de privilegios', overview:'Controla solicitudes de operaciones administrativas que exceden los permisos permitidos.', defense:'La pasarela de laboratorio rechaza las operaciones protegidas cuando no están autorizadas.', evidence:'Dos rechazos HTTP 403 y acción LAB_PRIVILEGE_DENY con resultado verificado.', mitre:'Control de autorización' },
  5: { title:'Conexión sospechosa', overview:'Permite evaluar solicitudes que buscan salir hacia destinos no incluidos en una política de acceso.', defense:'La política de la pasarela HTTP impide el reenvío hacia un destino no autorizado.', evidence:'Respuesta HTTP 403, constancia de no reenvío y acción LAB_EGRESS_POLICY_DENY.', mitre:'Control de conexiones' },
  6: { title:'Exfiltración de datos', overview:'Asocia el volumen de transferencia con decisiones de restricción del flujo de información.', defense:'Se limita la transferencia de datos de prueba y se deniegan bloques adicionales.', evidence:'Conteo de bytes, huellas SHA-256, denegación HTTP 403 y acción LAB_TRANSFER_QUOTA_DENY.', mitre:'MITRE ATT&CK · T1041' },
  7: { title:'Actividad tipo ransomware', overview:'Analiza operaciones repetitivas sobre archivos que pueden afectar su disponibilidad e integridad.', defense:'El control del receptor frena nuevos renombrados de archivos de prueba.', evidence:'Denegación HTTP 423, hashes de contenido y acción LAB_RENAME_GUARD.', mitre:'Integridad de archivos' },
  8: { title:'Movimiento lateral', overview:'Observa solicitudes de paso entre nodos e identifica intentos de acceso interno no autorizados.', defense:'La política de la pasarela rechaza los intentos de acceso SSH representados en el laboratorio.', evidence:'Dos rechazos HTTP 403 y acción LAB_LATERAL_SSH_DENY, sin conexión SSH hacia otro nodo.', mitre:'MITRE ATT&CK · T1021.004' }
};
const headings = {
  escenarios: ['EXPLORA NUESTRA DEFENSA','8 escenarios. <em>Una visión integral.</em>','01 / 04'],
  capacidades: ['LO QUE NOS DISTINGUE','Funciones que <em>conectan los puntos.</em>','02 / 04'],
  arquitectura: ['NUESTRA BASE TECNOLÓGICA','Tecnología con <em>propósito.</em>','03 / 04'],
  preguntas: ['ENTIENDE CYBERSHIELD','Las respuestas <em>más importantes.</em>','04 / 04']
};
const $ = (id) => document.getElementById(id);
const tabs = [...document.querySelectorAll('[data-view]')];
const panes = [...document.querySelectorAll('.view-pane')];
function changeView(name) {
  if (!headings[name]) return;
  tabs.forEach(tab => {let active=tab.dataset.view===name;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));});
  panes.forEach(pane=>{const active=pane.id==='view-'+name;pane.classList.toggle('active',active);pane.hidden=!active;});
  $('view-eyebrow').textContent=headings[name][0];
  $('view-title').innerHTML=headings[name][1];
  $('view-index').textContent=headings[name][2];
}
tabs.forEach(tab=>tab.addEventListener('click',()=>changeView(tab.dataset.view)));
$('brand-home').addEventListener('click',(e)=>{e.preventDefault();changeView('escenarios');resetInspector();});
function resetInspector() {
  $('inspector-summary').hidden=false;
  $('inspector-detail').hidden=true;
  $('inspector-eyebrow').textContent='EL VALOR DE CYBERSHIELD';
  document.querySelectorAll('[data-scenario]').forEach(el=>el.classList.remove('selected'));
}
function setData(prefix,number,s){
  $(prefix+'title').textContent=s.title;
  $(prefix+'overview').textContent=s.overview;
  $(prefix+'defense').textContent=s.defense;
  $(prefix+'evidence').textContent=s.evidence;
  $(prefix+'mitre').textContent=s.mitre;
  if(prefix==='detail-')$('detail-number').textContent='ESCENARIO / '+String(number).padStart(2,'0');
  if(prefix==='drawer-')$('drawer-nr').textContent='ESCENARIO / '+String(number).padStart(2,'0');
}
let lastFocus = null;
function isCompact() { return window.matchMedia('(max-width: 1050px)').matches; }
function showScenario(number) {
  const s=scenarios[number]; if(!s)return;
  lastFocus=document.activeElement;
  document.querySelectorAll('[data-scenario]').forEach(el=>el.classList.toggle('selected',el.dataset.scenario===String(number)));
  setData('detail-',number,s);
  $('inspector-summary').hidden=true;
  $('inspector-detail').hidden=false;
  $('inspector-eyebrow').textContent='ANÁLISIS DE ESCENARIO';
  if(isCompact()){
    setData('drawer-',number,s);
    $('drawer-backdrop').hidden=false;
    $('mobile-drawer').hidden=false;
    document.body.classList.add('drawer-open');
    $('close-drawer').focus();
  }
}
function closeDrawer() {
  $('drawer-backdrop').hidden=true;
  $('mobile-drawer').hidden=true;
  document.body.classList.remove('drawer-open');
  if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
}
document.querySelectorAll('[data-scenario]').forEach(card=>card.addEventListener('click',()=>showScenario(Number(card.dataset.scenario))));
$('return-summary').addEventListener('click',resetInspector);
$('close-drawer').addEventListener('click',closeDrawer);
$('drawer-done').addEventListener('click',closeDrawer);
$('drawer-backdrop').addEventListener('click',closeDrawer);
document.addEventListener('keydown', e=>{if(e.key==='Escape'&&!$('mobile-drawer').hidden)closeDrawer();});
window.addEventListener('resize',()=>{if(!isCompact()&&!$('mobile-drawer').hidden)closeDrawer();});
let toastTimeout;
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),2500);}
$('share').addEventListener('click',async()=>{
  const url=window.location.href;
  try{
    if(navigator.share){await navigator.share({title:'CyberShield',text:'Descubre CyberShield: detección, respuesta y evidencia.',url});return;}
    if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(url);toast('Enlace copiado.');return;}
    const txt=document.createElement('textarea');txt.value=url;txt.style.cssText='position:fixed;opacity:0';document.body.append(txt);txt.select();let ok=document.execCommand('copy');txt.remove();toast(ok?'Enlace copiado.':'Copia el enlace desde el navegador.');
  }catch(e){if(e.name!=='AbortError')toast('Puedes copiar el enlace desde el navegador.');}
});
changeView('escenarios');
