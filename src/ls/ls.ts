const appName = "spotify";

const ls = {
  set: (key: string, value: string) => {
    localStorage.setItem(`${appName}-${key}`, value);
  },
  get: (key: string) => {
    return localStorage.getItem(`${appName}-${key}`);
  },
  clear: () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes(appName)) {
        localStorage.removeItem(key);
      }
    });
  },
};

export default ls;