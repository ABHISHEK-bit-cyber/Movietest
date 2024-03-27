import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5
  },
  searchInput: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  image: {
    resizeMode: 'cover',
    height:200,    
  }
});
