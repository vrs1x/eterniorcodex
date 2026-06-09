const STORE = {
  name: "Eternior",
  whatsappNumber: "381611633267",
  wechatId: "wxid_6euabvj2rpu922",
  fallbackEurRsd: 118,
  rateApi: "https://api.frankfurter.app/latest?from=EUR&to=RSD",
  rosePrice: 240,
  roseCost: 18,
  maxRoses: 101,
  memorialMaxRoses: 100,
  special101Price: 25000,
  toyPrice: 850,
  toyCost: 400,
  minGiftBudget: 1500,
  estimatedDelivery: 500,
  productionTimeSr: "3-7 dana, osim ako drugačije potvrdimo u poruci",
  laborBase: 900,
  laborPerRose: 35,
  bouquetWrapCost: 350,
  boxSmallCost: 450,
  boxMediumCost: 700,
  boxLargeCost: 1050,
  targetMargin: 0.52,
};

const COUPONS = {
  ETERNIOR10: { percent: 10, label: "10% popusta" },
  ETERNIOR20: { percent: 20, label: "20% popusta" },
  FRIEND15: { percent: 15, label: "15% za preporuku" },
  POVRATAK20: { percent: 20, label: "20% za sledeću kupovinu" },
};

const WHEEL_PRIZES = [
  { percent: 8, label: "8% popusta na personalizovan poklon", weight: 45 },
  { percent: 10, label: "10% popusta na sledeću porudžbinu", weight: 30 },
  { percent: 12, label: "12% popusta za ručni rad po meri", weight: 15 },
  { percent: 15, label: "15% popusta za preporuku prijatelja", weight: 7 },
  { percent: 20, label: "20% popusta za najbrže kupce", weight: 3 },
];

const ADDON_PRICES = {
  glitterAccent: 350,
  glitterFull: 900,
  jewelryZircon: 350,
  jewelryButterfly: 450,
  jewelryCrown: 500,
  ribbonText: 650,
  multicolorPetals: 450,
  photo: 750,
};

function readStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

const state = {
  cart: JSON.parse(localStorage.getItem("eterniorCart") || "[]"),
  lang: localStorage.getItem("eterniorLang") || "sr",
  currency: localStorage.getItem("eterniorCurrency") || "RSD",
  eurRsd: Number(localStorage.getItem("eterniorRate")) || STORE.fallbackEurRsd,
  activeFilter: "all",
  latestSuggestion: null,
  wheelPrize: readStoredJson("eterniorWheelPrize", null),
  orderId: localStorage.getItem("eterniorOrderId") || "",
  pendingCheckout: null,
  assistant: { step: "start", answers: {} },
};

if (!state.cart.length && state.orderId) {
  state.orderId = "";
  localStorage.removeItem("eterniorOrderId");
}

const copy = {
  sr: {
    "nav.home": "Početna",
    "nav.shop": "Prodavnica",
    "nav.custom": "Kreiraj poklon",
    "nav.contact": "Kontakt",
    "cart.title": "Korpa",
    "cart.empty": "Korpa je trenutno prazna.",
    "cart.checkout": "Pošalji upit",
    "cart.clear": "Isprazni korpu",
    "cart.total": "Ukupno približno",
    "cart.name": "Tvoje ime",
    "cart.delivery": "Način preuzimanja",
    "cart.address": "Adresa",
    "cart.note": "Napomena, ako je ima",
    "cart.cityPostal": "Grad i poštanski broj",
    "cart.phone": "Broj telefona",
    "cart.phonePrefix": "Pozivni broj",
    "cart.phoneInvalid": "Unesi ispravan broj telefona. Za Srbiju koristi +381, bez početne nule.",
    "cart.pickupInfo": "Lično preuzimanje: Bor, 19210, Srbija",
    "cart.deliveryRequired": "Za dostavu su obavezni ime, telefon, grad sa poštanskim brojem i adresa.",
    "cart.nameRequired": "Upiši ime pre slanja upita.",
    "cart.deliveryChoiceRequired": "Izaberi dostavu ili lično preuzimanje pre slanja upita.",
    "cart.requiredHint": "Polja za dostavu postaju obavezna samo kada izabereš dostavu.",
    "cart.productionNote": "Rok izrade i isporuke je najčešće 3-7 dana, osim ako se drugačije potvrdi u poruci.",
    "cart.customerSection": "Podaci za potvrdu",
    "cart.orderSummary": "Pregled korpe",
    "cart.orderId": "Šifra upita",
    "cart.reviewTitle": "Proveri upit pre slanja",
    "cart.reviewText": "Ovo je poruka koju ćemo dobiti. Ako je sve u redu, potvrdi i otvori aplikaciju za slanje.",
    "cart.reviewConfirm": "Potvrdi i pošalji",
    "cart.reviewEdit": "Vrati se na korpu",
    "cart.reviewItems": "Stavke",
    "cart.reviewTime": "Rok",
    "cart.deliverySection": "Preuzimanje i dostava",
    "cart.contactSection": "Kontakt za slanje",
    "cart.contactApp": "Aplikacija za slanje upita",
    "cart.whatsapp": "WhatsApp",
    "cart.wechat": "WeChat",
    "cart.wechatCopied": "Porudžbina je kopirana. Otvori WeChat i pošalji je na Eternior kontakt: {id}.",
    "cart.shipping": "Dostava",
    "cart.pickup": "Lično preuzimanje",
    "cart.decide": "Izaberi način",
    "cart.each": "po komadu",
    "cart.close": "Zatvori korpu",
    "cart.itemDetails": "Detalji porudžbine",
    "filter.search": "Pretraga",
    "filter.searchPlaceholder": "npr. crvena, kutija, Ferrero",
    "filter.budget": "Budžet do",
    "filter.occasion": "Prilika",
    "filter.toy": "Sa igračkom",
    "filter.memorial": "Za preminule",
    "filter.reset": "Resetuj filtere",
    "filter.allOccasions": "Sve prilike",
    "badge.best": "Najčešći izbor",
    "badge.gift": "Siguran poklon",
    "badge.luxury": "Premium",
    "badge.romance": "Romantično",
    "badge.custom": "Po meri",
    "filter.birthday": "Rođendan",
    "filter.romance": "Romantično",
    "filter.luxury": "Luksuzno",
    "filter.thankyou": "Zahvalnost",
    "filter.memorialOccasion": "Za preminulu osobu",
    "home.eyebrow": "Ručno rađene satenske ruže",
    "home.title": "Eternior",
    "home.lead": "Pokloni koji traju duže od trenutka: satenske ruže, elegantni buketi i slatke kutije koje poručuješ za manje od minuta preko WhatsApp-a.",
    "home.shopCta": "Pogledaj kolekciju",
    "home.customCta": "Napravi svoj poklon",
    "strip.one": "Satenske ruže koje ne venu",
    "strip.two": "Porudžbina kroz WhatsApp ili WeChat",
    "strip.three": "Dostava ili lično preuzimanje",
    "home.promiseEyebrow": "Eternior doživljaj",
    "home.promiseTitle": "Izaberi poklon, pošalji poruku, dogovor završen.",
    "home.promiseText": "Dodaj gotov proizvod ili napravi svoj buket. Kada pošalješ upit, dobijamo jasnu poruku sa izborom, a mi ti potvrđujemo dostupnost, cenu i način isporuke.",
    "home.featureTitle": "Specijalno: poklon po budžetu",
    "home.featureText": "Ne moraš da znaš tačno šta želiš. Unesi budžet, priliku i stil, a Eternior predlog ide direktno u korpu kao personalizovana porudžbina.",
    "home.featureCta": "Probaj predlog",
    "home.previewEyebrow": "Popularno",
    "home.previewTitle": "Pokloni spremni za poručivanje",
    "shop.eyebrow": "Kolekcija",
    "shop.title": "Izaberi poklon koji govori umesto tebe.",
    "shop.lead": "Cene su prikazane u RSD, a možeš ih prebaciti u EUR. Kurs se pokušava osvežiti online, a ako nije dostupan koristi se 1 EUR = 118 RSD.",
    "shop.filterEyebrow": "Filter",
    "shop.filterAll": "Sve",
    "shop.filterBouquets": "Buketi",
    "shop.filterSweet": "Slatke kutije",
    "shop.filterBundle": "Kombinacije",
    "shop.filterPremium": "Premium",
    "custom.eyebrow": "Tvoj poklon",
    "custom.title": "Napravi buket ili slatku kutiju baš po svojoj ideji.",
    "custom.lead": "Izaberi tip poklona, boje, slatkiše i budžet. Tvoja ideja ide u korpu, a zatim u poruku kako bismo zajedno potvrdili detalje.",
    "custom.formEyebrow": "Ručno podešavanje",
    "custom.giftType": "Tip poklona",
    "custom.roseCount": "Broj ruža",
    "custom.budget": "Budžet u RSD",
    "custom.color": "Glavna boja",
    "custom.sweets": "Slatkiši",
    "custom.notes": "Poruka, prilika ili stil",
    "custom.estimate": "Procena cene",
    "custom.memorial": "Za preminulu osobu, dozvoljen je samo paran broj ruža",
    "custom.colorNote": "Boje su okvirne. Nijansa može da odstupa zbog svetla, ekrana i dostupnosti satenske trake.",
    "custom.paletteTitle": "Paleta ruža",
    "custom.pricingNote": "Cena uključuje materijal, ručni rad, pakovanje i rezervu za završnu obradu.",
    "custom.coupon": "Kupon kod",
    "custom.applyCoupon": "Primeni kupon",
    "custom.couponPlaceholder": "Upiši kod sa kartice",
    "custom.couponHint": "Ako imaš fizički kupon, upiši kod sa kartice. Popust važi nakon potvrde u poruci i može se evidentirati kao iskorišćen.",
    "custom.useWheelCoupon": "Ubaci moj kupon iz točka",
    "custom.perkOne": "Predračun pre slanja",
    "custom.perkTwo": "Kuponi i preporuke",
    "custom.perkThree": "Dogovor pre izrade",
    "custom.invalidCoupon": "Kupon nije aktivan ili je već iskorišćen.",
    "custom.discount": "Popust",
    "custom.glitter": "Glitter",
    "custom.glitterNone": "Bez glittera",
    "custom.glitterAccent": "Glitter detalji preko ruža",
    "custom.glitterFull": "Full glitter rose",
    "custom.jewelry": "Dekor nakit",
    "custom.jewelryNone": "Bez nakita",
    "custom.zircon": "Cirkoni",
    "custom.butterfly": "Leptirići",
    "custom.goldCrown": "Zlatna krunica",
    "custom.silverCrown": "Srebrna krunica",
    "custom.multicolor": "Ruža sa više boja latica",
    "custom.no": "Ne",
    "custom.yesDiscuss": "Da, po dogovoru",
    "custom.photos": "Slike u aranžmanu",
    "custom.noPhotos": "Bez slika",
    "custom.onePhoto": "1 slika",
    "custom.twoPhotos": "2 slike",
    "custom.threePhotos": "3 slike, samo veći aranžmani",
    "custom.photoNote": "Slike se šalju naknadno preko WhatsApp-a ili WeChat-a. Na manjim buketima broj i veličina slika se potvrđuju dogovorom.",
    "custom.ribbonText": "Traka sa natpisom",
    "custom.ribbonPlaceholder": "npr. Srećan 30. rođendan",
    "custom.ribbonNote": "Tekst se formira sticker slovima, ne ručno pisano. Konačan raspored potvrđujemo u poruci.",
    "footer.top": "Povratak na vrh",
    "footer.home": "Početna",
    "footer.terms": "Uslovi korišćenja",
    "footer.privacy": "Privatnost",
    "home.salesTitle": "Poklon koji ostaje",
    "home.salesText": "Uz svaku potvrđenu porudžbinu možeš dobiti kupon za sledeću kupovinu ili preporuku prijatelja.",
    "home.salesCta": "Izaberi po budžetu",
    "custom.miniChocolate": "Male čokoladice",
    "custom.bigChocolate": "Velike čokolade",
    "custom.toy": "Igračka",
    "custom.toyColor": "Boja igračke",
    "custom.script": "Pismo za ručno pisanu poruku",
    "custom.add": "Dodaj personalizovan poklon",
    "concierge.eyebrow": "Eternior predlog",
    "concierge.title": "Nisi siguran/na šta da izabereš?",
    "concierge.text": "Unesi budžet, priliku i stil. Dobićeš predlog koji možeš odmah dodati u korpu.",
    "concierge.budget": "Budžet u RSD",
    "concierge.occasion": "Prilika",
    "concierge.style": "Stil",
    "concierge.generate": "Predloži poklon",
    "contact.eyebrow": "Poručivanje",
    "contact.title": "Sve se dogovara brzo i jasno preko poruke.",
    "contact.lead": "Kada pošalješ korpu, dobijamo spremnu poruku sa proizvodima, budžetom, napomenama i izborom dostave. Posle toga potvrđujemo cenu, dostupnost, rok izrade/isporuke i sve detalje pre rada.",
    "contact.stepOneTitle": "Izaberi",
    "contact.stepOneText": "Dodaj gotov proizvod ili napravi personalizovan poklon po budžetu.",
    "contact.stepTwoTitle": "Pošalji",
    "contact.stepTwoText": "Klik na slanje upita priprema poruku koju možeš proveriti pre slanja.",
    "contact.stepThreeTitle": "Potvrdi",
    "contact.stepThreeText": "Dogovaramo cenu, rok izrade/isporuke, dostavu ili lično preuzimanje.",
    "contact.readyEyebrow": "Spreman/na?",
    "contact.readyTitle": "Počni od kolekcije ili napravi svoj poklon.",
    "footer.text": "Satenske ruže, buketi i slatke kutije napravljene za trenutke koji se pamte.",
    "footer.contact": "Kontakt i poručivanje",
    "footer.custom": "Napravi personalizovan poklon",
    "footer.shop": "Pogledaj gotove poklone",
    "footer.contactTitle": "Kontakt",
    "footer.location": "Lokacija: Bor, 19210, Srbija",
    "footer.handmadeTitle": "Ručni rad",
    "footer.handmadeText": "Svaka satenska ruža se pravi ručno, pažljivo sklapa i pakuje kao poklon koji traje.",
    "footer.orderingTitle": "Poručivanje",
    "footer.orderingText": "Porudžbina se šalje preko WhatsApp-a ili WeChat-a i potvrđuje pre izrade. Rok je najčešće 3-7 dana, osim ako se drugačije dogovorimo.",
    "footer.deliveryTitle": "Dostava",
    "footer.deliveryText": "Kurirska služba po dogovoru. Okvirna cena dostave je oko 500 RSD, a rok izrade/isporuke potvrđujemo u poruci.",
    "footer.personalTitle": "Personalizacija",
    "footer.personalText": "Gotovi proizvodi se ne menjaju, ali možeš dodati poruku ili malu igračku.",
    "footer.rulesTitle": "Pravila buketa",
    "footer.rulesText": "Poklon aranžmani imaju neparan broj ruža, najviše 101. Za preminulu osobu bira se paran broj, najviše 100.",
    "footer.minBudgetTitle": "Minimalni budžet",
    "footer.minBudgetText": "Manji pokloni se računaju prema izboru, a za složenije personalizacije preporučujemo budžet od 1.500 RSD i više.",
    "footer.deliveryShort": "Dostava: kurirska služba, okvirno 500 RSD",
    "footer.aboutTitle": "O nama",
    "footer.aboutText": "Iza Eterniora stoji Alexandra, mlada kreativka iz Istočne Srbije koja već tri godine ručno pravi satenske ruže. Svaku laticu savija strpljivo, bira boje kao da pravi poklon za nekoga svog i ne pušta aranžman dok ne izgleda nežno, uredno i posebno. Kada izabereš Eternior, ne kupuješ samo dekoraciju, već sate pažnje, mirne ruke i ideju da osoba koja dobije poklon oseti da je vredna truda.",
    "footer.legalTitle": "Pravne informacije",
    "footer.legalText": "Naziv/PIB/adresu dodati nakon registracije ili po potrebi.",
    "footer.confirmText": "Porudžbina se potvrđuje tek nakon dogovora preko poruke.",
    "faq.title": "Česta pitanja",
    "faq.budgetQ": "Koliki je minimalni budžet?",
    "faq.budgetA": "Mali pokloni se računaju prema broju ruža i dodataka, bez dodavanja minimalnog budžeta na cenu. Za složenije personalizacije preporučujemo budžet od 1.500 RSD i više.",
    "faq.deliveryQ": "Koliko košta dostava?",
    "faq.deliveryA": "Dostava zavisi od kurirske službe i mesta isporuke, ali okvirno je oko 500 RSD. Rok izrade i isporuke je najčešće 3-7 dana, osim ako se drugačije potvrdi u poruci.",
    "faq.readyQ": "Da li mogu da menjam gotov proizvod?",
    "faq.readyA": "Gotovi proizvodi se ne menjaju, ali možeš dodati personalizovanu ručno pisanu poruku ili malu igračku.",
    "wheel.title": "Zavrti točak sreće",
    "wheel.text": "Osvoji kupon za svoj prvi ili sledeći Eternior poklon. Jedan kupon čuvamo za ovaj uređaj.",
    "wheel.spin": "Zavrti",
    "wheel.close": "Kasnije",
    "wheel.won": "Tvoj kupon",
    "wheel.apply": "Primeni u kreatoru",
    "wheel.saved": "Kupon je sačuvan. Možeš ga iskoristiti kada praviš svoj poklon.",
    "wheel.used": "Kupon je već iskorišćen na ovom uređaju.",
    "wheel.open": "Moj kupon",
    "faq.rosesQ": "Koliko ruža mogu da izaberem?",
    "faq.rosesA": "Za poklon se bira neparan broj ruža, najviše 101. Aranžman od 101 ruže je poseban veliki aranžman od 25.000 RSD pre dodataka. Ako je aranžman namenjen preminuloj osobi, bira se paran broj ruža, najviše 100.",
    "faq.careQ": "Kako se održavaju satenske ruže?",
    "faq.careA": "Drže se na suvom, dalje od direktnog sunca i ne peru se vodom. Po potrebi se nežno očiste suvom mekom četkicom.",
    add: "Dodaj u korpu",
    detailsTitle: "Detalji proizvoda",
    readyMessage: "Personalizovana poruka",
    readyMessagePlaceholder: "Do 200 karaktera, uz malo prostora da se završi reč.",
    readyScript: "Pismo",
    readyToy: "Igračka",
    readyAddonNote: "Gotov proizvod se ne menja. Možeš dodati samo poruku ili malu igračku",
    shareProduct: "Podeli proizvod",
    suggestionTitle: "Predlog za tebe",
    suggestionAdd: "Dodaj predlog u korpu",
    suggestionDetails: "Automatski predlog",
    copied: "Link i opis proizvoda su kopirani.",
    rateFallback: "Kurs: 1 EUR = 118 RSD",
    rateLive: "Osvežen kurs: 1 EUR = {rate} RSD",
    "legal.eyebrow": "Legal",
    "terms.title": "Uslovi korišćenja",
    "terms.lead": "Ova stranica objašnjava kako funkcioniše poručivanje preko Eternior sajta.",
    "terms.orderTitle": "Status porudžbine",
    "terms.orderText": "Sajt služi kao online katalog i alat za slanje upita preko WhatsApp-a ili WeChat-a. Porudžbina nije konačna dok se dostupnost, cena, rok izrade/isporuke, dostava i način plaćanja ne potvrde direktno u komunikaciji. Uobičajen rok je 3-7 dana, osim ako se drugačije navede u dogovoru.",
    "terms.handmadeTitle": "Ručno rađeni proizvodi",
    "terms.handmadeText": "Svaki proizvod je ručni rad, pa su mala odstupanja u nijansi, rasporedu, dekoraciji i obliku moguća. Boje na ekranu mogu izgledati drugačije nego uživo zbog osvetljenja, kamere i podešavanja ekrana.",
    "terms.pricesTitle": "Cene i kuponi",
    "terms.pricesText": "Cene na sajtu su okvirne i mogu se korigovati pre potvrde porudžbine ako se promeni dostupnost materijala, veličina kutije, količina slatkiša ili posebni zahtevi. Kuponi važe samo ako ih Eternior potvrdi u razgovoru. Fizički kupon može biti tražen na uvid ili evidentiran kao iskorišćen.",
    "terms.statusTitle": "Firma i odgovornost",
    "terms.statusText": "Eternior trenutno funkcioniše kao mali kreativni projekat i nije registrovana firma. Podaci o firmi, PIB-u i formalnim pravilima biće dodati ako se status promeni. Kupac poručivanjem prihvata da se sve potvrđuje individualnim dogovorom.",
    "privacy.eyebrow": "Privatnost",
    "privacy.title": "Politika privatnosti",
    "privacy.lead": "Podaci se koriste samo da bismo dogovorili i isporučili poklon.",
    "privacy.dataTitle": "Koje podatke korisnik šalje",
    "privacy.dataText": "Kupac može poslati ime, adresu ili napomenu za preuzimanje, izbor proizvoda, budžet, poruku za poklon i kontakt kroz WhatsApp ili WeChat.",
    "privacy.useTitle": "Kako se podaci koriste",
    "privacy.useText": "Podaci se koriste samo za potvrdu porudžbine, izradu poklona, dogovor oko plaćanja, dostave ili ličnog preuzimanja.",
    "privacy.shareTitle": "Deljenje podataka",
    "privacy.shareText": "Adresa i kontakt mogu biti prosleđeni kurirskoj službi samo ako kupac izabere dostavu. Podaci se ne prodaju i ne koriste za neovlašćeni marketing.",
    "privacy.couponTitle": "Kuponi i preporuke",
    "privacy.couponText": "Ako kupac koristi kupon ili preporuku, kod se može zabeležiti radi evidencije popusta, sprečavanja ponovne upotrebe i pogodnosti za buduću kupovinu.",
  },
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.custom": "Create gift",
    "nav.contact": "Contact",
    "cart.title": "Cart",
    "cart.empty": "Your cart is empty.",
    "cart.checkout": "Send inquiry",
    "cart.clear": "Clear cart",
    "cart.total": "Estimated total",
    "cart.name": "Your name",
    "cart.delivery": "Delivery option",
    "cart.address": "Address",
    "cart.note": "Note, if any",
    "cart.cityPostal": "City and postal code",
    "cart.phone": "Phone number",
    "cart.phonePrefix": "Country code",
    "cart.phoneInvalid": "Enter a valid phone number. For Serbia use +381 and remove the leading zero.",
    "cart.pickupInfo": "Pickup location: Bor, 19210, Serbia",
    "cart.deliveryRequired": "For delivery, name, phone, city with postal code and address are required.",
    "cart.nameRequired": "Enter your name before sending the inquiry.",
    "cart.deliveryChoiceRequired": "Choose shipping or local pickup before sending the inquiry.",
    "cart.requiredHint": "Delivery fields become required only when shipping is selected.",
    "cart.productionNote": "Production and delivery time is usually 3-7 days, unless confirmed differently in chat.",
    "cart.customerSection": "Confirmation details",
    "cart.orderSummary": "Cart summary",
    "cart.orderId": "Inquiry code",
    "cart.reviewTitle": "Review before sending",
    "cart.reviewText": "This is the message we will receive. If everything looks right, confirm and open the sending app.",
    "cart.reviewConfirm": "Confirm and send",
    "cart.reviewEdit": "Back to cart",
    "cart.reviewItems": "Items",
    "cart.reviewTime": "Time",
    "cart.deliverySection": "Pickup and delivery",
    "cart.contactSection": "Contact for sending",
    "cart.contactApp": "App for sending inquiry",
    "cart.whatsapp": "WhatsApp",
    "cart.wechat": "WeChat",
    "cart.wechatCopied": "The order was copied. Open WeChat and send it to the Eternior contact: {id}.",
    "cart.shipping": "Shipping",
    "cart.pickup": "Local pickup",
    "cart.decide": "Choose option",
    "cart.each": "each",
    "cart.close": "Close cart",
    "cart.itemDetails": "Order details",
    "filter.search": "Search",
    "filter.searchPlaceholder": "e.g. red, box, Ferrero",
    "filter.budget": "Budget up to",
    "filter.occasion": "Occasion",
    "filter.toy": "With toy",
    "filter.memorial": "Memorial",
    "filter.reset": "Reset filters",
    "filter.allOccasions": "All occasions",
    "badge.best": "Most chosen",
    "badge.gift": "Safe gift",
    "badge.luxury": "Premium",
    "badge.romance": "Romantic",
    "badge.custom": "Custom",
    "filter.birthday": "Birthday",
    "filter.romance": "Romantic",
    "filter.luxury": "Luxury",
    "filter.thankyou": "Thank you",
    "filter.memorialOccasion": "Memorial gift",
    "home.eyebrow": "Handmade satin roses",
    "home.title": "Eternior",
    "home.lead": "Gifts that last beyond the moment: satin roses, elegant bouquets and sweet boxes ordered in less than a minute through WhatsApp.",
    "home.shopCta": "View collection",
    "home.customCta": "Create your gift",
    "strip.one": "Satin roses that do not fade",
    "strip.two": "Order through WhatsApp or WeChat",
    "strip.three": "Shipping or local pickup",
    "home.promiseEyebrow": "Eternior experience",
    "home.promiseTitle": "Choose a gift, send a message, confirm everything.",
    "home.promiseText": "Add a ready product or create your bouquet. When you send the inquiry, we receive a clear order message and confirm availability, price and delivery.",
    "home.featureTitle": "Special: gift by budget",
    "home.featureText": "You do not need to know exactly what you want. Enter your budget, occasion and style, and an Eternior suggestion goes straight into your cart.",
    "home.featureCta": "Try suggestion",
    "home.previewEyebrow": "Popular",
    "home.previewTitle": "Gifts ready to order",
    "shop.eyebrow": "Collection",
    "shop.title": "Choose a gift that speaks for you.",
    "shop.lead": "Prices are shown in RSD and can be switched to EUR. The exchange rate tries to update online; if unavailable it uses 1 EUR = 118 RSD.",
    "shop.filterEyebrow": "Filter",
    "shop.filterAll": "All",
    "shop.filterBouquets": "Bouquets",
    "shop.filterSweet": "Sweet boxes",
    "shop.filterBundle": "Bundles",
    "shop.filterPremium": "Premium",
    "custom.eyebrow": "Your gift",
    "custom.title": "Create a bouquet or sweet box from your own idea.",
    "custom.lead": "Choose the gift type, colors, sweets and budget. Your idea goes into the cart and then into a message so we can confirm the details together.",
    "custom.formEyebrow": "Manual builder",
    "custom.giftType": "Gift type",
    "custom.roseCount": "Number of roses",
    "custom.budget": "Budget in RSD",
    "custom.color": "Main color",
    "custom.sweets": "Sweets",
    "custom.notes": "Message, occasion or style",
    "custom.estimate": "Price estimate",
    "custom.memorial": "For a deceased person, only an even number of roses is allowed",
    "custom.colorNote": "Colors are approximate. The shade may differ because of lighting, screens and satin ribbon availability.",
    "custom.paletteTitle": "Rose palette",
    "custom.pricingNote": "Price includes materials, handmade work, packaging and finishing buffer.",
    "custom.coupon": "Coupon code",
    "custom.applyCoupon": "Apply coupon",
    "custom.couponPlaceholder": "Enter the code from your card",
    "custom.couponHint": "If you have a physical coupon, enter the code from the card. The discount applies after chat confirmation and may be marked as used.",
    "custom.useWheelCoupon": "Use my wheel coupon",
    "custom.perkOne": "Estimate before sending",
    "custom.perkTwo": "Coupons and referrals",
    "custom.perkThree": "Confirmed before making",
    "custom.invalidCoupon": "This coupon is not active or has already been used.",
    "custom.discount": "Discount",
    "custom.glitter": "Glitter",
    "custom.glitterNone": "No glitter",
    "custom.glitterAccent": "Glitter accents over roses",
    "custom.glitterFull": "Full glitter rose",
    "custom.jewelry": "Decor jewelry",
    "custom.jewelryNone": "No jewelry",
    "custom.zircon": "Rhinestones",
    "custom.butterfly": "Butterflies",
    "custom.goldCrown": "Gold crown",
    "custom.silverCrown": "Silver crown",
    "custom.multicolor": "One rose with multiple petal colors",
    "custom.no": "No",
    "custom.yesDiscuss": "Yes, by agreement",
    "custom.photos": "Photos in arrangement",
    "custom.noPhotos": "No photos",
    "custom.onePhoto": "1 photo",
    "custom.twoPhotos": "2 photos",
    "custom.threePhotos": "3 photos, larger arrangements only",
    "custom.photoNote": "Photos are sent later through WhatsApp or WeChat. On smaller bouquets, size and quantity are confirmed by agreement.",
    "custom.ribbonText": "Ribbon text",
    "custom.ribbonPlaceholder": "e.g. Happy 30th birthday",
    "custom.ribbonNote": "Text is made from sticker letters, not handwritten. Final placement is confirmed in chat.",
    "footer.top": "Back to top",
    "footer.home": "Home",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "home.salesTitle": "A gift that stays",
    "home.salesText": "With every confirmed order, you can receive a coupon for your next purchase or a friend referral.",
    "home.salesCta": "Choose by budget",
    "custom.miniChocolate": "Mini chocolates",
    "custom.bigChocolate": "Large chocolates",
    "custom.toy": "Toy",
    "custom.toyColor": "Toy color",
    "custom.script": "Script for handwritten message",
    "custom.add": "Add custom gift",
    "concierge.eyebrow": "Eternior suggestion",
    "concierge.title": "Not sure what to choose?",
    "concierge.text": "Enter your budget, occasion and style. You will get a suggestion you can add to cart immediately.",
    "concierge.budget": "Budget in RSD",
    "concierge.occasion": "Occasion",
    "concierge.style": "Style",
    "concierge.generate": "Suggest a gift",
    "contact.eyebrow": "Ordering",
    "contact.title": "Everything is confirmed clearly through chat.",
    "contact.lead": "When you send the cart, we receive a prepared message with products, budget, notes and delivery choice. Then we confirm the price, availability, production/delivery time and all details before making.",
    "contact.stepOneTitle": "Choose",
    "contact.stepOneText": "Add a ready product or create a custom gift by budget.",
    "contact.stepTwoTitle": "Send",
    "contact.stepTwoText": "The inquiry button prepares a message you can check before sending.",
    "contact.stepThreeTitle": "Confirm",
    "contact.stepThreeText": "We agree on price, production/delivery time, shipping or local pickup.",
    "contact.readyEyebrow": "Ready?",
    "contact.readyTitle": "Start from the collection or create your own gift.",
    "footer.text": "Satin roses, bouquets and sweet boxes made for memorable moments.",
    "footer.contact": "Contact and ordering",
    "footer.custom": "Create a personalized gift",
    "footer.shop": "View ready gifts",
    "footer.contactTitle": "Contact",
    "footer.location": "Location: Bor, 19210, Serbia",
    "footer.handmadeTitle": "Handmade",
    "footer.handmadeText": "Each satin rose is handmade, carefully arranged and packed as a gift that lasts.",
    "footer.orderingTitle": "Ordering",
    "footer.orderingText": "The order is sent through WhatsApp or WeChat and confirmed before making. The usual time is 3-7 days unless agreed differently.",
    "footer.deliveryTitle": "Delivery",
    "footer.deliveryText": "Courier delivery by agreement. Estimated delivery is around 500 RSD, and production/delivery time is confirmed in chat.",
    "footer.personalTitle": "Personalization",
    "footer.personalText": "Ready products cannot be changed, but you can add a message or a small toy.",
    "footer.rulesTitle": "Bouquet rules",
    "footer.rulesText": "Gift arrangements use an odd number of roses, up to 101. For a deceased person, choose an even number, up to 100.",
    "footer.minBudgetTitle": "Minimum budget",
    "footer.minBudgetText": "Small gifts are calculated by selection, while more detailed custom gifts are best planned from 1,500 RSD and up.",
    "footer.deliveryShort": "Delivery: courier service, around 500 RSD",
    "footer.aboutTitle": "About us",
    "footer.aboutText": "Behind Eternior is Alexandra, a young creative maker from Eastern Serbia who has been handcrafting satin roses for three years. She folds every petal patiently, chooses colors as if the gift were for someone close to her, and does not finish an arrangement until it feels gentle, polished and personal. When you choose Eternior, you are not only buying decoration, but hours of care and a gift that makes someone feel truly thought of.",
    "footer.legalTitle": "Legal information",
    "footer.legalText": "Business name/tax ID/address can be added after registration or when needed.",
    "footer.confirmText": "The order is confirmed only after agreement through chat.",
    "faq.title": "FAQ",
    "faq.budgetQ": "What is the minimum budget?",
    "faq.budgetA": "Small gifts are calculated by roses and add-ons, without adding a minimum budget to the price. For more detailed custom gifts, we recommend planning from 1,500 RSD and up.",
    "faq.deliveryQ": "How much is delivery?",
    "faq.deliveryA": "Delivery depends on the courier service and destination, but it is usually around 500 RSD. Production and delivery time is usually 3-7 days unless confirmed differently in chat.",
    "faq.readyQ": "Can I change a ready product?",
    "faq.readyA": "Ready products cannot be changed, but you can add a personalized handwritten message or a small toy.",
    "wheel.title": "Spin the gift wheel",
    "wheel.text": "Win a coupon for your first or next Eternior gift. One coupon is saved for this device.",
    "wheel.spin": "Spin",
    "wheel.close": "Later",
    "wheel.won": "Your coupon",
    "wheel.apply": "Apply in builder",
    "wheel.saved": "Your coupon is saved. You can use it while creating your gift.",
    "wheel.used": "This coupon has already been used on this device.",
    "wheel.open": "My coupon",
    "faq.rosesQ": "How many roses can I choose?",
    "faq.rosesA": "Gift arrangements use an odd number of roses, up to 101. The 101-rose arrangement is a special large arrangement priced at 25,000 RSD before add-ons. If the arrangement is for a deceased person, choose an even number, up to 100.",
    "faq.careQ": "How do I care for satin roses?",
    "faq.careA": "Keep them dry, away from direct sunlight, and do not wash with water. If needed, clean gently with a dry soft brush.",
    add: "Add to cart",
    detailsTitle: "Product details",
    readyMessage: "Personalized message",
    readyMessagePlaceholder: "Up to 200 characters, with a little room to finish the last word.",
    readyScript: "Script",
    readyToy: "Toy",
    readyAddonNote: "Ready products cannot be changed. You can only add a message or a small toy",
    shareProduct: "Share product",
    suggestionTitle: "Suggestion for you",
    suggestionAdd: "Add suggestion to cart",
    suggestionDetails: "Automatic suggestion",
    copied: "Product link and description copied.",
    rateFallback: "Rate: 1 EUR = 118 RSD",
    rateLive: "Updated rate: 1 EUR = {rate} RSD",
    "legal.eyebrow": "Legal",
    "terms.title": "Terms of Use",
    "terms.lead": "This page explains how ordering through the Eternior website works.",
    "terms.orderTitle": "Order Status",
    "terms.orderText": "The website is an online catalog and inquiry tool for WhatsApp or WeChat. An order is not final until availability, price, production/delivery time, delivery and payment method are confirmed directly in chat. The usual time is 3-7 days unless agreed differently.",
    "terms.handmadeTitle": "Handmade Products",
    "terms.handmadeText": "Every product is handmade, so small differences in shade, layout, decoration and shape are possible. Screen colors may differ from real life because of lighting, camera and display settings.",
    "terms.pricesTitle": "Prices and Coupons",
    "terms.pricesText": "Website prices are estimates and may be adjusted before confirmation if material availability, box size, sweet quantity or special requests change. Coupons apply only after Eternior confirms them in chat. A physical coupon may be requested for verification or recorded as used.",
    "terms.statusTitle": "Business Status and Liability",
    "terms.statusText": "Eternior currently operates as a small creative project and is not a registered company. Company details, tax number and formal rules will be added if the status changes. By ordering, the customer accepts that everything is confirmed by individual agreement.",
    "privacy.eyebrow": "Privacy",
    "privacy.title": "Privacy Policy",
    "privacy.lead": "Data is used only to arrange and deliver the gift.",
    "privacy.dataTitle": "What Data the Customer Sends",
    "privacy.dataText": "The customer may send a name, delivery address or pickup note, product choices, budget, gift message and contact through WhatsApp or WeChat.",
    "privacy.useTitle": "How Data Is Used",
    "privacy.useText": "Data is used only to confirm the order, make the gift, arrange payment, delivery or local pickup.",
    "privacy.shareTitle": "Data Sharing",
    "privacy.shareText": "Address and contact may be shared with a courier only if the customer chooses delivery. Data is not sold and is not used for unauthorized marketing.",
    "privacy.couponTitle": "Coupons and Referrals",
    "privacy.couponText": "If the customer uses a coupon or referral, the code may be recorded for discount tracking, preventing repeated use and future benefits.",
  },
  zh: {
    "nav.home": "首页",
    "nav.shop": "商店",
    "nav.custom": "定制礼物",
    "nav.contact": "联系",
    "cart.title": "购物车",
    "cart.empty": "购物车是空的。",
    "cart.checkout": "发送订单咨询",
    "cart.clear": "清空购物车",
    "cart.total": "预估总价",
    "cart.name": "你的姓名",
    "cart.delivery": "取货方式",
    "cart.address": "地址",
    "cart.note": "备注（如有）",
    "cart.cityPostal": "城市和邮编",
    "cart.phone": "电话号码",
    "cart.phonePrefix": "国家/地区代码",
    "cart.phoneInvalid": "请输入有效电话号码。塞尔维亚号码请选择 +381，并去掉开头的 0。",
    "cart.pickupInfo": "自取地点：Bor, 19210, Serbia",
    "cart.deliveryRequired": "配送需要姓名、电话、城市和邮编以及地址。",
    "cart.nameRequired": "发送咨询前请输入姓名。",
    "cart.deliveryChoiceRequired": "发送咨询前请选择配送或自取。",
    "cart.requiredHint": "只有选择配送时，配送信息才为必填。",
    "cart.productionNote": "制作和配送通常需要 3-7 天，除非聊天中另行确认。",
    "cart.customerSection": "确认信息",
    "cart.orderSummary": "购物车摘要",
    "cart.orderId": "咨询编号",
    "cart.reviewTitle": "发送前确认",
    "cart.reviewText": "这是我们将收到的消息。如果信息正确，请确认并打开应用发送。",
    "cart.reviewConfirm": "确认并发送",
    "cart.reviewEdit": "返回购物车",
    "cart.reviewItems": "商品",
    "cart.reviewTime": "时间",
    "cart.deliverySection": "自取和配送",
    "cart.contactSection": "发送方式",
    "cart.contactApp": "发送咨询的应用",
    "cart.whatsapp": "WhatsApp",
    "cart.wechat": "微信",
    "cart.wechatCopied": "订单已复制。请打开微信并发送给 Eternior 联系人：{id}。",
    "cart.shipping": "配送",
    "cart.pickup": "自取",
    "cart.decide": "请选择",
    "cart.each": "每件",
    "cart.close": "关闭购物车",
    "cart.itemDetails": "订单详情",
    "filter.search": "搜索",
    "filter.searchPlaceholder": "例如：红色、礼盒、Ferrero",
    "filter.budget": "预算上限",
    "filter.occasion": "场合",
    "filter.toy": "带玩具",
    "filter.memorial": "纪念",
    "filter.reset": "重置筛选",
    "filter.allOccasions": "所有场合",
    "badge.best": "常选款",
    "badge.gift": "稳妥礼物",
    "badge.luxury": "高级款",
    "badge.romance": "浪漫",
    "badge.custom": "定制",
    "filter.birthday": "生日",
    "filter.romance": "浪漫",
    "filter.luxury": "奢华",
    "filter.thankyou": "感谢",
    "filter.memorialOccasion": "纪念逝者",
    "home.eyebrow": "手工缎面玫瑰",
    "home.title": "Eternior",
    "home.lead": "比瞬间更长久的礼物：缎面玫瑰、优雅花束和甜品礼盒，可通过 WhatsApp 快速下单。",
    "home.shopCta": "查看系列",
    "home.customCta": "定制礼物",
    "strip.one": "不会凋谢的缎面玫瑰",
    "strip.two": "WhatsApp 或微信下单",
    "strip.three": "配送或自取",
    "home.promiseEyebrow": "Eternior 体验",
    "home.promiseTitle": "选择礼物，发送消息，确认细节。",
    "home.promiseText": "可以选择现成商品，也可以定制花束。发送咨询后，我们会收到清楚的订单内容，并确认库存、价格和配送。",
    "home.featureTitle": "特色：按预算推荐礼物",
    "home.featureText": "不确定要选什么也没关系。输入预算、场合和风格，Eternior 推荐会直接加入购物车。",
    "home.featureCta": "试试推荐",
    "home.previewEyebrow": "热门",
    "home.previewTitle": "可立即下单的礼物",
    "shop.eyebrow": "系列",
    "shop.title": "选择一份替你表达心意的礼物。",
    "shop.lead": "价格默认显示 RSD，也可切换为 EUR。汇率会尝试在线更新；如不可用，则使用 1 EUR = 118 RSD。",
    "shop.filterEyebrow": "筛选",
    "shop.filterAll": "全部",
    "shop.filterBouquets": "花束",
    "shop.filterSweet": "甜品礼盒",
    "shop.filterBundle": "组合",
    "shop.filterPremium": "高级",
    "custom.eyebrow": "你的礼物",
    "custom.title": "按照你的想法定制花束或甜品礼盒。",
    "custom.lead": "选择礼物类型、颜色、甜品和预算。你的想法会加入购物车，并生成订单消息，方便一起确认细节。",
    "custom.formEyebrow": "手动定制",
    "custom.giftType": "礼物类型",
    "custom.roseCount": "玫瑰数量",
    "custom.budget": "预算 RSD",
    "custom.color": "主色",
    "custom.sweets": "甜品",
    "custom.notes": "留言、场合或风格",
    "custom.estimate": "价格预估",
    "custom.memorial": "送给逝者时，只能选择偶数朵玫瑰",
    "custom.colorNote": "颜色仅供参考。由于光线、屏幕和缎带库存，实际色调可能不同。",
    "custom.paletteTitle": "玫瑰颜色",
    "custom.pricingNote": "价格包含材料、手工制作、包装和收尾成本。",
    "custom.coupon": "优惠码",
    "custom.applyCoupon": "使用优惠码",
    "custom.couponPlaceholder": "输入卡片上的优惠码",
    "custom.couponHint": "如果你有实体优惠卡，请输入卡上的代码。折扣需聊天确认后生效，并可能被记录为已使用。",
    "custom.useWheelCoupon": "使用转盘优惠码",
    "custom.perkOne": "发送前估价",
    "custom.perkTwo": "优惠码与推荐",
    "custom.perkThree": "制作前确认",
    "custom.invalidCoupon": "此优惠码无效或已使用。",
    "custom.discount": "折扣",
    "custom.glitter": "闪粉",
    "custom.glitterNone": "不要闪粉",
    "custom.glitterAccent": "玫瑰闪粉细节",
    "custom.glitterFull": "整朵闪粉玫瑰",
    "custom.jewelry": "装饰配件",
    "custom.jewelryNone": "不要装饰",
    "custom.zircon": "水钻",
    "custom.butterfly": "蝴蝶装饰",
    "custom.goldCrown": "金色小皇冠",
    "custom.silverCrown": "银色小皇冠",
    "custom.multicolor": "一朵玫瑰多色花瓣",
    "custom.no": "否",
    "custom.yesDiscuss": "是，需确认",
    "custom.photos": "加入照片",
    "custom.noPhotos": "不要照片",
    "custom.onePhoto": "1 张照片",
    "custom.twoPhotos": "2 张照片",
    "custom.threePhotos": "3 张照片，仅限较大作品",
    "custom.photoNote": "照片稍后通过 WhatsApp 或微信发送。较小花束的照片数量和尺寸需要确认。",
    "custom.ribbonText": "丝带文字",
    "custom.ribbonPlaceholder": "例如：30岁生日快乐",
    "custom.ribbonNote": "文字由贴纸字母组成，不是手写。最终位置在聊天中确认。",
    "footer.top": "返回顶部",
    "footer.home": "首页",
    "footer.terms": "条款",
    "footer.privacy": "隐私",
    "home.salesTitle": "一份会留下来的礼物",
    "home.salesText": "每一笔确认订单都有机会获得下次购买或推荐朋友的优惠码。",
    "home.salesCta": "按预算选择",
    "custom.miniChocolate": "小巧克力",
    "custom.bigChocolate": "大巧克力",
    "custom.toy": "玩具",
    "custom.toyColor": "玩具颜色",
    "custom.script": "手写留言字体",
    "custom.add": "加入定制礼物",
    "concierge.eyebrow": "Eternior 推荐",
    "concierge.title": "不确定选什么？",
    "concierge.text": "输入预算、场合和风格，即可得到可加入购物车的推荐。",
    "concierge.budget": "预算 RSD",
    "concierge.occasion": "场合",
    "concierge.style": "风格",
    "concierge.generate": "推荐礼物",
    "contact.eyebrow": "下单方式",
    "contact.title": "所有细节都通过聊天清楚确认。",
    "contact.lead": "发送购物车后，我们会收到包含商品、预算、备注和配送方式的消息，然后在制作前确认价格、库存、制作/配送时间和所有细节。",
    "contact.stepOneTitle": "选择",
    "contact.stepOneText": "选择现成商品，或按预算定制礼物。",
    "contact.stepTwoTitle": "发送",
    "contact.stepTwoText": "发送咨询按钮会准备订单消息，你可以检查后再发送。",
    "contact.stepThreeTitle": "确认",
    "contact.stepThreeText": "我们确认价格、制作/配送时间、快递或自取。",
    "contact.readyEyebrow": "准备好了吗？",
    "contact.readyTitle": "从系列开始，或定制你的礼物。",
    "footer.text": "为难忘时刻制作的缎面玫瑰、花束和甜品礼盒。",
    "footer.contact": "联系与下单",
    "footer.custom": "定制专属礼物",
    "footer.shop": "查看现成礼物",
    "footer.contactTitle": "联系",
    "footer.location": "地点：Bor, 19210, 塞尔维亚",
    "footer.handmadeTitle": "手工制作",
    "footer.handmadeText": "每一朵缎面玫瑰都由手工制作，细心组合并包装成持久的礼物。",
    "footer.orderingTitle": "下单",
    "footer.orderingText": "订单可通过 WhatsApp 或微信发送，并在制作前确认。通常需要 3-7 天，除非另行约定。",
    "footer.deliveryTitle": "配送",
    "footer.deliveryText": "快递配送另行确认，预估约 500 RSD，制作/配送时间会在聊天中确认。",
    "footer.personalTitle": "个性化",
    "footer.personalText": "现成产品不能更改，但可以添加留言或小玩具。",
    "footer.rulesTitle": "花束规则",
    "footer.rulesText": "礼物花束使用奇数朵玫瑰，最多 101 朵。送给逝者时选择偶数朵，最多 100 朵。",
    "footer.minBudgetTitle": "最低预算",
    "footer.minBudgetText": "定制礼物最低预算为 1,500 RSD。",
    "footer.deliveryShort": "配送：快递服务，约 500 RSD",
    "footer.aboutTitle": "关于我们",
    "footer.aboutText": "Eternior 的背后是来自塞尔维亚东部的 Alexandra。她已经手工制作缎面玫瑰三年，每一片花瓣都耐心折叠，每一种颜色都像为亲近的人准备礼物一样认真选择。选择 Eternior 不只是购买装饰，而是选择一份带着时间、心意和温柔的礼物。",
    "footer.legalTitle": "法律信息",
    "footer.legalText": "公司名称/税号/地址可在注册后或需要时添加。",
    "footer.confirmText": "订单只有在聊天确认后才算确认。",
    "faq.title": "常见问题",
    "faq.budgetQ": "最低预算是多少？",
    "faq.budgetA": "任何礼物的最低预算为 1,500 RSD。现成产品有固定价格，定制礼物按玫瑰和附加选项计算。",
    "faq.deliveryQ": "配送多少钱？",
    "faq.deliveryA": "配送费用取决于快递和目的地，通常约 500 RSD。制作和配送通常需要 3-7 天，除非聊天中另行确认。",
    "faq.readyQ": "可以更改现成产品吗？",
    "faq.readyA": "现成产品不能更改，但可以添加个性化手写留言或小玩具。",
    "footer.minBudgetText": "小礼物按选择计算，复杂定制礼物建议从 1,500 RSD 起计划。",
    "faq.budgetA": "小礼物按玫瑰数量和附加选项计算，不会在价格上另加最低预算。复杂定制礼物建议从 1,500 RSD 起计划。",
    "wheel.title": "转动幸运转盘",
    "wheel.text": "赢取 Eternior 礼物优惠码。每台设备保存一个优惠码。",
    "wheel.spin": "开始转动",
    "wheel.close": "稍后",
    "wheel.won": "你的优惠码",
    "wheel.apply": "用于定制",
    "wheel.saved": "优惠码已保存，可在定制礼物时使用。",
    "wheel.used": "此设备上的优惠码已使用。",
    "wheel.open": "我的优惠码",
    "faq.rosesQ": "可以选择多少朵玫瑰？",
    "faq.rosesA": "礼物花束使用奇数朵玫瑰，最多 101 朵。101 朵玫瑰是大型特殊花束，附加项前价格为 25,000 RSD。送给逝者时选择偶数朵，最多 100 朵。",
    "faq.careQ": "缎面玫瑰如何保养？",
    "faq.careA": "保持干燥，避免阳光直射，不要用水清洗。如有需要，可用干燥软刷轻轻清洁。",
    add: "加入购物车",
    detailsTitle: "产品详情",
    readyMessage: "个性化留言",
    readyMessagePlaceholder: "最多 200 个字符，留一点空间写完最后一个词。",
    readyScript: "字体",
    readyToy: "玩具",
    readyAddonNote: "现成产品不能更改。只能添加留言或小玩具",
    shareProduct: "分享产品",
    suggestionTitle: "为你推荐",
    suggestionAdd: "加入推荐",
    suggestionDetails: "自动推荐",
    copied: "产品链接和描述已复制。",
    rateFallback: "汇率：1 EUR = 118 RSD",
    rateLive: "已更新汇率：1 EUR = {rate} RSD",
    "legal.eyebrow": "法律信息",
    "terms.title": "使用条款",
    "terms.lead": "本页说明如何通过 Eternior 网站下单。",
    "terms.orderTitle": "订单状态",
    "terms.orderText": "本网站是在线目录和咨询工具，可通过 WhatsApp 或微信发送询问。只有在聊天中确认库存、价格、制作/配送时间、配送和付款方式后，订单才算最终确认。通常需要 3-7 天，除非另行约定。",
    "terms.handmadeTitle": "手工产品",
    "terms.handmadeText": "每件产品都是手工制作，颜色、布局、装饰和形状可能会有细微差异。由于光线、相机和屏幕设置，屏幕颜色可能与实物不同。",
    "terms.pricesTitle": "价格和优惠码",
    "terms.pricesText": "网站价格为估算价格。如果材料供应、礼盒尺寸、甜品数量或特殊要求发生变化，确认订单前价格可能调整。优惠码需由 Eternior 在聊天中确认后生效。实体优惠卡可能需要核验或记录为已使用。",
    "terms.statusTitle": "经营状态和责任",
    "terms.statusText": "Eternior 目前是小型创意项目，尚未注册为公司。如果状态发生变化，将补充公司信息、税号和正式规则。客户下单即表示接受所有细节需单独确认。",
    "privacy.eyebrow": "隐私",
    "privacy.title": "隐私政策",
    "privacy.lead": "信息仅用于确认和配送礼物。",
    "privacy.dataTitle": "客户发送的信息",
    "privacy.dataText": "客户可以通过 WhatsApp 或微信发送姓名、配送地址或自取备注、产品选择、预算、礼物留言和联系方式。",
    "privacy.useTitle": "信息如何使用",
    "privacy.useText": "信息仅用于确认订单、制作礼物、安排付款、配送或自取。",
    "privacy.shareTitle": "信息分享",
    "privacy.shareText": "只有客户选择配送时，地址和联系方式才可能提供给快递公司。信息不会出售，也不会用于未经授权的营销。",
    "privacy.couponTitle": "优惠码和推荐",
    "privacy.couponText": "如果客户使用优惠码或推荐码，该代码可能会被记录，用于折扣统计、防止重复使用和后续优惠。",
  },
};

const productText = {
  sr: [
    ["Aurora 7", "Buket", "7 satenskih ruža u šampanj i ivory tonovima, sa zlatnom trakom i elegantnim papirom."],
    ["Ruby 9", "Buket", "9 crvenih satenskih ruža za romantične prilike, ručno složene u luksuzan omot."],
    ["Noir Gold 11", "Buket", "11 crno-zlatnih satenskih ruža za dramatičan, moderan poklon koji se pamti."],
    ["Blush 15", "Buket", "15 nežno roze satenskih ruža sa bisernim detaljem i punijim oblikom buketa."],
    ["Royal Blue 21", "Buket", "21 plava satenska ruža sa srebrnim akcentom, za upečatljiv i elegantan utisak."],
    ["Ivory Memory 8", "Memorial", "8 ivory satenskih ruža za miran, dostojanstven poklon namenjen preminuloj osobi."],
    ["Sweet Mini Box", "Slatka kutija", "Kutija sa 5 satenskih ruža, Raffaello kuglicama i urednim belim pakovanjem."],
    ["Ferrero Heart", "Slatka kutija", "Srce kutija sa 7 satenskih ruža i Ferrero Rocher kuglicama u zlatnom aranžmanu."],
    ["Choco Bloom", "Slatka kutija", "Kvadratna kutija sa 9 satenskih ruža, malim čokoladicama i satenskom mašnom."],
    ["Luxury Sweet Garden", "Slatka kutija", "Veća kutija sa 15 satenskih ruža, mešanim slatkišima i dekorativnim detaljima."],
    ["Teddy Rose Box", "Kutija + igračka", "Poklon kutija sa 7 satenskih ruža, manjim medvedićem i mestom za ličnu poruku."],
    ["Golden Proposal", "Premium buket", "25 satenskih ruža u crvenoj i zlatnoj kombinaciji, za prosidbe i velike trenutke."],
    ["Pastel Dream", "Buket", "13 satenskih ruža u pastelnim bojama, nežan izbor za rođendan ili iznenađenje."],
    ["Candy Pop Box", "Slatka kutija", "Šarena kutija sa 9 satenskih ruža, bombonama i veselim dekorom."],
    ["Eternior Signature", "Premium komplet", "Buket od 19 satenskih ruža uz slatku kutiju i luksuzno pakovanje."],
  ],
  en: [
    ["Aurora 7", "Bouquet", "7 satin roses in champagne and ivory tones with a gold ribbon and elegant wrapping."],
    ["Ruby 9", "Bouquet", "9 red satin roses for romantic occasions, handmade in luxury wrapping."],
    ["Noir Gold 11", "Bouquet", "11 black and gold satin roses for a dramatic modern gift."],
    ["Blush 15", "Bouquet", "15 soft pink satin roses with pearl detail and a fuller bouquet shape."],
    ["Royal Blue 21", "Bouquet", "21 blue satin roses with a silver accent for an elegant statement."],
    ["Ivory Memory 8", "Memorial", "8 ivory satin roses for a calm, respectful memorial gift."],
    ["Sweet Mini Box", "Sweet box", "A box with 5 satin roses, Raffaello pieces and clean white styling."],
    ["Ferrero Heart", "Sweet box", "Heart box with 7 satin roses and Ferrero Rocher pieces in a golden arrangement."],
    ["Choco Bloom", "Sweet box", "Square box with 9 satin roses, mini chocolates and a satin bow."],
    ["Luxury Sweet Garden", "Sweet box", "Large box with 15 satin roses, mixed sweets and decorative details."],
    ["Teddy Rose Box", "Box + toy", "Gift box with 7 satin roses, a small teddy bear and space for a personal note."],
    ["Golden Proposal", "Premium bouquet", "25 satin roses in red and gold for proposals and major moments."],
    ["Pastel Dream", "Bouquet", "13 satin roses in pastel colors, soft and sweet for birthdays or surprises."],
    ["Candy Pop Box", "Sweet box", "Colorful box with 9 satin roses, candy and cheerful decor."],
    ["Eternior Signature", "Premium set", "19 satin roses with a sweet box and luxury packaging."],
  ],
  zh: [
    ["Aurora 7", "花束", "7 朵香槟和象牙色缎面玫瑰，配金色丝带和优雅包装。"],
    ["Ruby 9", "花束", "9 朵红色缎面玫瑰，适合浪漫场合，手工精致包装。"],
    ["Noir Gold 11", "花束", "11 朵黑金缎面玫瑰，现代而醒目的礼物。"],
    ["Blush 15", "花束", "15 朵浅粉缎面玫瑰，带珍珠细节，花束更饱满。"],
    ["Royal Blue 21", "花束", "21 朵蓝色缎面玫瑰，配银色点缀。"],
    ["Ivory Memory 8", "纪念", "8 朵象牙白缎面玫瑰，适合纪念逝者。"],
    ["Sweet Mini Box", "甜品礼盒", "含 5 朵缎面玫瑰、Raffaello 和白色礼盒。"],
    ["Ferrero Heart", "甜品礼盒", "心形礼盒，含 7 朵缎面玫瑰和 Ferrero Rocher。"],
    ["Choco Bloom", "甜品礼盒", "方形礼盒，含 9 朵缎面玫瑰、小巧克力和缎带。"],
    ["Luxury Sweet Garden", "甜品礼盒", "大礼盒，含 15 朵缎面玫瑰、混合甜品和装饰。"],
    ["Teddy Rose Box", "礼盒 + 玩具", "含 7 朵缎面玫瑰、小熊和个人留言位置。"],
    ["Golden Proposal", "高级花束", "25 朵红金缎面玫瑰，适合求婚和重要时刻。"],
    ["Pastel Dream", "花束", "13 朵柔和色缎面玫瑰，适合生日或惊喜。"],
    ["Candy Pop Box", "甜品礼盒", "彩色礼盒，含 9 朵缎面玫瑰、糖果和活泼装饰。"],
    ["Eternior Signature", "高级组合", "19 朵缎面玫瑰配甜品礼盒和豪华包装。"],
  ],
};

const selectOptions = {
  sr: {
    giftType: ["Personalizovani satenski buket", "Personalizovana slatka kutija", "Buket + slatka kutija"],
    roseColor: ["Šampanj", "Slonova kost", "Nežno roze", "Crvena", "Crna", "Kombinacija boja"],
    sweets: ["Bez slatkiša", "Čokolada", "Bombone", "Mešani slatkiši", "Dogovor preko WhatsApp-a"],
    occasion: ["Rođendan", "Godišnjica", "Izvinjenje", "Romantičan poklon", "Zahvalnost"],
    style: ["Elegantno i nežno", "Luksuzno i dramatično", "Minimalno i moderno", "Veselo i šareno"],
    toy: ["Bez igračke", "Mali beli medvedić", "Mali braon medvedić", "Mali roze medvedić", "Mini zeka"],
    toyColors: ["Bela", "Braon", "Roze", "Bež"],
    script: ["Latinica", "Ćirilica"],
    customPlaceholder: "Na primer: crveno-zlatni buket za godišnjicu...",
  },
  en: {
    giftType: ["Custom satin bouquet", "Custom sweet box", "Bouquet + sweet box"],
    roseColor: ["Champagne", "Ivory", "Soft pink", "Red", "Black", "Mixed colors"],
    sweets: ["No sweets", "Chocolate", "Candy", "Mixed sweets", "Decide on WhatsApp"],
    occasion: ["Birthday", "Anniversary", "Apology", "Romantic gift", "Thank you"],
    style: ["Elegant and soft", "Luxury and dramatic", "Minimal and modern", "Bright and colorful"],
    toy: ["No toy", "Small white teddy bear", "Small brown teddy bear", "Small pink teddy bear", "Mini bunny"],
    toyColors: ["White", "Brown", "Pink", "Beige"],
    script: ["Latin", "Cyrillic"],
    customPlaceholder: "Example: red and gold bouquet for an anniversary...",
  },
  zh: {
    giftType: ["定制缎面玫瑰花束", "定制甜品礼盒", "花束 + 甜品礼盒"],
    roseColor: ["香槟色", "象牙白", "浅粉色", "红色", "黑色", "混合颜色"],
    sweets: ["不要甜品", "巧克力", "糖果", "混合甜品", "WhatsApp 上确认"],
    occasion: ["生日", "周年纪念", "道歉", "浪漫礼物", "感谢"],
    style: ["优雅温柔", "奢华醒目", "简约现代", "明亮多彩"],
    toy: ["不要玩具", "白色小熊", "棕色小熊", "粉色小熊", "小兔子"],
    toyColors: ["白色", "棕色", "粉色", "米色"],
    script: ["拉丁字母", "西里尔字母"],
    customPlaceholder: "例如：周年纪念红金色花束...",
  },
};

const rosePalette = [
  { sr: "Bela", en: "White", zh: "白色", color: "#fffaf1" },
  { sr: "Ivory", en: "Ivory", zh: "象牙白", color: "#fff2d4" },
  { sr: "Šampanj", en: "Champagne", zh: "香槟色", color: "#e5c27c" },
  { sr: "Zlatna", en: "Gold", zh: "金色", color: "#c69a45" },
  { sr: "Žuta", en: "Yellow", zh: "黄色", color: "#f4cc4f" },
  { sr: "Narandžasta", en: "Orange", zh: "橙色", color: "#e87d37" },
  { sr: "Breskva", en: "Peach", zh: "蜜桃色", color: "#f2a983" },
  { sr: "Nežno roze", en: "Soft pink", zh: "浅粉色", color: "#e6a0ad" },
  { sr: "Pink", en: "Pink", zh: "粉色", color: "#e95588" },
  { sr: "Crvena", en: "Red", zh: "红色", color: "#941d35" },
  { sr: "Bordo", en: "Burgundy", zh: "酒红色", color: "#5c1528" },
  { sr: "Lavanda", en: "Lavender", zh: "薰衣草紫", color: "#b9a4d8" },
  { sr: "Ljubičasta", en: "Purple", zh: "紫色", color: "#6b3fa0" },
  { sr: "Plava", en: "Blue", zh: "蓝色", color: "#1c4f8c" },
  { sr: "Tirkizna", en: "Turquoise", zh: "绿松石色", color: "#2ca6a4" },
  { sr: "Mint", en: "Mint", zh: "薄荷绿", color: "#99cdb5" },
  { sr: "Zelena", en: "Green", zh: "绿色", color: "#6f7b68" },
  { sr: "Braon", en: "Brown", zh: "棕色", color: "#7b4a38" },
  { sr: "Srebrna", en: "Silver", zh: "银色", color: "#d9d9d9" },
  { sr: "Crna", en: "Black", zh: "黑色", color: "#050505" },
];

const colorLabels = {
  Gold: { sr: "Zlatna", en: "Gold", zh: "金色" },
  Ivory: { sr: "Ivory", en: "Ivory", zh: "象牙白" },
  Pearl: { sr: "Biserna", en: "Pearl", zh: "珍珠色" },
  Sage: { sr: "Sage zelena", en: "Sage green", zh: "鼠尾草绿" },
  Chocolate: { sr: "Čokoladna", en: "Chocolate", zh: "巧克力色" },
  Mocha: { sr: "Mocha", en: "Mocha", zh: "摩卡色" },
  Blue: { sr: "Plava", en: "Blue", zh: "蓝色" },
  Yellow: { sr: "Žuta", en: "Yellow", zh: "黄色" },
  Black: { sr: "Crna", en: "Black", zh: "黑色" },
  Custom: { sr: "Po dogovoru", en: "Custom", zh: "定制" },
  Cream: { sr: "Krem", en: "Cream", zh: "奶油色" },
  Silver: { sr: "Srebrna", en: "Silver", zh: "银色" },
  Srebro: { sr: "Srebrna", en: "Silver", zh: "银色" },
  Pink: { sr: "Pink", en: "Pink", zh: "粉色" },
  Lavanda: { sr: "Lavanda", en: "Lavender", zh: "薰衣草色" },
  "Nežno roze": { sr: "Nežno roze", en: "Soft pink", zh: "浅粉色" },
  Roze: { sr: "Roze", en: "Pink", zh: "粉色" },
};

const sweetPrices = {
  rafaello: 70,
  ferrero: 110,
  miniChocolate: 120,
  bigChocolate: 380,
};

const products = [
  { id: "aurora-7", type: "bouquet", occasion: "birthday", price: 3200, roses: 7, box: "Luksuzni papir", palette: "Šampanj, ivory, zlato", visual: "champagne", colors: [["Šampanj", "#e5c27c"], ["Ivory", "#fff2d4"], ["Gold", "#c69a45"]] },
  { id: "ruby-9", type: "bouquet", occasion: "romance", price: 3900, roses: 9, box: "Crni omot", palette: "Crvena, crna, zlato", visual: "ruby", colors: [["Crvena", "#941d35"], ["Crna", "#050505"], ["Gold", "#c69a45"]] },
  { id: "noir-gold-11", type: "bouquet", occasion: "luxury", price: 5200, roses: 11, box: "Crni premium papir", palette: "Crna, zlatna", visual: "noir", colors: [["Crna", "#050505"], ["Gold", "#c69a45"], ["Ivory", "#fff2d4"]] },
  { id: "blush-15", type: "bouquet", occasion: "birthday", price: 6500, roses: 15, box: "Roze omot", palette: "Nežno roze, ivory", visual: "blush", colors: [["Nežno roze", "#e6a0ad"], ["Ivory", "#fff2d4"], ["Pearl", "#f6efe4"]] },
  { id: "royal-blue-21", type: "bouquet", occasion: "luxury", price: 9200, roses: 21, box: "Plavo-srebrni omot", palette: "Plava, srebrna", visual: "blue", colors: [["Plava", "#1c4f8c"], ["Srebro", "#d9d9d9"], ["Bela", "#fff2d4"]] },
  { id: "ivory-memory-8", type: "memorial", occasion: "memorial", price: 3600, roses: 8, box: "Mirno ivory pakovanje", palette: "Ivory, bela", visual: "ivory", colors: [["Ivory", "#fff2d4"], ["Bela", "#ffffff"], ["Sage", "#84947f"]] },
  { id: "sweet-mini-box", type: "sweet", occasion: "birthday", price: 5200, roses: 5, box: "Bela kutija", palette: "Ivory, zlatna", visual: "sweet", colors: [["Ivory", "#fff2d4"], ["Gold", "#c69a45"], ["Cream", "#f7e7c6"]] },
  { id: "ferrero-heart", type: "sweet", occasion: "romance", price: 6900, roses: 7, box: "Srce kutija", palette: "Crvena, zlato", visual: "heart", colors: [["Crvena", "#941d35"], ["Gold", "#c69a45"], ["Chocolate", "#573326"]] },
  { id: "choco-bloom", type: "sweet", occasion: "thankyou", price: 7600, roses: 9, box: "Kvadratna kutija", palette: "Braon, ivory", visual: "choco", colors: [["Mocha", "#7b4a38"], ["Ivory", "#fff2d4"], ["Gold", "#c69a45"]] },
  { id: "luxury-sweet-garden", type: "sweet", occasion: "luxury", price: 11500, roses: 15, box: "Velika premium kutija", palette: "Crvena, crna, zlatna", visual: "garden", colors: [["Crvena", "#941d35"], ["Crna", "#050505"], ["Gold", "#c69a45"]] },
  { id: "teddy-rose-box", type: "toy", occasion: "birthday", price: 7600, roses: 7, box: "Poklon kutija", palette: "Roze, bela", visual: "teddy", colors: [["Roze", "#e6a0ad"], ["Bela", "#ffffff"], ["Gold", "#c69a45"]] },
  { id: "golden-proposal", type: "premium", occasion: "romance", price: 14900, roses: 25, box: "Premium buket", palette: "Crvena, zlatna", visual: "proposal", colors: [["Crvena", "#941d35"], ["Gold", "#c69a45"], ["Crna", "#050505"]] },
  { id: "pastel-dream", type: "bouquet", occasion: "birthday", price: 5900, roses: 13, box: "Pastel papir", palette: "Lavanda, roze, ivory", visual: "pastel", colors: [["Lavanda", "#b9a4d8"], ["Roze", "#e6a0ad"], ["Ivory", "#fff2d4"]] },
  { id: "candy-pop-box", type: "sweet", occasion: "birthday", price: 7900, roses: 9, box: "Šarena kutija", palette: "Mešane boje", visual: "candy", colors: [["Pink", "#e95588"], ["Yellow", "#f4cc4f"], ["Blue", "#67a4d9"]] },
  { id: "eternior-signature", type: "premium", occasion: "luxury", price: 16900, roses: 19, box: "Buket + kutija", palette: "Po dogovoru", visual: "signature", colors: [["Custom", "#9f334d"], ["Gold", "#c69a45"], ["Black", "#050505"]] },
];

function t(key) {
  const runtimeCopy = {
    sr: {
      "custom.previewEyebrow": "Pregled uživo",
      "custom.previewTitle": "Kako bi poklon mogao da izgleda",
      "custom.previewNote": "Pregled je okviran. Ručni rad, nijanse i raspored se potvrđuju pre izrade.",
      "assistant.open": "Asistent",
      "assistant.title": "Eternior asistent",
      "assistant.kicker": "Pomoć pri izboru",
      "assistant.close": "Zatvori asistenta",
      "assistant.restart": "Kreni ponovo",
      "assistant.add": "Dodaj predlog u korpu",
      "assistant.custom": "Napravi detaljnije",
      "assistant.shop": "Pogledaj prodavnicu",
    },
    en: {
      "custom.previewEyebrow": "Live preview",
      "custom.previewTitle": "How your gift could look",
      "custom.previewNote": "Preview is approximate. Handmade details, shades and placement are confirmed before making.",
      "assistant.open": "Assistant",
      "assistant.title": "Eternior assistant",
      "assistant.kicker": "Gift guidance",
      "assistant.close": "Close assistant",
      "assistant.restart": "Start again",
      "assistant.add": "Add suggestion to cart",
      "assistant.custom": "Customize more",
      "assistant.shop": "View shop",
    },
    zh: {
      "custom.previewEyebrow": "实时预览",
      "custom.previewTitle": "礼物大概呈现效果",
      "custom.previewNote": "预览仅供参考。手工细节、色差和摆放会在制作前确认。",
      "assistant.open": "助手",
      "assistant.title": "Eternior 助手",
      "assistant.kicker": "礼物推荐",
      "assistant.close": "关闭助手",
      "assistant.restart": "重新开始",
      "assistant.add": "加入推荐",
      "assistant.custom": "继续定制",
      "assistant.shop": "查看商店",
    },
  };
  return copy[state.lang][key] || runtimeCopy[state.lang]?.[key] || copy.sr[key] || runtimeCopy.sr[key] || key;
}

function saveState() {
  localStorage.setItem("eterniorCart", JSON.stringify(state.cart));
  localStorage.setItem("eterniorLang", state.lang);
  localStorage.setItem("eterniorCurrency", state.currency);
  localStorage.setItem("eterniorRate", String(state.eurRsd));
  if (state.orderId) localStorage.setItem("eterniorOrderId", state.orderId);
  else localStorage.removeItem("eterniorOrderId");
}

function generateOrderId() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ETR-${stamp}-${random}`;
}

function getCurrentOrderId() {
  if (!state.orderId) {
    state.orderId = generateOrderId();
    saveState();
  }
  return state.orderId;
}

function resetOrderId() {
  state.orderId = "";
  localStorage.removeItem("eterniorOrderId");
}

function formatMoney(rsd) {
  if (state.currency === "EUR") {
    return `${(rsd / state.eurRsd).toFixed(2)} EUR`;
  }
  return `${Math.round(rsd).toLocaleString("sr-RS")} RSD`;
}

function hydrateProduct(product, index) {
  const [name, category, description] = productText[state.lang][index];
  const [srName, srCategory, srDescription] = productText.sr[index];
  return { ...product, name, category, description, orderNameSr: srName, orderCategorySr: srCategory, orderDescriptionSr: srDescription };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function productMatchesFilters(product) {
  const search = document.querySelector("[data-search]")?.value.trim().toLowerCase() || "";
  const maxBudget = Number(document.querySelector("[data-max-budget]")?.value || 0);
  const occasion = document.querySelector("[data-occasion-filter]")?.value || "all";
  const text = `${product.name} ${product.category} ${product.description} ${product.palette}`.toLowerCase();

  if (state.activeFilter !== "all" && product.type !== state.activeFilter) return false;
  if (occasion !== "all" && product.occasion !== occasion) return false;
  if (maxBudget && product.price > maxBudget) return false;
  if (search && !text.includes(search)) return false;
  return true;
}

function getReadyProductSpecs(product) {
  if (state.lang === "en") {
    return [
      "Material: satin ribbon, decorative paper/box and hand-fixed details.",
      "Rose color: palette shown on the product card. There are 20 basic colors and several shades for future custom orders.",
      "Packaging: luxury paper or gift box, depending on the product. The ready product cannot be changed, except for a message or a small toy.",
      "Care: keep dry, away from direct sun, and do not wash with water.",
      "Detail: every arrangement is handmade, so small differences make the gift unique.",
      "Time: usually 3-7 days unless confirmed differently in chat.",
    ];
  }
  if (state.lang === "zh") {
    return [
      "材质：缎带、装饰纸/礼盒和手工固定细节。",
      "玫瑰颜色：以产品卡片显示的配色为准。定制订单可选择 20 种基础颜色和若干色调。",
      "包装：根据产品使用高级包装纸或礼盒。现成产品不能更改，只能添加留言或小玩具。",
      "保养：保持干燥，避免阳光直射，不要用水清洗。",
      "细节：每个作品都是手工制作，细微差异让礼物更独特。",
      "时间：通常需要 3-7 天，除非聊天中另行确认。",
    ];
  }
  return [
    "Materijal: satenska traka, dekorativni papir/kutija i ručno fiksirani detalji.",
    `Boja ruža: ${product.palette}. Dostupno je 20 osnovnih boja i nekoliko nijansi za buduće personalizovane porudžbine.`,
    `Pakovanje: ${product.box}. Gotov proizvod se ne menja, osim dodatka poruke ili male igračke.`,
    "Održavanje: držati na suvom, dalje od direktnog sunca i ne prati vodom.",
    "Detalj: svaki aranžman pravi se ručno, pa sitne razlike čine poklon jedinstvenim.",
    "Rok: najčešće 3-7 dana, osim ako se drugačije potvrdi u poruci.",
  ];
}

function getProductBadges(product) {
  if (product.id === "eternior-signature") return [t("badge.best"), t("badge.custom")];
  if (product.id === "golden-proposal") return [t("badge.luxury"), t("badge.romance")];
  if (product.id === "ferrero-heart" || product.id === "ruby-9") return [t("badge.romance")];
  if (product.type === "sweet" || product.type === "toy") return [t("badge.gift")];
  if (product.type === "premium") return [t("badge.luxury")];
  if (product.id === "aurora-7" || product.id === "pastel-dream") return [t("badge.best")];
  return [];
}

function getVisualVars(colors = []) {
  const hexes = colors.map(([, color]) => color).filter(Boolean);
  return [
    `--rose-a:${hexes[0] || "#e5c27c"}`,
    `--rose-b:${hexes[1] || hexes[0] || "#fff2d4"}`,
    `--rose-c:${hexes[2] || "#c69a45"}`,
  ].join(";");
}

function roseMarkup(count = 7, prefix = "pv-rose") {
  return Array.from({ length: count }, (_, index) => `<span class="${prefix} ${prefix}-${index + 1}"></span>`).join("");
}

function sweetMarkup(product) {
  const base = product.visual === "candy" ? "candy" : product.visual === "choco" ? "choco" : "ferrero";
  return `
    <span class="pv-sweet pv-sweet-1 ${base}"></span>
    <span class="pv-sweet pv-sweet-2 raffaello"></span>
    <span class="pv-sweet pv-sweet-3 ${product.visual === "heart" ? "heart-choc" : "bar"}"></span>
    <span class="pv-sweet pv-sweet-4 ferrero"></span>`;
}

function ribbonPreviewText() {
  if (state.lang === "en") return "Your text";
  if (state.lang === "zh") return "你的文字";
  return "Tvoj tekst";
}

function productVisualHtml(product) {
  const badges = getProductBadges(product).map((badge) => `<span>${escapeHtml(badge)}</span>`).join("");
  const isSweet = ["sweet", "toy", "premium"].includes(product.type);
  const isBox = isSweet || ["heart", "signature", "garden", "candy", "choco"].includes(product.visual);
  const isToy = product.type === "toy";
  const isMemorial = product.type === "memorial";
  const roseCount = product.roses >= 19 ? 9 : product.roses >= 11 ? 7 : 5;
  const classNames = [
    "product-image",
    "product-visual",
    `visual-${product.visual}`,
    `visual-type-${product.type}`,
    isBox ? "has-box" : "has-wrap",
    isMemorial ? "is-memorial" : "",
  ].filter(Boolean).join(" ");

  return `
    <div class="${classNames}" style="${getVisualVars(product.colors)}" role="img" aria-label="${escapeHtml(product.name)}">
      <div class="product-badges">${badges}</div>
      <div class="pv-surface">
        ${isBox ? '<span class="pv-box-back"></span><span class="pv-box-base"></span>' : '<span class="pv-bouquet-wrap"></span>'}
        <span class="pv-stems"></span>
        <span class="pv-rose-cluster">${roseMarkup(roseCount)}</span>
        ${isSweet ? `<span class="pv-sweets">${sweetMarkup(product)}</span>` : ""}
        ${isToy ? '<span class="pv-toy" aria-hidden="true"><i></i></span>' : '<span class="pv-toy pv-addon-toy" aria-hidden="true" hidden><i></i></span>'}
        ${product.type === "premium" ? `<span class="pv-ribbon">${ribbonPreviewText()}</span><span class="pv-jewel"></span>` : ""}
        ${isMemorial ? '<span class="pv-memory-line"></span>' : ""}
      </div>
    </div>`;
}

function renderProducts(target, limit) {
  if (!target) return;
  const items = products
    .map(hydrateProduct)
    .filter(productMatchesFilters)
    .slice(0, limit || products.length);

  target.innerHTML = items
    .map(
      (product) => `
        <article class="product-card reveal" data-product-card="${product.id}">
          ${productVisualHtml(product)}
          <div class="product-body">
            <div class="product-meta">
              <div>
                <h3>${product.name}</h3>
                <p>${product.category} | ${product.roses} ${state.lang === "sr" ? "ruža" : state.lang === "en" ? "roses" : "朵玫瑰"}</p>
              </div>
              <span class="price">${formatMoney(product.price)}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <details class="product-details">
              <summary>${t("detailsTitle")}</summary>
              <ul>
                ${getReadyProductSpecs(product).map((spec) => `<li>${spec}</li>`).join("")}
              </ul>
            </details>
            <div class="swatches">
              ${product.colors.map(([label, color]) => `<span class="swatch" style="--swatch:${color}">${translateColorLabel(label)}</span>`).join("")}
            </div>
            <div class="product-addons">
              <label>${t("readyMessage")}
                <textarea data-ready-message maxlength="210" rows="2" placeholder="${t("readyMessagePlaceholder")}"></textarea>
              </label>
              <div class="field-row">
                <label>${t("readyScript")}
                  <select data-ready-script>
                    ${(selectOptions[state.lang] || selectOptions.sr).script.map((item) => `<option>${item}</option>`).join("")}
                  </select>
                </label>
                <label>${t("readyToy")}
                  <select data-ready-toy>
                    ${(selectOptions[state.lang] || selectOptions.sr).toy.map((item) => `<option>${item}</option>`).join("")}
                  </select>
                </label>
              </div>
              <small>${t("readyAddonNote")} (+${formatMoney(STORE.toyPrice)}).</small>
            </div>
            <button class="button button-primary" type="button" data-add-product="${product.id}">${t("add")}</button>
            <button class="share-button" type="button" data-share-product="${product.id}">${t("shareProduct")}</button>
          </div>
        </article>`
    )
    .join("");
}

function renderTranslations() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-placeholder-i18n]").forEach((node) => {
    node.placeholder = t(node.dataset.placeholderI18n);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
  document.querySelectorAll("[data-currency]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.currency === state.currency);
  });
  renderSelectOptions();
  renderColorPalette();
}

function renderColorPalette() {
  const target = document.querySelector("[data-color-palette]");
  if (!target) return;
  const selected = getColorSr(document.querySelector('select[name="roseColor"]')?.value || "");
  target.innerHTML = rosePalette
    .map((item) => `<button class="${item.sr === selected ? "is-active" : ""}" type="button" data-palette-color="${item.sr}" style="--swatch:${item.color}"><span></span>${item[state.lang] || item.sr}</button>`)
    .join("");
}

function getColorSr(value) {
  const found = rosePalette.find((item) => [item.sr, item.en, item.zh].includes(value));
  return found ? found.sr : value;
}

function translateColorLabel(label) {
  const found = rosePalette.find((item) => [item.sr, item.en, item.zh].includes(label));
  if (found) return found[state.lang] || found.sr;
  return colorLabels[label]?.[state.lang] || label;
}

function fillSelect(name, values) {
  const select = document.querySelector(`select[name="${name}"]`);
  if (!select) return;
  select.innerHTML = values.map((value) => `<option value="${value}">${value}</option>`).join("");
}

function renderSelectOptions() {
  const options = selectOptions[state.lang] || selectOptions.sr;
  fillSelect("giftType", options.giftType);
  fillSelect("roseColor", rosePalette.map((item) => item[state.lang] || item.sr));
  fillSelect("sweets", options.sweets);
  fillSelect("occasion", options.occasion);
  fillSelect("style", options.style);
  fillSelect("toy", options.toy);
  fillSelect("script", options.script);
  fillSelect("toyColor", options.toyColors || selectOptions.sr.toyColors);
  fillOccasionFilter();
  const notes = document.querySelector('textarea[name="notes"]');
  if (notes) notes.placeholder = options.customPlaceholder;
}

function fillOccasionFilter() {
  const select = document.querySelector("[data-occasion-filter]");
  if (!select) return;
  const current = select.value || "all";
  const values = [
    ["all", t("filter.allOccasions")],
    ["birthday", t("filter.birthday")],
    ["romance", t("filter.romance")],
    ["luxury", t("filter.luxury")],
    ["thankyou", t("filter.thankyou")],
    ["memorial", t("filter.memorialOccasion")],
  ];
  select.innerHTML = values.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  select.value = values.some(([value]) => value === current) ? current : "all";
}

function renderRate() {
  document.querySelectorAll("[data-rate-note]").forEach((node) => {
    const live = localStorage.getItem("eterniorRateLive") === "true";
    node.textContent = live ? t("rateLive").replace("{rate}", state.eurRsd.toFixed(2)) : t("rateFallback");
  });
}

async function updateRate() {
  try {
    const response = await fetch(STORE.rateApi);
    if (!response.ok) throw new Error("Rate unavailable");
    const data = await response.json();
    if (!data.rates || !data.rates.RSD) throw new Error("RSD rate missing");
    state.eurRsd = Number(data.rates.RSD);
    localStorage.setItem("eterniorRateLive", "true");
  } catch {
    state.eurRsd = STORE.fallbackEurRsd;
    localStorage.setItem("eterniorRateLive", "false");
  }
  saveState();
  renderAll();
}

function renderCart() {
  const panel = document.querySelector("[data-cart-panel]");
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = count;
  });

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = state.cart.length ? getCurrentOrderId() : "";
  panel.innerHTML = `
    <div class="cart-header">
      <div>
        <p class="eyebrow">${t("cart.title")}</p>
        <h2>${t("cart.title")}</h2>
      </div>
      <button class="icon-button" type="button" data-close-cart aria-label="${t("cart.close")}">x</button>
    </div>
    <div class="cart-items">
      <p class="cart-section-title">${t("cart.orderSummary")}</p>
      ${orderId ? `<p class="cart-order-id"><span>${t("cart.orderId")}</span><strong>${orderId}</strong></p>` : ""}
      ${
        state.cart.length
          ? state.cart
              .map(
                (item) => `
                  <article class="cart-item">
                    <div class="cart-item-copy">
                      <h3>${item.name}</h3>
                      ${renderCartItemDetails(item)}
                      <p class="cart-unit-price">${formatMoney(item.price)} / ${t("cart.each")}</p>
                    </div>
                    <div class="quantity">
                      <button type="button" data-quantity="${item.id}" data-amount="-1">-</button>
                      <strong>${item.quantity}</strong>
                      <button type="button" data-quantity="${item.id}" data-amount="1">+</button>
                    </div>
                  </article>`
              )
              .join("")
          : `<p class="empty-cart">${t("cart.empty")}</p>`
      }
    </div>
    <div class="cart-footer">
      <form class="checkout-form" data-checkout-form>
        <div class="checkout-section">
          <p class="cart-section-title">${t("cart.deliverySection")}</p>
          <label>${t("cart.delivery")}
            <select name="delivery">
              <option value="decide">${t("cart.decide")}</option>
              <option value="pickup">${t("cart.pickup")}</option>
              <option value="shipping">${t("cart.shipping")}</option>
            </select>
          </label>
          <p class="builder-note">${t("cart.productionNote")}</p>
        </div>
        <div class="checkout-section checkout-details" data-checkout-details hidden>
          <p class="cart-section-title">${t("cart.customerSection")}</p>
          <label>${t("cart.name")}<input name="customerName" type="text" placeholder="${t("cart.name")}" autocomplete="name"></label>
          <div class="delivery-fields" data-delivery-fields>
            <div class="phone-row">
              <label>${t("cart.phonePrefix")}
                <select name="phonePrefix">
                  <option value="+381">+381 Srbija</option>
                  <option value="+86">+86 China</option>
                  <option value="+382">+382 Montenegro</option>
                  <option value="+387">+387 Bosnia</option>
                  <option value="+385">+385 Croatia</option>
                  <option value="+389">+389 North Macedonia</option>
                  <option value="+49">+49 Germany</option>
                  <option value="+43">+43 Austria</option>
                  <option value="+41">+41 Switzerland</option>
                  <option value="+39">+39 Italy</option>
                  <option value="+33">+33 France</option>
                  <option value="+44">+44 UK</option>
                  <option value="+1">+1 USA/Canada</option>
                  <option value="+7">+7 Russia</option>
                  <option value="+90">+90 Turkey</option>
                </select>
              </label>
              <label>${t("cart.phone")}<input name="phone" type="tel" inputmode="tel" placeholder="61 123 4567" autocomplete="tel"></label>
            </div>
            <label>${t("cart.cityPostal")}<input name="cityPostal" type="text" placeholder="Bor 19210" autocomplete="postal-code"></label>
            <label>${t("cart.address")}<textarea name="address" rows="3" placeholder="${t("cart.address")}" autocomplete="street-address"></textarea></label>
          </div>
          <label>${t("cart.note")}<textarea name="orderNote" rows="2" placeholder="${t("cart.note")}"></textarea></label>
          <p class="builder-note" data-pickup-note>${t("cart.pickupInfo")}</p>
          <p class="builder-note">${t("cart.requiredHint")}</p>
        </div>
        <div class="checkout-section" data-checkout-contact hidden>
          <p class="cart-section-title">${t("cart.contactSection")}</p>
          <label>${t("cart.contactApp")}
            <select name="contactApp">
              <option value="whatsapp">${t("cart.whatsapp")}</option>
              <option value="wechat" ${state.lang === "zh" ? "selected" : ""}>${t("cart.wechat")}</option>
            </select>
          </label>
        </div>
        <p class="coupon-status" data-checkout-error></p>
      </form>
      <div class="cart-total"><span>${t("cart.total")}</span><strong>${formatMoney(total)}</strong></div>
      <button class="button button-primary" type="button" data-whatsapp-checkout>${t("cart.checkout")}</button>
      <button class="button button-outline dark" type="button" data-clear-cart>${t("cart.clear")}</button>
    </div>`;
  syncCheckoutDeliveryFields();
}

function renderCartItemDetails(item) {
  const details = item.details || item.category || "";
  const parts = String(details)
    .split(/\s*[;|]\s*/g)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return `<p class="cart-short-detail">${details}</p>`;
  return `
    <details class="cart-item-details" open>
      <summary>${t("cart.itemDetails")}</summary>
      <ul>
        ${parts.map((part) => `<li>${part}</li>`).join("")}
      </ul>
    </details>`;
}

function renderAll() {
  renderTranslations();
  renderRate();
  renderProducts(document.querySelector("[data-product-grid]"));
  renderProducts(document.querySelector("[data-featured-products]"), 3);
  renderGallery();
  renderCart();
  updateCustomPreview(document.querySelector("[data-custom-form]"));
  renderWheelModal();
  applyPendingWheelCoupon();
  renderGiftAssistant();
}

function renderWheelModal() {
  document.querySelector("[data-wheel-modal]")?.remove();
  document.querySelector("[data-wheel-open]")?.remove();
  const prize = getWheelPrize();
  const used = prize?.used;
  const label = prize ? `${prize.percent}%` : "?";
  document.body.insertAdjacentHTML("beforeend", `
    <button class="wheel-fab" type="button" data-wheel-open aria-label="${t("wheel.open")}">${t("wheel.open")}</button>
    <section class="wheel-modal" data-wheel-modal hidden aria-live="polite">
      <div class="wheel-card">
        <button class="wheel-close" type="button" data-wheel-close aria-label="${t("wheel.close")}">×</button>
        <p class="eyebrow">${t("wheel.title")}</p>
        <h2>${t("wheel.won")}</h2>
        <p>${used ? t("wheel.used") : t("wheel.text")}</p>
        <div class="wheel-stage">
          <div class="wheel-pointer"></div>
          <div class="wheel-disc" data-wheel-disc>
            <span>8%</span><span>10%</span><span>12%</span><span>15%</span><span>20%</span><span>${label}</span>
          </div>
        </div>
        <div class="wheel-result" data-wheel-result>
          ${prize ? `<strong>${prize.code}</strong><span>${used ? t("wheel.used") : prize.label}</span>` : `<span>${t("wheel.text")}</span>`}
        </div>
        <div class="wheel-actions">
          <button class="button button-primary" type="button" data-wheel-spin ${prize ? "disabled" : ""}>${t("wheel.spin")}</button>
          <button class="button button-secondary" type="button" data-wheel-apply ${!prize || used ? "disabled" : ""}>${t("wheel.apply")}</button>
        </div>
      </div>
    </section>
  `);
  if (!prize && !sessionStorage.getItem("eterniorWheelSeen")) {
    sessionStorage.setItem("eterniorWheelSeen", "1");
    window.setTimeout(openWheel, 850);
  }
}

function openWheel() {
  const modal = document.querySelector("[data-wheel-modal]");
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("no-scroll");
}

function closeWheel() {
  const modal = document.querySelector("[data-wheel-modal]");
  if (!modal) return;
  modal.hidden = true;
  if (!document.querySelector("[data-cart-panel]")?.classList.contains("is-open")) {
    document.body.classList.remove("no-scroll");
  }
}

function spinWheel() {
  if (getWheelPrize()) return;
  const prize = pickWheelPrize();
  const savedPrize = {
    ...prize,
    code: createWheelCode(),
    createdAt: new Date().toISOString(),
    used: false,
  };
  const disc = document.querySelector("[data-wheel-disc]");
  disc?.classList.add("is-spinning");
  window.setTimeout(() => {
    saveWheelPrize(savedPrize);
    renderWheelModal();
    openWheel();
  }, 1350);
}

function pickWheelPrize() {
  const totalWeight = WHEEL_PRIZES.reduce((sum, prize) => sum + prize.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const prize of WHEEL_PRIZES) {
    roll -= prize.weight;
    if (roll <= 0) return prize;
  }
  return WHEEL_PRIZES[0];
}

function applyWheelCoupon() {
  const prize = getWheelPrize();
  if (!prize || prize.used) return;
  const input = document.querySelector('input[name="coupon"]');
  if (input) {
    input.value = prize.code;
    updateCustomPreview(document.querySelector("[data-custom-form]"));
    closeWheel();
    return;
  }
  sessionStorage.setItem("eterniorPendingCoupon", prize.code);
  window.location.href = "custom.html";
}

function applyPendingWheelCoupon() {
  const code = sessionStorage.getItem("eterniorPendingCoupon");
  const input = document.querySelector('input[name="coupon"]');
  if (!code || !input) return;
  input.value = code;
  sessionStorage.removeItem("eterniorPendingCoupon");
  updateCustomPreview(document.querySelector("[data-custom-form]"));
}

function discourageSourcePeek() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const sourceShortcut = (event.ctrlKey || event.metaKey) && ["u", "s"].includes(key);
    if (sourceShortcut || event.key === "F12") event.preventDefault();
  });
}

function renderGallery() {
  const track = document.querySelector("[data-gallery-track]");
  if (!track) return;
  const items = products.slice(0, 8).map(hydrateProduct);
  track.innerHTML = [...items, ...items]
    .map((product) => `
      <article class="gallery-item visual-${product.visual}">
        <span>${product.name}</span>
        <strong>${formatMoney(product.price)}</strong>
      </article>`)
    .join("");
}

function openCart() {
  document.querySelector("[data-cart-panel]").classList.add("is-open");
  document.querySelector("[data-overlay]").classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.querySelector("[data-cart-panel]").classList.remove("is-open");
  document.querySelector("[data-overlay]").classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function addToCart(item) {
  getCurrentOrderId();
  const existing = state.cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }
  saveState();
  renderCart();
  openCart();
}

function getReadyAddons(button, product) {
  const card = button.closest("[data-product-card]");
  const message = card?.querySelector("[data-ready-message]")?.value.trim() || "";
  const script = card?.querySelector("[data-ready-script]")?.value || "Latinica";
  const toy = card?.querySelector("[data-ready-toy]")?.value || "Bez igračke";
  const hasToy = !/^Bez|^No |^不要/.test(toy);
  const addonPrice = hasToy ? STORE.toyPrice : 0;
  const hasAddon = Boolean(message) || hasToy;
  const detailLabels = {
    sr: ["satenskih ruža", "boje", "pakovanje", "ručno pisana poruka", "bez personalizovane poruke", "dodatak", "bez igračke"],
    en: ["satin roses", "colors", "packaging", "handwritten message", "no personalized message", "addon", "no toy"],
    zh: ["朵缎面玫瑰", "颜色", "包装", "手写留言", "无个性化留言", "附加", "不要玩具"],
  }[state.lang] || ["satenskih ruža", "boje", "pakovanje", "ručno pisana poruka", "bez personalizovane poruke", "dodatak", "bez igračke"];
  const details = [
    state.lang === "zh" ? `${product.roses}${detailLabels[0]}` : `${product.roses} ${detailLabels[0]}`,
    `${detailLabels[1]}: ${product.palette}`,
    `${detailLabels[2]}: ${product.box}`,
    message ? `${detailLabels[3]} (${script}): ${message}` : detailLabels[4],
    hasToy ? `${detailLabels[5]}: ${toy}` : detailLabels[6],
  ];

  return {
    id: hasAddon ? `${product.id}-${Date.now()}` : product.id,
    price: product.price + addonPrice,
    details: details.join("; "),
    orderDetailsSr: [
      `${product.roses} satenskih ruža`,
      `boje: ${product.palette}`,
      `pakovanje: ${product.box}`,
      message ? `ručno pisana poruka (${srOption(script, "script")}): ${message}` : "bez personalizovane poruke",
      hasToy ? `dodatak: ${srOption(toy, "toy")}` : "bez igračke",
    ].join("; "),
  };
}

function updateReadyToyPreview(select) {
  const card = select?.closest("[data-product-card]");
  if (!card) return;
  const toy = card.querySelector(".pv-addon-toy");
  if (!toy) return;
  toy.hidden = isNoOption(select.value);
}

function updateQuantity(id, amount) {
  const item = state.cart.find((cartItem) => cartItem.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
  }
  if (!state.cart.length) resetOrderId();
  saveState();
  renderCart();
}

function getCustomPrice(form) {
  const data = new FormData(form);
  const memorial = data.get("memorial") === "on";
  const roseCount = normalizeRoseCount(data.get("roseCount"), memorial);

  const sweetsTotal = memorial
    ? 0
    : (Number(data.get("rafaello")) || 0) * sweetPrices.rafaello +
      (Number(data.get("ferrero")) || 0) * sweetPrices.ferrero +
      (Number(data.get("miniChocolate")) || 0) * sweetPrices.miniChocolate +
      (Number(data.get("bigChocolate")) || 0) * sweetPrices.bigChocolate;
  const toy = data.get("toy") || "Bez igračke";
  const toyTotal = memorial || /^Bez|^No |^不要/.test(toy) ? 0 : STORE.toyPrice;
  const decorationTotal = memorial ? 0 : getDecorationTotal(data);
  const arrangementFee = getArrangementFee(data.get("giftType"), roseCount, sweetsTotal, toyTotal, decorationTotal);
  const retailFromParts = roseCount === STORE.maxRoses
    ? STORE.special101Price + sweetsTotal + toyTotal + decorationTotal
    : roseCount * STORE.rosePrice + sweetsTotal + toyTotal + decorationTotal + arrangementFee;
  const coupon = getCouponDiscount(data.get("coupon"));
  const priceBeforeDiscount = roundPrice(retailFromParts);
  const minimumAfterDiscount = roseCount === STORE.maxRoses ? retailFromParts : retailFromParts * 0.75;
  return applySingleCouponDiscount(priceBeforeDiscount, coupon, minimumAfterDiscount);
}

function normalizeRoseCount(value, memorial) {
  let roseCount = Math.round(Number(value) || 1);
  roseCount = Math.max(1, Math.min(STORE.maxRoses, roseCount));
  if (memorial) {
    roseCount = Math.min(roseCount, STORE.memorialMaxRoses);
    if (roseCount % 2 !== 0) roseCount += roseCount >= STORE.memorialMaxRoses ? -1 : 1;
    return Math.max(2, roseCount);
  }
  if (roseCount % 2 === 0) roseCount += roseCount >= STORE.maxRoses ? -1 : 1;
  return Math.max(1, Math.min(STORE.maxRoses, roseCount));
}

function getArrangementFee(giftType, roseCount, sweetsTotal, toyTotal, decorationTotal) {
  if (roseCount === STORE.maxRoses) return 0;
  const needsBox = /kutija|box|礼盒/i.test(String(giftType)) || sweetsTotal || toyTotal;
  let fee = needsBox ? 750 : 420;
  if (roseCount >= 51) fee += 4200;
  else if (roseCount >= 33) fee += 3000;
  else if (roseCount >= 19) fee += 1900;
  else if (roseCount >= 11) fee += 1100;
  else if (roseCount >= 7) fee += 650;
  else fee += 250;
  if (sweetsTotal) fee += 300;
  if (toyTotal) fee += 120;
  if (decorationTotal) fee += 220;
  return fee;
}

function applySingleCouponDiscount(price, coupon, minimumAfterDiscount = STORE.minGiftBudget) {
  const percent = Math.max(0, Math.min(Number(coupon.percent) || 0, 50));
  const discounted = roundPrice(price * (1 - percent / 100));
  return Math.max(roundPrice(minimumAfterDiscount), discounted);
}

function roundPrice(value) {
  const number = Math.max(0, Number(value) || 0);
  if (number < 1000) return Math.ceil(number / 50) * 50;
  return Math.ceil(number / 100) * 100;
}

function getDecorationTotal(data) {
  const glitter = data.get("glitter");
  const jewelry = data.get("jewelry");
  const ribbonText = String(data.get("ribbonText") || "").trim();
  const multicolor = data.get("multicolorPetals") === "yes";
  const photoCount = Number(data.get("photoCount")) || 0;
  let total = 0;
  if (glitter === "accent") total += ADDON_PRICES.glitterAccent;
  if (glitter === "full") total += ADDON_PRICES.glitterFull;
  if (jewelry === "zircon") total += ADDON_PRICES.jewelryZircon;
  if (jewelry === "butterfly") total += ADDON_PRICES.jewelryButterfly;
  if (jewelry === "gold-crown" || jewelry === "silver-crown") total += ADDON_PRICES.jewelryCrown;
  if (ribbonText) total += ADDON_PRICES.ribbonText;
  if (multicolor) total += ADDON_PRICES.multicolorPetals;
  if (photoCount) total += photoCount * ADDON_PRICES.photo;
  return total;
}

function getPackagingCost(giftType, roseCount, sweetsTotal, toyTotal) {
  const needsBox = /kutija|box|礼盒/i.test(String(giftType)) || sweetsTotal || toyTotal;
  if (!needsBox) return STORE.bouquetWrapCost;
  if (roseCount >= 19 || sweetsTotal > 1600) return STORE.boxLargeCost;
  if (roseCount >= 11 || sweetsTotal > 700 || toyTotal) return STORE.boxMediumCost;
  return STORE.boxSmallCost;
}

function createWheelCode() {
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timePart = Date.now().toString(36).slice(-4).toUpperCase();
  return `ETR-${randomPart}-${timePart}`;
}

function saveWheelPrize(prize) {
  state.wheelPrize = prize;
  localStorage.setItem("eterniorWheelPrize", JSON.stringify(prize));
}

function getWheelPrize() {
  return state.wheelPrize || readStoredJson("eterniorWheelPrize", null);
}

function getActiveWheelCoupon(code) {
  const prize = getWheelPrize();
  if (!prize || prize.used) return null;
  if (String(prize.code || "").toUpperCase() !== String(code || "").toUpperCase()) return null;
  return {
    code: prize.code,
    percent: prize.percent,
    label: prize.label,
    isWheel: true,
  };
}

function markWheelCouponUsed(code) {
  const prize = getWheelPrize();
  if (!prize || String(prize.code || "").toUpperCase() !== String(code || "").toUpperCase()) return;
  saveWheelPrize({ ...prize, used: true, usedAt: new Date().toISOString() });
}

function getCouponDiscount(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) return { code: normalized, percent: 0, label: "" };
  const wheelCoupon = getActiveWheelCoupon(normalized);
  if (wheelCoupon) return wheelCoupon;
  if (!COUPONS[normalized]) return { code: normalized, percent: 0, label: "" };
  return { code: normalized, ...COUPONS[normalized] };
}

function srOption(value, key) {
  const srValues = selectOptions.sr[key] || [];
  for (const lang of Object.keys(selectOptions)) {
    const values = selectOptions[lang][key] || [];
    const index = values.indexOf(value);
    if (index >= 0) return srValues[index] || value;
  }
  return value || "";
}

function describeGlitterSr(value) {
  return { none: "bez glittera", accent: "glitter detalji preko ruža", full: "full glitter rose" }[value] || "bez glittera";
}

function describeJewelrySr(value) {
  return {
    none: "bez nakita",
    zircon: "cirkoni",
    butterfly: "leptirići",
    "gold-crown": "zlatna krunica",
    "silver-crown": "srebrna krunica",
  }[value] || "bez nakita";
}

function getPaletteColor(value) {
  const sr = getColorSr(value);
  return rosePalette.find((color) => color.sr === sr || color.en === value || color.zh === value) || rosePalette[2] || rosePalette[0];
}

function isNoOption(value) {
  return /^Bez|^No |^不|^ä¸/i.test(String(value || ""));
}

function getPreviewLabels() {
  return ({
    sr: {
      roses: "ruža",
      type: "Tip",
      color: "Boja",
      sweets: "slatkiši",
      toy: "igračka",
      glitter: "glitter",
      jewelry: "dekor",
      photos: "slike",
      ribbon: "traka",
      memorial: "memorijalni aranžman",
      estimate: "Procena",
    },
    en: {
      roses: "roses",
      type: "Type",
      color: "Color",
      sweets: "sweets",
      toy: "toy",
      glitter: "glitter",
      jewelry: "decor",
      photos: "photos",
      ribbon: "ribbon",
      memorial: "memorial arrangement",
      estimate: "Estimate",
    },
    zh: {
      roses: "朵玫瑰",
      type: "类型",
      color: "颜色",
      sweets: "甜品",
      toy: "玩具",
      glitter: "闪粉",
      jewelry: "装饰",
      photos: "照片",
      ribbon: "丝带",
      memorial: "纪念花束",
      estimate: "预估",
    },
  })[state.lang] || ({
    roses: "ruža",
    type: "Tip",
    color: "Boja",
    sweets: "slatkiši",
    toy: "igračka",
    glitter: "glitter",
    jewelry: "dekor",
    photos: "slike",
    ribbon: "traka",
    memorial: "memorijalni aranžman",
    estimate: "Procena",
  });
}

function renderCustomLivePreview(form, total) {
  const visual = document.querySelector("[data-custom-preview]");
  const summary = document.querySelector("[data-custom-preview-summary]");
  if (!form || !visual) return;

  const data = new FormData(form);
  const labels = getPreviewLabels();
  const memorial = data.get("memorial") === "on";
  const roseCount = normalizeRoseCount(form.querySelector('input[name="roseCount"]')?.value, memorial);
  const colorItem = getPaletteColor(data.get("roseColor"));
  const giftType = String(data.get("giftType") || "");
  const rafaello = Number(data.get("rafaello")) || 0;
  const ferrero = Number(data.get("ferrero")) || 0;
  const miniChocolate = Number(data.get("miniChocolate")) || 0;
  const bigChocolate = Number(data.get("bigChocolate")) || 0;
  const sweetsTotalCount = memorial ? 0 : rafaello + ferrero + miniChocolate + bigChocolate;
  const hasToy = !memorial && !isNoOption(data.get("toy"));
  const hasBox = !memorial && (/kutija|box|礼盒|ç¤¼ç›’/i.test(giftType) || sweetsTotalCount || hasToy);
  const glitter = !memorial ? data.get("glitter") : "none";
  const jewelry = !memorial ? data.get("jewelry") : "none";
  const ribbonText = !memorial ? String(data.get("ribbonText") || "").trim() : "";
  const photoCount = !memorial ? Number(data.get("photoCount")) || 0 : 0;
  const multi = !memorial && data.get("multicolorPetals") === "yes";
  const rosePreviewCount = Math.min(11, Math.max(5, Math.round(roseCount / 3)));
  const renderedSweets = [
    ...Array.from({ length: Math.min(3, Math.ceil(rafaello / 3)) }, () => '<span class="preview-sweet raffaello"></span>'),
    ...Array.from({ length: Math.min(3, Math.ceil(ferrero / 3)) }, () => '<span class="preview-sweet ferrero"></span>'),
    ...Array.from({ length: Math.min(2, Math.ceil(miniChocolate / 4)) }, () => '<span class="preview-sweet mini-bar"></span>'),
    ...Array.from({ length: Math.min(1, bigChocolate) }, () => '<span class="preview-sweet big-bar"></span>'),
  ].join("");
  const className = [
    "live-arrangement",
    hasBox ? "is-box" : "is-bouquet",
    memorial ? "is-memorial" : "",
    glitter === "accent" || glitter === "full" ? "has-glitter" : "",
    glitter === "full" ? "has-full-glitter" : "",
    jewelry !== "none" ? "has-jewelry" : "",
    multi ? "has-multicolor" : "",
  ].filter(Boolean).join(" ");

  visual.innerHTML = `
    <div class="${className}" style="--rose-a:${colorItem.color};--rose-b:${multi ? "#fff2d4" : colorItem.color};--rose-c:${multi ? "#e95588" : "#c69a45"}">
      <span class="preview-shadow"></span>
      ${hasBox ? '<span class="preview-box-lid"></span><span class="preview-box"></span>' : '<span class="preview-wrap"></span>'}
      <span class="preview-stems"></span>
      <span class="preview-roses">${roseMarkup(rosePreviewCount, "preview-rose")}</span>
      ${sweetsTotalCount ? `<span class="preview-sweets">${renderedSweets}</span>` : ""}
      ${hasToy ? '<span class="preview-toy"><i></i></span>' : ""}
      ${photoCount ? Array.from({ length: Math.min(photoCount, 3) }, (_, index) => `<span class="preview-photo preview-photo-${index + 1}"></span>`).join("") : ""}
      ${jewelry !== "none" ? '<span class="preview-jewels"></span>' : ""}
      ${ribbonText ? `<span class="preview-ribbon">${escapeHtml(ribbonText.slice(0, 18))}</span>` : ""}
    </div>`;

  if (summary) {
    const chips = [
      `${roseCount} ${labels.roses}`,
      `${labels.color}: ${colorItem[state.lang] || colorItem.sr}`,
      memorial ? labels.memorial : "",
      sweetsTotalCount ? `${sweetsTotalCount} ${labels.sweets}` : "",
      hasToy ? labels.toy : "",
      glitter !== "none" ? labels.glitter : "",
      jewelry !== "none" ? labels.jewelry : "",
      photoCount ? `${photoCount} ${labels.photos}` : "",
      ribbonText ? labels.ribbon : "",
    ].filter(Boolean);
    summary.innerHTML = `
      <p><strong>${labels.type}:</strong> ${escapeHtml(giftType || "-")}</p>
      <div>${chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("")}</div>
      <p><strong>${labels.estimate}:</strong> ${formatMoney(total || getCustomPrice(form))}</p>`;
  }
}

function updateCustomPreview(form) {
  if (!form) return;
  const data = new FormData(form);
  const roseInput = form.querySelector('input[name="roseCount"]');
  const memorial = data.get("memorial") === "on";
  const roseCount = normalizeRoseCount(roseInput.value, memorial);
  roseInput.value = roseCount;
  roseInput.max = memorial ? STORE.memorialMaxRoses : STORE.maxRoses;
  roseInput.step = memorial ? "2" : "2";
  if (memorial) {
    const giftType = form.querySelector('select[name="giftType"]');
    if (giftType) giftType.selectedIndex = 0;
  }

  form.querySelectorAll("[data-non-memorial]").forEach((node) => {
    node.hidden = memorial;
    node.querySelectorAll("input, select, textarea").forEach((field) => {
      field.disabled = memorial;
      if (memorial && field.type === "number") field.value = 0;
      if (memorial && field.tagName === "TEXTAREA") field.value = "";
    });
  });

  const total = getCustomPrice(form);
  const totalNode = document.querySelector("[data-custom-total]");
  if (totalNode) totalNode.textContent = formatMoney(total);
  const coupon = getCouponDiscount(data.get("coupon"));
  const couponNode = document.querySelector("[data-coupon-status]");
  if (couponNode) {
    const hasCode = String(data.get("coupon") || "").trim();
    couponNode.textContent = coupon.percent
      ? `${t("custom.discount")}: ${coupon.label} (${coupon.code})`
      : hasCode
        ? t("custom.invalidCoupon")
        : "";
  }

  const notes = form.querySelector('textarea[name="notes"]');
  const counter = document.querySelector("[data-message-counter]");
  if (notes && counter) counter.textContent = `${notes.value.length} / 200 karaktera`;
  renderCustomLivePreview(form, total);
}

function buildWhatsAppMessage() {
  const form = document.querySelector("[data-checkout-form]");
  const formData = form ? new FormData(form) : new FormData();
  const contactApp = formData.get("contactApp") === "wechat" ? "WeChat" : "WhatsApp";
  const delivery = normalizeDeliverySr(formData.get("delivery"));
  const orderNote = String(formData.get("orderNote") || "").trim();
  const phone = normalizePhone(formData.get("phonePrefix"), formData.get("phone"));
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = getCurrentOrderId();
  const lines = [
    `Zdravo ${STORE.name}, želim da poručim:`,
    `Šifra upita: ${orderId}`,
    "",
    ...state.cart.map((item, index) => `${index + 1}. ${item.orderNameSr || item.name} x ${item.quantity} - ${formatMoney(item.price * item.quantity)}${item.orderDetailsSr || item.details ? ` | ${item.orderDetailsSr || item.details}` : ""}`),
    "",
    `Ukupno približno: ${formatMoney(total)}`,
    `Valuta na sajtu: ${state.currency}`,
    `Okvirni rok izrade i isporuke: ${STORE.productionTimeSr}`,
    `Kupac želi komunikaciju preko: ${contactApp}${contactApp === "WeChat" ? ` (${STORE.wechatId})` : ""}`,
    `Ime: ${formData.get("customerName") || "Nije uneto"}`,
    `Dostava/preuzimanje: ${delivery}`,
    ...(delivery === "Dostava"
      ? [
          `Telefon: ${phone || "Nije uneto"}`,
          `Grad i poštanski broj: ${formData.get("cityPostal") || "Nije uneto"}`,
          `Adresa: ${formData.get("address") || "Nije uneto"}`,
          `Okvirna dostava: oko ${STORE.estimatedDelivery} RSD, zavisi od kurirske službe`,
        ]
      : delivery === "Lično preuzimanje"
        ? ["Mesto preuzimanja: Bor, 19210, Srbija"]
        : []),
    ...(orderNote ? [`Napomena kupca: ${orderNote}`] : []),
    "",
    "Molim vas da potvrdite dostupnost, konačnu cenu, rok izrade/isporuke i način plaćanja.",
  ];
  return lines.join("\n");
}

function getCheckoutReviewData() {
  const form = document.querySelector("[data-checkout-form]");
  const data = form ? new FormData(form) : new FormData();
  const delivery = normalizeDeliverySr(data.get("delivery"));
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    orderId: getCurrentOrderId(),
    delivery,
    total,
    contactApp: data.get("contactApp") === "wechat" ? "WeChat" : "WhatsApp",
    customerName: String(data.get("customerName") || "").trim(),
    items: state.cart.map((item) => ({
      name: item.orderNameSr || item.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
    })),
  };
}

function openCheckoutReview(message, contactApp) {
  closeCheckoutReview();
  const review = getCheckoutReviewData();
  state.pendingCheckout = { message, contactApp };
  document.body.insertAdjacentHTML("beforeend", `
    <section class="checkout-review" data-checkout-review aria-live="polite">
      <div class="checkout-review-card">
        <button class="wheel-close" type="button" data-close-checkout-review aria-label="${t("cart.reviewEdit")}">×</button>
        <p class="eyebrow">${t("cart.orderId")}: ${review.orderId}</p>
        <h2>${t("cart.reviewTitle")}</h2>
        <p>${t("cart.reviewText")}</p>
        <div class="review-lines">
          <div><span>${t("cart.name")}</span><strong>${review.customerName || "-"}</strong></div>
          <div><span>${t("cart.delivery")}</span><strong>${review.delivery}</strong></div>
          <div><span>${t("cart.contactApp")}</span><strong>${review.contactApp}</strong></div>
          <div><span>${t("cart.reviewTime")}</span><strong>${STORE.productionTimeSr}</strong></div>
        </div>
        <div class="review-items">
          <p class="cart-section-title">${t("cart.reviewItems")}</p>
          ${review.items.map((item) => `
            <div>
              <span>${item.name} x ${item.quantity}</span>
              <strong>${formatMoney(item.price)}</strong>
            </div>
          `).join("")}
        </div>
        <div class="cart-total"><span>${t("cart.total")}</span><strong>${formatMoney(review.total)}</strong></div>
        <div class="review-actions">
          <button class="button button-primary" type="button" data-confirm-checkout>${t("cart.reviewConfirm")}</button>
          <button class="button button-secondary" type="button" data-close-checkout-review>${t("cart.reviewEdit")}</button>
        </div>
      </div>
    </section>
  `);
  document.body.classList.add("no-scroll");
}

function closeCheckoutReview() {
  document.querySelector("[data-checkout-review]")?.remove();
  if (!document.querySelector("[data-cart-panel]")?.classList.contains("is-open") && !document.querySelector("[data-wheel-modal]:not([hidden])")) {
    document.body.classList.remove("no-scroll");
  }
}

function confirmCheckout() {
  if (!state.pendingCheckout) return;
  const { message, contactApp } = state.pendingCheckout;
  closeCheckoutReview();
  state.pendingCheckout = null;
  if (contactApp === "wechat") {
    openWeChatOrder(message);
    return;
  }
  openWhatsAppOrder(message);
}

function normalizeDeliverySr(value) {
  const text = String(value || "");
  if (text === "pickup") return "Lično preuzimanje";
  if (text === "shipping") return "Dostava";
  if (text === "decide") return "Dogovor preko WhatsApp-a";
  if ([copy.sr["cart.pickup"], copy.en["cart.pickup"], copy.zh["cart.pickup"]].includes(text)) return "Lično preuzimanje";
  if ([copy.sr["cart.decide"], copy.en["cart.decide"], copy.zh["cart.decide"]].includes(text)) return "Dogovor preko WhatsApp-a";
  return "Dostava";
}

function normalizePhone(prefix, rawPhone) {
  const code = String(prefix || "+381").replace(/[^\d+]/g, "") || "+381";
  let local = String(rawPhone || "").replace(/[^\d]/g, "");
  if (local.startsWith("00")) local = local.slice(2);
  const codeDigits = code.replace(/\D/g, "");
  if (local.startsWith(codeDigits)) local = local.slice(codeDigits.length);
  if (code === "+381" && local.startsWith("0")) local = local.slice(1);
  return `${code}${local}`;
}

function isValidPhone(prefix, rawPhone) {
  const code = String(prefix || "+381");
  const local = String(rawPhone || "").replace(/[^\d]/g, "");
  const normalized = normalizePhone(code, rawPhone);
  const digits = normalized.replace(/\D/g, "");
  if (code === "+381" && /^0/.test(local)) return false;
  if (code === "+381") return /^3816\d{7,8}$/.test(digits);
  return digits.length >= 8 && digits.length <= 15;
}

function syncCheckoutDeliveryFields() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;
  const delivery = normalizeDeliverySr(form.querySelector('select[name="delivery"]')?.value);
  const isShipping = delivery === "Dostava";
  const isPickup = delivery === "Lično preuzimanje";
  const hasDeliveryChoice = isShipping || isPickup;
  const fields = form.querySelector("[data-delivery-fields]");
  const details = form.querySelector("[data-checkout-details]");
  const contact = form.querySelector("[data-checkout-contact]");
  const pickupNote = form.querySelector("[data-pickup-note]");
  [details, contact].forEach((section) => {
    if (!section) return;
    section.hidden = !hasDeliveryChoice;
    section.querySelectorAll("input, select, textarea").forEach((field) => {
      field.disabled = !hasDeliveryChoice;
      field.required = false;
      if (!hasDeliveryChoice && field.tagName !== "SELECT") field.value = "";
    });
  });
  if (fields) {
    fields.hidden = !isShipping;
    fields.querySelectorAll("input, textarea").forEach((field) => {
      field.disabled = !isShipping;
      field.required = isShipping;
      if (!isShipping) field.value = "";
    });
  }
  if (pickupNote) pickupNote.hidden = !isPickup;
}

function validateCheckout() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return true;
  syncCheckoutDeliveryFields();
  const data = new FormData(form);
  const delivery = normalizeDeliverySr(data.get("delivery"));
  const deliveryChoice = data.get("delivery");
  const deliveryChosen = deliveryChoice === "shipping" || deliveryChoice === "pickup";
  const required = ["customerName"];
  if (delivery === "Dostava") required.push("phone", "cityPostal", "address");
  const missing = required.filter((name) => !String(data.get(name) || "").trim());
  const error = form.querySelector("[data-checkout-error]");
  form.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
  if (!deliveryChosen) {
    const deliverySelect = form.elements.delivery;
    if (deliverySelect) {
      deliverySelect.classList.add("is-invalid");
      deliverySelect.focus();
      deliverySelect.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (error) error.textContent = t("cart.deliveryChoiceRequired");
    return false;
  }
  if (delivery === "Dostava" && !missing.includes("phone") && !isValidPhone(data.get("phonePrefix"), data.get("phone"))) {
    const phone = form.elements.phone;
    if (phone) {
      phone.classList.add("is-invalid");
      phone.focus();
      phone.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (error) error.textContent = t("cart.phoneInvalid");
    return false;
  }
  if (missing.length) {
    const first = form.elements[missing[0]];
    if (first) {
      first.classList.add("is-invalid");
      first.focus();
      first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (error) error.textContent = delivery === "Dostava" ? t("cart.deliveryRequired") : t("cart.nameRequired");
    return false;
  }
  if (error) error.textContent = "";
  return true;
}

function openWhatsAppOrder(message) {
  const url = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, "_blank");
  if (!opened) window.location.href = url;
}

function openWeChatOrder(message) {
  const notice = t("cart.wechatCopied").replace("{id}", STORE.wechatId);
  const copyOrder = navigator.clipboard?.writeText ? navigator.clipboard.writeText(message) : Promise.reject();
  copyOrder.then(() => {
    alert(notice);
  }).catch(() => {
    window.prompt(notice, message);
  });
  setTimeout(() => {
    window.location.href = "weixin://";
  }, 250);
}

function checkout() {
  if (!state.cart.length) {
    openCart();
    return;
  }
  if (!validateCheckout()) return;
  const form = document.querySelector("[data-checkout-form]");
  const contactApp = form ? new FormData(form).get("contactApp") : "whatsapp";
  const message = buildWhatsAppMessage();
  openCheckoutReview(message, contactApp);
}

function handleCustom(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const price = getCustomPrice(event.currentTarget);
  const memorial = data.get("memorial") === "on";
  const roseCount = normalizeRoseCount(data.get("roseCount"), memorial);
  const coupon = getCouponDiscount(data.get("coupon"));
  const roseLine = roseCount === STORE.maxRoses
    ? `${roseCount} ruža - poseban veliki aranžman ${STORE.special101Price} RSD pre dodataka`
    : `${roseCount} ruža x ${STORE.rosePrice} RSD`;
  const colorLine = `boja/paleta: ${getColorSr(data.get("roseColor"))} (nijansa može blago odstupati uživo)`;
  const photoCount = Number(data.get("photoCount")) || 0;
  const decorationLine = memorial
    ? ""
    : `glitter: ${describeGlitterSr(data.get("glitter"))}; nakit: ${describeJewelrySr(data.get("jewelry"))}; višebojne latice: ${data.get("multicolorPetals") === "yes" ? "da" : "ne"}; traka sa natpisom: ${data.get("ribbonText") || "ne"}; slike u aranžmanu: ${photoCount ? `${photoCount} (kupac šalje slike naknadno, uklapanje po dogovoru)` : "ne"}`;
  const customDetails = memorial
    ? `za preminulu osobu; ${roseLine}; ${colorLine}; bez slatkiša, igračke i poruke; pakovanje dostojanstveno i jednostavno`
    : `poklon aranžman, neparan broj; ${roseLine}; ${colorLine}; Raffaello: ${data.get("rafaello") || 0} x ${sweetPrices.rafaello} RSD; Ferrero: ${data.get("ferrero") || 0} x ${sweetPrices.ferrero} RSD; male čokoladice: ${data.get("miniChocolate") || 0} x ${sweetPrices.miniChocolate} RSD; velike čokolade: ${data.get("bigChocolate") || 0} x ${sweetPrices.bigChocolate} RSD; igračka: ${srOption(data.get("toy"), "toy")} (${srOption(data.get("toyColor"), "toyColors")}) ${/^Bez|^No |^不要/.test(data.get("toy") || "") ? "" : `+ ${STORE.toyPrice} RSD`}; ${decorationLine}; poruka (${srOption(data.get("script"), "script")}): ${data.get("notes") || "bez poruke"}; kupon: ${coupon.percent ? `${coupon.code} - ${coupon.label}, primenjen jednom na ukupnu cenu` : "bez kupona"}`;
  addToCart({
    id: `custom-${Date.now()}`,
    name: data.get("giftType"),
    orderNameSr: srOption(data.get("giftType"), "giftType"),
    category: "Personalizovana porudžbina",
    price,
    details: customDetails,
    orderDetailsSr: customDetails,
  });
  if (coupon.isWheel) markWheelCouponUsed(coupon.code);
  event.currentTarget.reset();
  updateCustomPreview(event.currentTarget);
}

function handleConcierge(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const budget = Math.max(Number(data.get("budget")) || 0, STORE.minGiftBudget);
  const occasion = data.get("occasion");
  const style = data.get("style");
  const suggestion = buildConciergeSuggestion(budget, occasion, style);
  state.latestSuggestion = suggestion;
  const target = document.querySelector("[data-suggestion]");
  target.classList.add("is-visible");
  target.innerHTML = `
    <h3>${t("suggestionTitle")}</h3>
    <p>${suggestion.name}. ${occasion} / ${style}. ${formatMoney(suggestion.price)}</p>
    <ul>
      ${suggestion.details.map((detail) => `<li>${detail}</li>`).join("")}
    </ul>
    <button class="button button-primary" type="button" data-add-suggestion="latest">${t("suggestionAdd")}</button>`;
}

function buildConciergeSuggestion(budget, occasion, style) {
  const luxury = /luks|lux|奢/.test(String(style).toLowerCase()) || budget >= 8500;
  const playful = /ves|bright|color|彩/.test(String(style).toLowerCase());
  const minimal = /minim|简/.test(String(style).toLowerCase());
  const romantic = /romanti|romantic|浪漫|godi|anniversary|周年/.test(`${occasion} ${style}`.toLowerCase());

  let roses = budget >= 12000 ? 25 : budget >= 8500 ? 19 : budget >= 6000 ? 15 : budget >= 4000 ? 11 : 7;
  if (roses % 2 === 0) roses += 1;

  const allSuggestionLabels = {
    sr: {
      palettes: {
        luxury: "crvena, crna i zlatna",
        romantic: "crvena, šampanj i ivory",
        playful: "pastelno roze, žuta i plava",
        minimal: "ivory, bela i šampanj",
        elegant: "nežno roze, ivory i zlato",
      },
      premiumBox: "premium kutija sa satenskom mašnom",
      simpleBox: "elegantno pakovanje sa trakom",
      sweetsHigh: "Ferrero Rocher + Raffaello + male čokoladice",
      sweetsMid: "Raffaello i male čokoladice",
      sweetsLow: "nekoliko Raffaello kuglica",
      sweetsNone: "bez slatkiša, fokus na ružama",
      toy: "mali medvedić u boji aranžmana",
      noToy: "bez igračke",
      messageRomantic: "kratka ručno pisana poruka u latinici",
      messageOptional: "opciona kratka ručno pisana poruka",
      roses: "satenskih ruža",
      colors: "boje",
      packaging: "pakovanje",
      sweets: "slatkiši",
      toyLabel: "igračka",
      message: "poruka",
      names: ["Eternior luksuzni predlog", "Eternior veseli predlog", "Eternior minimalistički predlog", "Eternior elegantni predlog"],
    },
    en: {
      palettes: {
        luxury: "red, black and gold",
        romantic: "red, champagne and ivory",
        playful: "pastel pink, yellow and blue",
        minimal: "ivory, white and champagne",
        elegant: "soft pink, ivory and gold",
      },
      premiumBox: "premium box with satin bow",
      simpleBox: "elegant wrapping with ribbon",
      sweetsHigh: "Ferrero Rocher + Raffaello + mini chocolates",
      sweetsMid: "Raffaello and mini chocolates",
      sweetsLow: "a few Raffaello pieces",
      sweetsNone: "no sweets, focus on roses",
      toy: "small teddy bear matching the arrangement",
      noToy: "no toy",
      messageRomantic: "short handwritten message in Latin script",
      messageOptional: "optional short handwritten message",
      roses: "satin roses",
      colors: "colors",
      packaging: "packaging",
      sweets: "sweets",
      toyLabel: "toy",
      message: "message",
      names: ["Eternior luxury suggestion", "Eternior playful suggestion", "Eternior minimal suggestion", "Eternior elegant suggestion"],
    },
    zh: {
      palettes: {
        luxury: "红色、黑色和金色",
        romantic: "红色、香槟色和象牙白",
        playful: "浅粉、黄色和蓝色",
        minimal: "象牙白、白色和香槟色",
        elegant: "浅粉、象牙白和金色",
      },
      premiumBox: "带缎带蝴蝶结的高级礼盒",
      simpleBox: "带丝带的优雅包装",
      sweetsHigh: "Ferrero Rocher + Raffaello + 小巧克力",
      sweetsMid: "Raffaello 和小巧克力",
      sweetsLow: "几颗 Raffaello",
      sweetsNone: "不加甜品，重点是玫瑰",
      toy: "与配色相配的小熊",
      noToy: "不要玩具",
      messageRomantic: "拉丁字母短手写留言",
      messageOptional: "可选短手写留言",
      roses: "朵缎面玫瑰",
      colors: "颜色",
      packaging: "包装",
      sweets: "甜品",
      toyLabel: "玩具",
      message: "留言",
      names: ["Eternior 奢华推荐", "Eternior 活泼推荐", "Eternior 简约推荐", "Eternior 优雅推荐"],
    },
  };
  const labels = allSuggestionLabels[state.lang] || allSuggestionLabels.sr;
  const palette = luxury ? labels.palettes.luxury : romantic ? labels.palettes.romantic : playful ? labels.palettes.playful : minimal ? labels.palettes.minimal : labels.palettes.elegant;
  const box = budget >= 6500 ? labels.premiumBox : labels.simpleBox;
  const sweets = budget >= 9000 ? labels.sweetsHigh : budget >= 5500 ? labels.sweetsMid : budget >= 3500 ? labels.sweetsLow : labels.sweetsNone;
  const toy = budget >= 7000 && !minimal ? labels.toy : labels.noToy;
  const message = romantic ? labels.messageRomantic : labels.messageOptional;
  const name = luxury ? labels.names[0] : playful ? labels.names[1] : minimal ? labels.names[2] : labels.names[3];

  return {
    name,
    nameSr: luxury ? allSuggestionLabels.sr.names[0] : playful ? allSuggestionLabels.sr.names[1] : minimal ? allSuggestionLabels.sr.names[2] : allSuggestionLabels.sr.names[3],
    price: budget,
    details: [
      state.lang === "zh" ? `${roses}${labels.roses}` : `${roses} ${labels.roses}`,
      `${labels.colors}: ${palette}`,
      `${labels.packaging}: ${box}`,
      `${labels.sweets}: ${sweets}`,
      `${labels.toyLabel}: ${toy}`,
      `${labels.message}: ${message}`,
    ],
    detailsSr: [
      `${roses} ${allSuggestionLabels.sr.roses}`,
      `${allSuggestionLabels.sr.colors}: ${luxury ? allSuggestionLabels.sr.palettes.luxury : romantic ? allSuggestionLabels.sr.palettes.romantic : playful ? allSuggestionLabels.sr.palettes.playful : minimal ? allSuggestionLabels.sr.palettes.minimal : allSuggestionLabels.sr.palettes.elegant}`,
      `${allSuggestionLabels.sr.packaging}: ${budget >= 6500 ? allSuggestionLabels.sr.premiumBox : allSuggestionLabels.sr.simpleBox}`,
      `${allSuggestionLabels.sr.sweets}: ${budget >= 9000 ? allSuggestionLabels.sr.sweetsHigh : budget >= 5500 ? allSuggestionLabels.sr.sweetsMid : budget >= 3500 ? allSuggestionLabels.sr.sweetsLow : allSuggestionLabels.sr.sweetsNone}`,
      `${allSuggestionLabels.sr.toyLabel}: ${budget >= 7000 && !minimal ? allSuggestionLabels.sr.toy : allSuggestionLabels.sr.noToy}`,
      `${allSuggestionLabels.sr.message}: ${romantic ? allSuggestionLabels.sr.messageRomantic : allSuggestionLabels.sr.messageOptional}`,
    ],
  };
}

function getAssistantCopy() {
  const packs = {
    sr: {
      intro: "Zdravo, ja sam Eternior asistent. Odgovori na par brzih pitanja i predložiću poklon koji ima smisla za budžet, priliku i stil.",
      budget: "Koji budžet planiraš?",
      occasion: "Za koju priliku biraš poklon?",
      style: "Kakav utisak želiš da ostavi poklon?",
      extras: "Da li želiš dodatke uz ruže?",
      result: "Moj predlog",
      resultText: "Ovo je okviran predlog. Pre izrade se sve potvrđuje u poruci, uključujući dostupne nijanse, slatkiše i rok.",
      added: "Predlog je dodat u korpu. Možeš odmah poslati upit ili još nešto izmeniti.",
      budgets: [["3500", "Do 3.500 RSD"], ["6000", "Oko 6.000 RSD"], ["9000", "Oko 9.000 RSD"], ["14000", "Premium 14.000+ RSD"]],
      occasions: [["Rođendan", "Rođendan"], ["Godišnjica", "Godišnjica"], ["Romantičan poklon", "Romantično"], ["Zahvalnost", "Zahvalnost"], ["Izvinjenje", "Izvinjenje"]],
      styles: [["Elegantno i nežno", "Nežno"], ["Luksuzno i dramatično", "Luksuzno"], ["Minimalno i moderno", "Minimalno"], ["Veselo i šareno", "Šareno"]],
      extrasOptions: [["sweets", "Sa slatkišima"], ["toy", "Sa igračkom"], ["clean", "Samo ruže"], ["surprise", "Iznenadi me"]],
    },
    en: {
      intro: "Hi, I am the Eternior assistant. Answer a few quick questions and I will suggest a gift that fits your budget, occasion and style.",
      budget: "What budget are you planning?",
      occasion: "What is the occasion?",
      style: "What feeling should the gift have?",
      extras: "Would you like extras with the roses?",
      result: "My suggestion",
      resultText: "This is an estimate. Before making it, everything is confirmed in chat, including shades, sweets and timing.",
      added: "The suggestion has been added to your cart. You can send the inquiry now or adjust more.",
      budgets: [["3500", "Up to 3,500 RSD"], ["6000", "Around 6,000 RSD"], ["9000", "Around 9,000 RSD"], ["14000", "Premium 14,000+ RSD"]],
      occasions: [["Birthday", "Birthday"], ["Anniversary", "Anniversary"], ["Romantic gift", "Romantic"], ["Thank you", "Thank you"], ["Apology", "Apology"]],
      styles: [["Elegant and soft", "Soft"], ["Luxury and dramatic", "Luxury"], ["Minimal and modern", "Minimal"], ["Bright and colorful", "Colorful"]],
      extrasOptions: [["sweets", "With sweets"], ["toy", "With toy"], ["clean", "Only roses"], ["surprise", "Surprise me"]],
    },
    zh: {
      intro: "你好，我是 Eternior 助手。回答几个问题，我会根据预算、场合和风格推荐礼物。",
      budget: "你的预算是多少？",
      occasion: "是什么场合？",
      style: "你想要什么风格？",
      extras: "玫瑰以外还想加什么？",
      result: "我的推荐",
      resultText: "这是预估推荐。制作前会在聊天中确认颜色、甜品和时间。",
      added: "推荐已加入购物车。你可以现在发送咨询，也可以继续调整。",
      budgets: [["3500", "3,500 RSD 以内"], ["6000", "约 6,000 RSD"], ["9000", "约 9,000 RSD"], ["14000", "高级 14,000+ RSD"]],
      occasions: [["生日", "生日"], ["纪念日", "纪念日"], ["浪漫礼物", "浪漫"], ["感谢", "感谢"], ["道歉", "道歉"]],
      styles: [["优雅温柔", "温柔"], ["奢华醒目", "奢华"], ["简约现代", "简约"], ["明亮多彩", "多彩"]],
      extrasOptions: [["sweets", "加甜品"], ["toy", "加玩具"], ["clean", "只要玫瑰"], ["surprise", "给我惊喜"]],
    },
  };
  return packs[state.lang] || packs.sr;
}

function renderGiftAssistant() {
  document.querySelector("[data-assistant-fab]")?.remove();
  document.querySelector("[data-assistant-panel]")?.remove();
  const copyText = getAssistantCopy();
  document.body.insertAdjacentHTML("beforeend", `
    <button class="assistant-fab" type="button" data-assistant-fab aria-label="${t("assistant.open")}">
      <span>AI</span>${t("assistant.open")}
    </button>
    <section class="assistant-panel" data-assistant-panel hidden aria-live="polite">
      <div class="assistant-card">
        <div class="assistant-head">
          <div>
            <p class="eyebrow">${t("assistant.kicker")}</p>
            <h2>${t("assistant.title")}</h2>
          </div>
          <button class="wheel-close" type="button" data-assistant-close aria-label="${t("assistant.close")}">×</button>
        </div>
        <div class="assistant-thread" data-assistant-thread>
          <p class="assistant-bubble assistant-bubble-bot">${copyText.intro}</p>
        </div>
        <div class="assistant-options" data-assistant-options></div>
      </div>
    </section>
  `);
  renderAssistantStep();
}

function getAssistantQuestion() {
  const c = getAssistantCopy();
  if (state.assistant.step === "start") return c.budget;
  if (state.assistant.step === "occasion") return c.occasion;
  if (state.assistant.step === "style") return c.style;
  if (state.assistant.step === "extras") return c.extras;
  return c.result;
}

function getAssistantOptions() {
  const c = getAssistantCopy();
  if (state.assistant.step === "start") return c.budgets.map(([value, label]) => ({ value, label, type: "budget" }));
  if (state.assistant.step === "occasion") return c.occasions.map(([value, label]) => ({ value, label, type: "occasion" }));
  if (state.assistant.step === "style") return c.styles.map(([value, label]) => ({ value, label, type: "style" }));
  if (state.assistant.step === "extras") return c.extrasOptions.map(([value, label]) => ({ value, label, type: "extras" }));
  return [];
}

function renderAssistantStep() {
  const panel = document.querySelector("[data-assistant-panel]");
  const thread = document.querySelector("[data-assistant-thread]");
  const options = document.querySelector("[data-assistant-options]");
  if (!panel || !thread || !options) return;
  if (state.assistant.step !== "result") {
    const existingQuestion = thread.querySelector("[data-assistant-question]");
    existingQuestion?.remove();
    thread.insertAdjacentHTML("beforeend", `<p class="assistant-bubble assistant-bubble-bot" data-assistant-question>${getAssistantQuestion()}</p>`);
    options.innerHTML = getAssistantOptions().map((item) => `<button type="button" data-assistant-answer data-answer-type="${item.type}" data-answer-value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</button>`).join("");
    return;
  }
  const suggestion = state.latestSuggestion;
  const c = getAssistantCopy();
  options.innerHTML = `
    <button class="assistant-primary" type="button" data-assistant-add>${t("assistant.add")}</button>
    <a href="custom.html">${t("assistant.custom")}</a>
    <a href="shop.html">${t("assistant.shop")}</a>
    <button type="button" data-assistant-restart>${t("assistant.restart")}</button>`;
  thread.insertAdjacentHTML("beforeend", `
    <div class="assistant-result" data-assistant-result>
      <p class="eyebrow">${c.result}</p>
      <h3>${escapeHtml(suggestion.name)}</h3>
      <strong>${formatMoney(suggestion.price)}</strong>
      <ul>${suggestion.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>
      <p>${c.resultText}</p>
    </div>`);
}

function openAssistant() {
  document.querySelector("[data-assistant-panel]")?.removeAttribute("hidden");
}

function closeAssistant() {
  document.querySelector("[data-assistant-panel]")?.setAttribute("hidden", "");
}

function resetAssistant() {
  state.assistant = { step: "start", answers: {} };
  state.latestSuggestion = null;
  renderGiftAssistant();
  openAssistant();
}

function handleAssistantAnswer(button) {
  const type = button.dataset.answerType;
  const value = button.dataset.answerValue;
  state.assistant.answers[type] = value;
  const thread = document.querySelector("[data-assistant-thread]");
  thread?.insertAdjacentHTML("beforeend", `<p class="assistant-bubble assistant-bubble-user">${escapeHtml(button.textContent.trim())}</p>`);
  if (type === "budget") state.assistant.step = "occasion";
  if (type === "occasion") state.assistant.step = "style";
  if (type === "style") state.assistant.step = "extras";
  if (type === "extras") {
    const budget = Math.max(Number(state.assistant.answers.budget) || STORE.minGiftBudget, STORE.minGiftBudget);
    const style = state.assistant.answers.style || "Elegantno i nežno";
    const occasion = state.assistant.answers.occasion || "Rođendan";
    let adjustedStyle = style;
    if (value === "sweets" && !/luks|lux|å¥¢|ves|bright|color|å½©/i.test(adjustedStyle)) adjustedStyle = `${style} veselo`;
    if (value === "clean") adjustedStyle = `${style} minimalno`;
    state.latestSuggestion = buildConciergeSuggestion(budget, occasion, adjustedStyle);
    state.assistant.step = "result";
  }
  renderAssistantStep();
}

function addAssistantSuggestionToCart() {
  const suggestion = state.latestSuggestion;
  if (!suggestion) return;
  addToCart({
    id: `assistant-${Date.now()}`,
    name: suggestion.name,
    orderNameSr: suggestion.nameSr,
    category: t("suggestionDetails"),
    price: Number(suggestion.price),
    details: suggestion.details.join("; "),
    orderDetailsSr: suggestion.detailsSr.join("; "),
  });
  const thread = document.querySelector("[data-assistant-thread]");
  thread?.insertAdjacentHTML("beforeend", `<p class="assistant-bubble assistant-bubble-bot">${getAssistantCopy().added}</p>`);
}

async function shareProduct(product) {
  const shareUrl = `${location.origin}${location.pathname.replace(/[^/]+$/, "shop.html")}#${product.id}`;
  const text = `${product.name} - ${product.description} Cena: ${formatMoney(product.price)}.`;

  if (navigator.share) {
    await navigator.share({ title: product.name, text, url: shareUrl });
    return;
  }

  await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
  alert("Link i opis proizvoda su kopirani.");
}

function focusShopResultsOnMobile() {
  if (!window.matchMedia("(max-width: 779px)").matches) return;
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return;
  window.setTimeout(() => {
    const top = grid.getBoundingClientRect().top + window.scrollY - 14;
    window.scrollTo({ top, behavior: "smooth" });
  }, 80);
}

document.addEventListener("click", (event) => {
  const navToggle = event.target.closest("[data-nav-toggle]");
  const addButton = event.target.closest("[data-add-product]");
  const quantityButton = event.target.closest("[data-quantity]");
  const langButton = event.target.closest("[data-lang]");
  const currencyButton = event.target.closest("[data-currency]");
  const filterButton = event.target.closest("[data-filter]");
  const suggestionButton = event.target.closest("[data-add-suggestion]");
  const shareButton = event.target.closest("[data-share-product]");
  const paletteButton = event.target.closest("[data-palette-color]");
  const backToTop = event.target.closest('a[href="#top"]');
  const wheelOpen = event.target.closest("[data-wheel-open]");
  const wheelClose = event.target.closest("[data-wheel-close]");
  const wheelSpin = event.target.closest("[data-wheel-spin]");
  const wheelApply = event.target.closest("[data-wheel-apply]");
  const closeReview = event.target.closest("[data-close-checkout-review]");
  const confirmReview = event.target.closest("[data-confirm-checkout]");
  const assistantOpen = event.target.closest("[data-assistant-fab]");
  const assistantClose = event.target.closest("[data-assistant-close]");
  const assistantAnswer = event.target.closest("[data-assistant-answer]");
  const assistantAdd = event.target.closest("[data-assistant-add]");
  const assistantRestart = event.target.closest("[data-assistant-restart]");

  if (backToTop) {
    event.preventDefault();
    document.querySelector("[data-nav]")?.classList.remove("is-open");
    document.querySelector(".header-actions")?.classList.remove("is-open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  if (wheelOpen) openWheel();
  if (wheelClose) closeWheel();
  if (wheelSpin) spinWheel();
  if (wheelApply) applyWheelCoupon();
  if (closeReview) closeCheckoutReview();
  if (confirmReview) confirmCheckout();
  if (assistantOpen) openAssistant();
  if (assistantClose) closeAssistant();
  if (assistantAnswer) handleAssistantAnswer(assistantAnswer);
  if (assistantAdd) addAssistantSuggestionToCart();
  if (assistantRestart) resetAssistant();
  if (navToggle) {
    document.querySelector("[data-nav]").classList.toggle("is-open");
    document.querySelector(".header-actions").classList.toggle("is-open");
  }
  if (addButton) {
    const index = products.findIndex((item) => item.id === addButton.dataset.addProduct);
    const product = hydrateProduct(products[index], index);
    addToCart({ ...product, ...getReadyAddons(addButton, product) });
  }
  if (quantityButton) updateQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.amount));
  if (langButton) {
    state.lang = langButton.dataset.lang;
    saveState();
    renderAll();
  }
  if (currencyButton) {
    state.currency = currencyButton.dataset.currency;
    saveState();
    renderAll();
  }
  if (filterButton) {
    state.activeFilter = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("is-active", button === filterButton));
    renderProducts(document.querySelector("[data-product-grid]"));
    focusShopResultsOnMobile();
  }
  if (event.target.closest("[data-reset-filters]")) {
    document.querySelector("[data-search]").value = "";
    document.querySelector("[data-max-budget]").value = "";
    document.querySelector("[data-occasion-filter]").value = "all";
    state.activeFilter = "all";
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
    renderProducts(document.querySelector("[data-product-grid]"));
    focusShopResultsOnMobile();
  }
  if (shareButton) {
    const index = products.findIndex((item) => item.id === shareButton.dataset.shareProduct);
    shareProduct(hydrateProduct(products[index], index));
  }
  if (paletteButton) {
    const select = document.querySelector('select[name="roseColor"]');
    if (select) {
      const srValue = paletteButton.dataset.paletteColor;
      const paletteItem = rosePalette.find((item) => item.sr === srValue);
      const value = paletteItem ? paletteItem[state.lang] || paletteItem.sr : srValue;
      if (![...select.options].some((option) => option.value === value)) {
        select.add(new Option(value, value));
      }
      select.value = value;
      renderColorPalette();
      updateCustomPreview(document.querySelector("[data-custom-form]"));
    }
  }
  if (suggestionButton) {
    const suggestion = state.latestSuggestion;
    if (!suggestion) return;
    addToCart({
      id: `suggestion-${Date.now()}`,
      name: suggestion.name,
      orderNameSr: suggestion.nameSr,
      category: t("suggestionDetails"),
      price: Number(suggestion.price),
      details: suggestion.details.join("; "),
      orderDetailsSr: suggestion.detailsSr.join("; "),
    });
  }
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]") || event.target.closest("[data-overlay]")) closeCart();
  if (event.target.closest("[data-whatsapp-checkout]")) checkout();
  if (event.target.closest("[data-clear-cart]")) {
    state.cart = [];
    resetOrderId();
    saveState();
    renderCart();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-search], [data-max-budget], [data-occasion-filter]")) {
    renderProducts(document.querySelector("[data-product-grid]"));
  }
  if (event.target.matches("[data-price-input]")) {
    updateCustomPreview(event.target.closest("[data-custom-form]"));
  }
  if (event.target.matches("[data-ready-toy]")) {
    updateReadyToyPreview(event.target);
  }
  if (event.target.matches('select[name="roseColor"]')) {
    renderColorPalette();
    updateCustomPreview(event.target.closest("[data-custom-form]"));
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches('select[name="delivery"]')) {
    syncCheckoutDeliveryFields();
    validateCheckout();
  }
  if (event.target.matches("[data-occasion-filter]")) {
    renderProducts(document.querySelector("[data-product-grid]"));
    focusShopResultsOnMobile();
  }
  if (event.target.matches("[data-price-input]")) {
    updateCustomPreview(event.target.closest("[data-custom-form]"));
  }
  if (event.target.matches('select[name="roseColor"]')) {
    renderColorPalette();
    updateCustomPreview(event.target.closest("[data-custom-form]"));
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-checkout-form]")) {
    event.preventDefault();
    checkout();
  }
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === location.pathname.split("/").pop()) link.setAttribute("aria-current", "page");
});

document.querySelector("[data-custom-form]")?.addEventListener("submit", handleCustom);
document.querySelector("[data-concierge-form]")?.addEventListener("submit", handleConcierge);

discourageSourcePeek();
renderAll();
updateRate();
updateCustomPreview(document.querySelector("[data-custom-form]"));
