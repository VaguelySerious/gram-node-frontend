import uuidv4 from "uuid/v4";

// Cache UUID in LocalStorage, remember users bases on this
export const getUserID = function() {
  let user;
  try {
    user = localStorage.getItem("user");
    if (user) {
      console.log("Remembered user", user);
    } else {
      user = uuidv4();
      localStorage.setItem("user", user);
      console.log("Created new user", user);
    }
  } catch (e) {
    user = uuidv4();
    console.log("Created temporary user (check if site allows localStorage)");
  }
  return user;
};

export const objectFallback = function(original, fallback) {
  return Object.assign(fallback, original);
};

export const formatParams = function(params) {
  return "?" + Object
    .keys(params)
    .map(function(key){
      return key+"="+encodeURIComponent(params[key])
    })
    .join("&")
}

export const getTimeFromHours = function(hourMinutes) {
  const arr = hourMinutes.split(':');
  let ret = new Date();
  ret.setHours(arr[0]);
  ret.setMinutes(arr[1]);
  return ret;
}

export const timeWithin = function (from, to) {
  let now = new Date();
  // If overnight, carry over to next day
  if (from > to) {
    const oneDay = 86400000;
    to = new Date(to.getTime() + oneDay);
    if (now < from) {
      now = new Date(now.getTime() + oneDay);
    }
  }
  return from < now && now < to;
}