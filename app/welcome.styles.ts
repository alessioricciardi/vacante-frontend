import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  logoContainer: {
    marginTop: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'System', 
  },
  imageGallery: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  mainImage: {
    width: width * 0.28,
    height: 250,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  sideImage: {
    height: 200,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});