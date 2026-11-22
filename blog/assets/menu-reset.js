// Sobrescreve assets/menu-reset.js do hugo-book: mesma lógica (restaurar a rolagem
// do menu), mas sem quebrar quando o localStorage está bloqueado.
(function() {
  var menu = document.querySelector("aside .book-menu-content");
  if (!menu) return;
  addEventListener("beforeunload", function() {
    try { localStorage.setItem("menu.scrollTop", menu.scrollTop); } catch (e) {}
  });
  try { menu.scrollTop = localStorage.getItem("menu.scrollTop"); } catch (e) {}
})();
