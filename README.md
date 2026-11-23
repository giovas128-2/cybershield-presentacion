# CyberShield · Página de presentación para QR

Esta es una página informativa de CyberShield para una exposición escolar. Se puede publicar directamente en GitHub Pages **sin instalar nada**. Está construida con HTML, CSS y JavaScript, incluye filtros interactivos, fichas de ocho escenarios y es adaptable a celulares.

## Contenido

- `index.html`: página principal (es el archivo que GitHub Pages abre).
- `styles.css`: diseño y adaptación a celulares.
- `app.js`: interacciones de la página.
- `assets/favicon.svg`: icono de CyberShield.
- `.nojekyll`: evita procesamientos de Jekyll que no son necesarios.

**Importante:** sube estos archivos a la raíz del repositorio. No subas únicamente el ZIP. Tampoco subas código del backend, base de datos, archivos `.env`, contraseñas ni claves temporales de la práctica.

## Publicar en GitHub Pages (pasos sencillos)

1. Accede a https://github.com e inicia sesión.
2. Pulsa `+` → **New repository**.
3. Nombre recomendado: `cybershield-presentacion` (puedes usar otro).
4. Selecciona **Public** y crea el repositorio. Usa un repositorio **nuevo**, independiente del backend.
5. En el repositorio, entra a **Add file → Upload files**.
6. Arrastra **el contenido** de esta carpeta: `index.html`, `styles.css`, `app.js`, `assets/`, `.nojekyll` y opcionalmente `README.md`.
7. Comprueba que el archivo `index.html` está en la raíz. Si el navegador no permite subir carpetas en tu flujo, puedes usar GitHub Desktop o la alternativa Git descrita abajo.
8. Pulsa **Commit changes**.
9. Abre **Settings → Pages**.
10. En **Build and deployment → Source** elige **Deploy from a branch**.
11. En **Branch** selecciona `main` y `/(root)`, después **Save**.
12. En esa misma pantalla de Pages aparecerá la URL pública cuando termine la publicación. Abre la URL para confirmar que funciona.

URL orientativa si el usuario es `giovas128-2` y el repositorio se llama `cybershield-presentacion`:

`https://giovas128-2.github.io/cybershield-presentacion/`

Este patrón es solo un ejemplo: **la URL real se confirma en Settings → Pages**.

## Alternativa para subir todo desde Windows usando Git

Desde PowerShell, una vez descargados y extraídos los archivos de esta carpeta, crea el repositorio vacío en GitHub y ejecuta (sustituye `TU_USUARIO`):

```powershell
cd "$env:USERPROFILE\Downloads\CyberShield_Presentacion_Web"
git init
git add .
git commit -m "Publicar presentación de CyberShield"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cybershield-presentacion.git
git push -u origin main
```

GitHub puede solicitar inicio de sesión. La carpeta del comando depende de dónde extraigas el ZIP.

## Crear un código QR

1. Primero confirma que la página abre con la URL pública de GitHub Pages desde un celular.
2. Copia **esa URL pública**, no la URL del repositorio ni `localhost`.
3. Pega esa URL en un generador de códigos QR, o compártela en este chat para crear un QR imprimible.
4. Escanea el QR con otro teléfono antes de imprimirlo para comprobar que abre la página.

## Consejos para presentar

- Puedes mostrar el sitio directamente desde un teléfono como si un visitante hubiera escaneado el QR.
- Los ocho escenarios cuentan con fichas que puedes abrir tocando **Ver detalles**.
- El gráfico de portada es una **representación visual del proceso**, no un panel conectado en tiempo real.
- El sitio no necesita conexión con el backend para abrir: solo GitHub Pages y acceso a internet para los visitantes.
- Los estilos tienen fuentes de respaldo y funcionan sin bibliotecas externas de JavaScript.
- Al compartir el proyecto públicamente, evita colocar IPs de tu red, usuarios, claves o capturas con datos sensibles.

## Ver en tu computadora antes de publicar

Haz doble clic en `index.html`. La web funciona localmente en Chrome, Edge y Firefox. Los botones, filtros y tarjetas también funcionan en local.

## Alcance

CyberShield es una plataforma académica de monitoreo y respuesta defensiva para entornos autorizados. Este sitio comunica el flujo y las capacidades presentadas en el proyecto, sin acceso a información privada o sistemas externos.
