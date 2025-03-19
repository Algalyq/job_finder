import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS as FONT } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: SIZES.xxLarge,
        marginBottom: SIZES.large,
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginBottom: SIZES.xLarge,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: SIZES.large,
    },
    input: {
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        marginBottom: SIZES.small,
        fontFamily: FONT.regular,
        borderWidth: 1,
        borderColor: COLORS.gray2,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZES.large,
    },
    footerText: {
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    footerLink: {
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
})

export default styles;
