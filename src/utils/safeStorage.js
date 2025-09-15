// // utils/safeStorage.js
// let memoryStore = {};

// export const safeStorage = {
//   getItem(key) {
//     try {
//       return window.localStorage.getItem(key);
//     } catch (e) {
//       console.warn("localStorage blocked, returning null",e);
//       return memoryStore[key] || null;
//     }
//   },
//   setItem(key, value) {
//     try {
//       window.localStorage.setItem(key, value);
//     } catch (e) {
//       console.warn("localStorage blocked, skipping save",e);
//       memoryStore[key] = value;
//     }
//   },
//   removeItem(key) {
//     try {
//       window.localStorage.removeItem(key);
//     } catch (e) {
//       console.warn("localStorage blocked, skipping remove",e);
//       delete memoryStore[key];
//     }
//   },
// };


export const safeStorage = {
  getItem(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("localStorage blocked, returning null", e);
    }
    return null;
  },
  setItem(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("localStorage blocked, skipping save", e);
    }
  },
  removeItem(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("localStorage blocked, skipping remove", e);
    }
  },
};
