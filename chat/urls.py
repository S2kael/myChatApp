
from . import views
from django.urls import path, include

urlpatterns = [
    # path('', views.index, name='index'),
    path('room/<str:room_name>/', views.RoomView.as_view(), name='room'),
    path('room/', views.RoomView.as_view(), name='createroom'),
    path('signin/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('signout/', views.SignOut.as_view(), name='signout'),
    path('api/', include('chat.api.urls'))
]