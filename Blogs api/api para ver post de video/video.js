const container = document.getElementById("blog-container");
const loadMoreBtn = document.getElementById("load-more");

// URL base de la API (sin proxy)
const baseUrl = "https://api.cloverspace.io/f/v1/blogs?type=recommend&rcmdBlogLabel=video&size=5";

// Token para paginación
let nextPageToken = null;

function loadVideos() {
  let url = baseUrl;
  if(nextPageToken) {
    url += `&pageToken=${encodeURIComponent(nextPageToken)}`;
  }

  // URL final con proxy
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  // Mostrar la URL real de la API (sin proxy)
  console.log("Petición a la API (real):", url);
  // Mostrar la URL usada en fetch (con proxy)
  console.log("Petición con proxy (fetch):", proxyUrl);

  fetch(proxyUrl)
    .then(res => res.json())
    .then(data => {
      const json = JSON.parse(data.contents);
      const posts = json.list || [];

      if (posts.length === 0) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No hay más videos";
        return;
      }

      nextPageToken = json.pagination?.nextPageToken || null;
      if (!nextPageToken) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No hay más videos";
      }

      posts.forEach(post => {
        const title = post.title || "";
        const content = post.content || "";

        const media = post.mediaList?.[0];
        const video = media?.resourceList?.[0]?.url || null;
        const poster = media?.cover?.resourceList?.[0]?.url || "";

        const author = post.author || {};
        const nickname = author.nickname || "Desconocido";
        const uid = BigInt(author.uid || 0).toString();

        const card = document.createElement("div");
        card.className = "card";

        const videoHTML = video ? `
          <video controls poster="${poster}">
            <source src="${video}" type="video/mp4">
            Tu navegador no soporta videos.
          </video>
        ` : "";

        const titleHTML = title ? `<h3>${title}</h3>` : "";
        const descHTML = content ? `<p>${content}</p>` : "";

        const authorHTML = `
          <div class="author">
            <span>${nickname}</span>
            <div>
              <button onclick="window.open('https://clover.social/user/${uid}', '_blank')">Ver perfil</button>
              <button onclick="alert('UID del autor: ${uid}')">Ver UID</button>
            </div>
          </div>
        `;

        card.innerHTML = `${videoHTML}${titleHTML}${descHTML}${authorHTML}`;
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = `<p style="color: red;">Error al cargar datos: ${err.message}</p>`;
      console.error("Error al cargar datos:", err);
      loadMoreBtn.disabled = true;
    });
}


// Carga inicial
loadVideos();

// Botón para cargar más videos
loadMoreBtn.addEventListener("click", () => {
  loadVideos();
});
