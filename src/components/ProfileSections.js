import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SkillSection from './SkillSection';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import SvgUri from 'react-native-svg-uri';

const ProfileSections = ({ profile }) => {

    const navigation = useNavigation();

    const profileSections = [
        {
            title: 'About me',
            icon: <Ionicons name="person-outline" size={24} color="#FF9500" />,
            value: 'AboutMeScreen',
            customStyle: styles.aboutMeSection,
        },
        {
            title: 'Work experience',
            icon: <MaterialIcons name="work-outline" size={24} color="#FF9500" />,
            value: 'AddWorkExperienceScreen',
            customStyle: styles.workSection,
        },
        {
            title: 'Education',
            icon: <Ionicons name="school-outline" size={24} color="#FF9500" />,
            value: 'AddEducationScreen',
            customStyle: styles.educationSection,
        },
        {
            title: 'Skill',
            icon: <Ionicons name="bulb-outline" size={24} color="#FF9500" />,
            value: 'SkillSelectionScreen',
            customStyle: styles.skillSection,
        },
        {
            title: 'Language',
            icon: <Ionicons name="language-outline" size={24} color="#FF9500" />,
            value: 'AddLanguageScreen',
            customStyle: styles.languageSection,
        },
    ];

    return (
        <View style={styles.sectionsContainer}>
                {/* About me section */}
                <View style={styles.section}>
                    <TouchableOpacity 
                        style={styles.sectionButton}
                        onPress={() => navigation.navigate("AboutMeScreen")}
                    >
                        <View style={styles.sectionIcon}>
                            <Ionicons name="person-outline" size={24} color="#FF9500" />
                        </View>
                        <Text style={styles.sectionTitle}>About me</Text>
                        {profile.about_me ? (<Ionicons name="pencil-outline" size={20} color="#FF9500" /> ) : (<Ionicons name="add-circle" size={24} color="#FF9500" />)}
                        
                    </TouchableOpacity>

                    {profile.about_me ? (
                        <>
                            <View style={styles.separator} />
                            <View>
                                <Text style={styles.subSection}>
                                    {profile.about_me.length > 150 
                                        ? profile.about_me.substring(0, 150) + '...' 
                                        : profile.about_me
                                    }
                                </Text>
                            </View>
                        </>
                    ) : null}
                </View>


                <View style={styles.section}>
                    <TouchableOpacity 
                        style={styles.sectionButton}
                        onPress={() => navigation.navigate("AddWorkExperienceScreen")}
                    >
                        <View style={styles.sectionIcon}>
                            <MaterialIcons name="work-outline" size={24} color="#FF9500" />
                        </View>
                        <Text style={styles.sectionTitle}>Work experience</Text>
                        {profile.work_experiences && profile.work_experiences.length > 0 ? (<Ionicons name="pencil-outline" size={24} color="#FF9500" />) : (<Ionicons name="add-circle" size={24} color="#FF9500" />)}
                    </TouchableOpacity>
                {/* Separator line */}
                {profile.work_experiences && profile.work_experiences.length > 0 ? (
                    <>
                        <View style={styles.separator} />

                        {profile.work_experiences.map((workExperience, index) => (
                            <View style={styles.subSection} key={index}>
                                <View style={styles.workSection}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>
                                        {workExperience.job_title}
                                    </Text>
                                    <View style={styles.workSectionSub}>
                                        <Text style={{ fontSize: 12 }}>
                                            {workExperience.company}
                                        </Text>
                                        <Text style={{ fontSize: 12 }}>
                                            {workExperience.duration}
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                        ))}
                    </>
                ) : null}
                </View>

                <View style={styles.section}>
                    <TouchableOpacity 
                        style={styles.sectionButton}
                        onPress={() => navigation.navigate("AddEducationScreen")}
                    >
                        <View style={styles.sectionIcon}>
                            <Ionicons name="school-outline" size={24} color="#FF9500" />
                        </View>
                        <Text style={styles.sectionTitle}>Education experience</Text>
                        {profile.educations && profile.educations.length > 0 ? (<Ionicons name="pencil-outline" size={24} color="#FF9500" />) : (<Ionicons name="add-circle" size={24} color="#FF9500" />)}        
                    </TouchableOpacity>

                {profile.educations && profile.educations.length > 0 ? (
                    <>
                        <View style={styles.separator} />

                        {profile.educations.map((education, index) => (
                            <View style={styles.subSection} key={index}>
                                <View style={styles.workSection}>
                                    <Text style={{ fontSize: 14, fontWeight: '700' }}>
                                        {education.university_name}
                                    </Text>
                                    <View style={styles.workSectionSub}>
                                        <Text style={{ fontSize: 12 }}>
                                            {education.level_of_education} {education.field_of_study}
                                        </Text>
                                        <Text style={{ fontSize: 12 }}>
                                            {education.duration}
                                        </Text>
                                    </View>
                                </View>
                               
                            </View>
                        ))}
                    </>
                ) : null}
                </View>



                <SkillSection skills={profile.skills}/>
  

                <View style={styles.section}>
                <TouchableOpacity 
                    style={styles.sectionButton}
                    onPress={() => navigation.navigate("AddResumeScreen", { resumeCV: profile.resume, name: `${profile.full_name} - ${profile.job_title}` })}
                    >
                        <View style={styles.sectionIcon}>
                            <Ionicons name="documents-outline" size={24} color="#FF9500" />
                        </View>
                        <Text style={styles.sectionTitle}>Resume</Text>
                        { profile.resume ? (
                            <Ionicons name="pencil-outline" size={24} color="#FF9500" />
                        ) : (
                            <Ionicons name="add-circle" size={24} color="#FF9500" />
                        )}
                        
                    </TouchableOpacity>
                    {profile.resume && profile.resume.length > 0 ? (
                    <>
                        <View style={styles.separator} />

                    <View style={styles.filePreview}>
                        <View style={styles.fileDetails}>
                            <View style={styles.fileIcon}>
                            <Text style={styles.fileTypeText}>PDF</Text>
                            </View>
                            <View>
                            <Text style={styles.fileName}>{profile.full_name} - {profile.job_title}</Text>
                            <Text style={styles.fileInfo}>
                                {`${new Date(profile.resume.lastModified || Date.now()).toLocaleDateString()} at ${new Date(profile.resume.lastModified || Date.now()).toLocaleTimeString()}`}
                            </Text>
                            </View>
                        </View>
                        </View>
                    </>
                ) : null}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionsContainer: {
        padding: 16,
    },
    section: {
        flexDirection: 'column',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        gap: 8,
    },
    sectionButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    sectionIcon: {
        marginRight: 12,
    },
    sectionTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    // Custom styles for specific sections
    aboutMeSection: {
        backgroundColor: '#E3F2FD',
    },
    workSection: {
        flexDirection: 'column',
        gap: 12
    },
    workSectionSub: {
        gap: 4
    },
    educationSection: {
        backgroundColor: '#E8F5E9',
    },
    skillSection: {
        backgroundColor: '#FFF3E0',
    },
    languageSection: {
        backgroundColor: '#F3E5F5',
    },   
    separator: {
        height: 0.5,
        backgroundColor: '#E0E0E0',  // Light gray color for better UI
        width: '100%',               // Ensures the line stretches across the full width
        marginVertical: 8,           // Adds spacing around the separator
    },
    filePreview: {
        gap: 10,
      },
      fileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      fileIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#ff4c4c',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      fileTypeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
      },
      fileName: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      fileInfo: {
        fontSize: 12,
        color: '#6b6b6b',
      },
      removeFileText: {
        color: '#ff4c4c',
        fontSize: 14,
        fontWeight: 'bold',
      },
      removeFileButton: {
        flexDirection: 'row',
        alignItems: 'center',
      }
    
});

export default ProfileSections;
