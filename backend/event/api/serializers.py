from rest_framework import serializers
from django.db import transaction
from rest_framework import response, status
from datetime import datetime
from drf_yasg.utils import swagger_serializer_method
from datetime import timedelta
from event.models import (
    Event,
)

from user.api.serializers import (
    UserListSerializer
)

class EventListSerializer(serializers.ModelSerializer):
    responsible = UserListSerializer()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = ("id", "event_name", "event_date_time", "city", "state", 
                  "address", "number", "complement", "phone", "responsible", "image")
        read_only_fields = ('responsible',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.event_date_time:
            representation['event_date_time'] = instance.event_date_time.strftime('%d/%m/%Y - %H:%M')
        return representation
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class EventCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Event
        fields = ("id", "event_name", "event_date_time", "city", "state", 
                  "address", "number", "complement", "phone", "image")
        read_only_fields = ('responsible',)
        
    def create(self, validated_data):
        user = self.context['request'].user 
        validated_data['responsible'] = user

        if "event_date_time" in validated_data:
            validated_data["event_date_time"] -= timedelta(hours=3)
        
        event = Event.objects.create(**validated_data)
        return event
    
    def  update(self,instance, validated_data):
        if "event_date_time" in validated_data:
            validated_data["event_date_time"] -= timedelta(hours=3)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class EventRetrieveSerializer(serializers.ModelSerializer):
    responsible = UserListSerializer()
    image = serializers.SerializerMethodField()

    
    class Meta:
        model = Event
        fields = ("id", "event_name", "event_date_time", "city", "state", 
                  "address", "number", "complement", "phone", "responsible", "image")
        read_only_fields = ('responsible',)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.event_date_time:
            representation['event_date_time'] = instance.event_date_time.isoformat()
        return representation


    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None



