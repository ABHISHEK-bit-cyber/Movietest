import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./Style";
import { IconButton } from "../../components/buttons/buttons";
import { fetchNews } from "../../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Bottomsheet from '../../components/bottomSheet';

const Home = () => {
  const [search, setSearch] = useState();
  const [isSearchEnabled, setSearchEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const PlaceholderImage = require("../../assets/images/placeholder.png");
  const [isOnline, setIsOnline] = useState(false);
  const sheetRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCachedData();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOnline) {
      getNews("today");
    }
  }, [isOnline]);

  const getNews = async (query) => {
    setLoading(true);
    try {
      const data = await fetchNews(query);
      setArticles(data);
      setLoading(false);
      await AsyncStorage.setItem("cachedData", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      console.error("Error message:", error.response.data);
    }
  };

  const getCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("cachedData");
      if (cachedData !== null) {
        setLoading(false);
        setArticles(JSON.parse(cachedData));
      } else {
        getNews("today");
      }
    } catch (error) {
      console.error("Error retrieving cached data:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const renderItems = ({ item }) => {
    return (
      <View style={styles.newsItemContainer}>
        <View>
          <Image
            source={
              item.urlToImage ? { uri: item.urlToImage } : PlaceholderImage
            }
            PlaceholderImage={PlaceholderImage}
            loadingIndicatorSource={require("../../assets/images/spinner.gif")}
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    setSearchEnabled(text.trim().length > 0);
  };

  const handleCloseSheet = () => {
    setOpen(false);
  };

  const handleApply = async (params: any) => {
    try {
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={handleSearchChange}
          value={search}
        />
        <IconButton
          iconName={"search"}
          color={isSearchEnabled ? "#000" : "#c2c2c2"}
          onPress={() => {
            if (isSearchEnabled) {
              getNews(search);
            }
          }}
        />
        <IconButton iconName={"filter"} onPress={() => {}} />
      </View>

      <Bottomsheet
        sheetRef={sheetRef}
        open={open}
        onClose={handleCloseSheet}
        onApply={handleApply}
      />

      <FlatList
        data={articles}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;
