import {getWS} from '../socket';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

export const sendMsg = data => async (dispatch, getState) => {
  const {sessionToken} = getState().user;
  const ws = getWS(sessionToken, 'rahul1');
  ws.sendMsg({message: 'Test', from: 'rahul'});
};
// //Send message
// export const sendMsg = data => {
//   return dispatch => {
//     console.log('actions send message');
//     dispatch(sentMsg(data));
//     ws.send(data);
//   };
// };

export const recieveMsg = data => {
  return dispatch => {
    console.log('actions receive message');
    dispatch(receivedMsg(data));
  };
};

const sentMsg = data => {
  return {
    type: MESSAGE_SENT,
    payload: data,
  };
};

const receivedMsg = data => {
  return {
    type: MESSAGE_RECEIVED,
    payload: data,
  };
};
