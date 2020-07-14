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


let app = null;
let user = -1;

class App {
	constructor(list){
		this.studentList = list;
		this.init();

		$("nav > li").eq(2).click();
	}

	init(){

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

		document.querySelector("#join_submit").addEventListener("click",(e)=>{
			if(!id_ok){
				Swal.fire({
					icon: 'error',
					title: '로그인 실패',
					text: '비밀번호를 입력해주세요.',
					footer: ''
				});
				return;
			}
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