import * as variable from './variable.js'

export default {
    header: {
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6',
    },
    padding_base: {
        padding: 10,
    },
    text_input: {
        height: 200,
        fontSize: variable.N_16,
        borderWidth: variable.ABS_d5,
        borderColor: variable.COLOR_GRAY_XL,
        textAlignVertical: 'top',
        borderRadius: variable.N_5,
        borderRadiusWidth: variable.ABS_d5,
        marginTop: variable.N_25,
        padding: variable.N_10,
    },
    tip: {
        alignItems:'center',
        justifyContent: 'center',
        height: variable.N_30,
        backgroundColor: variable.COLOR_BLUE_XL,
    },
    tip_text: {
        color: variable.COLOR_GRAY,
    },
    flex_row: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_base: {
        fontSize: variable.N_14,
        color: variable.COLOR_GRAY,
    },
}
