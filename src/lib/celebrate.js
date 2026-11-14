export function celebrate(element, count = 40) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  celebrateAt(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}

export function celebrateAt(x, y, count = 80) {
  window.dispatchEvent(
    new CustomEvent("ijeoma:confetti", { detail: { x, y, count } })
  );
}
