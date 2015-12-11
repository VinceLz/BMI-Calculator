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
        $resultBackground = $('.result_content .top_result'),
        $caretLeft = parseInt($('.fa-caret-down').css('left')),
        $sex = sexInfo(),
        timer = true,
        state = true,
        $result;


    /*
     菜单栏下拉
     */
    $menu.click(function () {
        if ($iconMenu.hasClass('fa fa-bars') && timer) {
            timer = false;
            $iconMenu.removeClass().addClass('fa fa-times');
            $('.buddy').css('z-index', '-2');
            $headList.velocity({
                translateY: $heightVal
            });
            $('.buddy').velocity({
                translateY: 15
            }, {
                complete: function () {
                    timer = true;
                }
            })
        } else if ($iconMenu.hasClass('fa fa-times') && timer == 1) {
            timer = false;
            $iconMenu.removeClass().addClass('fa fa-bars');
            $headList.velocity({
                translateY: 0
            });
            $('.buddy').velocity({
                translateY: 0
            }, {
                complete: function () {
                    $('.buddy').css('z-index', '0');
                    timer = true;
                }
            })
        }
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
        var k = window.event ? e.keyCode : e.which;
        if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k == 13) {
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
        if (((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k == 46 || k == 13) {
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
            $sex = sexInfo();
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
                console.log($weight.val());
                conuntUp($result);
                changeSexIcon();
                pointPostion();
                changeColor();
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
            var demo = new CountUp("resultText", 0, $number, 2, 2.6, options);
            demo.start();
        }

        function changeSexIcon() {
            var $sex = sexInfo();
            if ($sex == 1) {
                $('.result_content .top_result i').removeClass().addClass('fa fa-venus')
            } else if ($sex == 2) {
                $('.result_content .top_result i').removeClass().addClass('fa fa-mars')
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

    function changeColor() {
        var $color,
            seqChangeColor;

        if ($sex == 1 && !state) {
            if ($result < 18) {
                $color = '#6FDCFF'
            } else if (18 <= $result && $result <= 25) {
                $color = '#56A95A'
            } else if (25 < $result && $result <= 30) {
                $color = '#FBD432'
            } else if (30 < $result && $result <= 40) {
                $color = '#FF8D12'
            } else if ($result > 40) {
                $color = '#FF4746'
            }
            seqChangeColor = [{
                e: $resultBackground,
                p: {backgroundColor: $color},
                o: {duration: 2600}
            }];
        } else if ($sex == 2 && !state) {
            if ($result < 19) {
                $color = '#6FDCFF'
            } else if (19 <= $result && $result <= 25) {
                $color = '#56A95A'
            } else if (25 < $result && $result <= 30) {
                $color = '#FBD432'
            } else if (30 < $result && $result <= 40) {
                $color = '#FF8D12'
            } else if ($result > 40) {
                $color = '#FF4746'
            }
            seqChangeColor = [{
                e: $resultBackground,
                p: {backgroundColor: $color},
                o: {duration: 2600}
            }];
        }


        if ($sex == 1 && state) {

            if ($result < 18) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 2600}
                    }];
            } else if (18 <= $result && $result <= 25) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 1300}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 1300}
                    }];

            } else if (25 < $result && $result <= 30) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 866}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 866}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 867}
                    }];
            } else if (30 < $result && $result <= 40) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 650}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 650}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 650}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF8D12'},
                        o: {duration: 650}
                    }];
            } else if ($result > 40) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 520}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF8D12'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF4746'},
                        o: {duration: 520}
                    }];
            }

            state = false;


        } else if ($sex == 2 && state) {

            if ($result < 19) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 2600}
                    }];
            } else if (19 <= $result && $result <= 25) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 1300}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 1300}
                    }];

            } else if (25 < $result && $result <= 30) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 866}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 866}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 867}
                    }];
            } else if (30 < $result && $result <= 40) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 650}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 650}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 650}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF8D12'},
                        o: {duration: 650}
                    }];
            } else if ($result > 40) {
                seqChangeColor = [
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#6FDCFF'},
                        o: {duration: 520}
                    },
                    {
                        e: $resultBackground,
                        p: {backgroundColor: '#56A95A'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FBD432'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF8D12'},
                        o: {duration: 520}
                    }, {
                        e: $resultBackground,
                        p: {backgroundColor: '#FF4746'},
                        o: {duration: 520}
                    }];

            }
            state = false;
        }

        var $h3 = $('.top_result h3'),
            $span = $('.top_result span'),
            $i = $('.top_result i');
        var seqChangeFontColor = [
            {
                e: $h3,
                p: {color: '#fff'},
            }, {
                e: $span,
                p: {color: '#fff'},
                o: {sequenceQueue: false}
            }, {
                e: $i,
                p: {color: '#fff'},
                o: {sequenceQueue: false}
            }];
        $.Velocity.RunSequence(seqChangeColor);
        $.Velocity.RunSequence(seqChangeFontColor);
    }


    function pointPostion() {
        var $width = $('.bottom_result').innerWidth();
        var $perWidth,
            $value,
            $leftValue;
        if ($sex == 1) {
            $perWidth = $width / 23;
            $value = $result - 18;
        } else if ($sex == 2) {
            $perWidth = $width / 22;
            $value = $result - 19;
        }
        $leftValue = $perWidth * $value - $caretLeft;

        if ($sex == 1 && $leftValue < 0) {
            $leftValue = $caretLeft;
        } else if ($sex == 2 && $leftValue < 0) {
            $leftValue = $caretLeft;
        } else if ($leftValue > $width) {
            $leftValue = $width + $caretLeft;
        }

        $('.fa-caret-down').show().velocity({left: $leftValue}, {duration: 2600})

    }
});


