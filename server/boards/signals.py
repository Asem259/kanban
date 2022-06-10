from django.db.models import Q, F
from django.db.models.signals import pre_delete, pre_save

from .models import Column, Card


def move_col(sender, instance, **kwargs):
    try:
        old_order = sender.objects.get(id=instance.id).order
        new_order = instance.order
        change = -1 if new_order > old_order else 1
        if old_order != new_order:
            query1 = Q(order__lte=max(new_order, old_order))
            query2 = Q(order__gte=min(new_order, old_order))
            query3 = Q(board=instance.board)
            columns = sender.objects.filter(query1 & query2 & query3).exclude(
                id=instance.id
            )
            columns.update(order=F("order") + change)
    except:
        pass


def del_col(sender, instance, **kwargs):
    order = instance.order
    query1 = Q(order__gt=order)
    query2 = Q(board=instance.board)
    sender.objects.filter(query1 & query2).update(order=F("order") - 1)


def move_card(sender, instance, **kwargs):
    try:
        card = sender.objects.get(id=instance.id)
        old_col = card.column
        new_col = instance.column
        old_order = card.order
        new_order = instance.order
        if new_col != old_col:
            query1 = Q(order__gt=old_order)
            query2 = Q(column=old_col)
            query3 = Q(order__gte=new_order)
            query4 = Q(column=new_col)
            sender.objects.filter(query1 & query2).update(order=F("order") - 1)
            sender.objects.filter(query3 & query4).update(order=F("order") + 1)

        elif old_order != new_order:
            change = -1 if new_order > old_order else 1
            query1 = Q(order__lte=max(new_order, old_order))
            query2 = Q(order__gte=min(new_order, old_order))
            query3 = Q(column=instance.column)
            cols = sender.objects.filter(query1 & query2 & query3).exclude(
                id=instance.id
            )
            cols.update(order=F("order") + change)

    except:
        pass


def del_card(sender, instance, **kwargs):
    order = instance.order
    col = instance.column
    query1 = Q(order__gt=order)
    query2 = Q(column=col)
    sender.objects.filter(query1 & query2).update(order=F("order") - 1)
    pass


pre_save.connect(move_col, sender=Column)
pre_delete.connect(del_col, sender=Column)

pre_save.connect(move_card, sender=Card)
pre_delete.connect(del_card, sender=Card)
