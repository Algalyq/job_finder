# yourapp/urls.py
from django.urls import path
from .views import (register, CustomTokenObtainPairView, ResumeUploadView, JobListView,
    NewSaveJobView, NewSaveJobDetailView, MessageChannelListView, MessageListView,JobDetailView,UpdateProfileView,
    MessageChannelDetailView)
from . import views

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('jobs/', views.job_list, name='job-list'),
    path('update-profile/', UpdateProfileView.as_view(), name='update_profile'),
    path('jobs/<int:id>/', JobDetailView.as_view(), name='job-detail'),
    path('jobs/create/', views.job_create, name='job-create'),
    path('saved-jobs/', views.SavedJobView.as_view(), name='saved-jobs'),
    path('recent-jobs/', views.RecentJobView.as_view(), name='recent-jobs'),
    path('saved-jobs/<int:job_id>/', views.SavedJobDetailView.as_view(), name='saved-job-detail'),
    path('profile/', views.get_profile, name='get_profile'),
    path('profile/about', views.update_about_me, name='update_about'),
    path('profile/work_experience/', views.update_or_create_work_experience, name='update_or_create_work_experience'),
    path('profile/work_experience/list/', views.get_work_experience, name='get_work_experience'),
    path('profile/education/', views.save_education, name='save_education'),
    path('profile/education/list', views.get_education_list, name='get_education_list'),
    path('profile/skills/', views.save_skills, name='save_skills'),
    path('upload_resume/', ResumeUploadView.as_view(), name='upload_resume'),  # URL pattern for the FBV
    path('jobsf/', JobListView.as_view(), name='job-list'),
    path('new-saved-jobs/', NewSaveJobView.as_view(), name='new-saved-jobs'),
    path('new-saved-jobs/<str:job_id>/', NewSaveJobDetailView.as_view(), name='new-saved-job-detail'),
    
    # Message endpoints
    path('messages/channels/', MessageChannelListView.as_view(), name='message-channels'),
    path('messages/channels/<str:job_id>/', MessageChannelDetailView.as_view(), name='message-channel-detail'),
    path('messages/<int:channel_id>/', MessageListView.as_view(), name='messages'),
]
