function getThemePrefers () : string|null {

  if (localStorage?.getItem("theme")) {
      return localStorage.getItem("theme");
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
}

function setDarkMode (document:Document) {

  if ((localStorage?.getItem("theme") == "dark") 
  || window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  }

  document.documentElement.classList.remove("dark");
}

function handleToggleClick () {
  const element = document.documentElement;
  element.classList.toggle("dark");
  element.classList.toggle("light");

  const isDark = element.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("astro:page-load", () => {

    const theme = getThemePrefers();

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    if(theme) {
      window.localStorage.setItem("theme", theme );
    }

    document.getElementById("themeToggle")?.addEventListener("click", handleToggleClick);
  });

document.addEventListener('astro:after-swap', () => {

    if(localStorage.theme === 'dark'){
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light");
    }
    else{
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light")
    }
  });