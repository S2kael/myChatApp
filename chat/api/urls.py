from django.urls import path

from . import views


urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('signin/', views.SignInView.as_view(), name='signin'),
    path('user/', views.UserView.as_view(), name='user'),
    path('search/', views.SearchFriend.as_view(), name='search')
]