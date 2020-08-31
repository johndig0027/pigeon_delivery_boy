// export const WS_URL = 'wss://localhost:8080/chat';
// const ws = new WebSocket(WS_URL, [
//   'Authorization',
//   'bearer 53c974d0-26d0-45d4-9557-6568b36cfcc3',
// ]);
// export default ws;

export const getWS = (sessionToken, username) => {
  const WS_URL = 'http://localhost:8080/chat/' + username;
  const ws = new WebSocket(WS_URL, ['access_token', 'bearer ' + sessionToken]);
  return ws;
};

// export default getWS;
