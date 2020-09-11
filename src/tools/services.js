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