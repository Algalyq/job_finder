from django.contrib import admin
from .models import Job,SavedJob,RecentJob,Profile,Education,WorkExperience,NewSaveJob,MessageChannel,Message

admin.site.register(Job)
admin.site.register(SavedJob)
admin.site.register(RecentJob)
admin.site.register(Profile)
admin.site.register(Education)
admin.site.register(WorkExperience)
admin.site.register(NewSaveJob)
admin.site.register(MessageChannel)
admin.site.register(Message)
