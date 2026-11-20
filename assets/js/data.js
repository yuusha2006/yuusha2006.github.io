/* =========================================================
   SITE CONTENT — edit this file to personalise the site.
   Every text has a Turkish (tr) and English (en) version.
   Replace the placeholder images in assets/img/ with your own
   (keep the same file names, or update the paths below).
   ========================================================= */
window.SITE = {
  person: {
    name: "Yuşa Büyüktalaslıoğlu",
    first: "Yuşa",
    last: "Büyüktalaslıoğlu",
    initials: "YB",
    role: { tr: "Bilgisayar Programcısı", en: "Computer Programmer" },
    city: { tr: "Antalya, Türkiye", en: "Antalya, Türkiye" },
    timezone: "Europe/Istanbul",
    email: "ybuyuktalaslioglu@gmail.com",   // also receives the contact form
    phone: "+90 542 694 38 00",
    phoneHref: "+905426943800",
    whatsapp: "905426943800",               // country code + number, digits only (wa.me format)
    waText: {
      tr: "Merhaba Yuşa, sitenden ulaşıyorum.",
      en: "Hi Yuşa, I'm reaching out from your website."
    },
    address: {
      tr: "KYK Şehzade Korkut Öğrenci Yurdu, Antalya",
      en: "KYK Şehzade Korkut Student Dormitory, Antalya"
    },
    mapQuery: "36.891862,30.6389279",       // pin from the shared Google Maps link
    mapLink: "https://maps.app.goo.gl/VP944vqVw6tauqoC9",
    portrait: "assets/img/portrait.jpg",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/yusa.bto/" },
      { label: "GitHub", url: "https://github.com/yuusha2006" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/yu%C5%9Fa-b%C3%BCy%C3%BCktalasl%C4%B1o%C4%9Flu-44084239b/" }
    ],
    stats: { projects: "10+", years: "2" }   // "tools" is counted from the tools list
  },

  education: [
    {
      years: "2025 — 2027",
      school: { tr: "Akdeniz Üniversitesi", en: "Akdeniz University" },
      dept: { tr: "Bilgisayar Programcılığı", en: "Computer Programming" },
      note: { tr: "Grafik Animasyon, Multimedya Uygulamaları, İçerik Yönetim Sistemleri", en: "Graphic Animation, Multimedia Applications, Content Management Systems" }
    },
    {
      years: "2020 — 2024",
      school: { tr: "Fevzi Çakmak Anadolu Lisesi", en: "Fevzi Çakmak Anatolian High School" },
      dept: { tr: "Sayısal bölüm mezunu", en: "Graduated from the science track" },
      note: {
        tr: "Matematik ve fen ağırlıklı eğitim; problem çözme ve analitik düşünme alışkanlığımın temeli burada atıldı.",
        en: "A maths- and science-focused education, where my habit of problem solving and analytical thinking took root."
      }
    },
    {
      years: "2012 — 2020",
      school: { tr: "Osman Zeki Yücesan İlkokulu ve Ortaokulu", en: "Osman Zeki Yücesan Primary & Middle School" },
      dept: { tr: "İlkokul ve ortaokul", en: "Primary and middle school" },
      note: {
        tr: "Resme ve bilgisayara merakımın başladığı yıllar; defter kenarlarına çizdiğim karakterler, ilk tasarım denemelerim oldu.",
        en: "The years my curiosity for drawing and computers began; the characters I sketched in my notebook margins were my first design attempts."
      }
    }
  ],

  skills: [
    { name: { tr: "Photoshop", en: "Photoshop" }, v: 0.9 },
    { name: { tr: "VS Code", en: "VS Code" }, v: 0.85 },
    { name: { tr: "Python", en: "Python" }, v: 0.75 },
    { name: { tr: "Adobe Animate", en: "Adobe Animate" }, v: 0.7 },
    { name: { tr: "HTML", en: "HTML" }, v: 0.85 },
    { name: { tr: "CSS", en: "CSS" }, v: 0.8 },
    { name: { tr: "JavaScript", en: "JavaScript" }, v: 0.7 }
  ],

  tools: ["Photoshop", "Adobe Animate", "VS Code", "Python", "HTML", "CSS", "JavaScript"],

  interests: {
    tr: ["Tasarım", "Kod", "Resim", "Fitness", "Spor", "Bilgisayar oyunları"],
    en: ["Design", "Coding", "Drawing & painting", "Fitness", "Sports", "Video games"]
  },

  courses: {
    ga1: { tr: "Grafik Animasyon 1", en: "Graphic Animation 1" },
    ga2: { tr: "Grafik Animasyon 2", en: "Graphic Animation 2" },
    ga3: { tr: "Grafik Animasyon 3", en: "Graphic Animation 3" },
    mm: { tr: "Multimedya Uygulamaları", en: "Multimedia Applications" },
    personal: { tr: "Kişisel", en: "Personal" }
  },

  projects: [
    {
      id: "site-arayuz", course: "ga1", year: "2025", featured: true,
      img: "assets/img/projects/p1.jpg",
      title: { tr: "Site Arayüz Tasarımı", en: "Website Interface Design" },
      desc: {
        tr: "Bir zemin kaplama markası için web sitesi arayüzü. Logo, menü ve ürün kategorilerini Photoshop'ta tek sayfada kurguladım.",
        en: "A website interface for a flooring brand. I laid out the logo, menu and product categories on a single page in Photoshop."
      },
      tags: ["Photoshop", "UI"],
      detail: {
        tr: "Ground Floor zemin kaplama markası için tek sayfalık bir site arayüzü. Önce 960.GS ızgarasıyla bir taslak çizdim, sonra Photoshop'ta logo, menü, ürün kartları ve alt bilgiyi ayrı klasörlerde kurdum. Layer Comps ile üç farklı tasarım varyasyonunu aynı dosyada saklayıp karşılaştırdım.",
        en: "A single-page site interface for the Ground Floor flooring brand. I first drew a wireframe on the 960.GS grid, then built the logo, menu, product cards and footer as separate layer groups in Photoshop. With Layer Comps I kept three design variations in one file and compared them."
      },
      process: [
        { img: "assets/img/projects/p1-wireframe.jpg", caption: { tr: "960.GS ızgarasıyla taslak", en: "Wireframe on the 960.GS grid" } },
        { img: "assets/img/projects/p1-layers.jpg", caption: { tr: "Katman yapısı", en: "Layer structure" } },
        { img: "assets/img/projects/p1-comps.jpg", caption: { tr: "Layer Comps ile 3 varyasyon", en: "3 variations with Layer Comps" } }
      ]
    },
    {
      id: "urun-tanitim", course: "ga2", year: "2025", featured: true,
      img: "assets/img/projects/p2.jpg",
      title: { tr: "Ürün Tanıtım Tasarımı", en: "Product Promo Design" },
      desc: {
        tr: "Bir kol saati için tanıtım görseli. Ürünü öne çıkaran sade bir kompozisyonu Photoshop ile hazırladım.",
        en: "A promotional visual for a wristwatch. I built a clean composition in Photoshop that puts the product first."
      },
      tags: ["Photoshop", "Product"],
      detail: {
        tr: "Beyaz zeminli bir ürün fotoğrafından yola çıkarak bir kol saati tanıtım görseli hazırladım. Saati zeminden ayırıp yumuşak bir degradenin önüne yerleştirdim; gölge, yansıma ve parlaklık katmanlarıyla ürüne derinlik kattım. Başlık üstte, slogan altta durarak göz önce saate, sonra mesaja gidiyor.",
        en: "Starting from a product photo on a white background, I made a promotional visual for a wristwatch. I cut the watch out and placed it in front of a soft gradient, adding depth with shadow, reflection and highlight layers. With the headline on top and the slogan below, the eye goes to the watch first, then to the message."
      },
      process: [
        { img: "assets/img/projects/p2-raw.jpg", caption: { tr: "Başlangıç: ham ürün fotoğrafı", en: "Start: the raw product photo" } },
        { img: "assets/img/projects/p2-layers.jpg", caption: { tr: "Zemin, parlaklık, yansıma ve gölge katmanları", en: "Background, highlight, reflection and shadow layers" } }
      ]
    },
    {
      id: "history-brush", course: "ga3", year: "2025", featured: true,
      img: "assets/img/projects/p3.jpg",
      title: { tr: "History Brush ile Seçici Renk", en: "Selective Colour with History Brush" },
      desc: {
        tr: "Renkli bir basketbol karesini siyah-beyaza çevirip History Brush ile rengi yalnızca oyunculara geri verdim. Renk, gözü doğrudan aksiyona yönlendiriyor.",
        en: "I turned a colour basketball shot black and white, then used the History Brush to give the colour back only to the players. The colour leads the eye straight to the action."
      },
      tags: ["Photoshop", "History Brush"],
      before: "assets/img/projects/p3-before.jpg",   // same framing as img -> before/after slider
      detail: {
        tr: "Renkli bir basketbol karesini önce tamamen siyah-beyaza çevirdim. Ardından History Brush ile yalnızca öndeki Miami Heat oyuncularının üzerinden geçip orijinal renklerini geri getirdim. Tribün ve rakipler gri kalırken kırmızı-siyah formalar sahnenin odağı oluyor.",
        en: "I first turned a colour basketball shot fully black and white. Then, with the History Brush, I painted over only the Miami Heat players in front to bring their original colour back. The stands and opponents stay grey while the red-and-black jerseys become the focus of the scene."
      }
    },
    {
      id: "karakalem-renklendirme", course: "ga1", year: "2025", featured: true,
      img: "assets/img/projects/p6.jpg",
      before: "assets/img/projects/p6-before.jpg",   // same 600×800 framing -> before/after slider
      title: { tr: "Karakalem Renklendirme", en: "Pencil Sketch Colouring" },
      desc: {
        tr: "Siyah-beyaz bir karakalem karakter çizimini Photoshop'ta katman katman renklendirdim.",
        en: "I coloured a black-and-white pencil character sketch in Photoshop, layer by layer."
      },
      tags: ["Photoshop", "Channels", "Layers"],
      detail: {
        tr: "Önce kanalları (Channels) kullanarak çizgileri renkten ayırıp en üstteki outline katmanına aldım. Ardından vücut, şapka, göz, kaş, burun, düğmeler, papyon, demirler, kablolar ve dişler için ayrı katmanlar açıp her parçayı kendi katmanında boyadım. Çizgiler üstte kaldığı için renkler karakalem dokusunu bozmadan altında duruyor.",
        en: "First I used Channels to separate the lines from the paper and moved them to an outline layer on top. Then I made separate layers for the body, hat, eyes, brows, nose, buttons, bow tie, metal parts, wires and teeth, and painted each part on its own layer. Because the lines stay on top, the colours sit underneath without spoiling the pencil texture."
      },
      process: [
        { img: "assets/img/projects/p6-channels.jpg", caption: { tr: "Channels ile çizgileri ayırma", en: "Separating the lines with Channels" } },
        { img: "assets/img/projects/p6-layers.jpg", caption: { tr: "Her parça ayrı katmanda", en: "Every part on its own layer" } }
      ]
    },
    {
      id: "n8n-mail", course: "personal", year: "2026", featured: true,
      img: "assets/img/projects/p4.svg?v=2",
      title: { tr: "Otomatik E-posta Akışı", en: "Automated Email Workflow" },
      desc: {
        tr: "n8n ile kurduğum bir iş akışı. Tetiklendiğinde kişi listesini okuyor, e-postaları kişiselleştiriyor ve kendiliğinden gönderiyor.",
        en: "A workflow I built with n8n. When triggered, it reads the contact list, personalises each email and sends it on its own."
      },
      tags: ["n8n", "Automation", "E-mail"],
      detail: {
        tr: "Akış bir tetikleyiciyle başlıyor, kişi listesini okuyor ve her kişi için e-posta metnini isim gibi alanlarla kişiselleştiriyor. Gönderimler bir döngü içinde, aralara bekleme konularak yapılıyor; böylece e-posta sağlayıcısının sınırlarına takılmıyor.",
        en: "The flow starts with a trigger, reads the contact list and personalises each email with fields such as the name. Sends run inside a loop with waits in between, so they stay within the email provider's limits."
      },
      links: []   // e.g. [{ label: "GitHub", url: "https://github.com/yuusha2006/..." }]
    },
    {
      id: "n8n-research", course: "personal", year: "2026", featured: true,
      img: "assets/img/projects/p5.jpg",   // real n8n workflow screenshot, padded to 4:3
      title: { tr: "Akademik Araştırma Otomasyonu", en: "Academic Research Automation" },
      desc: {
        tr: "arXiv'den makaleleri belirli aralıklarla kendiliğinden çeken ve sonuçları bir dosyaya kaydeden n8n akışı.",
        en: "An n8n workflow that fetches papers from arXiv on a schedule and saves the results to a file."
      },
      tags: ["n8n", "arXiv API", "JavaScript"],
      detail: {
        tr: "Akış beş düğümden oluşuyor. Schedule Trigger akışı belirlediğim aralıklarla başlatıyor; HTTP Request düğümü arXiv'in API'sine (export.arxiv.org) GET isteği atıp makale listesini alıyor. arXiv yanıtı XML olarak döndürdüğü için XML düğümüyle JSON'a çeviriyorum. Ardından Code düğümünde JavaScript ile veriyi düzenliyorum ve son adımda Read/Write Files from Disk düğümü sonucu diske bir dosya olarak yazıyor.",
        en: "The workflow has five nodes. A Schedule Trigger starts it at intervals I set; an HTTP Request node sends a GET request to the arXiv API (export.arxiv.org) to get the list of papers. Because arXiv answers in XML, an XML node converts it to JSON. A Code node then shapes the data with JavaScript, and finally a Read/Write Files from Disk node writes the result to a file on disk."
      },
      process: [
        { img: "assets/img/projects/p5-workflow.png", caption: { tr: "n8n'deki gerçek iş akışı", en: "The actual workflow in n8n" } }
      ],
      links: []
    }
  ],

  gallery: [
    {
      img: "assets/img/gallery/g1.jpg?v=2", place: "Sarp Katran",
      caption: {
        tr: "1835 metrelik Sarp Katran zirvesine tırmanış. Manzarayı görünce yorgunluk yerini tek bir zafer pozuna bıraktı.",
        en: "The climb to the 1,835 m Sarp Katran summit. One look at the view and the tiredness turned into a victory pose."
      }
    },
    {
      img: "assets/img/gallery/g2.jpg", place: "Erciyes",
      caption: {
        tr: "Erciyes'in karlarını eritmeye gelen ekip: kardeşlerimle bir kayak günü.",
        en: "The crew that came to melt Erciyes' snow: a ski day with my siblings."
      }
    },
    {
      img: "assets/img/gallery/g3.jpg", place: "Kayseri",
      caption: {
        tr: "2024 Kayseri Yarı Maratonu. Bitiş çizgisine kadar yüzümden düşmeyen bir gülümseme.",
        en: "The 2024 Kayseri Half Marathon, with a smile that lasted all the way to the finish line."
      }
    },
    {
      img: "assets/img/gallery/g4.jpg", place: { tr: "Yarış günü", en: "Race day" },
      caption: {
        tr: "Arkadaşlarla aynı tempoda: göğüs numaraları takılı, yol uzun, moral yerinde.",
        en: "Keeping pace with friends: race numbers on, a long road ahead, spirits high."
      }
    },
    {
      img: "assets/img/gallery/g5.jpg", place: "Erciyes",
      caption: {
        tr: "Yeşil tarlaların ardında karlı zirvesiyle Erciyes. Kayseri'nin her mevsim değişmeyen manzarası.",
        en: "Erciyes with its snowy peak behind green fields, Kayseri's view in every season."
      }
    },
    {
      img: "assets/img/gallery/g6.jpg?v=2", place: "Sarp Katran",
      caption: {
        tr: "Sarp Katran'ın tepesinden Antalya kıyısına uzanan manzara. Tırmanışın asıl ödülü.",
        en: "The view from the top of Sarp Katran down to the Antalya coast, the real reward of the climb."
      }
    },
    {
      video: "assets/video/sarpkatran.mp4",   // 7 s, 1.35 MB — plays muted & looping like a GIF
      place: "Sarp Katran",
      caption: {
        tr: "Kask takılı, manzara arkada: Sarp Katran zirvesinden kısa bir selam.",
        en: "Helmet on, view behind: a quick hello from the Sarp Katran summit."
      }
    }
  ],

  /* Blog — each article needs a category and tags (assignment requirement). */
  posts: [
    {
      slug: "n8n-otomatik-eposta",
      date: "2026-03-08",
      minutes: 6,
      category: { tr: ["Otomasyon", "Yazılım"], en: ["Automation", "Software"] },
      tags: ["n8n", "otomasyon", "e-posta", "iş akışı"],
      title: { tr: "n8n ile Otomatik E-posta Akışı Kurmak", en: "Building an Automated Email Workflow with n8n" },
      excerpt: {
        tr: "Bir listedeki herkese tek tek e-posta yazmak yerine, işi n8n'e bıraktım. Akışı adım adım anlatıyorum.",
        en: "Instead of writing to everyone on a list one by one, I handed the job to n8n. Here is the workflow, step by step."
      },
      body: {
        tr: `
<p>n8n, uygulamaları birbirine bağlayıp tekrar eden işleri otomatiğe almaya yarayan açık kaynaklı bir iş akışı aracı. Kod bilgisi olmadan da kullanılabiliyor, ama gerektiğinde araya kod eklemek de mümkün. İlk ciddi denemem, bir kişi listesindeki herkese <strong>kişiselleştirilmiş e-posta</strong> gönderen bir akış oldu.</p>
<h2>1. Akışın iskeleti</h2>
<p>n8n'de her adım bir <strong>düğüm</strong> (node). Benim akışım beş düğümden oluşuyor:</p>
<ol>
<li><strong>Tetikleyici:</strong> Akışı başlatan düğüm. Denerken <code>Manual Trigger</code>, sonra belirli saatlerde çalışması için <code>Schedule Trigger</code> kullandım.</li>
<li><strong>Kişi listesi:</strong> İsim ve e-posta adreslerinin durduğu tabloyu okuyan düğüm.</li>
<li><strong>Döngü:</strong> Listeyi parça parça işleyen <code>Loop Over Items</code> düğümü.</li>
<li><strong>Kişiselleştirme:</strong> Her kişi için metni hazırlayan adım.</li>
<li><strong>Gönderim:</strong> E-postayı yollayan Gmail ya da SMTP düğümü.</li>
</ol>
<h2>2. Metni kişiselleştirmek</h2>
<p>n8n'in en sevdiğim özelliği <strong>ifadeler</strong> (expressions). Bir önceki düğümden gelen veriyi süslü parantezlerle metnin içine yerleştirebiliyorsun. Örneğin konu satırına <code>Merhaba {{ $json.isim }}</code> yazdığında, her e-postada o kişinin adı görünüyor.</p>
<blockquote>Otomasyonun asıl değeri hız değil, aynı işi her seferinde hatasız yapması.</blockquote>
<h2>3. Dikkat ettiğim noktalar</h2>
<ul>
<li>E-posta sağlayıcıları kısa sürede çok fazla gönderimi engelleyebiliyor. Döngünün içine bir <code>Wait</code> düğümü koyup gönderimleri araya süre koyarak yaptım.</li>
<li>Önce listeyi sadece kendi adresimle test ettim. Gerçek listeye geçmeden önce her alanın doğru dolduğunu gördüm.</li>
<li>Şifre ve API anahtarlarını düğümlerin içine yazmak yerine n8n'in <strong>Credentials</strong> bölümünde sakladım.</li>
</ul>
<h2>Sonuç</h2>
<p>Saatlerce sürecek bir iş artık tek tıkla ya da kendiliğinden çalışıyor. Bu akışı kurarken öğrendiklerim, sonraki projem olan araştırma otomasyonunun da temeli oldu.</p>`,
        en: `
<p>n8n is an open-source workflow tool that connects apps and automates repetitive work. You can use it without writing code, but you can also drop code in when you need it. My first serious attempt was a workflow that sends a <strong>personalised email</strong> to everyone on a contact list.</p>
<h2>1. The skeleton of the workflow</h2>
<p>In n8n every step is a <strong>node</strong>. My workflow has five of them:</p>
<ol>
<li><strong>Trigger:</strong> the node that starts the flow. I used <code>Manual Trigger</code> while testing, then <code>Schedule Trigger</code> to run it at set times.</li>
<li><strong>Contact list:</strong> a node that reads the table of names and email addresses.</li>
<li><strong>Loop:</strong> a <code>Loop Over Items</code> node that processes the list in batches.</li>
<li><strong>Personalisation:</strong> the step that prepares the text for each person.</li>
<li><strong>Send:</strong> a Gmail or SMTP node that sends the email.</li>
</ol>
<h2>2. Personalising the text</h2>
<p>My favourite n8n feature is <strong>expressions</strong>. You can drop data from a previous node into your text with curly braces. Writing <code>Hello {{ $json.name }}</code> in the subject line puts each person's name into their own email.</p>
<blockquote>The real value of automation isn't speed. It's doing the same job without mistakes, every time.</blockquote>
<h2>3. Things I watched out for</h2>
<ul>
<li>Email providers can block too many sends in a short time. I put a <code>Wait</code> node inside the loop to space the sends out.</li>
<li>I first tested the list with only my own address, and checked every field filled in correctly before switching to the real list.</li>
<li>Instead of typing passwords and API keys into nodes, I stored them in n8n's <strong>Credentials</strong> section.</li>
</ul>
<h2>Result</h2>
<p>A job that would take hours now runs with one click, or on its own. What I learned building it became the base of my next project, the research automation.</p>`
      }
    },
    {
      slug: "photoshop-history-brush",
      date: "2026-05-14",
      minutes: 5,
      category: { tr: ["Grafik Tasarım", "Fotoğraf Düzenleme"], en: ["Graphic Design", "Photo Editing"] },
      tags: ["Adobe", "Photoshop", "History Brush", "seçici renk"],
      title: { tr: "Photoshop'ta History Brush ile Seçici Renk", en: "Selective Colour with Photoshop's History Brush" },
      excerpt: {
        tr: "Grafik Animasyon projemde bir basketbol karesini siyah-beyaza çevirip rengi History Brush ile yalnızca oyunculara geri verdim. Adım adım anlatıyorum.",
        en: "In my Graphic Animation project, I turned a basketball shot black and white and painted the colour back onto the players with the History Brush. Here it is step by step."
      },
      body: {
        tr: `
<p>Grafik Animasyon dersindeki bu projede renkli bir basketbol karesini önce tamamen siyah-beyaza çevirdim, sonra rengi yalnızca öndeki oyunculara geri verdim. Bunun için maske yerine Photoshop'un pek konuşulmayan bir aracını kullandım: <strong>History Brush</strong> (Geçmiş Fırçası).</p>
<h2>History Brush ne yapar?</h2>
<p>Photoshop yaptığın her adımı <strong>History</strong> panelinde saklar. History Brush, fotoğrafın geçmişteki bir halini kaynak olarak alır ve fırçayla boyadığın yerlere o hali geri getirir. Yani fotoğrafı siyah-beyaz yaptıktan sonra, renkli halini "fırçayla" geri çağırabilirsin.</p>
<h2>1. Fotoğrafı siyah-beyaza çevir</h2>
<p>Fotoğrafı açtıktan sonra <code>Image &gt; Adjustments &gt; Black &amp; White</code> ile tamamen griye çevirdim. Bu adım History panelinde yeni bir satır olarak görünür. Fotoğrafın ilk açıldığı renkli hal ise panelin en üstünde durmaya devam eder.</p>
<h2>2. Kaynağı renkli hale ayarla</h2>
<p>History panelinde en üstteki ilk halin solundaki küçük kutuya tıkladım. Orada fırça simgesi belirince History Brush artık oradan, yani renkli fotoğraftan boyuyor.</p>
<blockquote>History Brush'ın kaynağı hangi satırdaysa, fırça o anı geri getirir.</blockquote>
<h2>3. Oyuncuların üzerinden geç</h2>
<ul>
<li>Araç çubuğundan History Brush'ı seçtim. Kısayolu <code>Y</code>.</li>
<li>Önce büyük bir fırçayla gövdeleri, sonra yakınlaşıp <code>[</code> ve <code>]</code> tuşlarıyla fırçayı küçülterek kol, parmak ve ayakkabı kenarlarını boyadım.</li>
<li>Kenarlarda fırçanın sertliğini düşürüp opaklığı azaltınca renk ile gri arasındaki geçiş daha doğal oldu.</li>
</ul>
<h2>4. Dikkat etmen gerekenler</h2>
<ul>
<li>Kaynak hal ile mevcut hal arasında fotoğrafın boyutunu ya da kırpmasını değiştirirsen History Brush çalışmaz. Kırpmayı en sona bırak.</li>
<li>History panelinin bir adım sınırı var. Çok fazla adım atarsan renkli ilk hal panelden düşebilir. Başta bir <strong>Snapshot</strong> alıp kaynağı ona ayarlamak daha güvenli.</li>
<li>Bu yöntem doğrudan piksele işler. Sonradan değiştirmek istiyorsan çalışmaya başlamadan önce katmanın bir kopyasını al.</li>
</ul>
<h2>Sonuç</h2>
<p>Tribün ve rakip oyuncular gri kalırken kırmızı-siyah formalar sahnenin odağı oldu. Projeler sayfasındaki önce/sonra kaydırıcısıyla iki hali yan yana karşılaştırabilirsin.</p>`,
        en: `
<p>In this Graphic Animation project, I first turned a colour basketball shot fully black and white, then gave the colour back only to the players in front. Instead of a mask, I used a Photoshop tool people rarely talk about: the <strong>History Brush</strong>.</p>
<h2>What does the History Brush do?</h2>
<p>Photoshop keeps every step you take in the <strong>History</strong> panel. The History Brush takes an earlier state of the photo as its source and paints that state back wherever you brush. So after making the photo black and white, you can "paint" its colour version back in.</p>
<h2>1. Turn the photo black and white</h2>
<p>After opening the photo, I turned it fully grey with <code>Image &gt; Adjustments &gt; Black &amp; White</code>. That step appears as a new row in the History panel, while the colour state from when the photo was opened stays at the top.</p>
<h2>2. Set the source to the colour state</h2>
<p>In the History panel, I clicked the small box to the left of the first state at the top. Once the brush icon appears there, the History Brush paints from it, meaning from the colour photo.</p>
<blockquote>Whichever row holds the History Brush source, that's the moment the brush brings back.</blockquote>
<h2>3. Paint over the players</h2>
<ul>
<li>I picked the History Brush from the toolbar. Its shortcut is <code>Y</code>.</li>
<li>I painted the bodies with a large brush first, then zoomed in and shrank the brush with <code>[</code> and <code>]</code> for the edges of arms, fingers and shoes.</li>
<li>Lowering the brush hardness and opacity at the edges made the change from colour to grey look more natural.</li>
</ul>
<h2>4. Things to watch out for</h2>
<ul>
<li>If you change the image size or crop between the source state and now, the History Brush won't work. Leave cropping for the end.</li>
<li>The History panel has a step limit. Take too many steps and the original colour state can drop off the panel. Taking a <strong>Snapshot</strong> at the start and setting the source to it is safer.</li>
<li>This method works directly on the pixels. If you may want to change it later, duplicate the layer before you start.</li>
</ul>
<h2>Result</h2>
<p>The stands and opponents stay grey while the red-and-black jerseys become the focus of the scene. You can compare both versions with the before/after slider on the Projects page.</p>`
      }
    },
    {
      slug: "n8n-arxiv-otomasyon",
      date: "2026-09-22",
      minutes: 6,
      category: { tr: ["Otomasyon", "Yazılım"], en: ["Automation", "Software"] },
      tags: ["n8n", "arXiv", "API", "JavaScript"],
      title: { tr: "n8n ile arXiv'den Otomatik Makale Toplamak", en: "Collecting arXiv Papers Automatically with n8n" },
      excerpt: {
        tr: "Akademik Araştırma Otomasyonu projemde arXiv'deki yeni makaleleri belirli aralıklarla kendiliğinden çekip bir dosyaya kaydettim. Beş düğümlük akışı anlatıyorum.",
        en: "In my Academic Research Automation project, I pulled new papers from arXiv on a schedule and saved them to a file. Here is the five-node workflow."
      },
      body: {
        tr: `
<p>Bir konuda araştırma yaparken arXiv'e her gün girip yeni makalelere bakmak zaman alıyor. Bu işi <strong>n8n</strong>'e devrettim: akış belirli aralıklarla arXiv'e soruyor, gelen yanıtı işliyor ve sonucu bir dosyaya kaydediyor. Akış beş düğümden oluşuyor.</p>
<h2>1. Schedule Trigger: ne zaman çalışsın?</h2>
<p>Akışı başlatan düğüm. Elle tetiklemek yerine belirli aralıklarla, örneğin her sabah, kendiliğinden çalışacak şekilde ayarladım. Böylece ben hiçbir şey yapmadan liste güncelleniyor.</p>
<h2>2. HTTP Request: arXiv'e sormak</h2>
<p>arXiv, makale aramak için herkese açık bir API sunuyor. HTTP Request düğümüyle <code>export.arxiv.org/api/query</code> adresine bir <strong>GET</strong> isteği gönderiyorum. Aramayı adresteki parametrelerle şekillendirmek mümkün:</p>
<ul>
<li><code>search_query</code>: aranacak konu, örneğin <code>all:automation</code></li>
<li><code>max_results</code>: kaç makale gelsin</li>
<li><code>sortBy=submittedDate</code> ve <code>sortOrder=descending</code>: en yeni makaleler önce gelsin</li>
</ul>
<h2>3. XML: yanıtı okunur hale getirmek</h2>
<p>arXiv sonuçları JSON değil, <strong>XML</strong> (Atom) biçiminde döndürüyor. n8n'in XML düğümünü "XML to JSON" modunda kullanarak yanıtı JSON'a çevirdim. Bundan sonra her makale, başlığı, yazarları, yayın tarihi ve bağlantısıyla birlikte düzenli bir nesne olarak geliyor.</p>
<h2>4. Code in JavaScript: veriyi düzenlemek</h2>
<p>JSON'a dönen veri hâlâ kalabalık. Code düğümünde birkaç satır JavaScript ile sadece işime yarayan alanları bırakıyorum. Basitleştirilmiş hali şöyle:</p>
<pre><code>const entries = [].concat($input.first().json.feed.entry || []);
return entries.map(e =&gt; ({
  json: { baslik: e.title, tarih: e.published, link: e.id }
}));</code></pre>
<p><code>[].concat(...)</code> kısmı, tek makale geldiğinde de listeyle çalışabilmek için. n8n'de Code düğümü her kaydı <code>{ json: {...} }</code> biçiminde döndürmeli, ki sonraki düğümler veriyi tanısın.</p>
<blockquote>Otomasyonda en çok zamanı veriyi toplamak değil, onu kullanılabilir hale getirmek alıyor.</blockquote>
<h2>5. Read/Write Files from Disk: kaydetmek</h2>
<p>Son düğüm "Write File to Disk" modunda çalışıyor ve düzenlenen sonucu bilgisayardaki bir dosyaya yazıyor. Böylece her çalışmada güncel makale listesi elimde hazır oluyor.</p>
<h2>Öğrendiklerim</h2>
<ul>
<li>Her düğümü <code>Execute step</code> ile tek tek çalıştırıp çıktısına bakmak, hatanın hangi adımda olduğunu hemen gösteriyor.</li>
<li>Bir API'nin hangi biçimde cevap verdiğini önceden bilmek önemli. XML düğümü olmasaydı Code düğümünde XML'i elle ayrıştırmam gerekirdi.</li>
<li>Görsel düğümler akışı anlaşılır kılıyor, ayrıntıyı ise birkaç satır kod hallediyor.</li>
</ul>`,
        en: `
<p>When you research a topic, checking arXiv for new papers every day takes time. I handed the job to <strong>n8n</strong>: the workflow asks arXiv at set intervals, processes the answer and saves the result to a file. It has five nodes.</p>
<h2>1. Schedule Trigger: when should it run?</h2>
<p>The node that starts the workflow. Instead of triggering it by hand, I set it to run on its own at intervals, for example every morning. The list updates without me doing anything.</p>
<h2>2. HTTP Request: asking arXiv</h2>
<p>arXiv offers a public API for searching papers. With an HTTP Request node I send a <strong>GET</strong> request to <code>export.arxiv.org/api/query</code>. You shape the search with parameters in the address:</p>
<ul>
<li><code>search_query</code>: the topic to search, e.g. <code>all:automation</code></li>
<li><code>max_results</code>: how many papers to return</li>
<li><code>sortBy=submittedDate</code> and <code>sortOrder=descending</code>: newest papers first</li>
</ul>
<h2>3. XML: making the answer readable</h2>
<p>arXiv answers in <strong>XML</strong> (Atom), not JSON. I used n8n's XML node in "XML to JSON" mode to convert it. From then on, each paper arrives as a tidy object with its title, authors, publication date and link.</p>
<h2>4. Code in JavaScript: shaping the data</h2>
<p>The JSON is still crowded. In a Code node, a few lines of JavaScript keep only the fields I need. A simplified version:</p>
<pre><code>const entries = [].concat($input.first().json.feed.entry || []);
return entries.map(e =&gt; ({
  json: { title: e.title, date: e.published, link: e.id }
}));</code></pre>
<p>The <code>[].concat(...)</code> part keeps it working as a list even when only one paper comes back. In n8n, a Code node must return each record as <code>{ json: {...} }</code> so the next nodes understand the data.</p>
<blockquote>In automation, most of the time goes into making data usable, not collecting it.</blockquote>
<h2>5. Read/Write Files from Disk: saving</h2>
<p>The last node runs in "Write File to Disk" mode and writes the shaped result to a file on the computer. After every run, an up-to-date list of papers is ready for me.</p>
<h2>What I learned</h2>
<ul>
<li>Running each node on its own with <code>Execute step</code> and checking its output shows straight away which step a mistake is in.</li>
<li>It matters to know in advance what format an API answers in. Without the XML node, I'd have had to parse the XML by hand in the Code node.</li>
<li>Visual nodes keep the flow easy to follow, and a few lines of code handle the detail.</li>
</ul>`
      }
    }
  ],

  /* Contact form: FormSubmit sends messages to person.email without a backend.
     The first submission sends a one-time activation email to that address. */
  formEndpoint: "https://formsubmit.co/ajax/"
};
