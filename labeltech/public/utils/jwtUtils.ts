const decode = (token: string) => {
    try {
      return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
      console.warn("Error decoding token");
      return null;
    }
  }
  
  export { decode };
  