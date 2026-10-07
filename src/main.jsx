import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../style.css';

const cards = [
  ['0', '愚者', 'THE FOOL', '☀', ['自由', '始まり', '可能性'], '軽やかに一歩を踏み出すときです。完璧な準備を待たず、心が弾む方向へ進んでみて。'],
  ['I', '魔術師', 'THE MAGICIAN', '✦', ['創造', '行動', '才能'], 'あなたの手元には、すでに必要なものが揃っています。意志を形にする、小さな行動から始めましょう。'],
  ['II', '女教皇', 'THE HIGH PRIESTESS', '☾', ['直感', '静寂', '本心'], '答えを急がず、静けさの中に身を置いて。言葉にならない感覚が、進むべき道を教えてくれます。'],
  ['III', '女帝', 'THE EMPRESS', '❀', ['豊かさ', '愛情', '育む'], 'あなたが大切に育ててきたものが、実りを迎えようとしています。受け取ることも、今のあなたの力です。'],
  ['IV', '皇帝', 'THE EMPEROR', '♜', ['安定', '決断', '責任'], '揺れる気持ちに、確かな輪郭を与えるとき。自分で決めることで、次の景色が開けていきます。'],
  ['V', '教皇', 'THE HIEROPHANT', '✥', ['学び', '信頼', '導き'], 'ひとりで抱え込まなくて大丈夫。信頼できる人の知恵や、受け継がれてきた教えに触れてみて。'],
  ['VI', '恋人', 'THE LOVERS', '♡', ['選択', '調和', 'つながり'], '大切なのは、心から納得できる選択です。誰かとの関わりの中で、自分の本当の望みを見つめて。'],
  ['VII', '戦車', 'THE CHARIOT', '✧', ['前進', '意志', '突破'], '迷いをひとつに束ね、前へ進む力が高まっています。あなたが手綱を握れば、道は応えてくれます。'],
  ['VIII', '力', 'STRENGTH', '♌', ['勇気', '優しさ', '自信'], '強さとは、無理に押し通すことではありません。しなやかな優しさで向き合うあなたを、信じてください。'],
  ['IX', '隠者', 'THE HERMIT', '✦', ['内省', '探求', '灯火'], '少しだけ外の声から離れて、自分の灯りを見つめる時間。急がないことが、いちばんの近道になるでしょう。'],
  ['X', '運命の輪', 'WHEEL OF FORTUNE', '☸', ['転機', '流れ', '好機'], '流れが変わり始めています。偶然に見える出来事も、あなたを新しい場所へ運ぶ合図かもしれません。'],
  ['XI', '正義', 'JUSTICE', '⚖', ['誠実', '均衡', '判断'], '気持ちと事実の両方を丁寧に見つめて。誠実な選択は、あとからあなた自身を支える軸になります。'],
  ['XII', '吊るされた男', 'THE HANGED MAN', '▽', ['視点', '待機', '手放す'], '立ち止まる時間にも意味があります。見方を変えた瞬間、これまで見えなかった贈り物が現れそうです。'],
  ['XIII', '死神', 'DEATH', '✟', ['変容', '終わり', '再生'], '終わりは、次の始まりのための余白です。役目を終えたものに感謝して、静かに手放していきましょう。'],
  ['XIV', '節制', 'TEMPERANCE', '⚗', ['調和', '回復', '循環'], '焦らず、混ざり合う時間を信じて。心とからだ、理想と現実をほどよく整えることが鍵になります。'],
  ['XV', '悪魔', 'THE DEVIL', '♆', ['執着', '誘惑', '解放'], '「こうでなければ」に縛られていないか、そっと確かめて。気づくだけで、自由への扉は少し開きます。'],
  ['XVI', '塔', 'THE TOWER', 'ϟ', ['変化', '解放', '真実'], '予定外の揺らぎがあっても、それは偽りを壊し本音へ戻るため。変化のあとに、より強い土台が残ります。'],
  ['XVII', '星', 'THE STAR', '✧', ['希望', '癒し', 'ひらめき'], '遠くに見える小さな光を信じてください。素直な願いと静かな希望が、あなたの道を照らしてくれます。'],
  ['XVIII', '月', 'THE MOON', '☾', ['感受性', '不安', '夢'], '見えないものに心が揺れやすいとき。今は結論よりも、自分の感情をやさしく受け止めてあげて。'],
  ['XIX', '太陽', 'THE SUN', '☀', ['喜び', '生命力', '成功'], 'あなたらしい輝きを、遠慮なく表していいときです。喜びを分かち合うほど、幸運は大きく育ちます。'],
  ['XX', '審判', 'JUDGEMENT', '♬', ['目覚め', '再会', '決断'], '過去から届く呼びかけに耳を澄ませて。もう一度挑戦したいことがあるなら、今こそ応えるタイミングです。'],
  ['XXI', '世界', 'THE WORLD', '◌', ['完成', '達成', '統合'], 'ひとつの旅が、美しく実を結ぼうとしています。ここまでの自分を讃え、次の扉へ晴れやかに進みましょう。']
];

function CardBack({ isShuffling, onDraw }) {
  return <button className={`tarot-card card-back ${isShuffling ? 'shuffle' : ''}`} onClick={onDraw} type="button" aria-label="カードを一枚引く" disabled={isShuffling}>
    <span className="card-border" /><span className="card-orbit orbit-one" /><span className="card-orbit orbit-two" />
    <span className="card-moon">☾</span><span className="card-label">{isShuffling ? <>LISTEN<br />WITHIN</> : <>DRAW<br />ONE</>}</span><span className="card-number">✦</span>
  </button>;
}

function CardFace({ card }) {
  const [number, , english, symbol] = card;
  return <div className="tarot-card card-face reveal" aria-label={card[1]}><span className="face-number">{number}</span><span className="face-symbol">{symbol}</span><span className="face-name">{english}</span></div>;
}

function App() {
  const [card, setCard] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const readingRef = useRef(null);
  useEffect(() => { if (card) readingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [card]);
  const draw = () => {
    if (isShuffling) return;
    setCard(null); setIsShuffling(true);
    window.setTimeout(() => { setCard(cards[Math.floor(Math.random() * cards.length)]); setIsShuffling(false); }, 650);
  };
  const [number, name, english, , keywords, message] = card ?? [];
  return <main className="app-shell">
    <header className="site-header"><div className="eyebrow">ONE ORACLE · MAJOR ARCANA</div><h1>月影のタロット</h1><p>今のあなたに必要な、一枚のことば。</p></header>
    <section className="oracle" aria-labelledby="oracle-title">
      <div className="stars" aria-hidden="true" /><div className="moon" aria-hidden="true"><span /></div>
      <div className="intro"><p className="step">01 · 心を整える</p><h2 id="oracle-title">静かに、知りたいことを<br />心に思い浮かべて。</h2><p className="description">仕事、恋愛、迷っていること。<br />問いが浮かんだら、カードを一枚引いてください。</p></div>
      <div className="card-stage" aria-live="polite">{card ? <CardFace card={card} /> : <CardBack isShuffling={isShuffling} onDraw={draw} />}</div>
      {!card && <p className="hint">カードにそっと触れてください</p>}
      {card && <button className="again-button" onClick={draw} type="button">もう一度、引く <span>↻</span></button>}
    </section>
    {card && <section className="reading" ref={readingRef} aria-live="polite"><div className="reading-rule"><span>✦</span></div><p className="result-kicker">YOUR CARD</p><div className="card-heading"><p className="arcana">{number} · {english}</p><h2>{name}</h2><p className="position">正位置</p></div><p className="message">{message}</p><div className="keywords-wrap"><p>KEYWORDS</p><div className="keywords">{keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div><p className="reflection">このメッセージを、今日の小さな道しるべとして受け取ってください。</p></section>}
    <footer>大アルカナ 22 枚 · ワンオラクル</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
