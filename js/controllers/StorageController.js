export default class StorageController {
  updateSessionStorage(prop, value) {
    sessionStorage.setItem(prop, value);
  }

  updateLocalStorage(prop, value) {
    localStorage.setItem(prop, value);
  }
}
