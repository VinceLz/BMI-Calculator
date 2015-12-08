/**
 * Created by Lewis on 15/12/6.
 */

$(document).ready(function () {
    var $menu = $('.menu'),
        $headList = $('.header .header_content'),
        $iconMenu = $('.header .menu i'),
        $femaleIcon = $('.content .fa-female'),
        $maleIcon = $('.content .fa-male'),
        $age = $('.content .age_info input'),
        $height = $('.content .height_info input'),
        $weight = $('.content .weight_info input');

    /*
     菜单栏下拉
     */
    $menu.click(function () {
        if ($iconMenu.hasClass('fa fa-bars')) {
            $iconMenu.removeClass().addClass('fa fa-times');
        } else {
            $iconMenu.removeClass().addClass('fa fa-bars');
        }
        $headList.slideToggle();
    });

    /*
     性别选择
     */
    clickSexIcon($femaleIcon, 'fa-female-active');
    clickSexIcon($maleIcon, 'fa-male-active');

    function clickSexIcon(object, className) {
        object.click(function () {
            changeSexColor(className);
            if (object.css('opacity') == 1) {
                object.hide();
                object.fadeIn();
            }
        });
        var changeSexColor = function (className) {
            $femaleIcon.removeClass('fa-female-active');
            $maleIcon.removeClass('fa-male-active');
            object.addClass(className);
        }
    }

    /*
     信息处理
     */
    function changeAgeandSexInfo() {
        //if
        //$age.change(function () {
        //
        //})
    }
});
