from django.urls import path
from . import views

#need to have urls forwarded from backend/urls to here

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]
