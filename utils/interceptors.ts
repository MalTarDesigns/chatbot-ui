export async function interceptedFetch(url: string, options: any) {
    const modifiedOptions = { ...options };
  
    // Check if the skipInterceptor header is not present
    if (!modifiedOptions.headers || !modifiedOptions.headers.skipInterceptor) {
      const token = localStorage.getItem("user"); // TODO: Update this to use the token from the store or local storage
  
      if (token) {
        modifiedOptions.headers = new Headers(modifiedOptions.headers || {});
        modifiedOptions.headers.append("Authorization", `Bearer ${token}`);
      }
    }
  
    // Remove the custom skipInterceptor header if present
    if (modifiedOptions.headers && modifiedOptions.headers.skipInterceptor) {
      modifiedOptions.headers.delete("skipInterceptor");
    }
  
    return fetch(url, modifiedOptions);
  }
  