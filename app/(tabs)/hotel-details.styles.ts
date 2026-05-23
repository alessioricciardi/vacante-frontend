import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleSection: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  mainImage: {
    width: '100%',
    height: 250,
    borderRadius: 25,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  hotelName: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  hotelPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  dateSection: {
    gap: 15,
    marginBottom: 30,
  },
  dateInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  reserveButton: {
    backgroundColor: '#BD00FF',
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
    shadowColor: '#BD00FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});