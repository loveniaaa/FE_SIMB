# FE_SIMB — Frontend Sistem Informasi Manajemen Bantuan

FE_SIMB adalah aplikasi **Frontend** berbasis **React.js** yang digunakan untuk menampilkan UI dari Sistem Informasi Manajemen Bantuan (SIMB). Aplikasi ini berkomunikasi langsung dengan backend (BE_SIMB) melalui REST API dan menyediakan tampilan modern, responsif, serta mudah digunakan oleh user.

Dokumentasi ini mencakup:
- Instalasi Node.js & NPM  
- Instalasi React.js  
- Cara menjalankan FE  
- Struktur project  
- Konfigurasi environment  
- Build & Deployment  
- Troubleshooting  

README ini dibuat **sangat lengkap** agar mudah dibaca oleh anggota tim atau developer baru.

---

# 1. Persyaratan Sistem

Pastikan sistem telah memiliki:

| Komponen | Versi |
|---------|-------|
| Node.js | 18+ |
| NPM | 8+ |
| Git | Latest |
| Browser modern | Chrome/Brave/Firefox |

---

# 2. Instalasi Node.js & NPM

## 2.1 Download Node.js
Unduh dari website resmi:

https://nodejs.org/en/download

Gunakan versi:
```

LTS (Long Term Support)

````

## 2.2 Verifikasi Instalasi
Setelah selesai install:

```bash
node -v
npm -v
````

Contoh output:

```
Node.js: v18.x.x
npm: v8.x.x
```

---

# 3. Instalasi React.js

React.js tidak perlu di-install secara global, karena project ini sudah menggunakan CRA (Create React App) / Vite / Next (sesuaikan project).
Tetapi jika ingin menginstall React CLI:

```bash
npm install -g create-react-app
```

Namun untuk menjalankan FE_SIMB, **cukup clone dan install dependencies**.

---

# 4. Cara Clone Repository

```bash
git clone https://github.com/loveniaaa/FE_SIMB.git
cd FE_SIMB
```

---

# 5. Install Dependencies

Di root project jalankan:

```bash
npm install
```

Ini akan meng-install seluruh library React:

* react
* react-router-dom
* axios
* tailwind / bootstrap (jika digunakan)
* dsb.

---

# 6. Cara Menjalankan Project

Jalankan di mode development:

```bash
npm start
```

Akses pada:

```
http://localhost:3000/
```

Jika port 3000 sudah digunakan, React akan menawarkan port baru otomatis.

---

# 7. Struktur Project

```
FE_SIMB/
├── public/
├── src/
│   ├── assets/            # Gambar, ikon, file statis
│   ├── components/        # Reusable components
│   ├── pages/             # Halaman utama
│   ├── routes/            # Routing aplikasi
│   ├── services/          # API service (axios helper)
│   ├── utils/             # Helper functions
│   └── App.js             # Root component
├── package.json
└── README.md
```

---

# 8. Konfigurasi Environment (opsional)

Jika menggunakan file `.env`, buat:

```
REACT_APP_API_URL=http://localhost:8080
```

Untuk production (hosting), gunakan:

```
REACT_APP_API_URL=https://domain-backend.com
```

Memanggil API:

```js
axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
```

---


# 9. Integrasi ke Backend (BE_SIMB)

Pastikan Backend sudah berjalan di:

```
http://localhost:9900/
```

Set URL backend di file:

```
src/services/api.js
```

Contoh:

```js
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
```

---

# 10. Testing Frontend

Gunakan tools berikut:

* React Testing Library
* Jest
* Cypress (E2E testing)

Contoh script:

```bash
npm run test
```

---

# 11. Troubleshooting

### Error: “npm install failed”

Coba:

```bash
rm -rf node_modules
npm install
```

### Error: “react-scripts: command not found”

```bash
npm install react-scripts
```
