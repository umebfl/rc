import * as variable from '../../../../../../theme/ume-theme/variable'

const PADDING = variable.N_15

export default {
    content: {
        padding: PADDING,
    },
    header_right_text: {
        padding: PADDING * .7,
        paddingRight: PADDING,
        color: variable.COLOR_GRAY,
        // fontSize: variable.N_12,
    },
    seq_item_container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    seq_item_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: PADDING * .3,
    },
    seq_item_title: {
        paddingTop: PADDING * .5,
        paddingBottom: PADDING * .8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    seq_item_title_text: {
        color: variable.COLOR_GRAY_XD,
    },
    seq_item_select_all: {
        // fontSize: variable.N_12,
        color: variable.COLOR_GRAY,
    },
    seq_item: {
        marginBottom: PADDING * .6,
        alignItems: 'center',
        justifyContent: 'center',
        width: variable.N_84,
        height: variable.N_30,
        borderRadius: variable.N_4,
        backgroundColor: variable.COLOR_GRAY_XXL,
    },
    seq_item_active: {
        backgroundColor: variable.COLOR_BLUE_XXL,
    },
    seq_item_text_active: {
        color: variable.COLOR_BLUE_XD,
    },
    seq_item_text: {
        color: variable.COLOR_GRAY_D,
    },
    seq_item_empty: {
        backgroundColor: 'white',
    }
}
