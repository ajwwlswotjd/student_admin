const log = console.log;
const local = window.localStorage;
let app = null;
let user = -1;

class App {
	constructor(list){
		this.studentList = list;
		this.init();

		$("nav > li").eq(2).click();
	}

	init(){

		document.querySelectorAll("nav > li").forEach((x,idx)=>{
			x.addEventListener("click",(e)=>{
				let target = e.target;
				this.loadingList(target);
			});
		});

		document.querySelector("#login_submit").addEventListener("click",()=>{
			let id = login_id.value.trim();
			let pwd = login_pwd.value;
			if(id == ""){
				Swal.fire({
					icon: 'error',
					title: '로그인 실패',
					text: '아이디를 입력해주세요.',
					footer: ''
				});
				return;
			}
			if(pwd == ""){
				Swal.fire({
					icon: 'error',
					title: '로그인 실패',
					text: '비밀번호를 입력해주세요.',
					footer: ''
				});
				return;
			}

			this.login(id,pwd);
		});
	}

	login(id,pwd){

	}

	join(id,pwd,pwd_check,grade,name,age){

	}

	loadingList(target){
		let sec_target = target.dataset.target;

		$(".page.on").fadeOut();
		$(".page.on").removeClass("on");

		$(`#${sec_target}`).fadeIn();
		$(`#${sec_target}`).addClass("on");

		$("nav > li.active").removeClass("active");
		$(target).addClass("active");
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
		constructor(id,pwd,score,name){
			this.id = id;
			this.pwd = pwd;
			this.score = score;
			this.name = name;
		}
	}