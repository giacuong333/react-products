class LocalStorage {
  static setStorage(key, obj) {
    const arr = this.getStorage(key);
    arr.push(obj);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  static getStorage(key) {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : [];
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static isSet(key) {
    return localStorage.getItem(key) ? true : false;
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
