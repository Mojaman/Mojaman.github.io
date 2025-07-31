console.log('ボンパイエ');



//画面を一番上に戻すための下準備
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

//読み込まれたら画面を一番上に戻す
window.scrollTo(0, 0);


//Start！ボタンが押されたときの対応
document.getElementById('button1').addEventListener('click', () => {
   start();
});


//document.body.style.overflow = 'hidden';
//縦スクロールチェックデバッグ
// window.addEventListener('scroll', () => {
//   console.log('縦スクロール位置：' + window.scrollY + 'px');
// });



//画面のスクロールを制限する
document.body.style.overflow = 'hidden';

//質問をリストに保存
let uranaiQuestions = ['どちらかというと、守られるよりも守りたいタイプだ','情報の管理が得意な方である','破壊よりも創造のほうが得意である','リサイクルを普段から心がけている','ふと、分裂したいなと思うことがよくある','物々交換が得意な方である','荷物運びをよく任されやすい','ストレスにはあまり強くない方だと思う','翻訳をするのが得意だ','破壊をするのが大好きだ','リーダーシップがある方だと思う','貯金が得意な方である','自己が揺るがないタイプである','外部の刺激に敏感なタイプだと思う'];

// 各小器官を順に保存するリスト
let syoukikans = ["核", "核小体", "ミトコンドリア", "葉緑体", "細胞膜", "ゴルジ体", "小胞体", "リボソーム", "リソソーム",  "中心体", "液胞", "細胞骨格", "細胞壁"];

//各小器官の英名を保存するリスト
let syoukikansEn = ["(Cell Nucleus)", "(Nucleolus)", "(Mitochondria)", "(Chloroplast)", "(Cell Membrane)", "(Golgi Apparatus)", "(Endoplasmic Reticulum)", "(Ribosome)", "(Lysosome)", "(Centrosome)", "(Vacuole)", "(Cytoskeleton)", "(Cell Wall)"];


//各小器官のリザルト文言を保存するリスト
let syoukikansAd = ["遺伝情報の保存と伝達、細胞の成長や分裂、タンパク質の合成などを制御する核。細胞の司令塔のような役割をはたすアナタは、周りへの支配欲が強めかも。分裂するときはガン化しないように要注意！", "核の中で、リボソームのもととなるrRNAをせっせと作っている核小体。裏方だけど超重要！そんなアナタは、人知れず成果を出す縁の下の力持ちかも。rRNAの転写は、間違えると核小体ストレスの要因にもなるから慎重に！", "エネルギーをつくり出す細胞の発電所、ミトコンドリア。どんなときもパワフルに活動し、みんなを支えるアナタは周りに頼られる存在かも。ストレスによって減少してしまうこともあるから、たまには一休みも大事。", "太陽の光を利用してATPなどの合成を行う葉緑体。太陽が味方のアナタは、ポジティブで明るく、周囲に元気を分け与える存在かも。でも、曇りの日はちょっと元気がなくなっちゃう…？そんなときはミトコンドリアと協力するのもアリ？", "細胞の内と外を仕切り、物質のやり取りをコントロールする細胞膜。境界線をしっかり守るアナタは、必要なものとそうでないものの区別がしっかりとつけられるタイプ？ただ、もし膜タンパク質の配送先を間違えてしまうと、細胞機能の低下や様々な疾患の要因になってしまうこともあるから、調子にはのらないように！", "作られたタンパク質を加工・仕分けして送り出す物流センター、ゴルジ体。加工や合成、仕分けや配送などが得意なアナタは、自分で何でも作っちゃうタイプ？もしタンパク質の糖鎖修飾を間違えると、タンパク質の機能異常や細胞間の情報伝達の不具合が生じ、様々な病気の発症につながる可能性があるから、自分のことを信じすぎないように！", "タンパク質や脂質の合成、カルシウムの貯蔵などを行う細胞内ののネットワーク、小胞体。タンパク質の折り畳みや品質管理、他の細胞小器官への輸送が得意なアナタは、ゴルジ体とうまくやっていけるかも？過度な小胞体ストレスは、細胞死を引き起こすこともあるため、うまくいかないことがあっても落ち込まないで﻿。", "タンパク質をひたすら作り続けるリボソーム。地味だけど重要な仕事を黙々とこなすアナタは、縁の下の力持ちタイプ？その分、タンパク質合成に異常を起こしてしまうと、様々な疾患を引き起こす要因になってしまう責任重大なポジションかも。", "不要な物質を分解・掃除する、細胞のゴミ処理係・リソソーム。掃除だけでなく、細胞内で酸性の環境を保つ役割も持つアナタは、身の回りの秩序を保つのが得意な整理整頓タイプかも。リソソーム酵素が欠損すると骨の成長や形に影響が出ることもあるから要注意！", "細胞分裂のときに登場し、染色体をきれいに引き分けるために活躍する中心体。冷静に全体を見渡し、みんなを適切な場所に配置できるアナタはマネージャータイプ？中心体関連遺伝子の異常は、神経細胞の数が減少し、脳のサイズが小さくなる遺伝性小頭症の原因となるから要注意！", "水分や栄養をため込み、細胞の形を保つ液胞。何でもしっかりストックしておきたい慎重派のアナタは、備えあれば憂いなしタイプかも。細胞内で液胞が過剰に増加すると細胞質を圧迫してしまうこともあるから、出しゃばりすぎないほうが良いかも。", "細胞の形を保ち、ものの運搬や細胞内の交通整理までこなす、縁の下の構造リーダー・細胞骨格。しっかり者で周囲の土台となるアナタは、どんな場でも「いないと困る」存在。でも真面目すぎて融通がきかない一面も？たまには柔軟に力を抜いて、自分を甘やかす日も大事！", "植物細胞をガッチリ守る、外の世界との最前線・細胞壁。強い信念とブレない意志をもつアナタは、どんな状況でも動じない頼れる守護者タイプ？でも、ガードが固すぎて「近寄りがたい」って思われることも…？たまにはやわらかい対応で、内側の優しさを見せてみるのもアリかも。"];


//ランダムな順番を作成するためのリスト
let orderQuestions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
　　orderQuestions.sort(() => Math.random() - 0.5);

//回答を保存するリスト　0…いいえ　1…はい　エラーを防ぐためすべて0で初期化
let result = Array.from({ length: 14 }, () => 0);



//スタート前宣言　関数外で宣言とかキモチワル
let count = 0;//14回まで今何問目かを数える

let check = 0;//0か1のみ。ボタン待ちの時に1  正直いらない

let num;

//"占い"スタート 
const start = () => {
    window.scrollTo({
       top: 2100,behavior: 'smooth'
    });


    check =  doTest();

}

//問題を出す関数
const doTest = () => {

    if(count < 14){

    num = orderQuestions[count];
    

        
  
    let message = uranaiQuestions[num];
        
    document.getElementById('question').textContent = message;

    return 1;
    }else{

        check = 0;
        
        window.scrollTo(0, 3800);

        console.log(result);

        pointCalc();
    }

    }

//YESボタンが押されたときの処理
document.getElementById('button2').addEventListener('click', () => {
   YES(check);
});

const YES = (C) => {

    // console.log(C);
    if(C = 1){
        count++;

        check = 0;

        result[num] = 1;

        doTest();

        console.log("count:"+count);

        console.log("result:"+result);
    }
}

//NOボタンが押されたときの処理
document.getElementById('button3').addEventListener('click', () => {
   NO(check);
});

const NO = (C) => {

    // console.log(C);
    if(C = 1){
        count++;

        check = 0;

        result[num] = 0;

        doTest();

        console.log("count:"+count);

        console.log("result:"+result);
    }
}


//各器官の解答を保存するリストの列挙

const Rkaku = [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0];

const Rkakusyoutai = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Rmitokondoria = [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0];

const Ryouryokutai = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1];

const Rsaiboumaku = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];

const Rgorujitai = [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0];

const Rsyouhoutai = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0];

const Rribosomu = [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];

const Rrisosomu = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];

const Rtyuusintai = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];

const Rekihou = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0];

const Rsaiboukokkaku = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

const Rsaibouheki = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];



//resultが各細胞小器官にどれだけ近いかをポイントで保存するリスト 0〜12までスプシの順

let nearPoint = Array.from ({ length: 13}, () =>0);



//細胞小器官の情報(リスト)を保存するリスト

const syoukikan = [Rkaku, Rkakusyoutai, Rmitokondoria, Ryouryokutai, Rsaiboumaku, Rgorujitai, Rsyouhoutai, Rribosomu, Rrisosomu, Rtyuusintai, Rekihou, Rsaiboukokkaku, Rsaibouheki];

//最終的に表示する結果を保存するリスト
 let maxSave = [];


//nearPointに保存するポイントを計算してなんか出力する関数　アルゴリズムがうんこ改善の余地あり

const pointCalc = () => {

   let counter1 = 0;

   let counter2 = 0;

   let temporary = 0;

   

   while (counter1 < 13){

      while (counter2 < 14){

         if(result[counter2] == syoukikan[counter1][counter2]){

            temporary += 1;

          }else{

             temporary -= 1;

          }

         counter2 += 1;

      }

      nearPoint[counter1] = temporary;

      counter1 += 1;

      counter2 = 0;

       temporary = 0;

   }

   console.log("near point:"+ nearPoint);





//計算終了　ここから判断開始



   let max = Math.max(...nearPoint);

   let counter3 = 0;





   while (counter3 < (nearPoint.length + 1))

   {

      if(nearPoint[counter3] == max)

      {

         maxSave.push(counter3);
        

      }

      counter3 += 1;

   }



   maxSave.sort(() => Math.random() -0.5);

    console.log(maxSave);

}

//結果を見るが押されたときの処理
document.getElementById('button4').addEventListener('click', () => {
   showResult();
});

const showResult = () => {

    document.getElementById('youare').classList.add('fadein');

    document.getElementById('button4').classList.add('fadeout');

    if(syoukikans[maxSave[0]] == undefined ){
        
        document.getElementById('result').textContent = "エラー！！";

    }else{

        document.getElementById('result').textContent = syoukikans[maxSave[0]];

        document.getElementById('resultEn').textContent = syoukikansEn[maxSave[0]];

         document.getElementById('resultAd').textContent = syoukikansAd[maxSave[0]];

    }

     document.getElementById('result').classList.add('fadein');

    document.getElementById('resultEn').classList.add('fadein');

     document.getElementById('resultAd').classList.add('fadein');
}
















