# myapp/models.py

import uuid
import time_uuid
from cassandra.cqlengine import columns

from django.utils import timezone
from django_cassandra_engine.models import DjangoCassandraModel
from datetime import datetime
import bcrypt




class GroupMessage(DjangoCassandraModel):
    groupid = columns.Text(partition_key=True)
    id = columns.BigInt(primary_key=True)
    author = columns.UUID()
    content = columns.Text(required=True)
    attach = columns.Text()
    image = columns.Text()
    available = columns.Boolean()
    created_at = columns.DateTime(default= datetime.now())
    updated_at = columns.DateTime()

    class Meta:
        get_pk_field = 'groupid'

    def __str__(self):
        return self.author

    @staticmethod
    def last_30_messages(groupid):
        return GroupMessage.objects.filter(groupid=groupid).order_by('-id')[:30]

    @staticmethod
    def last_messages(groupid):
        return GroupMessage.objects.filter(groupid=groupid).order_by('-id')[:1]

    @staticmethod
    def get_list_groups():
        return GroupMessage.objects.distinct(['groupid']).order_by('created_at')

class User(DjangoCassandraModel):
    email = columns.Text(primary_key=True)
    userid = columns.UUID(default=uuid.uuid4())
    username = columns.Text()
    password = columns.Text()
    fullname = columns.Text()
    address = columns.Text()
    avatar = columns.Text()
    friends = columns.Set(columns.UUID())
    groups = columns.Set(columns.UUID())
    created_at = columns.DateTime(default=datetime.now())
    updated_at = columns.DateTime()

    @staticmethod
    def getUser(userid):
        user = User.objects.filter(userid=userid)
        if len(user) == 0:
            return dict({
                'success': False,
                'message': "Does not exists user",
                'email': None
            })
        else:
            return dict({
                'success': True,
                'email': user[0]['email'],
                'userid': str(user[0]['userid']),
                'username': user[0]['username'],
                'avatar': user[0]['avatar'],
                'fullname': user[0]['fullname']
            })


    @staticmethod
    def checkUser(email, password):
        user = User.objects.filter(email=email)
        if len(user) == 0:
            return dict({
                'success': False,
                'message': "Does not exists user",
                'email': None
            })
        else:
            org_psw = str(user[0].password).encode('utf=8')
            crt_psw = str(password).encode('utf-8')
            if (bcrypt.checkpw(crt_psw,org_psw) != True):
                return dict({
                    'success': False,
                    'message': "Does not match Password",
                    'email': None
                })
            else:
                return dict({
                    'success': True,
                    'message': "Register Success",
                    'email': user[0]['email'],
                    'userid': str(user[0]['userid']),
                    'username': user[0]['username'],
                    'avatar': user[0]['avatar'],
                    'fullname': user[0]['fullname'],
                })

    @staticmethod
    def createUser(email, username, password, fullname, avatar):
        user = User.objects.filter(email=email)
        if len(user) != 0:
            return dict({
                'success': False,
                'message': "Email exists",
                'email': None
            })
        else:
            psw = password.encode('utf-8')
            hashed = bcrypt.hashpw(psw, bcrypt.gensalt())
            User.objects.create(
                email=email,
                username=username,
                password=hashed.decode('utf-8'),
                fullname=fullname,
                avatar=avatar,
                userid=uuid.uuid4(),
                created_at=datetime.now()
            )
            return dict({
                    'success': True,
                    'message': "Register confirm",
                    'email': email
                })

    @staticmethod
    def searchUser(data, type):
        if type == 1:
            users = User.objects.filter(email=data)
        else:
            data = "%" + data + "%"
            users = User.objects.filter(username__like=data)
        if len(users) == 0:
            return dict({
                'success': False,
                'message': "Don't exists user"
            })
        else:
            result = {}
            for user in users:
                detail = {
                    "username": user.username,
                    "email": user.email,
                    "avatar": user.avatar,
                    "fullname": user.fullname
                }
                tmp = {str(user.userid): detail}
                result.update(tmp)
            return dict({
                'success': True,
                'result': result
            })