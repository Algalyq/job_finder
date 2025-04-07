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
from django.conf import settings

class JobSerializer(serializers.ModelSerializer):
    relative_created_at = serializers.SerializerMethodField()
    # logo = serializers.SerializerMethodField()

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
    
    # def get_logo(self,obj):
    #     from django.conf import settings
    #     if obj.logo:
    #         return f"{settings.BASE_URL}{obj.logo.url}"

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
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'username']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']  # Add fields you want to update


class ProfileSerializeEdit(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'job_title', 'avatar']

    def to_internal_value(self, data):
        # Handle the QueryDict format (e.g., 'user[username]', 'user[email]')
        internal_data = {}
        user_data = {}

        for key, value in data.items():
            if key.startswith('user[') and key.endswith(']'):
                # Extract the field name from 'user[field]'
                field = key[5:-1]  # Remove 'user[' and ']'
                user_data[field] = value[0] if isinstance(value, list) else value
            else:
                internal_data[key] = value[0] if isinstance(value, list) else value

        if user_data:
            internal_data['user'] = user_data
        return internal_data

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user

        # Update User fields
        user_serializer = UserSerializer(user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            raise serializers.ValidationError(user_serializer.errors)

        # Update Profile fields
        instance.job_title = validated_data.get('job_title', instance.job_title)
        # Handle avatar if present (assuming it's a file field)
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']

        instance.save()
        return instance

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
    # avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'full_name', 'avatar', 'job_title', 'about_me', 'skills', 'work_experiences', 'educations', 'resume']

    # def get_avatar(self, obj):
    #     request = self.context.get('request')
    #     if obj.avatar:
    #         # Check if `request` exists to build the full URL
    #         if request:
    #             return request.build_absolute_uri(obj.avatar.url)
    #         # Fallback if `request` is not available
    #         return self.get_avatar_url(obj)
    #     return None
    
    # def get_avatar(self, obj):
    #     # Fallback to BASE_URL if request is not available
    #     BASE_URL = f'{settings.BASE_URL}'  # Ensure you use the correct base URL
    #     if obj.avatar:
    #         return f"{BASE_URL}{obj.avatar.url}"
    #     return None

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