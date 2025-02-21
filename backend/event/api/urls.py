from rest_framework.routers import SimpleRouter, DefaultRouter
from event.api.views import (
    EventViewSet,
    # CommentViewSet
)

router = DefaultRouter(trailing_slash=False)

router.register(r"event", EventViewSet, basename='event')
# router.register(r"comment", CommentViewSet, basename='comment')