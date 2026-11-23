# CyberShield | Micrositio de presentación de una pantalla

**Versión visual basada en el logotipo oficial:** negro, cian luminoso, azul petróleo y plata. La imagen del logo se incluye en `assets/logo-cybershield.webp`.

## Cómo abrir el sitio

Abre `index.html` en Chrome o Edge. Funciona sin instalar dependencias ni tener un backend en ejecución. El sitio es informativo: NO se conecta con las bases de datos o servicios del proyecto CyberShield.

## Cómo subirlo a GitHub Pages

### Si ya publicaste la versión anterior

1. Abre el repositorio de GitHub donde subiste la página anterior.
2. Reemplaza en la **raíz** los archivos `index.html`, `styles.css` y `app.js`; sube también la carpeta `assets` con `logo-cybershield.webp` y `favicon.png`.
3. Conserva la publicación **Settings → Pages → Deploy from a branch → main → /(root)**.
4. Recarga el sitio con Ctrl+F5. **El enlace anterior sigue siendo el mismo**, así que tu código QR no necesita cambiar.

### Si es tu primer repositorio

1. Crea un repositorio **público** nuevo, por ejemplo `cybershield-presentacion`.
2. En **Add file → Upload files**, sube **el contenido descomprimido** de este ZIP, no el ZIP: `index.html`, `styles.css`, `app.js` y `assets/` deben quedar en la raíz.
3. En **Settings → Pages** elige **Deploy from a branch**, rama `main`, carpeta `/(root)`.
4. Abre la URL que GitHub muestre, normalmente `https://TU-USUARIO.github.io/cybershield-presentacion/`.
5. Usa esa URL en el código QR de tu exposición.

## Cómo se presenta

- La página no tiene desplazamiento vertical general. El resumen y los ocho escenarios se ven de inmediato en la pantalla.
- Las cuatro pestañas superiores cambian el contenido visible: Escenarios, Funciones, Tecnología y Conócenos.
- Pulsa un escenario para ver cómo funciona y qué evidencia conserva; en teléfono se abre una ficha flotante.
- **Compartir** permite enviar/copiar el enlace una vez publicado.

**Nota de precisión:** las explicaciones describen el sistema académico y los ocho escenarios de demostración que la usuaria ha verificado en su laboratorio. La página no muestra telemetría en vivo, ni implica que los rechazos del receptor sean bloqueos reales de una red corporativa.

## Estructura

- `index.html`: contenido y elementos visuales
- `styles.css`: diseño responsive de una pantalla
- `app.js`: pestañas, fichas de escenarios y compartir enlace
- `assets/logo-cybershield.webp`: logotipo proporcionado por el equipo
- `assets/favicon.png`: icono del navegador
- `.nojekyll`: publicación sencilla de archivos estáticos en GitHub Pages
