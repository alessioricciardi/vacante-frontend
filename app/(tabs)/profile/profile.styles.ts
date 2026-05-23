import { StyleSheet, Dimensions } from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'System',
    color: '#000',
  },
  notificationBtn: {
    position: 'absolute',
    right: 0,
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
  profileInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 15,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  menuContainer: {
    width: '100%',
    gap: 12,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#B30000',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 120,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});