// Gün Sayacı Fonksiyonu
const calculateDays = () => {
  // Başlangıç tarihini buraya yaz: YIL, AY (0-11 arası), GÜN
  // Not: JS'de aylar 0'dan başlar (Ocak=0, Ekim=9). 
  // Ama "YYYY-MM-DD" formatı daha güvenlidir:
  const startDate = new Date("2025-10-20"); 
  const today = new Date();
  
  // Aradaki zaman farkını milisaniye cinsinden bulup güne çeviriyoruz
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // HTML'deki ilgili yere yazdırıyoruz
  const display = document.getElementById("dayCountDisplay");
  if (display) {
    display.innerText = diffDays;
  }
};

const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  // Harf harf animasyon için metinleri parçalıyoruz
  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.5, { opacity: 0, y: 10 }) // "İyi ki hayatımdasın" girişi
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3") // Ekranda kalma süresini biraz artırdım
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "#f1c40f" }) // Buton rengi temayla uyumlu
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-5", 0.7, { rotationX: 15, y: 50, opacity: 0 }, "+=0.5") // Tarih girişi
    .from(".idea-6", 0.7, { opacity: 0, y: 30 }, "+=0.5") // Gün sayısı girişi
    .to(".idea-5, .idea-6", 0.7, { opacity: 0, y: 20 }, "+=3.5")
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".girl-dp", 0.5, { scale: 3.5, opacity: 0, rotationZ: -45 }, "-=2")
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" }, "+=4")
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  // Tekrar oynat butonu
  const replayBtn = document.getElementById("replay");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => tl.restart());
  }
};

// Sayfa yüklendiğinde her şeyi başlat
window.addEventListener('DOMContentLoaded', () => {
  calculateDays();
  animationTimeline();
});
