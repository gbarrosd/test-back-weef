from django.db import models
from user.models import CustomUser

class Event(models.Model):
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    event_date_time = models.DateTimeField()
    event_name = models.CharField(verbose_name="Nome do evento", max_length=255)
    responsible = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    number = models.CharField(max_length=10)
    complement = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.event_name} - {self.event_date_time}"