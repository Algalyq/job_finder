import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Svg width={wp('20%')} height={wp('20%')} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.logoImage}>
        <Path d="M0 30C0 15.8579 0 8.78679 4.39339 4.39339C8.78679 0 15.8579 0 30 0C44.1422 0 51.2131 0 55.6066 4.39339C60 8.78679 60 15.8579 60 30C60 44.1422 60 51.2131 55.6066 55.6066C51.2131 60 44.1422 60 30 60C15.8579 60 8.78679 60 4.39339 55.6066C0 51.2131 0 44.1422 0 30Z" fill="white"/>
        <Path d="M34.9999 37.5C35.6903 37.5 36.2625 38.0651 36.1254 38.7418C35.883 39.9368 35.2943 41.0444 34.4193 41.9194C33.2473 43.0915 31.6575 43.75 29.9999 43.75C28.3423 43.75 26.7527 43.0915 25.5805 41.9194C24.7055 41.0444 24.1168 39.9368 23.8745 38.7418C23.7373 38.0651 24.3095 37.5 24.9999 37.5H34.9999Z" fill="#0D0140"/>
        <Path d="M37.6278 27.2206C36.9609 27.3992 36.5526 28.0969 36.8907 28.6987C37.2466 29.3322 37.7388 29.8851 38.3377 30.3142C39.2779 30.988 40.4227 31.315 41.5771 31.2392C42.7313 31.1636 43.8237 30.6901 44.6679 29.8994C45.5123 29.1086 46.0562 28.0495 46.2072 26.9026C46.3582 25.7557 46.1069 24.592 45.4961 23.6096C44.8852 22.6274 43.9526 21.8872 42.8572 21.5154C41.7618 21.1435 40.5714 21.163 39.4888 21.5705C38.7993 21.83 38.1808 22.2366 37.6731 22.7564C37.1907 23.2502 37.4046 24.0299 38.0024 24.375L38.6366 24.7411C39.6009 25.298 39.4108 26.7429 38.3351 27.0311L37.6278 27.2206Z" fill="#0D0140"/>
        <Path d="M22.3723 27.2206C23.0392 27.3992 23.4476 28.0969 23.1095 28.6987C22.7536 29.3322 22.2613 29.8851 21.6626 30.3142C20.7223 30.988 19.5774 31.315 18.4232 31.2392C17.2688 31.1636 16.1765 30.6901 15.3322 29.8994C14.4879 29.1086 13.9439 28.0495 13.7929 26.9026C13.6419 25.7557 13.8933 24.592 14.5042 23.6096C15.115 22.6274 16.0476 21.8872 17.143 21.5154C18.2383 21.1435 19.4288 21.163 20.5114 21.5705C21.2008 21.83 21.8195 22.2366 22.3272 22.7564C22.8096 23.2502 22.5956 24.0299 21.9977 24.375L21.3636 24.7411C20.3992 25.298 20.5894 26.7429 21.6651 27.0311L22.3723 27.2206Z" fill="#0D0140"/>
      </Svg>
      <Text style={styles.logo}>Jobspot</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E1F92',
  },
  logo: {
    fontSize: wp('8%'), 
    color: '#fff',
    marginBottom: hp('2%'),
    fontWeight: 'bold',
  },
  logoImage: {
    width: wp('40%'),
    height: wp('40%'),
    resizeMode: 'contain',
  },
});
