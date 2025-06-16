# 🎵 Audio Blog Loader - api clover.social

Este proyecto es una pequeña aplicación en JavaScript que consume datos de una API pública de CloverSpace y muestra publicaciones de blogs que contienen audios recomendados del tipo `music`.

## 🧠 ¿Qué hace este script?

- Obtiene publicaciones recomendadas de tipo musical desde la API `https://api.cloverspace.io`.
- Muestra el título, contenido, audio y datos del autor de cada publicación.
- Agrega botones para ver el perfil del autor y su UID.
- Permite cargar más publicaciones usando paginación (`nextPageToken`).
- Utiliza el proxy `https://api.allorigins.win` para evitar problemas de CORS.

## 🔧 Estructura del código

### Variables principales

- `container`: Contenedor HTML donde se insertan las tarjetas.
- `loadMoreBtn`: Botón para cargar más publicaciones.
- `baseUrl`: URL base de la API con los parámetros de tipo y etiqueta.
- `nextPageToken`: Token para la paginación de la API.

### Función `loadAudios()`

1. Construye la URL con el token de paginación si existe.
2. Usa el proxy `allorigins` para evitar restricciones de CORS.
3. Procesa la respuesta:
   - Extrae el título, contenido, audio y autor.
   - Crea una tarjeta HTML por cada publicación.
   - Inserta los elementos dinámicamente en el contenedor.
4. Si no hay más publicaciones, desactiva el botón de carga.

### Eventos

- Llama a `loadAudios()` al cargar la página.
- Asocia el botón `loadMoreBtn` para cargar más publicaciones.

## 💡 Ejemplo de uso

Simplemente incluye este script en una página HTML que tenga:

```html
<div id="blog-container"></div>
<button id="load-more">Cargar más audios</button>
```
