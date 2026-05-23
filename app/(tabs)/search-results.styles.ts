import { StyleSheet } from 'react-native';

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
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleSection: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  chip: {
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#000',
  },
  chipMap: {
    backgroundColor: '#BD00FF',
  },
  chipText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#FFF',
  },
  listContainer: {
    paddingBottom: 120,
  },
  hotelCard: {
    marginBottom: 30,
  },
  hotelImage: {
    width: '100%',
    height: 180,
    borderRadius: 25,
    marginBottom: 10,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
  },
  hotelPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
});