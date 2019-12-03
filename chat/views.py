from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from django.views import View
from .models import User, GroupMessage
from rest_framework.views import APIView
from .serializers import UserSerializer
import json


# Create your views here.

class UserList(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return HttpResponse(json.dumps(serializer.data))
    def post(self):
        pass


def index(request):
    return render(request, 'pages/index.html', {})

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


class LoginView(View):
    def get(self, request):
        if request.session.has_key('email'):
            return redirect('room', 'public')
        else:
            return render(request, 'pages/SignIn/SignIn.html')

    def post(self, request):
        if request.session.has_key('email'):
            return redirect('room', room_name="public")
        else:
            email = request.POST.get('email')
            password = request.POST.get('password')
            res = User.checkUser(email, password)
            if res.get("email") is not None:
                request.session['email'] = res.get('email')
                return redirect('room', room_name="public")
            else:
                return render(request, 'pages/SignIn/SignIn.html', {'message': res.get('message')})


class RegisterView(View):
    def get(self, request):
        if request.session.has_key('email'):
            return redirect('room', 'public')
        else:
            return render(request, 'pages/SignIn/Register.html')

    def post(self, request):
        if request.session.has_key('email'):
            return redirect('room', room_name="public")
        else:
            email = request.POST.get('email')
            username = request.POST.get('username')
            password = request.POST.get('psw')
            password_repeat = request.POST.get('psw-repeat')
            if password != password_repeat:
                return render(request, 'pages/SignIn/Register.html', {'message': 'Password and Repeat Password do not match'})
            else:
                res = User.createUser(email=email, username=username, password=password)
                if res.get("email") is not None:
                    request.session['email'] = res.get('email')
                    return redirect('room', room_name="public")
                else:
                    return render(request, 'pages/SignIn/Register.html', {'message': res.get('message')})


class SignOut(View):
    def get(self, request):
        if request.session.has_key('email'):
            request.session.clear()
        return redirect('signin')
