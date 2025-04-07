import { StyleSheet } from 'react-native';
import {  COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerBody: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    color: '#333',
  },
  infoContainer: {
    justifyContent: 'center',
    gap: 8,
  },
  picture: {
    width: 84,
    height: 84,
    borderRadius: 48,
    marginRight: 16,
  },
  sectionsContainer: {
    marginTop: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionIcon: {
    marginRight: 16,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scroll: {
    color: '#000',
    height: '120%',
  },
  headerButtons: {
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
    width: '100%',
    borderRadius: 5,
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  

});

export default styles;