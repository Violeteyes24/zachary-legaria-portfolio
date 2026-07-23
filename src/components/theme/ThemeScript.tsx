/**
 * Inline script that runs before hydration to set the initial theme from
 * localStorage. This prevents a flash of the wrong theme (FOUC). Kept tiny and
 * dependency-free because it executes in the document <head>.
 */
const script = `(function(){try{var t=localStorage.getItem('zl-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
