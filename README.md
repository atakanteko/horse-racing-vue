# 🐎 Horse Racing App

Vue 3 + TypeScript + Tailwind CSS ile geliştirilmiş at yarışı simülasyon uygulaması.

## 🚀 Özellikler

- **At Yarışı Simülasyonu**: Rastgele atlar ve programlar oluşturma
- **Gerçek Zamanlı Yarış**: Canlı yarış simülasyonu ve pozisyon takibi
- **Sonuç Takibi**: Yarış sonuçlarını görüntüleme ve kazanan belirleme
- **Responsive Tasarım**: Modern ve responsive kullanıcı arayüzü
- **Test Coverage**: Unit testler (Vitest) ve E2E testler (Playwright)

## 🛠️ Teknolojiler

- **Vue 3** - Composition API
- **TypeScript** - Type safety
- **Vuex** - State management
- **Vue Router** - Routing
- **Tailwind CSS v4** - Styling
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Vite** - Build tool

## 📁 Proje Yapısı

```
src/
├── assets/          # SVG ikonlar, CSS dosyaları
├── components/       # Vue component'leri
│   ├── layout/      # Header, Main, Footer
│   └── racing/      # Racing-specific components
├── composables/     # Composition API hooks
├── stores/          # Vuex store modules
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── views/           # Page components
└── test/            # Unit test files

e2e/                 # E2E test files (Playwright)
```

## 🎯 Ana Bileşenler

### Racing Components
- **RacingHorseList**: At listesini gösterir
- **RacingLanes**: Yarış pistini ve at pozisyonlarını gösterir
- **RacingBoard**: Program ve sonuçları gösterir
- **RacingProgramCard**: Program bilgilerini kart formatında gösterir

### State Management
- **Racing Module**: At listesi, programlar, aktif yarış ve sonuçları yönetir
- **Actions**: Program oluşturma, yarış başlatma/durdurma
- **Getters**: State'e erişim için computed properties

### Race Simulation
- **useRaceSimulation**: Yarış simülasyonu logic'i
- **Sequential Racing**: Yarışlar sırayla tamamlanır
- **Non-deterministic**: Rastgele hız ve condition bazlı kazanma

## 🧪 Testler

### Unit Tests (Vitest)
```bash
npm run test          # Tüm testleri çalıştır
npm run test:watch    # Watch mode
npm run test:coverage # Coverage raporu
npm run test:ui       # UI modunda
```

### E2E Tests (Playwright)
```bash
npm run test:e2e           # Tüm e2e testleri
npm run test:e2e:ui       # UI modunda
npm run test:e2e:report   # Test raporunu göster
```

**Environment Variable Kullanımı:**
- **Development** (varsayılan): `http://localhost:5173` - Dev server otomatik başlar
- **Production/Deploy**: `PLAYWRIGHT_BASE_URL` environment variable'ı ile deploy URL'i belirtin
  ```bash
  PLAYWRIGHT_BASE_URL=https://your-app.app npm run test:e2e
  ```

## 🏃‍♂️ Çalıştırma

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```
Build öncesi otomatik olarak:
1. Unit testler çalışır
2. E2E testler çalışır
3. TypeScript kontrolü yapılır
4. Build alınır

### Preview
```bash
npm run preview
```

## 📝 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build (testler dahil)
- `npm run preview` - Build preview
- `npm run test` - Unit testler
- `npm run test:e2e` - E2E testler
- `npm run type-check` - TypeScript kontrolü
- `npm run lint` - Linting
- `npm run format` - Code formatting

## 🎨 Stil ve Tasarım

- **Tailwind CSS v4** - CSS-first configuration
- **Custom Colors**: Primary (#182337) ve tema renkleri
- **Responsive Grid**: 12-column grid system
- **Component-based**: Her bölüm ayrı component

## 🔧 Yapılandırma

### Tailwind CSS
Renkler `src/assets/main.css` içinde `@theme` directive ile tanımlanmıştır.

### Vuex Store
Modüler yapı: `stores/modules/racing.ts` - Racing state management

### Testing
- **Vitest**: `vite.config.ts` içinde yapılandırılmış
- **Playwright**: `playwright.config.ts` içinde yapılandırılmış
- **Test Helpers**: `src/test/helpers/store.ts` - Store mock helper

### Environment Variables

#### E2E Test URL Yapılandırması
Playwright testleri için base URL environment variable ile kontrol edilir:

- **Development** (varsayılan): 
  - `PLAYWRIGHT_BASE_URL` set edilmezse → `http://localhost:5173`
  - Dev server otomatik başlatılır

- **Production/Deploy**:
  ```bash
  # .env dosyası veya CI/CD environment variable
  PLAYWRIGHT_BASE_URL=https://your-app.vercel.app
  ```
  
  Deploy ortamında test çalıştırma:
  ```bash
  PLAYWRIGHT_BASE_URL=https://your-app.vercel.app npm run test:e2e
  ```
## 🎮 Kullanım

1. **Program Oluştur**: "GENERATE PROGRAM" butonuna tıklayın
2. **Yarışı Başlat**: "START" butonuna tıklayın
3. **Yarışı İzle**: Atların pozisyonlarını gerçek zamanlı görün
4. **Sonuçları Gör**: Yarış bitince sonuçlar otomatik kaydedilir
