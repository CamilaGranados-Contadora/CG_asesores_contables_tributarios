# Guía de publicación en GitHub Pages

Esta guía lleva el sitio desde la carpeta descargada hasta una dirección pública en internet. No requiere servidores ni pagos.

## Opción A: desde el navegador (sin instalar nada)

1. Ingrese a [github.com](https://github.com) e inicie sesión (o cree una cuenta gratuita).
2. Pulse **New repository**.
   - *Repository name*: `cg-asesores-web` (o el nombre que prefiera).
   - Visibilidad: **Public** (GitHub Pages gratuito requiere repositorio público).
   - No marque “Add a README”; el proyecto ya trae uno.
3. En el repositorio vacío, pulse **uploading an existing file**.
4. Arrastre **todo el contenido** de la carpeta `cg-asesores-web` (no la carpeta en sí). Verifique que aparezcan `index.html`, `assets/`, `docs/` y `.nojekyll`.
   - Si su sistema oculta `.nojekyll`, créelo después en GitHub con **Add file → Create new file**, nombre `.nojekyll`, contenido vacío.
5. Escriba un mensaje como “Publicación inicial del sitio” y pulse **Commit changes**.
6. Vaya a **Settings → Pages**.
   - *Source*: **Deploy from a branch**.
   - *Branch*: `main` y carpeta `/ (root)`. Pulse **Save**.
7. Espere uno o dos minutos y recargue la página de *Pages*: aparecerá el enlace `https://SU-USUARIO.github.io/cg-asesores-web/`.

## Opción B: con Git desde la terminal

```bash
cd cg-asesores-web
git init
git add .
git commit -m "Publicación inicial del sitio CG Asesores"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/cg-asesores-web.git
git push -u origin main
```

Luego active Pages como en el paso 6 de la opción A.

## Después de publicar: ajustar la dirección real

El código usa `TU-USUARIO` como marcador en las direcciones absolutas que necesitan los buscadores y las redes sociales. Reemplácelo por su usuario de GitHub en:

- `index.html` (etiquetas `canonical`, `og:url`, `og:image` y el bloque de datos estructurados)
- `robots.txt`
- `sitemap.xml`

Con la terminal puede hacerlo de una vez (Linux / macOS):

```bash
grep -rl "TU-USUARIO.github.io/cg-asesores-web" . | xargs sed -i 's#TU-USUARIO.github.io/cg-asesores-web#SU-USUARIO.github.io/cg-asesores-web#g'
```

Si usa dominio propio, reemplace toda la dirección por `www.sudominio.com`.

## Dominio propio (opcional)

1. Compre el dominio (por ejemplo `cgasesores.com.co`) en un registrador.
2. En el registrador cree estos registros DNS:
   - Para `www`: registro **CNAME** que apunte a `SU-USUARIO.github.io`.
   - Para el dominio raíz: cuatro registros **A** hacia `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
3. En **Settings → Pages → Custom domain**, escriba `www.sudominio.com` y guarde. GitHub creará el archivo `CNAME` en el repositorio.
4. Cuando el certificado esté listo, marque **Enforce HTTPS**.
5. Actualice las direcciones en `index.html`, `robots.txt` y `sitemap.xml`.

## Registrar el sitio en Google

1. Entre a [Google Search Console](https://search.google.com/search-console) y agregue la propiedad con la dirección del sitio.
2. Verifique la propiedad (el método de etiqueta HTML consiste en pegar una línea `<meta>` en `index.html`).
3. En **Sitemaps**, envíe `sitemap.xml`.
4. Cree o actualice el **Perfil de Empresa en Google** con el enlace al sitio y el WhatsApp comercial.

## Actualizar el sitio

Cada vez que edite un archivo y lo suba (o haga `git push`), GitHub Pages vuelve a publicar en uno o dos minutos. Si no ve los cambios, recargue con `Ctrl + F5`.

## Lista de verificación antes de anunciar el sitio

- [ ] El video se ve como marca de agua en Inicio y los botones de pausa y sonido funcionan.
- [ ] Cada opción del menú abre su sección por separado.
- [ ] El botón **Solicita tu asesoría** abre WhatsApp con el mensaje correcto.
- [ ] El formulario abre WhatsApp y correo con los datos escritos.
- [ ] Las direcciones `TU-USUARIO` fueron reemplazadas.
- [ ] La política de datos tiene dirección, NIT y fecha.
- [ ] Al compartir el enlace en WhatsApp aparece la vista previa con el logotipo.
