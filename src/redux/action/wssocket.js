const url = 'http://localhost:8080';
let stompClient;
let selectedUser;
let newMessages = new Map();

function connectToChat(userName) {
  console.log('connecting to chat...');
  let socket = new SockJS(url + '/chat');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    console.log('connected to: ' + frame);
    stompClient.subscribe('/topic/messages/' + userName, function(response) {
      let data = JSON.parse(response.body);
      if (selectedUser === data.fromLogin) {
        render(data.message, data.fromLogin);
      } else {
        newMessages.set(data.fromLogin, data.message);
        $('#userNameAppender_' + data.fromLogin).append(
          '<span id="newMessage_' +
            data.fromLogin +
            '" style="color: red">+1</span>',
        );
      }
    });
  });
}

function sendMsg(from, text) {
  stompClient.send(
    '/app/chat/' + selectedUser,
    {},
    JSON.stringify({
      fromLogin: from,
      message: text,
    }),
  );
}
