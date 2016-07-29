// 各変数
window.shapes = {};
window.selectRectNumber = null;
window.fillObjects = [];
window.shapes = [];
window.b64String = "";

// canvasに、CreateJSのステージを作成
stage = new createjs.Stage("demo");

// マウス操作を可能にする
stage.mouseEnabled = true;
stage.enableMouseOver();

// カラーボタンを無効に
$(".ColorButton").prop("disabled", true);


// 描写したい矩形のセットを定義
petternArr01 = [
	{
		x: 10,
		y: 10,
		width: 100,
		height: 100,
		color: "#d3d3d3"
	}, {
		x: 120,
		y: 10,
		width: 100,
		height: 100,
		color: "#d3d3d3"
	}, {
		x: 230,
		y: 10,
		width: 100,
		height: 100,
		color: "#d3d3d3"
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
				$(".ColorButton").prop("disabled", false); // カラーボタンを有効に
				addShadowSelectedRect(selectRectNumber, shapes); // 選択中の矩形に、影を追加
				stage.update();
			}
		})();

		// 矩形にクリックイベントを追加
		shapes[i].addEventListener("click", f);

		// 矩形にマウスオーバー/アウト時のイベントを追加
		shapes[i].addEventListener("mouseover", function (e) {
			document.body.style.cursor = "pointer";
			console.log("test");
		});
		shapes[i].addEventListener("mouseout", function (e) {
			document.body.style.cursor = "";
		});

		stage.addChild(shapes[i]);// ステージに各矩形を追加
		stage.update();// 描写
	}
}

// 矩形の描写
drawRects(petternArr01);

// 選択した矩形に、影を描写する関数
function addShadowSelectedRect(number, shapesArr) {

	// まず、すべての矩形の影を消去する
	for (var i = 0; i < shapesArr.length; i++) {
		shapesArr[i].shadow = null; // shape.shadow = null とすると、影を消去できる。
	}

	shapesArr[number].shadow = new createjs.Shadow("#17b7ff", 0, 0, 20); // 選択中の矩形に影を追加
	stage.update(); // 描写

}

// 矩形の選択をすべて解除する関数
function clearSelect(){

	selectRectNumber = null; // 選択中の番号を空に
	
	// すべての矩形の影を消去する
	for (var i = 0; i < shapes.length; i++) {
		shapes[i].shadow = null; // shape.shadow = null とすると、影を消去できる。
	}
	
	$(".ColorButton").prop("disabled", true); // カラーボタンを無効に
	
	stage.update(); // 描写
}

// 色を変更する関数
function changeColor(color) {
	// 選択している矩形があれば
	if (selectRectNumber != null) {
		fillObjects[selectRectNumber].style = color; // fillObjectから、色を変更する
		stage.update(); // ステージの更新
		getBase64();
	} else {
		alert("選択してください");
	}
}

// canvasをbase64に変換する関数
function getBase64() {
	b64String = $("#demo")[0].toDataURL();
}

// 送信
function send() {
	
	clearSelect(); // 選択の解除
	getBase64(); // base64を取得
	
	$("img#usersAnswer").attr("src", b64String); // imgに出力
	$("pre#codeBox").text(b64String); // codeに出力
	
}

