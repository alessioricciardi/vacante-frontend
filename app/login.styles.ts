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
    paddingVertical: 50,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'System',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#BD00FF',
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#BD00FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#4B0082',
    fontSize: 12,
    fontWeight: 'bold',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  socialTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
    marginBottom: 20,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#BD00FF',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});