// 各変数
window.shapes = {};
window.selectRectNumber = null;
window.fillObjects = [];
window.shapes = [];

// canvasに、CreateJSのステージを作成
stage = new createjs.Stage("demo");

// マウス操作を可能にする
stage.mouseEnabled = true;

// 描写したい矩形のセットを定義
petternArr01 = [
	{
		x: 10,
		y: 10,
		width: 100,
		height: 100,
		color: "#EA4335"
	}, {
		x: 120,
		y: 10,
		width: 100,
		height: 100,
		color: "pink"
	}
];

// 矩形を描写する関数: 引数には、描写したい矩形のセットを渡す
function drawRects(arr) {

	for (var i = 0; i < arr.length; i++) {
		
		var t = arr[i];

		shapes[i] = new createjs.Shape();
		fillObjects[i] = shapes[i].graphics.beginFill(t.color).command; // fillObjectを格納。後から色を変更するために使う。

		// 渡されたオブジェクトを基に、矩形の作成 (座標x, 座標y, 横幅, 縦幅)
		shapes[i].graphics.drawRect(
			t.x,
			t.y,
			t.width,
			t.height
		);

		// 選択中の矩形を変更する関数を定義 (クロージャの関係上、即時関数にしている)
		var f = (function () {
			var n = i;
			return function () {
				selectRectNumber = n; // 選択中の矩形を変更
				shapes[selectRectNumber].shadow = new createjs.Shadow(createjs.Graphics.getRGB(0,0,0), 8,8,8,8);
				stage.update();
			}
		})();

		// 矩形にクリックイベントを定義
		shapes[i].addEventListener("click", f);

		// ステージに各矩形を追加
		stage.addChild(shapes[i]);
		// 描写
		stage.update();
	}
}

// 矩形の描写
drawRects(petternArr01);


// 色を変更する関数
function changeColor(color) {
	// 選択している矩形があれば
	if (selectRectNumber != null) {
		fillObjects[selectRectNumber].style = color; // fillObjectから、色を変更する
		stage.update(); // ステージの更新
	} else {
		alert("選択してください");
	}
}

// canvasをbase64に変換する関数
function getBase64() {
	var b64 = $("#demo")[0].toDataURL();
	$("#base64text").text(b64);
}