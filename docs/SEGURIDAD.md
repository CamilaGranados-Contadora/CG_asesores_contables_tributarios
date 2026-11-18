# Seguridad y manejo de datos

El sitio es estático: no tiene base de datos, panel de administración ni servidor propio que pueda ser vulnerado. Estas son las medidas incluidas y las recomendaciones de operación.

## Medidas incluidas en el código

| Medida | Dónde | Para qué sirve |
|---|---|---|
| **HTTPS** | GitHub Pages (activar *Enforce HTTPS*) | Cifra la conexión entre el visitante y el sitio. |
| **Content-Security-Policy** | `<meta>` en `index.html` y `politica-privacidad.html` | Solo permite cargar scripts, estilos, imágenes y video del propio sitio (más las tipografías de Google Fonts). Bloquea scripts inyectados. |
| **Referrer-Policy** | `<meta name="referrer">` | No envía la dirección completa de la página a sitios externos. |
| **`rel="noopener noreferrer"`** | Enlaces externos | Impide que la pestaña abierta controle la página de origen. |
| **Sin datos almacenados** | Formulario de contacto | La información no se guarda en el sitio; se redacta un mensaje que el visitante envía por WhatsApp o correo. |
| **Validación y limpieza** | `assets/js/main.js` | Limita longitudes, elimina caracteres de control y símbolos `< >` antes de construir el mensaje. |
| **Campo trampa (honeypot)** | Formulario | Descarta envíos automáticos de bots. |
| **Autorización de datos** | Casilla obligatoria en el formulario | Cumple el requisito de autorización previa de la Ley 1581 de 2012. |
| **Sin rastreadores** | Todo el sitio | No hay cookies ni analítica de terceros por defecto. |

> Limitación: GitHub Pages no permite configurar encabezados HTTP propios (por ejemplo `X-Frame-Options`). Si en el futuro se necesitan, puede ponerse el sitio detrás de Cloudflare (plan gratuito) y definirlos allí.

## Si agrega servicios externos

Cada servicio nuevo (analítica, chat, mapas, formularios como Formspree) requiere:

1. Añadir sus dominios a la `Content-Security-Policy` en el `<meta>` correspondiente.
2. Mencionarlo en `politica-privacidad.html`.

## Recomendaciones de operación

- Active la **verificación en dos pasos** en la cuenta de GitHub y en el correo de la firma.
- Limite los colaboradores del repositorio a quienes realmente editan el sitio.
- No suba al repositorio documentos de clientes, contraseñas ni archivos internos: todo lo que está en un repositorio público es visible para cualquiera.
- Revise una vez al año la política de datos y la vigencia de los textos normativos.
