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

pages/index.tsx dosyasını değiştirerek sayfayı düzenlemeye başlayabilirsiniz. Siz dosyayı düzenledikçe sayfa otomatik olarak güncellenir.

API rotalarına http://localhost:3000/api/hello adresinden erişilebilir. Bu uç nokta pages/api/hello.ts'da düzenlenebilir.

pages/api dizini /api/* ile eşlenir. Bu dizindeki dosyalar, React sayfaları yerine API rotaları olarak değerlendirilir.

Bu proje, özel bir Google Yazı Tipi olan Inter'i otomatik olarak optimize etmek ve yüklemek için next/font'ı kullanır.

Next.js hakkında daha fazla bilgi edinmek için aşağıdaki kaynaklara göz atın:

Next.js Belgeleri - Next.js özellikleri ve API'si hakkında bilgi edinin.

Next.js'yi öğrenin - etkileşimli bir Next.js eğitimi.

Next.js GitHub deposuna göz atabilirsiniz; geri bildirimleriniz ve katkılarınız memnuniyetle karşılanacaktır!

Vercel'de dağıt 

Next.js uygulamanızı dağıtmanın en kolay yolu Next.js yaratıcılarının Vercel Platformunu kullanmaktır.

Daha fazla ayrıntı için Next.js dağıtım belgelerimize göz atın.
