from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import UserViewSet, MyTokenObtainPairView


users_router = SimpleRouter()
users_router.register("accounts", UserViewSet, basename="user")

urlpatterns = [
    path("login", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
