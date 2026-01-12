# Analisis Sistem Playground & Code Generator (Edisi Roasting)

Halo Bang, sesuai request, saya sudah bedah sistem playground kamu, terutama yang urusannya sama `*.demo.tsx` dan `code-generator.ts`.

Jujur, pas liat kodingannya, saya agak _mixed feeling_. Antara kagum ini fitur jalan, sama ngeri liat cara kerjanya. Berikut hasil otopsi saya:

## 1. Parsing Code Pakai Regex? (The Cardinal Sin)

**Lokasi:** `src/components/app/playground/code-generator.ts` (Line 21-48)

> _Roast:_
> Bang, ini serius parsing struktur object TypeScript/JS pake Regex?
> `match(/defaultValue\s*:\s*"([^"]+)"/)`?
> Ini kodingan jalur nekat atau lagi cosplay jadi parser?
>
> Bayangin kalau saya tulis kodingannya gini:
>
> ```ts
> defaultValue: "default"; // Ada dua spasi
> ```
>
> Atau gini:
>
> ```ts
> defaultValue: CONSTANT_VALUE;
> ```
>
> Kelar bang sistem lu. Regex-nya bakal bengong gak nemu apa-apa. Ini rapuh banget (brittle). Kena Prettier dikit, fitur lu rusak.

**Saran Teknis:**
Jangan pernah parse code structure pakai Regex kalau mau hidup tenang. Gunakan **AST Parser** (Abstract Syntax Tree).

- Bisa pakai library kayak `ts-morph`, `babel/parser`, atau `jscodeshift`.
- Dengan AST, lu baca struktur kodenya secara programmatik, bukan tebak-tebakan string. Lebih aman, lebih akurat, dan tahan banting terhadap formatting.

## 2. Potensi Code Injection (String Replacement Hazard)

**Lokasi:** `src/components/app/playground/code-generator.ts` (Line 94)

> _Roast:_
>
> ```ts
> code = code.replace(propLineRegex, `\n      ${key}="${value}"`);
> ```
>
> Main templating string buat generate code itu bahaya, bang. Emang sih sekarang `value`-nya dari internal `controlValues`. Tapi kalau suatu saat lu mau fitur ini support "Share via URL" dimana value-nya dari query param, lu ngebuka pintu buat XSS atau Code Injection.
>
> Kalau `value`-nya saya isi: `"><script>alert('pwned')</script>`, user yang copy-paste code hasil generate bakal kena jebakan betmen.

**Saran Teknis:**

- **Sanitasi Input:** Pastikan `value` yang masuk di-escape, terutama karakter quote (`"`, `'`).
- **Gunakan AST Transformer:** Sekali lagi, kalau pakai AST, lu tinggal set property node-nya, library yang bakal urus escaping dan formatting-nya. Aman.

## 3. Inkonsistensi "Dua Wajah" (Runtime vs Static)

**Lokasi:** `use-demo-loader.ts` vs `code-generator.ts`

> _Roast:_
> Di `use-demo-loader.ts`, lu load component pakai `import()` (cara yang benar).
> Tapi di `code-generator.ts`, lu baca file mentah terus di-regex buat cari `controls`.
>
> Ini kayak punya dua pacar tapi gak saling kenal. Kalau logic di file demo berubah dikit yang gak kebaca regex, apa yang dilihat user di preview (hasil `import`) bakal beda sama code yang digenerate (hasil regex). Inkonsisten!

**Saran Teknis:**
Pastikan _source of truth_-nya satu. Idealnya, metadata `controls` itu diekstrak saat build-time atau menggunakan parser yang sama untuk kedua kebutuhan. Jangan biarkan logic parsing manual berbeda dengan logic runtime JS engine.

## 4. Dynamic Import yang Agak Loose

**Lokasi:** `src/components/app/playground/use-demo-loader.ts` (Line 27)

> _Roast:_
>
> ```ts
> import(`@/components/examples/${section}/${demo}`);
> ```
>
> Harap berdoa semoga variable `section` sama `demo` gak bisa diisi aneh-aneh sama user. Walaupun Webpack/Next.js punya batasan context, tapi best practice-nya jangan percaya input mentah masuk ke `import()`.

**Saran Teknis:**
Buat **Whitelist** atau Map yang berisi daftar component yang valid. Validasi input `section` dan `demo` sebelum dipassing ke `import()`. Kalau gak ada di whitelist, lempar error 404.

---

## Kesimpulan

Sistem ini "jalan", tapi fondasinya rapuh seperti kerupuk kena air. Kalau mau project ini long-term dan aman, **WAJIB refactor `code-generator.ts`**. Buang regex-nya, ganti pakai AST parser.

Semangat refactor-nya bang! 🔥
