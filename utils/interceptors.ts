import { useSession } from 'next-auth/react';

export async function interceptedFetch(url: string, options: any) {
  const { data: session } = useSession();
  
    const modifiedOptions = { ...options };
  
    // Check if the skipInterceptor header is not present
    if (!modifiedOptions.headers || !modifiedOptions.headers.skipInterceptor) {
      // const token = localStorage.getItem("user"); // TODO: Update this to use the token from the store or local storage
  
      if (session?.user) {
        modifiedOptions.headers = new Headers(modifiedOptions.headers || {});
        modifiedOptions.headers.append("Authorization", `Bearer ${session?.user?.accessToken}`);
      }
    }
  
    // Remove the custom skipInterceptor header if present
    if (modifiedOptions.headers && modifiedOptions.headers.skipInterceptor) {
      modifiedOptions.headers.delete("skipInterceptor");
    }
  
    return fetch(url, modifiedOptions);
  }
  