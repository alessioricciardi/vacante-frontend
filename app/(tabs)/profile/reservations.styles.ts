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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  },
  listContainer: {
    paddingBottom: 120,
  },
  cardContainer: {
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  hotelImage: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  hotelLocation: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    gap: 10,
    zIndex: 10,
  },
  editButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteCircle: {
    backgroundColor: '#FFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BD00FF',
    elevation: 4,
  }
});