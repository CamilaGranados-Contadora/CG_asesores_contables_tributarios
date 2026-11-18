# CG Asesores Contables y Tributarios — Sitio web corporativo

Sitio web oficial de **CG Asesores Contables y Tributarios**, firma dirigida por **Camila Granados, Contadora Pública**. Presenta los servicios contables, tributarios, financieros y de revisoría fiscal de la firma y canaliza las solicitudes de asesoría por WhatsApp y correo electrónico.

> **Tu tranquilidad financiera, nuestro compromiso profesional.**

Es un sitio estático (HTML, CSS y JavaScript sin dependencias) listo para publicarse gratis con **GitHub Pages**.

**Secciones independientes:** cada opción del menú muestra solo su sección (Inicio, Nuestra firma, Qué hacemos, Servicios, Contáctanos). La dirección cambia a `#nuestra-firma`, `#servicios`, etc., así que cada sección se puede compartir por enlace y los botones Atrás/Adelante del navegador funcionan.

---

## Contenido del sitio

| Sección | Qué incluye |
|---|---|
| **Inicio** | Video introductorio como marca de agua al fondo, con reproducción automática silenciosa, botones de pausa y sonido e imagen de respaldo; titular, subtítulo y botones de acción; presentación corporativa con indicadores; perfil de la CEO con fotografía de fondo transparente; cinco accesos a las líneas de servicio. |
| **Nuestra firma** | Quiénes somos, misión, visión, propuesta de valor, cuatro atributos y el método Organizar · Cumplir · Analizar · Proyectar. |
| **Qué hacemos** | Cinco tarjetas interactivas (Contable, Asesoría, Tributario, Revisoría fiscal, Soluciones específicas) con ventanas de detalle, comparativo de planes Esencial / Plus / Premium y botón de cotización por WhatsApp. |
| **Servicios** | Catálogo de ocho categorías con filtros por área, lista de actividades y botones *Solicitar información* (WhatsApp) y *Cotizar este servicio* (formulario precargado). |
| **Contáctanos** | Canales de contacto, formulario validado que redacta la solicitud por WhatsApp o correo, autorización de tratamiento de datos (Ley 1581 de 2012). |
| **Extras** | Botón flotante de WhatsApp, política de datos personales, página 404, SEO (metadatos, Open Graph, datos estructurados, sitemap), manifiesto web e iconos. |

## Estructura del repositorio

```
cg-asesores-web/
├── index.html                  Página principal
├── politica-privacidad.html    Política de tratamiento de datos (borrador para validar)
├── 404.html                    Página de error
├── favicon.ico
├── robots.txt                  Indicaciones para buscadores
├── sitemap.xml                 Mapa del sitio
├── site.webmanifest            Manifiesto (icono al “instalar” en el celular)
├── .nojekyll                   Indica a GitHub Pages servir los archivos tal cual
├── assets/
│   ├── css/styles.css          Estilos y sistema de diseño (variables en :root)
│   ├── js/config.js            ⚙️ WhatsApp, correo y mensajes predeterminados
│   ├── js/main.js              Vistas por sección, menú, video, modales, filtros y formulario
│   ├── img/                    Logotipo y fotografía de la CEO en PNG/WebP transparente, póster del video, ondas de marca
│   ├── icons/                  Favicons e isotipo
│   └── video/intro-cg.mp4      Video introductorio optimizado
└── docs/
    ├── GUIA-PUBLICACION.md     Paso a paso para GitHub Pages y dominio propio
    ├── RECURSOS.md             Origen de cada imagen y cómo reemplazarla
    └── SEGURIDAD.md            Medidas de seguridad y datos personales
```

## Ver el sitio en su computador

Abra `index.html` con doble clic, o para una prueba idéntica a la publicación:

```bash
cd cg-asesores-web
python3 -m http.server 8000
# luego abra http://localhost:8000
```

## Publicar en GitHub Pages (resumen)

1. Cree un repositorio público en GitHub, por ejemplo `cg-asesores-web`.
2. Suba todos los archivos de esta carpeta (incluido `.nojekyll`).
3. En **Settings → Pages**, elija **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarde.
4. En uno o dos minutos el sitio estará en `https://SU-USUARIO.github.io/cg-asesores-web/`.
5. Reemplace `TU-USUARIO` por su usuario real en `index.html`, `robots.txt` y `sitemap.xml`.

La guía completa, con comandos de Git y configuración de dominio propio, está en [`docs/GUIA-PUBLICACION.md`](docs/GUIA-PUBLICACION.md).

## Cambios frecuentes

| Quiero cambiar… | Dónde |
|---|---|
| Número de WhatsApp, correo o mensajes automáticos | `assets/js/config.js` |
| Textos de secciones y servicios | `index.html` (cada sección está señalada con un comentario) |
| Colores y tipografías | Variables al inicio de `assets/css/styles.css` |
| Fotografía de la CEO | `assets/img/camila-granados.png` y `.webp` (fondo transparente) |
| Video introductorio | `assets/video/intro-cg.mp4` y su póster `assets/img/video-poster.*` |
| Intensidad de la marca de agua del video | `opacity` en `.intro-video` dentro de `assets/css/styles.css` (actual: 0.24) |
| Indicadores (8+, 100%, 360°) | Bloque `.stats` en `index.html` |

## Notas sobre el contenido

- **Indicadores.** Las cifras *8+ años de experiencia*, *100% acompañamiento cercano* y *360° visión contable y tributaria* provienen del portafolio oficial de la firma (página “Perfil profesional”). No se agregaron cifras de clientes, premios ni reconocimientos. Si alguna deja de ser exacta, actualícela o elimínela.
- **Precios.** El sitio no publica honorarios; todas las acciones llevan a una cotización.
- **Política de datos.** `politica-privacidad.html` es un borrador base: complete los campos marcados `[completar]` (dirección, NIT, fecha) y valídelo antes de considerarlo definitivo.
- **Planes.** El comparativo Esencial / Plus / Premium y los planes de revisoría fiscal se tomaron del portafolio. Para Asesoría y Tributario el portafolio solo nombra los niveles, así que el sitio indica que su alcance se define en la propuesta.

## Analítica web (opcional)

El sitio no incluye rastreadores por defecto. Para medir visitas:

- **GitHub** muestra tráfico básico del repositorio en *Insights → Traffic*.
- **Google Analytics 4** o **Plausible**: pegue su fragmento antes de `</head>` en `index.html` y amplíe la política de seguridad (`Content-Security-Policy`) con los dominios del proveedor, por ejemplo `https://www.googletagmanager.com` en `script-src` y `https://*.google-analytics.com` en `connect-src`. Mencione el uso de cookies analíticas en la política de datos.
- Como eventos útiles se recomienda medir clics en `[data-wa]` (WhatsApp) y envíos del formulario.

## Tecnologías

HTML5 semántico · CSS3 con variables y diseño adaptable · JavaScript sin librerías · Tipografías Cormorant Garamond y Montserrat (Google Fonts) · Iconografía SVG propia.

## Derechos

© 2026 CG Asesores Contables y Tributarios. El logotipo, las fotografías, el video y los textos son propiedad de la firma. Consulte [`LICENSE`](LICENSE).
