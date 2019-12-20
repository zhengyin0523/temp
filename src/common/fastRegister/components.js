import TlTitle from "../../components/LZB/Title/TlTitle.vue";
import TlButton from "../../components/LZB/Button/TlButton.vue";
import TlLableAndContent from "../../components/LZB/LableAndContent/TlLableAndContent.vue";
import TlPlainInput from "../../components/LZB/PlainInput/TlPlainInput.vue";
import TlBigWinInput from "../../components/LZB/BigWinInput/TlBigWinInput.vue";
import TlCarColorChosen from "../../components/LZB/CarColorChosen/TlCarColorChosen.vue";
import TlCarZoneChosen from "../../components/LZB/CarZoneChosen/TlCarZoneChosen.vue";
import TlMultipleSelect from "../../components/LZB/MultipleSelect/TlMultipleSelect.vue";
import TlTable from "../../components/LZB/Table/TlTable.vue";
import TlImgZoom from "../../components/LZB/ImgZoom/TlImgZoom.vue";
import TlArrow from "../../components/LZB/Arrow/TlArrow.vue";
import TlVideo from "../../components/LZB/Video/TlVideo.vue";
import TlTransVideo from "../../components/LZB/TransVideo/TlTransVideo.vue";

var components = [
    TlTitle,
    TlButton,
    TlLableAndContent,
    TlPlainInput,
    TlBigWinInput,
    TlCarColorChosen,
    TlCarZoneChosen,
    TlMultipleSelect,
    TlTable,
    TlImgZoom,
    TlArrow,
    TlVideo,
    TlTransVideo,
];

// vue自定义组件祖册
export default (Vue) => {
    for (var i in components) {
        Vue.component(components[i].name, components[i]);
    }
}