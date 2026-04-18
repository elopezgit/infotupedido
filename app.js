const demoForm = document.getElementById("demoForm");
const playButton = document.getElementById("playVideo");
const videoFrame = document.getElementById("videoFrame");
const demoVideo = document.getElementById("demoVideo");

if (demoForm) {
  demoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const negocio = document.getElementById("negocio").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const texto = `Hola Esteban 👋
Vengo desde la landing de TuPedido y quiero seguir con mi demo.

📌 Nombre: ${nombre || "-"}
🏪 Negocio: ${negocio || "-"}
📱 WhatsApp: ${telefono || "-"}
💬 Consulta: ${mensaje || "-"}`;

    const url = `https://wa.me/5493813159106?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
}

if (playButton && videoFrame && demoVideo) {
  playButton.addEventListener("click", function () {
    if (!videoFrame.classList.contains("is-playing")) {
      const currentSrc = demoVideo.getAttribute("src");
      const autoplaySrc = currentSrc.includes("autoplay=1")
        ? currentSrc
        : `${currentSrc}${currentSrc.includes("?") ? "&" : "?"}autoplay=1`;

      demoVideo.setAttribute("src", autoplaySrc);
      videoFrame.classList.add("is-playing");
    }
  });
}