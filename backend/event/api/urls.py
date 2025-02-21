from rest_framework.routers import SimpleRouter, DefaultRouter
from event.api.views import (
    EventViewSet,
)

router = DefaultRouter(trailing_slash=False)

router.register(r"event", EventViewSet, basename='event')