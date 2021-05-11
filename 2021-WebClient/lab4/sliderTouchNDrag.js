// 플러그인 등록합니다.
$.fn.imageSlider = function (object) {
    // 변수를 선언합니다.
    var width = object.width || 460;
    var height = object.height || 300;
    var current = 0;
    var k = this;
    var box_isclick = false;
    var box_inipos = 0;
    var box_moving = 0;
    var box_origin = 0;
    var myWidth = 0;
    var init = true;
    var iniX;
    // 함수를 선언합니다.
    
    var moveTo = function () {
//        $(this).find('.images').animate({
        $(k).find('.images').animate({
//        $('.images').animate({
            left: -current * width
        }, 1000);
    };
    // 슬라이더 내부의 이미지 개수를 확인합니다.
    var imageLength = $(this).find('.image').length;
    // 슬라이더 버튼을 추가합니다.
    for (var i = 0; i < imageLength; i++) {
        $('<button></button>')
            .attr('data-position', i)
            .text(i)
            .click(function () {
                current = $(this).attr('data-position');
                moveTo();
            })
            .insertBefore(this);
    }
    // 슬라이더 스타일을 설정합니다.
    $(this).css({
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden'
    });
    $(this).find('.images').css({
        position: 'absolute',
        width: width * imageLength,
    });
    $(this).find('.image').css({
        margin: 0,
        padding: 0,
        width: width,
        height: height,
        display: 'block',
        float: 'left'
    });
    // 3초마다 슬라이더를 이동시킵니다.
    // setInterval(function () {
    //     current = current + 1;
    //     current = current % imageLength;
    //     moveTo();
    // }, 3000);

    $(this).find('.images').on({
        "touchstart mousedown": function(e) {
            e.preventDefault();
            box_isclick = true;
            box_origin = 0;
            box_moving = 0;
            if(init) { init = false; iniX = $(this).offset().left; }
            myWidth = this.getBoundingClientRect().width;
        },
        "touchstart": function(e) {
            box_inipos = e.originalEvent.touches[0].screenX;
        },
        "mousedown": function(e) {
            box_inipos = e.pageX;
        },
        "touchmove": function(e) {
            e.preventDefault();
            if(box_isclick) {
                box_moving = e.originalEvent.touches[0].screenX - box_inipos;
                // $(this).css('transform','translateX('+(box_origin+box_moving)+'px)');
                $(this).animate({
                    left: (-current * width + box_origin+box_moving) +'px'
                }, 0.000001);
            }
        },
        "mousemove": function(e) {
            if(box_isclick) {
                box_moving = e.pageX - box_inipos;
                // $(this).css('transform','translateX('+(box_origin+box_moving)+'px)');
                $(this).animate({
                                left: (-current * width + box_origin+box_moving) +'px'
                            }, 0.000001);
            }
        },
        "touchend mouseup": function(e) {
            box_isclick = false;
            if(typeof(current) == "string"){
                current *= 1;
            }
            if($(this).offset().left < 0 && box_origin+box_moving < 0){
                // $(this).css('transform','translateX(0px)');
                current = current + 1;
                current = current % imageLength;
                moveTo();
                console.log(current);
            }
            else {
                // $(this).css('transform','translateX(0px)');
                if(current != 0) {
                    current = current - 1;
                    current = current % imageLength;
                    moveTo();
                }
                else{
                    $(this).animate({
                        left: 0+'px'
                    }, 0.0001);
                }
            }
        }
    })
};
