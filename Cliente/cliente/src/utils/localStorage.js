
function setLocalStorage(key, value) {
    
      window.localStorage.setItem(key, JSON.stringify(value));

  }
  
  function getLocalStorage(key, initialValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }

  export {setLocalStorage, getLocalStorage}
