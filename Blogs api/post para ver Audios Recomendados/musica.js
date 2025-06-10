const container = document.getElementById("blog-container");
    const loadMoreBtn = document.getElementById("load-more");

    const baseUrl = "https://api.cloverspace.io/f/v1/blogs?type=recommend&rcmdBlogLabel=music&size=10";
    let nextPageToken = null;

    function loadAudios() {
      let url = baseUrl;
      if (nextPageToken) {
        url += `&pageToken=${encodeURIComponent(nextPageToken)}`;
      }

      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

      fetch(proxyUrl)
        .then(res => res.json())
        .then(data => {
          const json = JSON.parse(data.contents);
          const posts = json.list || [];

          if (posts.length === 0) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = "No hay más audios";
            return;
          }

          nextPageToken = json.pagination?.nextPageToken || null;
          if (!nextPageToken) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = "No hay más audios";
          }

          posts.forEach(post => {
            const title = post.title || "";
            const content = post.content || "";

            const media = post.mediaList?.[0];
            const audioUrl = media?.resourceList?.[0]?.url || media?.baseUrl || null;

            const author = post.author || {};
            const nickname = author.nickname || "Desconocido";
            const uid = BigInt(author.uid || 0).toString();

            const card = document.createElement("div");
            card.className = "card";

            const audioHTML = audioUrl ? `<audio controls src="${audioUrl}"></audio>` : "";
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

            card.innerHTML = `${titleHTML}${descHTML}${audioHTML}${authorHTML}`;
            container.appendChild(card);
          });
        })
        .catch(err => {
          container.innerHTML = `<p style="color: red;">Error al cargar audios: ${err.message}</p>`;
          console.error("Error al cargar audios:", err);
          loadMoreBtn.disabled = true;
        });
    }

    loadAudios();
    loadMoreBtn.addEventListener("click", loadAudios);
