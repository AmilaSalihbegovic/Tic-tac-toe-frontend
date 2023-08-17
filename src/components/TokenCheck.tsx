export const checkTokenExpiration = () => {
    const token = sessionStorage.getItem("UserToken");
    const tokenTimestamp = sessionStorage.getItem("TokenTimestamp");
    
    if (token && tokenTimestamp) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - Number(tokenTimestamp);
      const expirationTime = 3600000; // 1 hour in milliseconds
      
      if (timeElapsed >= expirationTime) {
        sessionStorage.removeItem("UserToken");
        sessionStorage.removeItem("TokenTimestamp");
      }
    }
  };