   const container = document.getElementById("blog-container");
const loadMoreBtn = document.getElementById("load-more");

const baseUrl = "https://api.cloverspace.io/f/v1/blogs?type=latest&size=10";
let nextPageToken = null;

function loadBlogs() {
  let url = baseUrl;
  if (nextPageToken) {
    url += `&pageToken=${encodeURIComponent(nextPageToken)}`;
  }

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

fetch(proxyUrl, {
  headers: {
"Accept-Language": 
      "es-MX,es-AR,es-CO,es-CL,es-PE,es-VE,es-EC,es-CR,es-UY,es-PA,es-DO" 
  }
})

  .then(res => res.json())
  .then(data => {
    const json = JSON.parse(data.contents);
    const posts = json.list || [];

    if (posts.length === 0) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = "No hay más contenido";
      return;
    }

    nextPageToken = json.pagination?.nextPageToken || null;
    if (!nextPageToken) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = "No hay más contenido";
    }

    posts.forEach(post => {
      const title = post.title || "";
      const content = post.content || "";

      const media = post.mediaList?.[0];
      const mediaType = media?.resourceList?.[0]?.type || media?.type || "";
      const mediaUrl = media?.resourceList?.[0]?.url || media?.baseUrl || null;
      const posterUrl = media?.cover?.resourceList?.[0]?.url || "";

      const author = post.author || {};
      const nickname = author.nickname || "Desconocido";
      const uid = BigInt(author.uid || 0).toString();

      const card = document.createElement("div");
      card.className = "card";

      let mediaHTML = "";
      if (mediaUrl) {
        if (mediaType === "video") {
          mediaHTML = `
            <video controls preload="metadata" ${posterUrl ? `poster="${posterUrl}"` : ""} style="max-width: 100%; height: auto;">
              <source src="${mediaUrl}" type="video/mp4">
              Tu navegador no soporta videos.
            </video>
          `;
        } else {
          mediaHTML = `<img src="${mediaUrl}" alt="Contenido" style="max-width: 100%; height: auto;">`;
        }
      }

      const titleHTML = title ? `<h3>${title}</h3>` : "";
      const descHTML = content ? `<p>${content}</p>` : "";

      const authorHTML = `
        <div class="author">
          <span>${nickname}</span>
          <div>
            <button onclick="window.open('https://clover.social/user/${uid}', '_blank')">Ver perfil</button>
          </div>
        </div>
      `;

      card.innerHTML = `${mediaHTML}${titleHTML}${descHTML}${authorHTML}`;
      container.appendChild(card);
    });
  })
  .catch(err => {
    container.innerHTML = `<p style="color: red;">Error al cargar contenido: ${err.message}</p>`;
    loadMoreBtn.disabled = true;
    console.error("Error al cargar contenido:", err);
  });
}

loadBlogs();
loadMoreBtn.addEventListener("click", () => loadBlogs());
