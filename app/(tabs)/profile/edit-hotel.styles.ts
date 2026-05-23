import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', fontFamily: 'System', color: '#000' },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 8, marginTop: 10, marginLeft: 10 },
  
  // Zdjęcie
  imageContainer: { width: '100%', height: 180, borderRadius: 20, overflow: 'hidden', marginBottom: 20, position: 'relative' },
  image: { width: '100%', height: '100%' },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  
  // Inputy
  inputContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    height: 55, 
    borderRadius: 30, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  input: { flex: 1, fontSize: 16, color: '#000', fontWeight: '500' },
  textAreaContainer: { 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 30, 
    padding: 20, 
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFF',
    minHeight: 120,
  },
  
  // Przycisk
  saveButton: { 
    backgroundColor: '#BD00FF', 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 120,
    shadowColor: '#BD00FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' }
});