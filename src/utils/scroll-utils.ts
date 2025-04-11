/**
 * Utility function to scroll to a specific element by ID with smooth behavior
 * @param elementId - The ID of the element to scroll to (without the # prefix)
 */
export const scrollToElement = (elementId: string): void => {
  // Remove the # if it's included in the elementId
  const id = elementId.startsWith("#") ? elementId.substring(1) : elementId;

  // Find the element
  const element = document.getElementById(id);

  // If element exists, scroll to it
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Handles navigation to a section, either on the current page or after navigating to a new page
 * @param path - The path with hash to navigate to (e.g., "/#services-section")
 */
export const navigateToSection = (path: string): void => {
  // Check if the path contains a hash
  const hasHash = path.includes("#");

  if (hasHash) {
    const [pagePath, hash] = path.split("#");

    // If we're already on the correct page, just scroll
    if (
      window.location.pathname === pagePath ||
      (pagePath === "/" && window.location.pathname === "/")
    ) {
      scrollToElement(hash);
    } else {
      // Otherwise, we need to navigate and then scroll
      // This is handled by the router in the component
    }
  }
};
