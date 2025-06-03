// Menü ve kahve bilgileri. Her kahve için malzeme ve ücret bilgisi içerir.
const menu = {
    "Espresso": { malzemeler: { su: 30, sut: 0, kahve: 10 }, ucret: 50 },
    "Latte": { malzemeler: { su: 150, sut: 150, kahve: 7 }, ucret: 60 },
    "Cappuccino": { malzemeler: { su: 1000, sut: 1000, kahve: 70 }, ucret: 80 },
    "Americano": { malzemeler: { su: 100, sut: 100, kahve: 7 }, ucret: 70 },
    "Macchiato": { malzemeler: { su: 100, sut: 100, kahve: 7 }, ucret: 90 },
    "Mocha": { malzemeler: { su: 100, sut: 100, kahve: 7 }, ucret: 85 },
    "TürkKahvesi": { malzemeler: { su: 100, sut: 0, kahve: 20 }, ucret: 45 },
    "FiltreKahve": { malzemeler: { su: 100, sut: 0, kahve: 15 }, ucret: 40 },
};
  
// Depo başlangıç malzemeleri ve kasa tanımlanıyor.
let depo = { su: 4000, sut: 4000, kahve: 500 };
let kasa = 0; // Kasada bulunan toplam para miktarı.
let secilikahve = ""; // Seçilen kahve bilgisini tutar.

// Kullanıcının bir kahve seçmesini sağlar ve seçilen kahve bilgisini görüntüler.
function selectDrink(drink) {
    secilikahve = drink; // Seçilen kahve ismi kaydediliyor.
    document.getElementById("output").innerText = `${drink}  Fiyat: ${menu[drink].ucret} ₺`; // Kahve adı ve fiyatı gösteriliyor.
}

// Kullanıcıdan ödeme alır ve ödeme sonrası işlemleri kontrol eder.
function makePayment() {
    const odeme = parseInt(document.getElementById("paymentAmount").value); // Kullanıcının girdiği ödeme miktarını alır.
    
    if (!secilikahve) { // Eğer kahve seçilmemişse kullanıcı uyarılır.
        alert("Lütfen bir kahve seçin");
        return;
    }

    const malzemeler = menu[secilikahve].malzemeler; // Seçilen kahvenin malzeme bilgisi alınır.

    // Depoda yeterli malzeme olup olmadığını kontrol eder.
    for (let malzeme in malzemeler) {
        if (depo[malzeme] < malzemeler[malzeme]) {
            document.getElementById("output").innerText = `Yeterli malzeme yok! Lütfen başka bir kahve seçin.`;
            return; // Malzeme yetersizse ödeme işlemi yapılmaz.
        }
    }

    // Ödeme yeterli mi kontrol edilir.
    if (odeme >= menu[secilikahve].ucret) {
        kasa += menu[secilikahve].ucret; // Ödeme kasaya eklenir.
        const paraUstu = odeme - menu[secilikahve].ucret; // Para üstü hesaplanır.
        document.getElementById('output').innerText = `Para üstü: ${paraUstu} TL. ${secilikahve} hazırlanıyor...`; // Kullanıcı bilgilendirilir.
        
        // Kahve hazırlama işlemini başlatır.
        setTimeout(() => {
            prepareCoffee(secilikahve);
        }, 2500);
    } else {
        // Ödeme yetersizse kullanıcı bilgilendirilir.
        document.getElementById("output").innerText = "Ödeme yetersiz!";
    }
}
 
// Kahve hazırlama işlemi yapılır.
function prepareCoffee(drink) {
    const malzemeler = menu[drink].malzemeler; // Kahvenin malzemeleri alınır.

    // Depodan gerekli malzemeler düşülür.
    for (let malzeme in malzemeler) {
        if (depo[malzeme] < malzemeler[malzeme]) { // Eğer depo yetersizse kullanıcı bilgilendirilir.
            document.getElementById("output").innerText = `Yeterli malzeme yok!`;
            return;
        }
        depo[malzeme] -= malzemeler[malzeme]; // Depodan malzeme eksiltilir.
    }
    // Kahve hazır olduğunda kullanıcı bilgilendirilir.
    document.getElementById('output').innerText = `${drink} hazır! Afiyet olsun ☕`;
}

// Depo ve kasa durumunu kullanıcıya gösterir.
function showReport() {
    document.getElementById("output").innerText = `Depo durumu: Su: ${depo.su}ml, \nSüt: ${depo.sut}ml, \nKahve: ${depo.kahve}gr,\nKasa: ${kasa} ₺`;
}

// Otomatı kapatır ve kullanıcıya bilgi verir.
function turnoff() {
    document.getElementById("output").innerText = "Otomat kapatıldı";
}

// Rapor ve kapatma butonlarını görünür hale getirir.
function showButtons() {
    document.getElementById("showReportButton").classList.remove("hidden");
    document.getElementById("turnOffButton").classList.remove("hidden");
}
