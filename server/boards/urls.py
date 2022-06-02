from rest_framework.routers import DefaultRouter, SimpleRouter


from .views import BoardViewSet


boards_router = SimpleRouter(trailing_slash=False)

boards_router.register("boards", BoardViewSet, basename="boards")
