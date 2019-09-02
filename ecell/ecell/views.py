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

class test(generic.View):
    template="test.html"
    def get(self,request):
        return render(request,self.template)