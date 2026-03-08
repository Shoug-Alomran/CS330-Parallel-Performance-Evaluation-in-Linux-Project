(() => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const emptySearchKeys = ["q", "query"];

  let mutated = false;

  for (const key of emptySearchKeys) {
    if (params.has(key) && !(params.get(key) || "").trim()) {
      params.delete(key);
      mutated = true;
    }
  }

  if (mutated) {
    const nextSearch = params.toString();
    const cleanUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ""}${url.hash}`;
    window.history.replaceState({}, "", cleanUrl);
  }
})();
