from django.contrib import admin
from .models import Board, Card, Column, Task, Label


models = [Card, Column, Task, Label]
admin.site.register(models)


@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at", "owner")
