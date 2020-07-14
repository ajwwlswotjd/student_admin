const log = console.log;
const local = window.localStorage;
let user = -1;

class App {
	constructor(list){
		this.studentList = list;
		this.init();
	}

	init(){
		// this.loadingList(0);

		document.querySelectorAll("nav > li").forEach((x,idx)=>{
			x.addEventListener("click",(e)=>{
				this.loadingList(idx);
			});
		});
	}

	loadingList(index){
		$(".page.on").fadeOut();
		$(".page.on").removeClass("on");
		$(".page").eq(index).fadeIn();
		$(".page").eq(index).addClass("on");
		$("nav > li.active").removeClass("active");
		$("nav > li").eq(index).addClass("active");
		let arr = [
		 ()=>{ //메인
		 	
		 },
		 ()=>{ // 인서트
		 	
		 },
		 ()=>{ // 딜리트
		 	
		 }
		];
	}
}

window.addEventListener("load",()=>{
	// let list = JSON.stringify([1,2,3,4,5,{"qqq":12334}],null,0);
	// local.setItem("list",list);
	// log(local);
	let list = local.getItem("list");
	let json = JSON.parse(list);
	let app = new App(json);
});

class Student {
	constructor(id,pwd,score){
		this.id = id;
		this.pwd = pwd;
		this.score = score;
	}
}

function loginSubmit(){
	return false;
}