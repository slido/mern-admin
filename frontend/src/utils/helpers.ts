export const itemFromStorage = (item:string) => localStorage.getItem(item)
  ? JSON.parse(localStorage.getItem(item)!)
    : null;
  