export function getItem(name: string) {
  if (!name || !hasItem(name)) {
    return null;
  }
  return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
}

export function setItem(name: string, value: string, expires: Date, path: string = '/') {
  if (!name || /^(?:expires|max\-age|path|domain|secure)$/.test(name)) {
    return;
  }
  let sExpires = "";
  if (expires) {
    switch (typeof expires) {
      case "number":
        sExpires = "; max-age=" + expires;
        break;
      case "object":
        if (expires.hasOwnProperty("toGMTString")) {
          sExpires = "; expires=" + expires.toUTCString();
        }
        break;
    }
  }
  document.cookie = escape(name) + "=" + escape(value) + sExpires + (path ? "; path=" + path : "");
}

export function removeItem(name: string) {
  if (!name || !hasItem(name)) {
    return;
  }
  const oExpDate = new Date();
  oExpDate.setDate(oExpDate.getDate() - 1);
  document.cookie = escape(name) + "=; expires=" + oExpDate.toUTCString() + "; path=/";
}

export function hasItem(name: string) {
  return (new RegExp("(?:^|;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}
