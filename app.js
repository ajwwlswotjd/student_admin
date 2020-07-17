const log = console.log;
const local = window.localStorage;

const id_pat = /^[a-z]+[a-z0-9\_]{5,}$/;
const name_pat = /^[a-zA-Z가-힣0-9\s]{2,}$/;
const pwd_pat = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;

let id_ok = false;
let name_ok = false;
let pwd_ok = false;
let pwd2_ok = false;
let score_ok = false;
let age_ok = false;

let now_target = local.getItem("target") == null ? "home" : local.getItem("target");
let order = false;
let showOnOnePageCnt = 8;
let now_page = null;


let app = null;
let user = local.getItem("user") == null ? -1 : local.getItem("user");

class App {
    constructor(list){
        this.studentList = list;
        this.init();

        $("nav > li").eq(4).click();
    }

    init(){

        document.querySelector(".edit-name").addEventListener("click",async ()=>{
            const { value: name } = await Swal.fire({
                title: '바꿀 이름을 입력해주세요',
                input: 'text',
                inputPlaceholder: '이름'
            });
            if(name) {
                if(name_pat.test(name)){
                    this.studentList[user].name = name;
                    this.saveOnLocal();
                   Swal.fire({
                        icon: 'success',
                        title: '변경 완료',
                        text: '이름 변경이 완료되었습니다.',
                        footer: ''
                    }).then(e=>{
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '변경 실패',
                        text: '이름은 2자 이상의 영어,한글,숫자,공백으로만 이루어져야 합니다.',
                        footer: ''
                    });
                }
            }
        });

        document.querySelector(".edit-pwd").addEventListener("click",async ()=>{
            const { value: pwd } = await Swal.fire({
                title: '바꿀 비밀번호를 입력해주세요.',
                input: 'password',
                inputPlaceholder: '비밀번호'
            });
            if(pwd) {
                if(pwd_pat.test(pwd)){
                    this.studentList[user].pwd = pwd;
                    this.saveOnLocal();
                   Swal.fire({
                        icon: 'success',
                        title: '변경 완료',
                        text: '비밀번호 변경이 완료되었습니다.',
                        footer: ''
                    }).then(e=>{
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '변경 실패',
                        text: '비밀번호는 6자 이상 20자 이하로 영어와 숫자를 모두 포함해야 합니다.',
                        footer: ''
                    });
                }
            }
        });

        document.querySelector(".edit-score").addEventListener("click",async ()=>{
            const { value: score } = await Swal.fire({
                title: '바꿀 점수를 입력해주세요.',
                input: 'number',
                inputPlaceholder: '점수'
            });
            if(score) {
                if(score >= 0 && score <= 100){
                    this.studentList[user].score = score;
                    this.saveOnLocal();
                   Swal.fire({
                        icon: 'success',
                        title: '변경 완료',
                        text: '점수 변경이 완료되었습니다.',
                        footer: ''
                    }).then(e=>{
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '변경 실패',
                        text: '점수는 0 이상 100 이하의 정수이여야 합니다.',
                        footer: ''
                    });
                }
            }
        });

        document.querySelector(".edit-age").addEventListener("click",async ()=>{
            const { value: age } = await Swal.fire({
                title: '바꿀 나이를 입력해주세요.',
                input: 'number',
                inputPlaceholder: '나이'
            });
            if(age) {
                if(age >= 1){
                    this.studentList[user].age = age;
                    this.saveOnLocal();
                   Swal.fire({
                        icon: 'success',
                        title: '변경 완료',
                        text: '나이 변경이 완료되었습니다.',
                        footer: ''
                    }).then(e=>{
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '변경 실패',
                        text: '나이는 1 이상의 정수이여야 합니다.',
                        footer: ''
                    });
                }
            }
        });




        $(".th-btn-box > i").on("click",(e)=>{
            order = !order;
            $(".th-btn-box > i").toggleClass("order-active");
            this.fillTable(showOnOnePageCnt,now_page);
        });

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

        let arr = {
            'default' : ()=>{},
            "home" : ()=>{
                if(this.studentList.length == 0){
                    $("#home-nav").hide();
                    $("#home-table").hide();
                    $(".home-no").show();
                    return;
                }
                $("#home-nav").show();
                $("#home-table").show();
                $(".home-no").hide();
                let pageCnt = Math.ceil(this.studentList.length /showOnOnePageCnt);
                let dom = document.querySelector("#home-nav");
                dom.innerHTML = "";
                for(let i = 1; i <= pageCnt; i++){
                    let li = document.createElement("li");
                    li.innerHTML = i;
                    li.dataset.page = i;
                    dom.appendChild(li);
                    li.addEventListener("click",(e)=>{
                        this.fillTable(showOnOnePageCnt,li.dataset.page);
                        $(".home-active").removeClass("home-active");
                        $(li).addClass("home-active");
                    });         
                }
                document.querySelector("#home-nav > li:first-child").click();
            },
            "statistics" : ()=>{
                if(this.studentList.length == 0){
                    $(".static-list").hide();
                    $(".static-king").hide();
                    $('.static-no').show();
                    return;
                }
                $(".static-list").show();
                $(".static-king").show();
                $('.static-no').hide();
                let score_total = 0;
                let age_total = 0;
                let max = 0;
                this.studentList.forEach(x=>{
                    score_total += x.score*1;
                    age_total += x.age*1;
                    if(x.age*1 >= max) max = x.age*1;
                });
                let avg = Math.floor(score_total/this.studentList.length);
                drawCanvas(document.querySelector("#score-canvas"),100,avg,"점");
                let age = Math.floor(age_total/this.studentList.length);
                drawCanvas(document.querySelector("#age-canvas"),100,age,"세");

                let counted = {};
                let len = {};
                this.studentList.forEach(x=>{
                    counted[x.age] = counted[x.age] ? counted[x.age]*1+x.score*1 : x.score*1;
                    len[x.age] = len[x.age] ? len[x.age]+1 : 1;
                });
                let keyArr = Object.keys(counted);
                let valueArr = Object.values(counted);
                let cntArr = Object.values(len);
                let temp = [];
                for(let i = 0; i < valueArr.length; i++){
                    let avg = Math.floor(valueArr[i] / cntArr[i]);
                    temp.push(avg);
                }
                let maxIdx = 0;
                let minIdx = 0;
                for(let i = 0; i < temp.length; i++){
                    if(temp[maxIdx] < temp[i]) maxIdx = i;
                    if(temp[minIdx] > temp[i]) minIdx = i;
                }
                let max_avg = temp[maxIdx];
                let min_avg = temp[minIdx];

                drawCanvas(document.querySelector("#king-canvas"),100,max_avg,"점");
                drawCanvas(document.querySelector("#king-canvas2"),100,min_avg,"점");

                document.querySelector(".static-max").innerHTML = keyArr[maxIdx]+"세";
                document.querySelector(".static-min").innerHTML = keyArr[minIdx]+"세";
            },
            "info":()=>{
                let signedUser = this.studentList[user];
                if(!signedUser) return;
                info_id.value = signedUser.id;
                info_name.value = signedUser.name;
                info_pwd.value = signedUser.pwd;
                info_score.value = signedUser.score+"점";
                info_age.value = signedUser.age+"세";
            }
        };

        document.querySelector('#info_delete').addEventListener("click",()=>{
            Swal.fire({
	  			title: '탈퇴 하시겠습니까?',
  				text: "탈퇴된 회원정보는 복구될 수 없습니다.",
				 icon: 'warning',
  				showCancelButton: true,
  				confirmButtonColor: '#3085d6',
  				cancelButtonColor: '#d33',
  				confirmButtonText: '확인',
  				cancelButtonText: '취소'
				}).then((result) => {
  				if (result.value) {
    				Swal.fire(
      					'탈퇴 성공!',
      					'회원 탈퇴에 성공하였습니다.',
      					'success'
    				).then((e)=>{
    					this.studentList.splice(user,1);
    					user = -1;
    					this.saveOnLocal();
    					location.reload();
    				});
  				}
			});
        });
        (arr[target] || arr['default'])();
    }

    fillTable(showOnOnePageCnt,page){
        // let pageCnt = Math.ceil(this.studentList.length/8);
        let sorted = this.studentList.slice().sort((x,y)=>{
            if(x["score"]*1 > y["score"]*1) return order ? 1 : -1;
            if(x["score"]*1 < y["score"]*1) return order ? -1 : 1;
            if(x["score"]*1 == y["score"]*1) return 0;
        });
        now_page = page;
        let start = showOnOnePageCnt*(page-1);
        let end = start+showOnOnePageCnt;
        let dom = document.querySelector("#home-table tbody");
        dom.innerHTML = "";
        for(let i = start; i < end; i++){
            let student = sorted[i];
            if(student == undefined) return;
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${order ? this.studentList.length-i : (i+1)}</td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.score}점</td>
            <td>${student.age}세</td>`;
            dom.appendChild(tr);
        }
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

function drawCanvas(canvas,total,current,txt){
    let ctx = canvas.getContext("2d");
    let w = canvas.width;
    let h = canvas.height;
    let now = 0;
    let term = current / 45;
    let frame = setInterval(()=>{
        now+=term;
        if(now >= current){
            now=current;
            clearInterval(frame);
        }
        draw(ctx,w,h,now,total,txt);
    },1000/45);
}

function draw(ctx,w,h,now,total,txt){
    ctx.clearRect(0,0,w,h);

    ctx.beginPath();
    ctx.moveTo(w/2,h/2);
    ctx.arc(w/2,h/2,w/2-70,-Math.PI/2, 3/2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#f4f5f9";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w/2,h/2);
    ctx.arc(w/2,h/2,w/2-70,-Math.PI/2,-Math.PI/2+(now/total)*(2*Math.PI));
    ctx.closePath();
    ctx.fillStyle = "#333030";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(w/2,h/2);
    ctx.arc(w/2,h/2,w/2-90,-Math.PI/2, 3/2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();

    let percent = Math.floor(now/total*100);
    ctx.moveTo(w/2,h/2);
    ctx.font = "bold 22px noto";
    ctx.fillStyle = "#333030";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(percent+txt,w/2,h/2);
}