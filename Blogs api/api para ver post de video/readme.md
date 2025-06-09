# Clover.social Videos Viewer

Una aplicación web simple que muestra videos recomendados desde la plataforma **Clover.social**, permitiendo explorar y visualizar contenido directamente desde la API oficial de Cloverspace.

## 🧩 ¿Para qué sirve?

Esta página permite:
- Visualizar videos recientes recomendados por Clover.social.
- Cambiar el idioma de visualización.
- Ver detalles del autor de cada publicación (nombre, perfil y UID).
- Cargar más contenido dinámicamente con paginación.
  
Ideal para explorar contenido multimedia de Clover.social sin necesidad de iniciar sesión.

## 🚀 API Utilizada

- **CloverSpace API**:  
  `https://api.cloverspace.io/f/v1/blogs?type=recommend&rcmdBlogLabel=video&size=5`  
  Se usa para obtener publicaciones tipo video recomendadas.

- **AllOrigins (Proxy)**:  
  `https://api.allorigins.win/get?url=`  
  Se utiliza para evitar problemas de CORS en el navegador.
