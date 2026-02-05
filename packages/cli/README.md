# LibravelUI CLI

Alat baris perintah (CLI) untuk mengintegrasikan LibravelUI ke dalam proyek kamu dengan cara yang bersih dan sesuai standar industri.

## Instalasi

Kamu bisa menjalankan CLI ini langsung menggunakan `npx` atau menginstalnya secara global.

```bash
# Menggunakan npx (Direkomendasikan)
npx libravelui-cli@latest init
```

## Perintah

### `init`

Menginisialisasi proyek kamu dengan tema pilihan dan konfigurasi CSS.

```bash
npx libravelui-cli init
```

**Yang dilakukan perintah ini:**

1. Mengambil daftar tema dari API LibravelUI.
2. Meminta kamu memilih satu tema.
3. Meminta lokasi file CSS global kamu (default: `app/global.css`).
4. Membuat/memperbarui file CSS dengan standard template LibravelUI (termasuk Tailwind @theme mapping).
5. Menyimpan konfigurasi di `config/schema.json`.

### `add`

Menambahkan komponen LibravelUI ke proyek kamu.

```bash
# Menambah komponen tunggal
npx libravelui-cli add button

# Menambah beberapa komponen
npx libravelui-cli add button accordion loader

# Menambah semua komponen yang tersedia
npx libravelui-cli add --all

# Memilih dari list (interaktif)
npx libravelui-cli add
```

**Fitur `add`:**

- **Resolusi Dependensi Otomatis**: Jika sebuah komponen bergantung pada komponen lain (misalnya `button` butuh `loader`), CLI akan secara otomatis menginstal dependensinya.
- **Konfirmasi Override**: Jika file `lib` atau `hooks` sudah ada, CLI akan meminta konfirmasi sebelum menimpa file tersebut.
- **Tanpa Modifikasi CSS**: Perintah `add` tidak akan menyentuh file CSS atau tema kamu, menjaga konfigurasi tetap bersih.

## Struktur Proyek

Setelah inisialisasi, proyek kamu akan memiliki:

- `app/global.css` ( atau lokasi pilihanmu)
- `config/schema.json`
- `components/ui/core/...` (saat kamu menambah komponen)
- `lib/utils.ts`
- `hooks/...`
