class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(room) {
        const path = 'ws://192.168.1.2:8000/ws/chat/'+room+'/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('WebSocket open');
            this.fetchMessages(room);
        };

        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
            if(document.querySelector("#scroll")){
                let objDiv = document.querySelector("#scroll");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed let's reopen");
            this.connect();
        };
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        this.callbacks['new_message'](parsedData.message);
    }

    fetchMessages(group) {
        if (group !== undefined){
            let data = {
                command: 'fetch_messages',
                group: group
            };
            this.sendMessage(data);
        }
    }

    newChatMessage(message) {
        this.sendMessage({
            command: 'new_message',
            message: message
        });
    }

    addCallbacks(newMessageCallback) {
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({
                ...data
            }));
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;