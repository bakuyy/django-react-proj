from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
class CreateUserView(generics.CreateAPIView):  # auto creates new user/object
    queryset = User.objects.all()  # specifying objects when creating a new user to avoid repeats
    serializer_class = UserSerializer  # tells view what data we need to accept to create a new user
    permission_classes = [AllowAny]  # specifies who can call this (even if not authenticated)

class NoteListCreate(generics.ListCreateAPIView):  # list will list notes user created or create new note
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # can't call this route unless authenticated and you pass valid JWT token

    def get_queryset(self):  #
        user = self.request.user  # if you want to get user that's authenticated, gets user object -- use this user to filter notes
        return Note.objects.filter(author=user)  # filters notes only by that user

    def perform_create(self, serializer): 
        # override getquery 
        if serializer.is_valid():  # if serializer is valid data, save serializer (which makes in new version of the note)
            serializer.save(author=self.request.user)  # add author 
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  # here are valid notes you can delete, when specified- 
        user = self.request.user 
        return Note.objects.filter(author=user) 
