Projeyi github ile codespaces ile yada indirip visual studio code çalıştırabilirsiniz, aynı zamanda github da public olarak paylaşılmaktadır github name: @FranticKrill

github link:https://github.com/FranticKrill/prenovaspace

vescel hesabı proje sayfası :https://vercel.com/prenovaspaces-projects/prenovaspace/GVaHngKkqUuNwEZwpjw2m43kaWrR

vercele github sync ile bağlanıldı

proje kaynakları e-posta ile paylaşacağım

node_module dosyası silip paylaşıyorum, bu sebeple vs code başlattığınıda terminal açıp sırayla;

1-npm install gerekli yüklemeleri sağlar

2-npm run dev 

yazarsanız sizi proje sitesine yönlendirecektir. Orada Proje üzerinde aksiyon gerçekleştirebilirsiniz

Projenin Linki: 

[prenovaspace.vercel.app](https://prenovaspace.vercel.app)

bu linki müşteriler görecek

Bu, create-next-appile önyüklenen bir Next.js projesidir.

İlk önce geliştirme sunucusunu çalıştırın:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Sonucu görmek için http://localhost:3000 adresini tarayıcınızla açın.

URL sonuna /admin ekleyerek Yönetim sistemine ulaşabilirsiniz

e-posta: admin@admin.com
şifre: admin

pages/index.tsx dosyasını değiştirerek sayfayı düzenlemeye başlayabilirsiniz. Siz dosyayı düzenledikçe sayfa otomatik olarak güncellenir.

API rotalarına http://localhost:3000/api/hello adresinden erişilebilir. Bu uç nokta pages/api/hello.ts'da düzenlenebilir.

pages/api dizini /api/* ile eşlenir. Bu dizindeki dosyalar, React sayfaları yerine API rotaları olarak değerlendirilir.

Bu proje, özel bir Google Yazı Tipi olan Inter'i otomatik olarak optimize etmek ve yüklemek için next/font'ı kullandı.

Next.js uygulamanızı dağıtmak için Next.js yaratıcılarının Vercel Platformunu kullanılmaktır.

