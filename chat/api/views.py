from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from django.views import View
from rest_framework.generics import ListAPIView

from ..models import User, GroupMessage
from rest_framework.views import APIView
from .serializers import UserSerializer
import json
import random


# Create your views here.

avatars = ['avatar-female-1.jpg', 'avatar-female-2.jpg', 'avatar-female-3.jpg', 'avatar-male-1.jpg', 'avatar-male-2.jpg',
          'avatar-male-3.jpg', 'avatar-male-4.jpg', 'avatar-male-5.jpg', 'avatar-male-6.jpg']


class UserList(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return HttpResponse(json.dumps(serializer.data))
    def post(self):
        pass

def groups_to_json(groups):
    result = []
    for group in groups:
        result.append(
            group_to_json(group)
        )
    return result

def group_to_json(group):
    return {
        group.groupid
    }

def last_message(message):
    if message[0].author=="":
        return {
            'groupid': message[0].groupid,
            'content': ""
        }
    else:
        return {
            'groupid': message[0].groupid,
            'content': message[0].content
        }

def list_last_message():
    groups = groups_to_json(GroupMessage.get_list_groups())
    result = []
    for group in groups:

        for groupid in group:
            result.append(
                last_message(GroupMessage.last_messages(groupid))
            )
    return result

class RoomView(View):
    def get(self, request, room_name):
        if request.session.has_key('email'):
            messages = GroupMessage.last_30_messages(room_name)
            if len(messages) == 0:
                GroupMessage.objects.create(
                    groupid=room_name,
                    id=0,
                    content='None',
                    author='',
                    created_at=datetime.now()
                )
            return render(request, 'pages/chat/room.html', {
                'room_name_json': mark_safe(json.dumps(room_name)),
                'email': request.session['email'],
                'list_group': groups_to_json(GroupMessage.get_list_groups()),
                'list_last_message': list_last_message()
            })
        else:
            return redirect('signin')

    def post(self, request):
        room_name = request.POST.get('roomname')
        messages = GroupMessage.last_30_messages(room_name)
        if len(messages) == 0:
            GroupMessage.objects.create(
                groupid=room_name,
                id=0,
                content='None',
                author='',
                created_at=datetime.now()
            )
        return redirect('room', room_name)

def getListUser():
    users = User.objects.all()
    # if len(user) == 0:
    #     return dict({
    #         'success': False,
    #         'message': "Does not exists user",
    #         'email': None
    #     })
    # else:

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
    return result

class UserView(ListAPIView):
    def post(self, request):
        result = getListUser()
        return HttpResponse(json.dumps(result))

class SignInView(ListAPIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        res = User.checkUser(email, password)
        return HttpResponse(json.dumps(res))


class RegisterView(ListAPIView):
    def post(self, request):
        data = request.data
        email = data['email']
        username = data['username']
        fullname = data['fullname']
        password = data['password']
        length = len(avatars)
        index = random.randrange(length)
        avatar = avatars[index]
        avatar = "/asset/images/" + avatar
        res = User.createUser(email=email, username=username, password=password, fullname=fullname, avatar=avatar)
        return HttpResponse(json.dumps(res))

class SearchFriend(ListAPIView):
    def post(self, request):
        data = request.data
        res = User.searchUser(data=data['search'], type=data['type'])
        # user = User.objects.filter(email=data['search'])
        # res = dict({
        #     'success': True,
        #     'message': "Email exists",
        #     'email': user[0].email
        # })
        return HttpResponse(json.dumps(res))
