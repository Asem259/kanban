import uuid
from django.db import models
from django.conf import settings


# Create your models here.


class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_favorite = models.BooleanField(default=False)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Column(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField()
    background = models.CharField(max_length=9, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    board = models.ForeignKey("Board", on_delete=models.CASCADE)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Card(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField()
    created_At = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    labels = models.ManyToManyField("Label", null=True, blank=True)
    column = models.ForeignKey("Column", on_delete=models.CASCADE)

    class Meta:
        ordering = ["order"]

    @property
    def tasks_count(self):
        return self.task_set.count()

    def __str__(self):
        return self.title


class Label(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    color = models.CharField(max_length=9)
    name = models.CharField(max_length=100)
    board = models.ForeignKey("Board", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    order = models.PositiveIntegerField()
    created_At = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    card = models.ForeignKey("Card", on_delete=models.CASCADE)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.description
