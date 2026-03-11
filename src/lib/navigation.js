export function navigate(path) {
  if (window.location.pathname === path) {
    window.dispatchEvent(new Event("codex:navigate"));
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("codex:navigate"));
}
