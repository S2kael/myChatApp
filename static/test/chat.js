var roomName = {{ room_name_json }};

var chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/' + roomName + '/');

chatSocket.onopen = function () {
    fetch_messages();
}
chatSocket.onmessage = function (e) {
    var data = JSON.parse(e.data);
    var message = data['message']['content'];
    console.log(message);
    var messagebox = "<li>"
    messagebox += "<img src=\"" + { % static
    'test/avatar-male-3.jpg' %
}
    +"\" alt=\"hình đại diện\">";
    messagebox += "<div class=\"content\">";
    messagebox += "<div class=\"message\">"
    messagebox += "<div class=\"bubble\">";
    messagebox += "<p>";
    messagebox += "<font style=\"vertical-align: inherit;\">";
    messagebox += "<font style=\"vertical-align: inherit;\">";
    messagebox += message;
    messagebox += "</font>";
    messagebox += "</p>";
    messagebox += "</div>";
    messagebox += "</div>";
    messagebox += "<span>";
    messagebox += "<font style=\"vertical-align: inherit;\">";
    messagebox += "<font style=\"vertical-align: inherit;\">08:20 tối</font>"
    messagebox += "</font>";
    messagebox += "</span>";
    messagebox += "</div>";
    messagebox += "</div>";
    document.querySelector('#chat-log').innerHTML += messagebox;
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

$('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        $('#chat-message-submit').click();
    }
};

function fetch_messages() {
    chatSocket.send(JSON.stringify({
        'command': "fetch_messages",
        'group': roomName
    }));
}

$('#chat-message-submit').click(function () {
    var messageInputDom = document.querySelector('#chat-message-input');
    var content = messageInputDom.value;
    console.log(content);
    var message = {
        group: roomName,
        content: content
    }
    chatSocket.send(JSON.stringify({
        'message': message,
        'command': "new_message",
    }));

    messageInputDom.value = '';
});