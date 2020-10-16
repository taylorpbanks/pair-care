export const getUserInfo = () => {
    const storage = Object.entries(localStorage);

    console.log(storage);
    const match = storage.find((item) => {
        console.log(item);
        const key = item[0];
        console.log(key);
        console.log(key.substr(key.length - 8));
        return key.substr(key.length - 8) === 'userData';
    });

    return true;
}

export const compareStrings = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
    
        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];
    
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
}