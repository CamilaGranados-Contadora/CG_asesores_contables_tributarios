# Recursos multimedia

Todo el material visual proviene de los archivos entregados por la firma. No se usaron imágenes genéricas de bancos externos.

| Archivo en el sitio | Origen | Uso | Tratamiento |
|---|---|---|---|
| `assets/img/logo-cg.png` / `.webp` | Logotipo oficial suministrado | Encabezado, pie de página | Fondo blanco convertido en transparente conservando bordes suaves. Colores, proporciones y diseño intactos. |
| `assets/img/logo-cg-original.jpg` | Logotipo oficial suministrado | Respaldo | Archivo original sin cambios. |
| `assets/icons/*`, `favicon.ico` | Isotipo del logotipo oficial | Pestaña del navegador, ícono en celulares | Recorte circular del símbolo, sin redibujar. |
| `assets/img/camila-granados.png` / `.webp` | Fotografía del portafolio oficial (página “Perfil profesional”) | Perfil de la CEO | Fondo de oficina retirado (recorte automático de la persona) y desvanecido suave en la parte inferior. Rostro, rasgos y proporciones sin modificaciones. |
| `assets/video/intro-cg.mp4` | Video introductorio suministrado (1280 × 720, 10 s) | Marca de agua al fondo de Inicio | Recodificado H.264 con inicio rápido: de 2,5 MB a 1,0 MB, misma resolución, proporción y audio. Se muestra con 24 % de opacidad. |
| `assets/img/video-poster.jpg` / `.webp` | Último cuadro del video | Imagen de respaldo del video | Extraído sin edición. |
| `assets/img/ondas-marca.png` / `.webp` | Imagen de ondas suministrada | Fondo decorativo en *Nuestra firma* y *Contáctanos* | Fondo blanco convertido en transparente. |
| `assets/img/og-cg-asesores.jpg` | Composición con el logotipo oficial | Vista previa al compartir el enlace | 1200 × 630 px. |

La imagen circular de edificios del portafolio fue retirada del sitio.

## Recursos que conviene agregar o confirmar

- **Fotografías adicionales.** Solo se recibió una fotografía de la CEO. Si existe una versión de estudio con fondo liso, el recorte transparente quedará aún más limpio.
- **Dirección física y horario de atención.** No se publicaron porque no se suministraron. Si se desean, agréguelos en la sección *Contáctanos* de `index.html` y en los datos estructurados.

## Cómo reemplazar un recurso

Conserve el **mismo nombre de archivo** y súbalo a la misma carpeta; el sitio lo tomará sin tocar el código.

- **Fotografía de la CEO:** PNG con fondo transparente (puede quitar el fondo con herramientas como remove.bg o Canva) y una copia `.webp` (conviértala en [squoosh.app](https://squoosh.app)).
- **Video:** MP4 H.264, idealmente menor de 3 MB. Para optimizarlo con FFmpeg:

  ```bash
  ffmpeg -i video-nuevo.mp4 -c:v libx264 -preset veryfast -crf 24 -pix_fmt yuv420p \
         -movflags +faststart -c:a aac -b:a 96k assets/video/intro-cg.mp4
  ffmpeg -sseof -0.3 -i assets/video/intro-cg.mp4 -frames:v 1 assets/img/video-poster.jpg
  ```

- **Logotipo:** reemplace `logo-cg.png` y `logo-cg.webp`, preferiblemente con fondo transparente.
