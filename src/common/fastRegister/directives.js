import { utils } from '../utils/utils';

// vue自定义指令集
export default (Vue) => {
    // 元素居中指令
    Vue.directive("centered",{
        inserted (el) {
            var winh = window.innerHeight
            var winw = window.innerWidth
            var elh = utils.getDOMTrueSize(el, 'height')
            var elw = utils.getDOMTrueSize(el, 'width')
            el.style.top = (winh - elh) / 2 + 'px'
            el.style.left = (winw - elw) / 2 + 'px'
        }
    });
    // 元素的父元素可拖动指令
    Vue.directive("drag",{
        inserted (el) {
            el.style.cursor = 'move';
            el.onmousedown = e => {
                var father = el.parentElement;
                var melX = e.clientX - father.offsetLeft;
                var melY = e.clientY - father.offsetTop;
                document.onmousemove = e => {
                    var left = e.clientX - melX;
                    var top = e.clientY - melY;
                    father.style.left = left + "px";
                    father.style.top = top + "px";
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    });
    // 图片自适应指令
    Vue.directive("imgload",{
        inserted (el) {
            el.onload = e => {
                var parent = e.target.parentElement;
                var img = e.target;
                // parent.style.display = 'block';
                img.style.display = 'block';
                var parentW = $(parent).width();
                var parentH = $(parent).height();
                var imgW = $(img).width();
                var imgH = $(img).height();
                if (imgW / imgH > parentW / parentH) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.marginTop = (parentH - $(img).height()) / 2 + 'px';
                } else {
                    img.style.width = 'auto';
                    img.style.height = '100%';
                    img.style.marginTop = 0;
                    img.style.margin = '0 auto';
                }
            }
        }
    });
}