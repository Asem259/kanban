from rest_framework import serializers
from .models import Board, Column, Card, Label, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        extra_kwargs = {"card": {"write_only": True}}


class LabelSerializer(serializers.ModelSerializer):
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())

    class Meta:
        model = Label
        fields = "__all__"


class CardSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField(read_only=True)
    labels = LabelSerializer(read_only=True, many=True)
    column = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())

    class Meta:
        model = Card
        fields = [
            "id",
            "column",
            "title",
            "description",
            "labels",
            "tasks",
            "order",
            "total_tasks",
            "completed_tasks",
        ]
        extra_kwargs = {"column": {"write_only": True}}

    def get_tasks(self, obj):
        queryset = obj.task_set.all()
        tasks = TaskSerializer(queryset, many=True).data
        return tasks


class ColumnSerializer(serializers.ModelSerializer):
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())
    cards = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Column
        fields = ["id", "title", "order", "board", "background", "cards"]

    def get_cards(self, obj):
        cards_set = obj.card_set.all()
        cards_id = [card.id for card in cards_set]
        return cards_id


class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Board
        fields = ["id", "title", "owner", "is_favorite"]


class BoardFullSerializer(serializers.ModelSerializer):
    columns = serializers.SerializerMethodField(read_only=True)
    labels = serializers.SerializerMethodField(read_only=True)
    cards = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Board
        fields = ["id", "title", "columns", "is_favorite", "labels", "cards"]

    def get_columns(self, obj):
        queryset = obj.column_set.all()
        cols = ColumnSerializer(queryset, many=True).data
        return cols

    def get_labels(self, obj):
        queryset = obj.label_set.all()
        labels = LabelSerializer(queryset, many=True).data
        return labels

    def get_cards(self, obj):
        id = obj.id
        queryset = Card.objects.all().filter(column__board__id=id)
        cards = CardSerializer(queryset, many=True).data
        return cards
