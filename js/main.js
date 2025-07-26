console.log("main.jsを読み込みました．");

// 必須 選択した回答を保存する配列 これが無いと回答を保存できない
const answers = [];
// 現在表示している質問の番号を管理
let currentQuestion = 1;


//   回答ボタンが押されたときに呼ばれる関数
//   @param {string} value -   選択された回答の値（例: 'intellectual'）

function answer(value) {
    // 配列に選択肢を追加
    answers.push(value);

    // 現在の質問をフェードアウトで非表示にする
    $(`#q${currentQuestion}`).fadeOut(400, function () {
        // 質問番号を1つ進める
        currentQuestion++;
        // 次の質問の要素を取得
        const $next = $(`#q${currentQuestion}`);

        // 次の質問があればフェードインで表示
        if ($next.length > 0) {
            $next.fadeIn(400);
        } else {
            // もう質問がなければ結果表示へ
            showResult();
        }
    });
}


//  全ての質問回答後に呼ばれ、診断結果を表示する関数
function showResult() {
    // デフォルトは「ポップス」タイプ
    let genre = "ポップス";
    // 回答をカンマ区切りで連結し判定に使う
    const joined = answers.join(',');

    // 複数条件を組み合わせて音楽ジャンルを判定
    if (joined.includes("intellectual") && joined.includes("morning")) {
        genre = "クラシック";
    }

    else if (joined.includes("passionate") && joined.includes("night")) {
        genre = "ロック";
    }

    else if (joined.includes("stylish") && joined.includes("city")) {
        genre = "ジャズ";
    }

    else if (joined.includes("free") && joined.includes("nature")) {
        genre = "レゲエ";
    }

    else if (joined.includes("intellectual") && joined.includes("night")) {
        genre = "エレクトロニカ";
    }

    // 上記のいずれにも当てはまらない場合の処理
    else {
        $("#result").hide().html("エラーです。条件に合うジャンルが見つかりませんでした。").fadeIn(600);
        return; // ← ここで関数を終了するという意味
    }



    // 結果表示エリアを一旦非表示にしてから、HTMLを差し替え、フェードインで見せる
    $("#result").hide().html(`あなたは <strong>${genre}</strong> タイプです！`).fadeIn(600);
}
