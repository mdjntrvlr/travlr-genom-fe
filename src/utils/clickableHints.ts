const TARGET_CLASS = 'prototype-click-target'
const HIGHLIGHT_CLASS = 'prototype-click-target--highlight'

const restartHighlight = (element: Element) => {
  element.classList.remove(HIGHLIGHT_CLASS)
  // Force reflow so animation can replay on repeated invalid clicks.
  void (element as HTMLElement).offsetWidth
  element.classList.add(HIGHLIGHT_CLASS)
}

export const initClickableHints = () => {
  if (typeof document === 'undefined') {
    return
  }

  document.addEventListener('click', (event) => {
    const targetElement = event.target as Element | null
    if (!targetElement) {
      return
    }

    const clickedAllowedTarget = targetElement.closest(`.${TARGET_CLASS}`)
    if (clickedAllowedTarget) {
      return
    }

    const allAllowedTargets = document.querySelectorAll(`.${TARGET_CLASS}`)
    allAllowedTargets.forEach(restartHighlight)
  })
}
