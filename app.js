const log = console.log;
const local = window.localStorage;

const id_pat = /^[a-z]+[a-z0-9]{5,}$/;
const name_pat = /^[a-zA-Z가-힣]{2,}$/;
const pwd_pat = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;

let id_ok = false;
let name_ok = false;
let pwd_ok = false;
let pwd2_ok = false;
let score_ok = false;
let age_ok = false;

let now_target = null; 


let app = null;
let user = local.getItem("user");

class App {
	constructor(list){
		this.studentList = list;
		this.init();

		$("nav > li").eq(4).click();
	}

	init(){

		document.querySelector("#logout_btn").addEventListener("click",(e)=>{
			user = -1;
			$("nav > li").eq(0).toggle();
			$("nav > li").eq(1).toggle();
			$("nav > li").eq(2).toggle();
			$("nav > li").eq(3).toggle();
			this.loadingList("login");
		});

		if(user == -1){
			$("nav > li").eq(0).hide();
			$("nav > li").eq(1).hide();
			$("nav > li").eq(2).show();
			$("nav > li").eq(3).show();
		} else {
			$("nav > li").eq(0).show();
			$("nav > li").eq(1).show();
			$("nav > li").eq(2).hide();
			$("nav > li").eq(3).hide();
		}

		document.querySelector("#join_id").addEventListener("input",(e)=>{
			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".id_span");
			id_ok = id_pat.test(e.target.value);
			let color = id_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});

		document.querySelector("#join_name").addEventListener("input",(e)=>{
			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".name_span");
			name_ok = name_pat.test(e.target.value);
			let color = name_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});

		document.querySelector("#join_pwd").addEventListener("input",(e)=>{

			document.querySelector("#join_pwd2").value = "";
			document.querySelector("#join_pwd2").style.borderColor = "#ddd";
			document.querySelector("#join_pwd2").style.color = "#666";
			document.querySelector(".pwd2_span").style.color = "#898989";
			document.querySelector("#join_pwd2").parentNode.querySelector("label").style.color = "#bbb";
			pwd2_ok = false;

			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".pwd_span");
			pwd_ok = pwd_pat.test(e.target.value);
			let color = pwd_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});

		document.querySelector("#join_pwd2").addEventListener("input",(e)=>{
			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".pwd2_span");
			pwd2_ok = e.target.value == document.querySelector("#join_pwd").value;
			let color = pwd2_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});

		document.querySelector("#join_score").addEventListener("input",(e)=>{
			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".score_span");
			score_ok = e.target.value >= 0 && e.target.value <= 100;
			let color = score_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				score_ok = false;
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});

		document.querySelector("#join_age").addEventListener("input",(e)=>{
			let label = e.target.parentNode.querySelector("label");
			let span = document.querySelector(".age_span");
			age_ok = e.target.value >= 1;
			let color = age_ok ? "#479ee5" : "#ff5656";
			if(e.target.value ==""){
				age_ok = false;
				e.target.style.borderColor = "#ddd";
				e.target.style.color = "#666";
				label.style.color = "#bbb";
				span.style.color = "#898989";
				return;
			}
			e.target.style.borderColor = color;
			e.target.style.color = color;
			span.style.color = color;
			label.style.color = color;
		});


		document.querySelectorAll("nav > li").forEach((x,idx)=>{
			x.addEventListener("click",(e)=>{
				let target = e.target.dataset.target;
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

		document.querySelector("#join_submit").addEventListener("click",(e)=>{
			if(!id_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text: '아이디를 형식에 알맞게 입력해주세요.',
					footer: ''
				}).then(e=> join_id.focus());
				return;
			}
			if(!name_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text: '이름을 형식에 알맞게 입력해주세요.',
					footer: ''
				}).then(e=> join_name.focus());
				return;
			}
			if(!pwd_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text: '비밀번호를 형식에 알맞게 입력해주세요.',
					footer: ''
				}).then(e=> join_pwd.focus());
				return;
			}
			if(!pwd2_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text: '입력하신 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
					footer: ''
				}).then(e=> join_pwd2.focus());
				return;
			}
			if(!score_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text: '점수는 0이상 100 이하의 정수여야 합나다.',
					footer: ''
				}).then(e=> join_score.focus());
				return;
			}
			if(!age_ok){
				Swal.fire({
					icon: 'error',
					title: '회원가입 실패',
					text : '나이는 1 이상의 정수여야 합니다.',
					footer: ''
				}).then(e=> join_age.focus());
				return;
			}

			this.join(join_id.value,join_pwd.value,join_score.value,join_name.value,join_age.value);
		});

	}

	login(id,pwd){
		let index = -1;
		this.studentList.forEach((x,i)=>{
			if(x.id == id && x.pwd == pwd) index = i;
		});
		if(index == -1){
			Swal.fire({
				icon: 'error',
				title: '로그인 실패',
				text : '아이디 또는 비밀번호가 올바르지 않습니다.',
				footer: ''
			});
			return;
		}
		user = index;
		this.saveOnLocal();

		Swal.fire({
			icon: 'success',
			title: '로그인 성공',
			text : '로그인에 성공하였습니다.',
			footer: ''
		});
		$("nav > li").eq(0).toggle();
		$("nav > li").eq(1).toggle();
		$("nav > li").eq(2).toggle();
		$("nav > li").eq(3).toggle();
		this.loadingList("home");
	}

	join(id,pwd,score,name,age){
		let exist = this.studentList.find(x=>{
			return x.id == id;
		});

		if(exist !== undefined){
			Swal.fire({
				icon: 'error',
				title: '회원가입 실패',
				text : '중복되는 아이디입니다. 다른 아이디를 이용해주세요.',
				footer: ''
			}).then(e=> join_id.focus());
			return;
		}

		let student = new Student(join_id.value,join_pwd.value,join_score.value,join_name.value,join_age.value);
		this.studentList.push(student);
		Swal.fire({
			icon: 'success',
			title: '회원가입 성공',
			text : '회원가입에 성공하였습니다.',
			footer: ''
		}).then(e=> this.loadingList("login"));
		this.saveOnLocal();
	}

	saveOnLocal(){
		local.setItem("list",JSON.stringify(this.studentList,null,0));
		local.setItem("target",now_target);
		local.setItem("user",user);
	}

	loadingList(target){
		$(".page.on").fadeOut();
		$(".page.on").removeClass("on");

		$(`#${target}`).fadeIn();
		$(`#${target}`).addClass("on");

		$("nav > li.active").removeClass("active");
		$(`nav > li[data-target='${target}']`).addClass("active");
		now_target = target;
		this.saveOnLocal();

		$("#login input").val('');
		this.join_init();
	}

	join_init(){
		$("#join input").val('');
		id_ok = false;
		name_ok = false;
		pwd_ok = false;
		pwd2_ok = false;
		score_ok = false;
		age_ok = false;
		document.querySelectorAll("#join .join-input > input").forEach(x=>{
			let label = x.parentNode.querySelector("label");
			let span = x.parentNode.querySelector("span");
			x.style.borderColor = "#ddd";
			x.style.color = "#666";
			label.style.color = "#bbb";
			span.style.color = "#898989";
		});
	}
}

window.addEventListener("load",()=>{
	let list = local.getItem("list");
	let json = JSON.parse(list);
	if(json == null) json = [];
	app = new App(json);
});

class Student {
	constructor(id,pwd,score,name,age){
		this.id = id;
		this.pwd = pwd;
		this.score = score;
		this.name = name;
		this.age = age;
	}
}
