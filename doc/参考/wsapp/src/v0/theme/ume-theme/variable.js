import {Dimensions, Platform} from 'react-native'

export const COLOR_MAIN = '#3da8f5'
export const COLOR_NEXT = '#f7f7f7'
export const COLOR_TEXT = '#383838'
export const COLOR_BG = '#ffffff'

export const COLOR_GRAY_XXD = '#202020'   //一级标题，
export const COLOR_GRAY_XD = '#383838'    //页面文字，信息
export const COLOR_GRAY_D = '#595959'    //字体图标的
export const COLOR_GRAY = '#8f8f8f'    //页面提示信息，二级标题，文字
export const COLOR_GRAY_L = '#cccccc'   //文本框输入框提示文字
export const COLOR_GRAY_XL = '#ededed' //下划线
export const COLOR_GRAY_XXL = '#f5f5f5'   //背景色
export const COLOR_GRAY_XXXL = '#FAFAFA'   //背景色

export const COLOR_BLUE_XXD = '#0077cc'    //外勤中的阴影
export const COLOR_BLUE_XD = '#0A99FF'    //签到
export const COLOR_BLUE_D = '#03A9F4'    //日志
export const COLOR_BLUE = '#3DA8F5'    //
export const COLOR_BLUE_L = '#6BC1FF'
export const COLOR_BLUE_XL = '#c9eaff'  //提示信息
export const COLOR_BLUE_XXL = '#ECF7FF'

export const COLOR_RED_XXD = '#333'
export const COLOR_RED_XD = '#333'
export const COLOR_RED_D = '#333'
export const COLOR_RED = '#FF3333'    //登录失败  退出
export const COLOR_RED_L = '#FF3D3D'  //信息未读标示
export const COLOR_RED_XL = '#F66970' //日志糟糕
export const COLOR_RED_XXL = '#ff9900'

export const COLOR_GREEN = '#81c784'
export const COLOR_GREEN_L = '#aed581'
export const COLOR_ORANGE = '#ffb74d'

export const FONT_SIZE_S  = 12
export const BASE_FONT_SIZE  = 12
export const FONT_SIZE_L  = 16
export const FONT_SIZE_XL  = 18
export const FONT_SIZE_XXL  = 20

// 左偏隐藏
export const OFFSET_HIDDEN = -9999

// 页面底部留白
export const PAGE_BOTTOM_SPACE = 30

//我 我的资料icon
export const ME_INFO_ICON = 25

//
export const ABS_d5 = .5
export const ABS_d33 = .33
export const ABS_d66 = .66

export const N_1 = Math.ceil(BASE_FONT_SIZE * 0.0833)
export const N_2 = Math.ceil(BASE_FONT_SIZE * 0.16)
export const N_3 = Math.ceil(BASE_FONT_SIZE * 0.25)
export const N_4 = Math.ceil(BASE_FONT_SIZE * 0.3333)
export const N_5 = Math.ceil(BASE_FONT_SIZE * 0.4166)
export const N_6 = Math.ceil(BASE_FONT_SIZE * 0.5)
export const N_8 = Math.ceil(BASE_FONT_SIZE * 0.6666)
export const N_10 = Math.ceil(BASE_FONT_SIZE * 0.8333)
export const N_11 = Math.ceil(BASE_FONT_SIZE * 0.9166)
export const N_12 = BASE_FONT_SIZE
export const N_14 = Math.ceil(BASE_FONT_SIZE * 1.1666)
export const N_15 = Math.ceil(BASE_FONT_SIZE * 1.25)
export const N_16 = Math.ceil(BASE_FONT_SIZE * 1.3333)
export const N_18 = Math.ceil(BASE_FONT_SIZE * 1.5)
export const N_20 = Math.ceil(BASE_FONT_SIZE * 1.6666)
export const N_22 = Math.ceil(BASE_FONT_SIZE * 1.8333)
export const N_24 = Math.ceil(BASE_FONT_SIZE * 2)
export const N_25 = Math.ceil(BASE_FONT_SIZE * 2.0833)
export const N_30 = Math.ceil(BASE_FONT_SIZE * 2.5)
export const N_36 = Math.ceil(BASE_FONT_SIZE * 3)
export const N_40 = Math.ceil(BASE_FONT_SIZE * 3.3333)
export const N_44 = Math.ceil(BASE_FONT_SIZE * 3.6666)
export const N_50 = Math.ceil(BASE_FONT_SIZE * 4.1666)
export const N_52 = Math.ceil(BASE_FONT_SIZE * 4.3333)
export const N_54 = Math.ceil(BASE_FONT_SIZE * 4.5)
export const N_60 = Math.ceil(BASE_FONT_SIZE * 5)
export const N_80 = Math.ceil(BASE_FONT_SIZE * 6.6666)
export const N_84 = Math.ceil(BASE_FONT_SIZE * 7)
export const N_100 = Math.ceil(BASE_FONT_SIZE * 8.3333)
export const N_120 = Math.ceil(BASE_FONT_SIZE * 10)
export const N_200 = Math.ceil(BASE_FONT_SIZE * 16.6666)

// ios顶部状态栏高度
export const IOS_STATUSBAR_HEIGHT = 20
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? IOS_STATUSBAR_HEIGHT : 15
export const STATUSBAR_FILLUP_HEIGHT = Platform.OS === 'ios' ? IOS_STATUSBAR_HEIGHT * .5 : 0

// 层级
export const ZINDEX_HEADER = 100
export const ZINDEX_COMPONENT_PIN = 100
export const ZINDEX_NETWORK_TIPS = 200
export const ZINDEX_FETCH_LOADING = 200
export const ZINDEX_FILTER_BAR = 200

// 屏幕宽高
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

// 内容
export const COLOR_SECONDARY = COLOR_GRAY

// border
// - 边框粗细
export const BORDER_WIDTH = 1
// - 边框颜色
export const BORDER_COLOR = '#E7E7E7'
// export const BORDER_COLOR = 'red'
// - 边框阴影颜色
export const BORDER_SHADOW_COLOR = COLOR_GRAY_XL

// component
// - scrollview - 背景颜色
export const SCROLLVIEW_BACKGROUND_COLOR = COLOR_GRAY_XXL

// - header - 背景颜色
export const HEADER_BACKGROUND_COLOR = 'white'
export const HEADER_HEIGHT = N_50 + STATUSBAR_FILLUP_HEIGHT
export const HEADER_ICON_TOUCH_WIDTH = N_60
export const HEADER_ICON_WIDTH = N_20
export const HEADER_TEXT_COLOR = COLOR_GRAY_XD
export const HEADER_TEXT_ACTIVE_COLOR = COLOR_GRAY_XXD

// 榜单前三
export const LIST_RANK_RED_FIRST = '#ff3300'
export const LIST_RANK_RED_SECOND = '#ff6600'
export const LIST_RANK_RED_THIRD = '#ff9900'

// 今日心情
export const BAD_COLOR = '#FFB32E'
export const NORMAL_COLOR = '#01A0EB'
export const GOOD_COLOR = '#A3D776'
export const GRADE_COLOR = '#69CA7D'

// 今日心情背景色
export const SO_BAD_COLOR_BG = '#fee3df'
export const BAD_COLOR_BG = '#fff1cc'
export const NORMAL_COLOR_BG = '#e5f7ff'
export const GOOD_COLOR_BG = '#edf7e4'
export const GRADE_COLOR_BG = '#e1f4e5'

// 消息提示
export const COLOR_POINT = '#F46A5F'
