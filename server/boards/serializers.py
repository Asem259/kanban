from rest_framework import serializers
from .models import Board, Column, Label


class ColumnSerializer(serializers.ModelSerializer):
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())

    class Meta:
        model = Column
        fields = ["id", "title", "order", "board"]


class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Board
        fields = ["id", "title", "owner", "is_favorite"]


class BoardFullSerializer(serializers.ModelSerializer):
    columns = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Board
        fields = ["id", "title", "columns", "is_favorite"]

    def get_columns(self, obj):
        queryset = obj.column_set.all()
        cols = ColumnSerializer(queryset, many=True).data
        return cols
