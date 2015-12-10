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
        $inputOfInfo = $('.info_content input'),
        $heightVal = $headList.height(),
        $resultBackground = $('.result_content'),
        $sex = sexInfo(),
        timer = 2,
        $result;
    /*
     菜单栏下拉
     */
    $menu.click(function () {
        if ($iconMenu.hasClass('fa fa-bars') && timer == 2) {
            timer = 0;
            $iconMenu.removeClass().addClass('fa fa-times');
            $('.content').css('z-index', '-2');
            $headList.velocity({
                translateY: $heightVal
            });
            $('.content').velocity({
                translateY: 12
            });
            $('.footer').velocity({
                translateY: 12
            }, {
                complete: function () {
                    timer = 1;
                }
            })
        } else if ($iconMenu.hasClass('fa fa-times') && timer == 1) {
            $iconMenu.removeClass().addClass('fa fa-bars');
            $headList.velocity({
                translateY: 0
            });
            $('.content').velocity({
                translateY: 0
            });
            $('.footer').velocity({
                translateY: 0
            }, {
                complete: function () {
                    $('.content').css('z-index', '0');
                    timer = 2;
                }
            })
        }
        console.log(timer);
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
     限制input输入
     */

    $inputOfInfo.not(".age_info input").keypress(limitNum);
    $inputOfInfo.eq(0).keypress(function limitNum(e) {
        console.log(e);
        var k = window.event ? e.keyCode : e.which;
        if (((k >= 48) && (k <= 57)) || k == 8 || k == 0) {
        } else {
            if (window.event) {
                window.event.returnValue = false;
            }
            else {
                e.preventDefault(); //for firefox
            }
        }
    });

    function limitNum(e) {
        var k = window.event ? e.keyCode : e.which;
        if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k == 46) {
        } else {
            if (window.event) {
                window.event.returnValue = false;
            }
            else {
                e.preventDefault(); //for firefox
            }
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

    /*
     result_content背景动画
     */

    function value() {
        if ($sex == 1) {
            if ($result < 18) {
                return lev1
            } else if (18 <= $result <= 25) {
                return lev2
            } else if (25 < $result <= 30) {
                return lev3
            } else if (30 < $result <= 40) {
                return lev4
            } else if ($result > 40) {
                return lev5
            }
        } else if ($sex == 2) {
            if ($result < 19) {
                return lev1
            } else if (19 <= $result <= 25) {
                return lev2
            } else if (25 < $result <= 30) {
                return lev3
            } else if (30 < $result <= 40) {
                return lev4
            } else if ($result > 40) {
                return lev5
            }
        }
    }

    function pointPostion() {

    }
});
