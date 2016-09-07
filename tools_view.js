function tools_view(){
var $all = document.querySelectorAll("html *");
var $lastStyle = document.createElement("style");
$lastStyle.setAttribute("rel","stylesheet");
$lastStyle.setAttribute("type","text/css");

$lastStyle.textContent=
					".viewBorder{outline:1px solid purple;}"
					;
var $html = document.documentElement;
$html.appendChild($lastStyle);

console.log("$all:",$all.forEach);
function ac01 (){
	var $lastStyle = null;
	for(var i=0; i<$all.length;i++){
	// 	hddx
		$all[i]
		.addEventListener(
				"mouseover"
				,function(event){

					console.log("this:",this);
					console.log("event over:",event);

					$lastStyle  = this.className;
					console.log("$lastStyle",$lastStyle);

					this.className=$lastStyle+" viewBorder";
					console.log("this.className:",this.className.replace(/viewBorder*/g,""));

					event.stopPropagation();
					event.cancelBubble=true;
				}
				,true
			);

	// 	hddx
		$all[i]
		.addEventListener(
			"mouseleave"
			,function(event){
				console.log("this:",this);
				console.log("event leave:",event);

				console.log("$lastStyle:",$lastStyle)

				this.className=$lastStyle;
				event.stopPropagation();
				event.cancelBubble=true;

			}
			,true
		);
	}
}
// ac01();

function ac02(){
	var $lastStyle = null;
	console.log("arguments[0]:",arguments[0]);
	hddx
	.addEventListener(
		"mouseover"
		,function(event){

			console.log("this:",this);
			console.log("event over:",event);

			$lastStyle  = this.className;
			console.log("$lastStyle",$lastStyle);

			this.className=$lastStyle+" viewBorder";
			event.stopPropagation();
			event.cancelBubble=true;
		}
		,true
	);

	hddx
	.addEventListener(
		"mouseleave"
		,function(event){
			console.log("this:",this);
			console.log("event leave:",event);

			console.log("$lastStyle:",$lastStyle)

			this.className=$lastStyle;
			event.stopPropagation();
			event.cancelBubble=true;

		}
		,true
	);
}
// ac02();

function bf(){
	$all.forEach(
		function(e)
		{
	// 		console.log("e", e);
	// 		for (var a in e) {
	// 			console.log("a", e['a']);
	// 		}
			var $lastStyle = null;
			e
			.addEventListener(
			"mouseover"
			,function(event){

					console.log("this:",this);
					console.log("event over:",event);

					$lastStyle  = this.className;
					console.log("$lastStyle",$lastStyle);

					this.className=$lastStyle+" viewBorder";
					console.log("this.className:", this.className);

					event.stopPropagation();
					event.cancelBubble=true;
				}
				,false
			);

			e
			.addEventListener(
				"mouseleave"
				,function(event){
					console.log("this:",this);
					console.log("event dblclick:",event);

					console.log("$lastStyle:",$lastStyle)
					console.log("this.className:",this.className)
					var $newClass = this.className;

// 					this.className=$lastStyle;
					this.className=$newClass.replace(/viewBorder*/g,"");
					console.log("this.className:",$newClass.replace(/viewBorder*/g,""));

					event.stopPropagation();
					event.cancelBubble=true;

				}
				,false
			);

		}
	);
}
bf();
}