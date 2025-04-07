import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  GestureHandlerRootView,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { COLORS, SIZES, icons, tabs } from "../../constants";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import HeaderBtn from "../../components/shared/header-btn";
import useRequest from "../../hook/useJobDetailRequest";
import { About, Footer, Job, JobTabs, Qualification, Responsibility } from "../../components";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details() {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false); // Track saved state
  const { data, isLoading, error, refetch } = useRequest("api/jobs", {
    job_id: params.id,
  });
  console.log(data)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);


  // export const tabs = ["Жайлы", "Біліктілік", "Міндеттер"];
  console.log(data)
  const renderTabContent = () => {
    switch (activeTab) {
      case "Ақпарат":
        return <About info={`Компания аты: ${data.company}, қызметкер іздеуде: ${data.title} осы қызметке іздеген компанияға ақпарат бер`} />;
      case "Міндеттер":
        return (
          <Responsibility
          info={`Компания аты: ${data.company}, қызметкер іздеуде: ${data.title} осы қызмет атқаратын қызметкердің  компаниядағы міндеттерін жаз`} />
        );
      default:
        return null;
    }
  };

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      }}
    >
      <HeaderBtn
        icon={icons.left}
        dimensions={24}
        onPress={() => router.back()}
      />
    </View>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={COLORS.tertiary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: SIZES.large }}>
              <Job
                companyLogo={data.logo ? data.logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO0-uMT750aKUESYouIjtAZkT13UALJtvxz2V1&s=0"}
                jobTitle={data.title}
                companyName={data.company}
                location={data.location}
              />
              <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <View style={{ marginBottom: 30 }}>{renderTabContent()}</View>
            </View>
          )}
        </ScrollView>

        <Footer
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
          data={data}
        />
      </>
    </SafeAreaView>
  );
};