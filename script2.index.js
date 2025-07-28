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

// 各小器官をスプシと同じ順で保存するリスト
let syoukikans = ["核", "核小体", "ミトコンドリア", "葉緑体", "細胞膜", "ゴルジ体", "小胞体", "リボソーム", "リソソーム",  "中心体", "液胞", "細胞骨格", "細胞壁"];

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
        
        window.scrollTo(0, 3700);

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

const Rkaku = [0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];

const Rkakusyoutai = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Rmitokondoria = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

console.log("nulかなー"+ syoukikans[maxSave[0]]);

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

    }

     document.getElementById('result').classList.add('fadein');
}
















