import uuidv4 from 'uuid/v4';

// Cache UUID in LocalStorage, remember users bases on this
export const generateUserID = function () {
  let user;
  try {
    user = localStorage.getItem('user');
    if (user) {
      console.log('Remembered user', user);
    } else {
      user = uuidv4();
      localStorage.setItem('user', user);
      console.log('Created new user', user);
    }
  } catch (e) {
    user = uuidv4();
    console.log('Created temporary user (check if site allows localStorage)');
  }
  return user;
}