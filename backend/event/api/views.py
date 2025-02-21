from rest_framework import permissions, viewsets, mixins, filters, status, response, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from event.api.mixins import GetSerializerClassMixin
from rest_framework.parsers import MultiPartParser, FormParser

from event.api.serializers import (
    EventListSerializer,
    EventCreateSerializer,
    EventRetrieveSerializer,
)
from event.models import (
    Event, 
)

class EventViewSet(
    GetSerializerClassMixin,
    viewsets.ModelViewSet
):
    queryset = Event.objects.all()
    serializer_class = EventListSerializer
    serializer_action_classes = {
        "list": EventListSerializer,
        "retrieve": EventRetrieveSerializer,
        "create": EventCreateSerializer,
        "update": EventCreateSerializer,
    }
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    parser_classes = (MultiPartParser, FormParser)

    # filterset_fields = {
    #     "publication_date": ['gte', 'lte'],
    # }
    # search_fields = ["title", "content",]


# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer