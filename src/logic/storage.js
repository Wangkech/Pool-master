export function saveToLocal(key, value) {
  localStorage.setItem(JSON.stringify(key, value));
}

export function getFromLocal(key) {
  let data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function checkLocal(key) {
  let data = getFromLocal(key);

  if (data) {
    return data;
  } else {
    return null;
  }
}

export function reloadEngineData(data, session) {
  let playerList = [];
  data.players.forEach((player) => {
    playerList.push(player);
  });
}
