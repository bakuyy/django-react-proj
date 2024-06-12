from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

#creating a serializer using ORM
#serializer: takes python object ot convert to JSON data/ vice versa
#ORM - object relational mapping, maps python objects to corresponding code needed to make a change in the db

#accepting JSON data like user/pw, returning JSON data about response to API to requester

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #built into Django
        fields = ["id", "username","password"] #parameters we want to serialize when accepting/returning 
        extra_kwargs = {"password":{"write_only":True}} #tells Django we want to accept password when creating a new user, but don't return when giving information about a user

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 
    #accept validated data that has passed checks from serializer, then passes into create

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title","content","created_at", "author"]
        extra_kwargs = {"author":{"read_only":True}} #can read who the author is, cannot write the author