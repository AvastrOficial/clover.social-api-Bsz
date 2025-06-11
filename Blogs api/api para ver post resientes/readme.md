# Api Clover.social Para ver Post Resientes Usa y Mx

Este proyecto es una simple aplicación web que carga y muestra posts del blog de CloverSpace utilizando su API pública, con paginación y soporte para contenido multimedia (imágenes y videos).

---

## Características

- Carga los posts más recientes desde la API oficial de CloverSpace.
- Paginación automática con botón "Cargar más".
- Soporte para contenido multimedia: imágenes y videos.
- Uso de proxy público para evitar problemas de CORS.
- Encabezado `Accept-Language` configurado para varios países de habla hispana.
- Mostrar autor con enlace a su perfil en Clover Social.
- Mensajes y deshabilitación del botón cuando no hay más contenido o en caso de error.

---

## Cómo funciona

1. Al cargar la página, se realiza una petición a la API para obtener los últimos 10 posts.
2. Los posts se agregan dinámicamente a un contenedor en el DOM.
3. Si hay más páginas disponibles, el botón "Cargar más" permanece activo para solicitar más posts.
4. Cuando no hay más posts, el botón se deshabilita y muestra un mensaje.
5. Si ocurre un error en la petición, se muestra un mensaje de error en pantalla.

---

## API utilizada

- **API base:** `https://api.cloverspace.io/f/v1/blogs`
- **Tipo de consulta:** `latest` (últimos posts)
- **Tamaño de página:** 10 posts por carga
- **Paginación:** se usa el token `pageToken` para cargar páginas siguientes
- **Proxy usado:** [allorigins.win](https://allorigins.win) para evitar problemas CORS.

---

## Regiones y configuración del idioma

Para mejorar la relevancia y localización del contenido, se usa el header HTTP `Accept-Language` con soporte para múltiples países de habla hispana:

```http
Accept-Language: es-MX,es-AR,es-CO,es-CL,es-PE,es-VE,es-EC,es-CR,es-UY,es-PA,es-DO
```
