$(function(){
    var canvas = document.getElementById("canvas");
    // ２Dで栓をかけるようにする
    var context = canvas.getContext("2d");

    const cnvWidth = 500;
    const cnvHeight = 300;

    // デフォルトの色
    let cnvColor = "0,0,0";
    // デフォルトの線の太さ
    let cnvBold = 5;
    // デフォルトのフラグの値 0がクリックされていない
    let clickFlg = 0;
    // デフォルトの背景色
    let bgColor = "rgb(255,255,255)";
    // 背景を白にする関数を作成
    function SetBgColor(){
        context.fillStyle = bgColor;
        context.fillRect(0,0,cnvWidth,cnvHeight);
    }
    // 関数を実行、呼び出し
    SetBgColor();

    // マウス操作のイベント
    $("#canvas").mousedown(function(){
        clickFlg = 1;
    }).mouseup(function(){
        clickFlg = 0;
    }).mousemove(function(e){
        if(!clickFlg) return false;
        draw(e.offsetX,e.offsetY)
    });

    function draw(x,y){
        context.lineWidth = cnvBold;
        context.strokeStyle = "rgba("+cnvColor+")";
        if(clickFlg=="1"){
            clickFlg="2";
            // パスを切り離す
            context.beginPath();
            context.lineCap="round";
            context.moveTo(x,y);
        }else{
            context.lineTo(x,y);
        }
        context.stroke();
    }

    // 選んだ色に変更
    $(".color a").click(function(){
        cnvColor = $(this).data("color");
        return false;
    });

    // 選んだ太さに変更
    $(".weight a").click(function(){
        cnvBold = $(this).data("weight");
        return false;
    });

    // 選んだ太さに変更
    $("#clear").click(function(){
    //データ全消し 
    context.clearRect(0,0,cnvWidth,cnvHeight);
    // 関数を実行、呼び出し
    SetBgColor();
    });

    //  canvasを画像として保存
    $("#download").click(function(){
        var canvas = document.getElementById('canvas');
        // CANVASに2Dで線を引けるようにする
        var base64 = canvas.toDataURL('image/jpeg');
        document.getElementById("download").href=base64
    });
});


