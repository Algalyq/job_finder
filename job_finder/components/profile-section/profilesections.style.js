import { StyleSheet } from 'react-native';
import { COLORS, FONTS as FONT, SIZES } from '../../constants';

const styles = StyleSheet.create({
  sectionsContainer: {
    padding: SIZES.medium,
  },
  section: {
    flexDirection: 'column',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workSection: {
    flexDirection: 'column',
    gap: 12,
  },
  workSectionSub: {
    gap: 4,
  },
  separator: {
    height: 0.5,
    backgroundColor: COLORS.gray2,
    width: '100%',
    marginVertical: 8,
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
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  fileTypeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  fileName: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fileInfo: {
    fontSize: 12,
    color: COLORS.gray,
  },
  skillTag: {
    backgroundColor: '#F0F4F8',
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  skillText: {
    fontSize: 16,
    color: '#505050',
  },
  moreText: {
    fontSize: 17,
    color: '#6C63FF',
    alignSelf: 'center',
    marginLeft: 8,
  },
  seeMore: {
    fontSize: 14,
    color: '#6C63FF',
    marginTop: 12,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

export default styles;