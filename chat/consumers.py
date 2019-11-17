from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import GroupMessage

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    lastMessage = 0;

    def fetch_messages(self, data):
        messages = GroupMessage.last_30_messages(data['group'])
        messages = list(reversed(messages))
        content = self.messages_to_json(messages)
        self.send_message(content)

    def new_message(self, data):
        groupid = data['message']['group']
        self.lastMessage = self.lastMessage + 1
        message = GroupMessage.objects.create(
            groupid=groupid,
            id=self.lastMessage,
            content=data['message']['content']
        )
        content = {
            'command': "new_message",
            'message': self.message_to_json(message)
        }
        print(data['command'] + ' function')
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(
                {'message': self.message_to_json(message)}
            )
        return result

    def message_to_json(self, message):
        self.lastMessage = message.id
        return {
            'groupid': message.groupid,
            'id': message.id,
            'author': message.author,
            'content': message.content,
            'attach': message.attach,
            'image': message.image,
            'available': message.available,
            'created_at': str(message.created_at),
            'updated_at': str(message.updated_at)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        print(message)

    def send_message(self, messages):
        for message in messages:
            self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))