import uuid
from rest_framework import viewsets

from .models import Board
from .serializers import (
    BoardSerializer,
    BoardFullSerializer,
)


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    lookup_field = "id"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BoardFullSerializer
        return BoardSerializer
