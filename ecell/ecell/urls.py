"""ecell URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from ecell.views import *
from django.conf import settings
# from django.contrib.staticfiles import views
# from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('old',homepage.as_view(),name="home"),
    path('PitchCafe2.0',pitchcafe.as_view(),name="pitch cafe"),
    path('new',ecell.as_view(),name="ecell home"),
    path('',ecell_new.as_view(),name="new"),
    path('home',ecell_new.as_view(),name="home"),
    path('CA',ca.as_view(),name="CA"),
    path('blog',blog.as_view(),name="blog"),
    path('blog1',blog1.as_view(),name="blog1"),
    path('blog2',blog2.as_view(),name="blog2"),
    path('proposal',proposal.as_view(),name="proposal"),
    path('esummit',esummit.as_view(),name="esummit"),
    # path('blog1',blog1.as_view(),name="blog1"),
    # re_path(r'^static/(?P<path>.*)$', views.serve),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns+=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
