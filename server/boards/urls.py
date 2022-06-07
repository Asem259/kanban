from rest_framework.routers import DefaultRouter, SimpleRouter


from .views import BoardViewSet, ColumnViewSet, CardViewSet


boards_router = SimpleRouter(trailing_slash=False)

boards_router.register("boards", BoardViewSet, basename="boards")
boards_router.register("columns", ColumnViewSet, basename="columns")
boards_router.register("cards", CardViewSet, basename="card")
