export const gotoElementById = (url: string) => {
  const element = document.getElementById(url);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }
};
