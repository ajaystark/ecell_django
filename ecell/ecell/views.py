from django.views import generic
from django.shortcuts import render
import os
class homepage(generic.View):
    template="home.html"
    def get(self,request):
        # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        # print('base dir',BASE_DIR)
        return render(request,self.template)
class pitchcafe(generic.View):
    template="pitchcafe.html"
    def get(self,request):
        return render(request,self.template)
class ecell(generic.View):
    template="ecell.html"
    def get(self,request):
        return render(request,self.template)
class ecell_new(generic.View):
    template="new.html"
    def get(self,request):
        return render(request,self.template)
class ca(generic.View):
    template="campus.html"
    def get(self,request):
        return render(request,self.template)
class blog(generic.View):
    template="blog.html"
    def get(self,request):
        return render(request,self.template)
class blog1(generic.View):
    template="blog1.html"
    def get(self,request):
        return render(request,self.template)
class blog2(generic.View):
    template="blog2.html"
    def get(self,request):
        return render(request,self.template)
class proposal(generic.View):
    template="proposal.html"
    def get(self,request):
        return render(request,self.template)

class esummit(generic.View):
    template="esummit.html"
    def get(self,request,name):
        template='esummit/'+name+'.html'
        return render(request,template)
class countdown(generic.View):
    def get(self,request):
        template='esummit/countdown.html'
        return render(request,template)