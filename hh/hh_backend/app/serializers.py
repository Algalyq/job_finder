# yourapp/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from django.utils.timesince import timesince


class JobSerializer(serializers.ModelSerializer):
    relative_created_at = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'company',
            'location',
            'job_type',
            'description',
            'salary',
            'created_at',
            'jdata',
            'logo',
            'currency',
            'relative_created_at'  # Add the custom field explicitly
        ]

    def get_relative_created_at(self, obj):
        return f"{timesince(obj.created_at)} ago"

class JobLimitedSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(use_url=True)  # Ensures logo is a full URL

    class Meta:
        model = Job
        fields = ['title', 'company', 'logo', 'created_at']  # Only these fields

class SavedJobSerializer(serializers.ModelSerializer):
    job = JobLimitedSerializer()  # Nest the limited job serializer

    class Meta:
        model = SavedJob
        fields = ['job']  # Only include the job field

class RecentJobSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = RecentJob
        fields = ['id', 'job', 'viewed_at']

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, 
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    full_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['email', 'full_name', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],  # Using email as username
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.first_name = validated_data['full_name']
        user.save()
        return user


class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email is None or password is None:
            raise serializers.ValidationError('Email and password are required.')

        user = get_user_model().objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            raise serializers.ValidationError('Invalid credentials.')

        # Token generation if credentials are valid
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }


class WorkExperienceSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = WorkExperience
        fields = ['id','job_title', 'company', 'start_date', 'end_date', 'description', 'duration']

    def get_duration(self, obj):
        return obj.get_duration()
    
    def create(self, validated_data):
        profile = self.context.get('profile')
        return WorkExperience.objects.create(profile=profile, **validated_data)


class WorkExperiencePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkExperience
        fields = ['id','job_title', 'company', 'start_date', 'end_date', 'description','profile']

class WorkExperiencePostWithOutIDSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkExperience
        fields = ['id','job_title', 'company', 'start_date', 'end_date', 'description','profile']


class EducationSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = ['id','level_of_education', 'university_name', 'field_of_study', 'start_date', 'end_date', 'description', 'duration']

    def get_duration(self, obj):
        return obj.get_duration()

    
    def create(self, validated_data):
        profile = self.context.get('profile')
        return Education.objects.create(profile=profile, **validated_data)



class EducationPostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Education
        fields = ['id','level_of_education', 'university_name', 'field_of_study', 'start_date', 'end_date', 'description','profile']

class EducationPostWithoutIdSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Education
        fields = ['id','level_of_education', 'university_name', 'field_of_study', 'start_date', 'end_date', 'description','profile']



class ProfileSerializer(serializers.ModelSerializer):
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'full_name', 'avatar', 'job_title', 'about_me', 'skills', 'work_experiences', 'educations', 'resume']

    def get_avatar(self, obj):
        from django.conf import settings
        if obj.avatar:
            return f"{settings.BASE_URL}{obj.avatar.url}"


class SkillsSerializer(serializers.Serializer):
    skills = serializers.ListField(child=serializers.CharField())


class NewSaveJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewSaveJob
        fields = ['id', 'user', 'title', 'company', 'logo', 'saved_at']

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'content', 'sender_username', 'created_at', 'is_read']
        read_only_fields = ['sender', 'created_at', 'is_read']

class MessageChannelSerializer(serializers.ModelSerializer):
    lastMessage = serializers.SerializerMethodField()
    lastMessageTime = serializers.DateTimeField(source='last_message_time', read_only=True)

    class Meta:
        model = MessageChannel
        fields = ['id', 'jobtitle', 'company', 'logo', 'lastMessage', 'lastMessageTime']
        read_only_fields = ['created_at', 'last_message_time']

    def get_lastMessage(self, obj):
        last_message = obj.messages.order_by('-created_at').first()
        return last_message.content if last_message else None