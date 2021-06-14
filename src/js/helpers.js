import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchURL = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchURL, timeout(TIME_OUT)]);
    const data = await res.json();
    if (!res.ok) throw Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};

/*

export const getJSON = async function (url) {
  try {
    const fetchURL = fetch(url);
    const res = await Promise.race([fetchURL, timeout(TIME_OUT)]);
    const data = await res.json();
    if (!res.ok) throw Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchURL = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchURL, timeout(TIME_OUT)]);
    const data = await res.json();
    if (!res.ok) throw Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    // console.log(err);
    throw err;
  }
};
*/
