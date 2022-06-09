import uuid
from rest_framework import viewsets

from .models import Board, Column, Card, Task, Label
from .serializers import (
    BoardSerializer,
    BoardFullSerializer,
    CardSerializer,
    ColumnSerializer,
    TaskSerializer,
    LabelSerializer,
)


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    lookup_field = "id"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BoardFullSerializer
        return BoardSerializer


class ColumnViewSet(viewsets.ModelViewSet):
    serializer_class = ColumnSerializer

    def get_queryset(self):
        user = self.request.user
        if self.action == "create":
            id = uuid.UUID(self.request.data.get("board"))
            return Column.objects.filter(board=id)
        return Column.objects.filter(board__owner=user.id)

    def create(self, request, pk=None, *args, **kwargs):
        board = self.request.data.get("board")
        order = Column.objects.filter(board=board).count() + 1
        self.request.data["order"] = order
        return super().create(request, *args, **kwargs)


class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer

    def get_queryset(self):
        user = self.request.user
        return Card.objects.filter(column__board__owner=user.id)

    def create(self, request, pk=None, *args, **kwargs):
        column = self.request.data.get("column")
        order = Card.objects.filter(column=column).count() + 1
        self.request.data["order"] = order
        return super().create(request, *args, **kwargs)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class LabelViewSet(viewsets.ModelViewSet):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()
