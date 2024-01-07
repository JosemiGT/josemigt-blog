function getThemePrefers () : string|null {

  if (typeof localStorage !== "undefined" 
  && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
}

function setThemePrefers (themePrefers:string|null) {

  if(!themePrefers) {
    return;
  }

  window.localStorage.setItem("theme", themePrefers);
}

function handleToggleClick () {
  const element = document.documentElement;
  element.classList.toggle("dark");

  const isDark = element.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("astro:page-load", () => {

    const theme = getThemePrefers();

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    if(theme) {
      window.localStorage.setItem("theme", theme );
    }

    document.getElementById("themeToggle")?.addEventListener("click", handleToggleClick);
  });

document.addEventListener('astro:after-swap', () => {
    localStorage.theme === 'dark'
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.add("light");
  });