export const itemFromStorage = (item:any) => localStorage.getItem(item)
  ? JSON.parse(localStorage.getItem(item)!)
    : null;
  