export async function interceptedFetch(url: string, options: any, accessToken?: string) {
  const modifiedOptions = { ...options };

  if (!modifiedOptions.headers || !modifiedOptions.headers.skipInterceptor) {
    if (accessToken) {
      modifiedOptions.headers = new Headers(modifiedOptions.headers || {});
      modifiedOptions.headers.append("Authorization", `Bearer ${accessToken}`);
    }
  }

  if (modifiedOptions.headers && modifiedOptions.headers.skipInterceptor) {
    modifiedOptions.headers.delete("skipInterceptor");
  }

  return fetch(url, modifiedOptions);
}
