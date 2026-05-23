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
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'System', 
    color: '#000',
  },
  notificationBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4B4B',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  listContainer: {
    paddingBottom: 120,
  },
  notificationCard: {
    backgroundColor: '#BDD8E9',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  bellIcon: {
    fontSize: 24,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
  },
  timeText: {
    alignSelf: 'flex-end',
    fontSize: 11,
    color: '#333',
    marginTop: 5,
  },
});