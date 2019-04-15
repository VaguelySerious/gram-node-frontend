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

export const isObject = function (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

export const mergeDeep = function (target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
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
  ret.setUTCHours(arr[0]);
  ret.setUTCMinutes(arr[1]);
  return ret;
}

export const timeWithin = function (time, from, to) {
  // If overnight, carry over to next day
  if (from > to) {
    const oneDay = 86400000;
    to = new Date(to.getTime() + oneDay);
    if (time < from) {
      time = new Date(time.getTime() + oneDay);
    }
  }
  return from < time && time < to;
}

export const isActiveHours = function (activeHours) {
  if (!Array.isArray(activeHours) || activeHours.length !== 2 || !activeHours.reduce((a, acc) => a && acc, true)) {
    return true;
  }

  const hoursFromTo = activeHours.map(getTimeFromHours);
  if (!timeWithin(new Date(), hoursFromTo[0], hoursFromTo[1])) {

    return false;
  }
  return true;
}