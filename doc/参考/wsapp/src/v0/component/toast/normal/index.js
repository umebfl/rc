import Toast from 'react-native-root-toast'

export default toast = (val, option = {}) => (
    Toast.show(val, {
        // duration: 0,
        duration: Toast.durations.SHORT,
        position: -120,
        backgroundColor: 'rgba(0, 0, 0, .86)',
        shadow: false,
        animation: true,
        hideOnPress: true,
        textStyle: {
            fontSize: 14,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 6,
            paddingRight: 6,
        },
        delay: 0,
        ...option,
    })
)
