(() => {
  "use strict";

  const photos = window.LAB_GALLERY || [];
  const preview = document.getElementById("gallery-preview");
  const target = preview || document.getElementById("gallery-list");

  if (!target) return;

  function makeLink(text, href) {
    const a = document.createElement("a");
    a.textContent = text;
    a.href = href;
    return a;
  }

  const items = preview ? photos.slice(0, 6) : photos;

  items.forEach(photo => {
    if (!photo.image) return;

    const card = document.createElement("figure");
    card.className = "gallery-card";

    const imageLink = makeLink(
      "",
      preview ? "gallery.html" : photo.image
    );
    imageLink.className = "gallery-photo";

    if (!preview) {
      imageLink.target = "_blank";
      imageLink.rel = "noopener";
    }

    const image = document.createElement("img");
    image.src = photo.image;
    image.alt = photo.caption || "PRISM Lab activity";
    image.loading = "lazy";
    imageLink.append(image);

    const caption = document.createElement("figcaption");

    const description = document.createElement("p");
    description.className = "gallery-caption";
    description.textContent = photo.caption || "PRISM Lab activity";
    caption.append(description);

    if (/^\d{4}-\d{2}-\d{2}$/.test(photo.date || "")) {
      const time = document.createElement("time");
      time.dateTime = photo.date;
      time.textContent = new Date(
        photo.date + "T12:00:00Z"
      ).toLocaleDateString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      caption.append(time);
    }

    const actions = document.createElement("div");
    actions.className = "gallery-actions";

    if (preview) {
      actions.append(makeLink("View gallery →", "gallery.html"));
    } else {
      const view = makeLink("View full image →", photo.image);
      view.target = "_blank";
      view.rel = "noopener";

      const download = makeLink("Download ↓", photo.image);
      download.setAttribute("download", "");

      actions.append(view, download);
    }

    caption.append(actions);
    card.append(imageLink, caption);
    target.append(card);
  });

  if (!target.children.length) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "Lab activity photos will be added here.";
    target.append(message);
  }

  if (preview) {
    const controls = document.getElementById("gallery-controls");
    const previous = document.getElementById("gallery-previous");
    const next = document.getElementById("gallery-next");

    if (!controls || !previous || !next) return;

    function updateControls() {
      const maximum = preview.scrollWidth - preview.clientWidth;
      controls.hidden = maximum <= 1;
      previous.disabled = preview.scrollLeft <= 1;
      next.disabled = preview.scrollLeft >= maximum - 1;
    }

    function move(direction) {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      preview.scrollBy({
        left: direction * preview.clientWidth * 0.85,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    }

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    preview.addEventListener("scroll", updateControls);
    window.addEventListener("resize", updateControls);

    preview.querySelectorAll("img").forEach(image => {
      image.addEventListener("load", updateControls);
    });

    updateControls();
  }
})();