import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./Style";
import { IconButton } from "../../components/buttons/buttons";
import { fetchNews } from "../../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import BottomSheet from "../../components/bottomSheet";

const Home = () => {
  const [search, setSearch] = useState();
  const [isSearchEnabled, setSearchEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const PlaceholderImage = require("../../assets/images/placeholder.png");
  const [isOnline, setIsOnline] = useState(false);
  const sheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("business");
  const [country, setCountry] = useState("in");
  const categories = ["business", "politics", "sports"];

  useEffect(() => {
    getCachedData();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });
    console.log(sheetRef);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOnline) {
      getNews({ country: country, category: category });
    }
  }, [isOnline]);

  useEffect(() => {
    if (open) {
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

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
        getNews({ country: country, category: category });
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
            loadingIndicatorSource={require("../../assets/images/spinner.gif")}
            style={styles.image}
          />
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descText}>{item.description}</Text>
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
              setCategory("");
              getNews({ query: search });
            }
          }}
        />
        <IconButton iconName={"filter"} onPress={() => setOpen(true)} />
      </View>

      <Text>Categories</Text>

      <View style={{ flexDirection: "row" }}>
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: item == category ? "#1a73e8" : "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginHorizontal: 8,
                marginVertical: 5,
                elevation: 3,
              }}
              onPress={() => {
                setCategory(item);
                setSearch("");
                getNews({ country: country, category: item });
              }}
            >
              <Text style={{ color: item == category ? "white" : "black" }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <BottomSheet sheetRef={sheetRef} open = {open} onClose={ handleCloseSheet } onApply={ handleApply }/>

      <FlatList
        data={articles}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;
