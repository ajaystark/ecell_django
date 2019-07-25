from django.views import generic
from django.shortcuts import render

class homepage(generic.View):
    template="home.html"
    def get(self,request):
        return render(request,self.template)