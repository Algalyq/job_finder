import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { HeaderBtn } from "../../components";
import useRequest from "../../hook/useRequest";
import JobCard from "../../components/cards/job-card";
import axios from "axios";
import { API_BASE_URL } from "../../constants/config";

export default function Search() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const jobTypesKz = {'Full-time':'full-time', 'Part-time':'hybrid', 'Freelance':'remote'};
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);
  const job_type = jobTypesKz[params.id];
  const show_type = {'remote': 'Қашықтықтан','hybrid':'Гибрид','full-time':'Толық'}
  
  const handleSearch = async () => {
    setIsLoading(true);
    setData([]);
  
    try {
      
      const option = {
        method: "GET",
        url: `${API_BASE_URL}/api/jobsf/`,
        params: {
          ...(job_type ? { job_type } : { search: params.id }),
          // Add other filters if needed, like:
          // min_salary: "100000",
          // publish_time: "week",
        },
      };
  
      const { data: res } = await axios.request(option);
      setData(res.results.results);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handlePagination = (direction) => {
    if (direction === "left" && page > 1) {
      setpage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setpage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.tertiary },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <HeaderBtn
              icon={icons.left}
              dimensions={"60%"}
              onPress={() => router.back()}
            />
          ),
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <JobCard
            item={item}
            onPress={() => router.push(`/job-details/${item.id}`)}
          />
        )}
        keyExtractor={(item) => `search-job-${item.id}`}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
            <HeaderBtn
                icon={icons.left}
                dimensions={24}
                onPress={() => router.back()}
              />
              <View>
              <Text style={styles.searchTitle}>{show_type[job_type] ? show_type[job_type] : params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Жұмыс мүмкіндіктері</Text>
              </View>
            </View>
            <View style={styles.loaderWrapper}>
              {isLoading ? (
                <ActivityIndicator size={"small"} color={COLORS.primary} />
              ) : error ? (
                <Text style={styles.errorText}>Қате орын алды</Text>
              ) : data?.length === 0 ? (
                <Text style={styles.errorText}>Қол жетілік табылған жоқ</Text>
              ) : null}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationBtn}
              onPress={() => handlePagination("left")}
            >
              <Image
                style={styles.paginationIcon}
                source={icons.chevronLeft}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextWrapper}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationBtn}
              onPress={() => handlePagination("right")}
            >
              <Image
                style={styles.paginationIcon}
                source={icons.chevronRight}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.medium
  },
  searchTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  loaderWrapper: {
    marginTop: SIZES.medium,
  },
  footerContainer: {
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  paginationBtn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tertiary,
  },
  paginationIcon: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
  paginationTextWrapper: {
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  paginationText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
});
