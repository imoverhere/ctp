"""
URL configuration for addressbook project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]

from django.urls import path, include
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordResetView,
    PasswordResetConfirmView, PasswordChangeView
)
from dj_rest_auth.registration.views import RegisterView
from contacts.views import contacts


urlpatterns = [
    path('api/login/', LoginView.as_view(), name='account_login'),
    path('api/logout/', LogoutView.as_view(), name='account_logout'),
    path('api/password/reset/', PasswordResetView.as_view(), name='account_password_reset'),
    path('api/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='account_password_reset_confirm'),
    path('api/password/change/', PasswordChangeView.as_view(), name='account_password_change'),
    path('api/register/', RegisterView.as_view(), name='account_register'),
    path('api/', include('dj_rest_auth.urls')),
    path('contacts/<int:id>/', contacts, name='contact_list_create_delete'),
    path('contacts/', contacts, name='contact_list'),

]
