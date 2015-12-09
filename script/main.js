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
        $weight = $('.content .weight_info input'),
        $rangeList = $('.range_info li span'),
        $sexSection = $('.content .age_info .fa'),
        $result;


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
     sexInfo()函数返回1或2
     1代表female
     2代表male
     */
    changeAgeandSexInfo();
    result();

    function sexInfo() {
        if ($sexSection.hasClass('fa-female-active')) {
            return 1;
        } else if ($sexSection.hasClass('fa-male-active')) {
            return 2;
        }
    }

    function changeAgeandSexInfo() {
        $age.change(function () {
            changeRangeInfo();
            if (!$age.val()) {
                $rangeList.eq(0).html('&lt; 0');
                $rangeList.eq(1).html('0 - 0');
                $rangeList.eq(2).html('0 - 0');
                $rangeList.eq(3).html('0 - 0');
                $rangeList.eq(4).html('&gt; 0');
            }
        });

        $sexSection.click(function () {
            if ($age.val()) {
                changeRangeInfo();
            }
        });

        function changeRangeInfo() {
            var $sex = sexInfo();
            if ($sex == 1) {
                $rangeList.eq(0).html('&lt; 18');
                $rangeList.eq(1).html('18 - 25');
                $rangeList.eq(2).html('25 - 30');
                $rangeList.eq(3).html('30 - 40');
                $rangeList.eq(4).html('&gt; 40');
            } else if ($sex == 2) {
                $rangeList.eq(0).html('&lt; 19');
                $rangeList.eq(1).html('19 - 25');
                $rangeList.eq(2).html('25 - 30');
                $rangeList.eq(3).html('30 - 40');
                $rangeList.eq(4).html('&gt; 40');
            }
        }
    }

    function result() {
        monitorChange($age);
        monitorChange($height);
        monitorChange($weight);
        $sexSection.click(function () {
            calculate();
        });

        function monitorChange($object) {
            $object.change(function () {
                calculate();
                if ($object == $height) {
                    idealWeight();
                }
            });
        }

        function calculate() {
            if ($age.val() && $height.val() && $weight.val() && sexInfo()) {
                $result = $weight.val() / (($height.val() / 100) * ($height.val() / 100));
                conuntUp($result);
                changeSexIcon();
            }
        }

        function conuntUp($number) {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };
            var demo = new CountUp("resultText", 0, $number, 2, 2, options);
            demo.start();
        }

        function changeSexIcon() {
            var $sex = sexInfo();
            if ($sex == 1) {
                $('.result_content i').removeClass().addClass('fa fa-venus')
            } else if ($sex == 2) {
                $('.result_content i').removeClass().addClass('fa fa-mars')
            }
        }

        function idealWeight() {
            var $idealWeight = 22 * ($height.val() / 100) * ($height.val() / 100);
            var $idealWeightMax = Math.round($idealWeight * 1.1);
            var $idealWeightMin = Math.round($idealWeight * 0.9);
            $rangeList.eq(5).html($idealWeightMin + ' - ' + $idealWeightMax);
        }
    }
});
