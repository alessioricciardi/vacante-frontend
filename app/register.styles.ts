import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  registerButton: {
    backgroundColor: '#BD00FF',
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#BD00FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkSection: {
    alignSelf: 'flex-end',
    marginTop: 25,
    alignItems: 'flex-end',
  },
  loginLinkText: {
    fontSize: 16,
    color: '#000',
  },
  loginLinkBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  socialSection: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 10,
  },
  socialTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginBottom: 15,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'center',
  },
});