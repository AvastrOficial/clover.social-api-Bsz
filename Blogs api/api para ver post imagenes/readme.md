# 🖼️ CloverSpace Image Feed Viewer

Este proyecto es una pequeña aplicación web que permite **ver publicaciones con imágenes recomendadas** desde la red social CloverSpace. Las imágenes se muestran en tarjetas con estilo moderno y se pueden cargar más mediante un botón interactivo.

![image](https://github.com/user-attachments/assets/f49dfe02-8b22-41de-a313-82e1b88a5959)

---

## 📌 ¿Para qué sirve?

- Mostrar publicaciones recomendadas con imágenes.
- Visualizar información del autor (nickname y UID).
- Navegar al perfil del autor directamente.
- Cargar más publicaciones con solo un clic.

---

## 🔌 APIs utilizadas

### 1. [CloverSpace API](https://clover.social)
- **URL base**: `https://api.cloverspace.io/f/v1/blogs`
- **Parámetros usados**:
  - `type=recommend`: para mostrar publicaciones recomendadas.
  - `rcmdBlogLabel=image`: filtrar solo las publicaciones con imágenes.
  - `size=10`: número de publicaciones por petición.
  - `pageToken`: para paginación.

### 2. [AllOrigins API](https://allorigins.win/)
- Utilizada para evitar problemas de CORS al consumir la API externa desde el navegador.
- **URL proxy**: `https://api.allorigins.win/get?url=...`

---

## ⚙️ ¿Cómo funciona?

1. Se hace una petición a la API de CloverSpace a través de AllOrigins.
2. Se recibe un listado de publicaciones (`posts`) con datos como título, contenido, autor e imágenes.
3. Cada publicación se transforma en una tarjeta visual (card) con:
   - Imagen destacada
   - Título
   - Descripción
   - Botones para ver perfil del autor o mostrar su UID
4. Un botón llamado `Cargar más imágenes` permite cargar el siguiente lote usando el `nextPageToken`.
