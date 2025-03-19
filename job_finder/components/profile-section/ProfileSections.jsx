import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 
import styles from './profilesections.style'; // Import styles
// Skills section is now a separate screen
const ProfileSections = ({ profile }) => {
  const router = useRouter(); // Use Expo Router for navigation
  const MAX_VISIBLE_SKILLS = 5;
  const visibleSkills = Array.isArray(profile.skills) ? (expanded ? profile.skills : profile.skills.slice(0, MAX_VISIBLE_SKILLS)) : [];
  const remainingSkillsCount = Array.isArray(profile.skills) ? profile.skills.length - MAX_VISIBLE_SKILLS : 0;
  const [expanded, setExpanded] = useState(false);

  
  return (
    <View style={styles.sectionsContainer}>
      {/* About Me Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/profile/about-me')} // Adjusted route
        >
          <View style={styles.sectionIcon}>
            <Ionicons name="person-outline" size={24} color="#FF9500" />
          </View>
          <Text style={styles.sectionTitle}>About me</Text>
          {profile.about_me ? (
            <Ionicons name="pencil-outline" size={20} color="#FF9500" />
          ) : (
            <Ionicons name="add-circle" size={24} color="#FF9500" />
          )}
        </TouchableOpacity>

        {profile.about_me ? (
          <>
            <View style={styles.separator} />
            <View>
              <Text style={styles.subSection}>
                {profile.about_me.length > 150
                  ? profile.about_me.substring(0, 150) + '...'
                  : profile.about_me}
              </Text>
            </View>
          </>
        ) : null}
      </View>

      {/* Work Experience Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/profile/add-work-experience')} // Adjusted route
        >
          <View style={styles.sectionIcon}>
            <MaterialIcons name="work-outline" size={24} color="#FF9500" />
          </View>
          <Text style={styles.sectionTitle}>Work experience</Text>
          {profile.work_experiences && profile.work_experiences.length > 0 ? (
            <Ionicons name="pencil-outline" size={24} color="#FF9500" />
          ) : (
            <Ionicons name="add-circle" size={24} color="#FF9500" />
          )}
        </TouchableOpacity>
        {profile.work_experiences && profile.work_experiences.length > 0 ? (
          <>
            <View style={styles.separator} />
            {profile.work_experiences.map((workExperience, index) => (
              <View style={styles.subSection} key={index}>
                <View style={styles.workSection}>
                  <Text style={styles.jobTitle}>
                    {workExperience.job_title}
                  </Text>
                  <View style={styles.workSectionSub}>
                    <Text style={styles.subText}>{workExperience.company}</Text>
                    <Text style={styles.subText}>{workExperience.duration}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : null}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/profile/add-education')} // Adjusted route
        >
          <View style={styles.sectionIcon}>
            <Ionicons name="school-outline" size={24} color="#FF9500" />
          </View>
          <Text style={styles.sectionTitle}>Education experience</Text>
          {profile.educations && profile.educations.length > 0 ? (
            <Ionicons name="pencil-outline" size={24} color="#FF9500" />
          ) : (
            <Ionicons name="add-circle" size={24} color="#FF9500" />
          )}
        </TouchableOpacity>
        {profile.educations && profile.educations.length > 0 ? (
          <>
            <View style={styles.separator} />
            {profile.educations.map((education, index) => (
              <View style={styles.subSection} key={index}>
                <View style={styles.workSection}>
                  <Text style={styles.jobTitle}>
                    {education.university_name}
                  </Text>
                  <View style={styles.workSectionSub}>
                    <Text style={styles.subText}>
                      {education.level_of_education} {education.field_of_study}
                    </Text>
                    <Text style={styles.subText}>{education.duration}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : null}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/profile/skill-section')}
        >
          <View style={styles.sectionIcon}>
            <Ionicons name="bulb-outline" size={24} color="#FF9500" />
          </View>
          <Text style={styles.sectionTitle}>Skills</Text>
          {profile?.skills?.length > 0 ? (
            <Ionicons name="pencil-outline" size={24} color="#FF9500" />
          ) : (
            <Ionicons name="add-circle" size={24} color="#FF9500" />
          )}
        </TouchableOpacity>
        <View style={styles.separator} />
        <View style={styles.skillsContainer}>

          {visibleSkills && visibleSkills.length > 0 && visibleSkills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}

          {!expanded && remainingSkillsCount > 0 && (
            <Text style={styles.moreText}>+{remainingSkillsCount} more</Text>
          )}
        </View>
      </View>

      {/* Resume Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() =>
            router.push({
              pathname: '/profile/add-resume',
              params: { resumeCV: profile.resume, name: `${profile.full_name} - ${profile.job_title}` },
            })
          } // Adjusted route with params
        >
          <View style={styles.sectionIcon}>
            <Ionicons name="documents-outline" size={24} color="#FF9500" />
          </View>
          <Text style={styles.sectionTitle}>Resume</Text>
          {profile.resume ? (
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
                  <Text style={styles.fileName}>
                    {profile.full_name} - {profile.job_title}
                  </Text>
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

export default ProfileSections;