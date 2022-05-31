from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    UserSerializer,
    UserRegisterSerializer,
    MyTokenObtainPairSerializer,
)
from .models import User


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action in ["create"]:
            return UserRegisterSerializer
        return UserSerializer

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        return super().update(request, *args, **kwargs)
