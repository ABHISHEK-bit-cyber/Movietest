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
    padding: 5,
  },
  titleText: {
    marginVertical: 5,
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 5,
    elevation: 3,
  },
  title: {
    marginHorizontal: 10,
  },
  categoryTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  descText: {
    marginVertical: 5,
    marginHorizontal: 10,
    color: 'grey',
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
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
    height: 200,
  },
});
