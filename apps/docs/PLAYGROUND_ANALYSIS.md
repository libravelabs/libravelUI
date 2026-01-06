# Analisis Sistem Playground & Demo

Halo, saya sudah membedah sistem playground kamu, terutama bagian `Playground.tsx`, `playground-context.tsx`, dan file `*.demo.tsx`. Berikut adalah hasil otopsi saya.

## 🚨 Temuan Kritis: "Self-DoS" (Denial of Service)

Kamu punya bom waktu di kode kamu sendiri. Coba lihat ini:

**Di `basic.demo.tsx` (dan demo lainnya):**

```tsx
useDynamicCode({ selectionMode, orientation, size, isDisabled });
```

Setiap kali komponen ini render, kamu membuat object baru `{...}`. Referensi object ini **selalu berbeda** di memori.

**Di `playground-context.tsx`:**

```tsx
export function useDynamicCode(controls: PlaygroundControls): void {
  const playground = usePlayground();
  const setControls = playground?.setControls;

  useEffect(() => {
    // ...
    const timeoutId = setTimeout(() => {
      setControls(controls); // Memicu update state di Context
    }, 100);
    // ...
  }, [controls, setControls]); // Dependency 'controls' selalu berubah!
}
```

**Alur Bencana:**

1. `Demo` render -> bikin object `controls` baru.
2. `useEffect` di `useDynamicCode` jalan karena `controls` baru.
3. `setControls` dipanggil -> Context update.
4. Context update -> semua consumer re-render, termasuk `Demo` kamu (karena dia panggil `usePlayground` via `useDynamicCode`).
5. `Demo` render lagi -> bikin object `controls` baru lagi.
6. **ULANGI TERUS SAMPAI BROWSER MELEDAK.**

Kamu cuma selamat karena ada `setTimeout` 100ms, jadi browsernya "cuma" ngelag parah, bukan langsung crash. Tapi ini arsitektur yang sangat rapuh. Kamu pada dasarnya melakukan DDOS ke browser user sendiri setiap 100ms.

## 🔓 Celah Keamanan & Bad Practice

### 1. Uncontrolled Prop Spreading (Lazy Coding)

Di `Playground.tsx`:

```tsx
<Component {...controls} />
```

Kamu menyebar (spread) _semua_ yang ada di `controls` langsung ke komponen target.

- **Risiko**: Jika komponen target punya props sensitif (misal `dangerouslySetInnerHTML`, `ref`, atau internal flags yang tidak seharusnya diakses publik), user bisa meng-inject nilai ke sana lewat controls.
- **Konteks**: Ini playground, jadi mungkin "fitur", tapi ini kebiasaan buruk. Bayangkan kalau ada prop `className` dan user iseng masukin class yang merusak layout global atau `style` yang aneh-aneh.

### 2. Tipe Data `unknown` & Tanpa Validasi

```tsx
export type PlaygroundControls = Record<string, unknown>;
```

Kamu pakai `unknown` dan tidak ada validasi sama sekali (misal pakai Zod). Kamu percaya begitu saja data dari `demo` file. Kalau nanti demo file-nya kompleks atau ambil data dari API, ini bakal jadi sumber bug yang susah dilacak.

## 🔥 Roasting Time

> "useEffect itu buat side-effect, bukan buat main ping-pong state yang bikin infinite loop."

Sistem kamu ini ibarat orang yang nelpon dirinya sendiri, terus kaget kenapa nadanya sibuk terus.

- **Arsitektur**: Konsep "Child push state ke Parent, Parent push balik ke Child" itu resep bencana di React kalau gak hati-hati. Dan kamu... kurang hati-hati.
- **Lazy Spreading**: `<Component {...controls} />` itu setara dengan bilang "Nih ambil semua dompet gw, terserah mau ambil duit, KTP, atau foto mantan". Sangat tidak aman dan malas.

## 💡 Saran Perbaikan (Actionable)

### 1. Fix Infinite Loop (URGENT)

Gunakan `JSON.stringify` atau `deep comparison` untuk mengecek apakah controls benar-benar berubah, ATAU bungkus object di demo dengan `useMemo`.

**Opsi A (Di Hook - Lebih Aman):**

```tsx
// playground-context.tsx
import { useDeepCompareEffect } from "use-deep-compare"; // Atau bikin custom hook sendiri

export function useDynamicCode(controls: PlaygroundControls): void {
  // ...
  // Cek isi object, bukan referensinya
  useEffect(() => {
    if (JSON.stringify(prevControls) !== JSON.stringify(controls)) {
      setControls(controls);
    }
  }, [controls]);
}
```

**Opsi B (Di Demo - Ribet):**

```tsx
// basic.demo.tsx
const controls = useMemo(
  () => ({
    selectionMode,
    orientation,
    size,
    isDisabled,
  }),
  [selectionMode, orientation, size, isDisabled]
);

useDynamicCode(controls);
```

### 2. Validasi Controls

Jangan asal terima `unknown`. Definisikan skema untuk controls jika memungkinkan, atau setidaknya batasi props apa saja yang boleh di-pass ke komponen.

### 3. Isolasi State

Pertimbangkan untuk membalik dependensinya. Daripada Demo nge-push state ke Context, mending Context yang pegang state, dan Demo cuma render input yang mengubah state di Context.
Jadi: `Context State` -> `Demo (Controls)` & `Preview (Component)`.
Bukan: `Demo` -> `Context` -> `Preview`.

Sekian analisisnya. Perbaiki loop itu sebelum laptop user meleleh. 🔥
