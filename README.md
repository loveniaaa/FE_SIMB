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

# 9. Build untuk Production

```bash
npm run build
```

Hasil build berada pada folder:

```
/build
```

**File ini siap di-deploy ke:**

* Nginx
* Apache
* Netlify
* Vercel
* Firebase Hosting
* cPanel
* VPS (Nginx reverse proxy)

---

# 10. Deployment Guide

### 10.1 Deploy ke Netlify

1. Upload folder `/build`
2. Selesai
3. Set environment variable jika perlu

### 10.2 Deploy ke Vercel

1. Install CLI:

   ```bash
   npm i -g vercel
   ```
2. Deploy:

   ```bash
   vercel
   ```

### 10.3 Deploy ke VPS (Nginx)

Upload hasil build ke:

```
/var/www/simb-frontend
```

Lalu konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name domainAnda.com;

    root /var/www/simb-frontend;

    location / {
        try_files $uri /index.html;
    }
}
```

Restart:

```bash
sudo systemctl restart nginx
```

---

# 11. Integrasi ke Backend (BE_SIMB)

Pastikan Backend sudah berjalan di:

```
http://localhost:8080/
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

# 12. Testing Frontend

Gunakan tools berikut:

* React Testing Library
* Jest
* Cypress (E2E testing)

Contoh script:

```bash
npm run test
```

---

# 13. Troubleshooting

### ❗ Error: “npm install failed”

Coba:

```bash
rm -rf node_modules
npm install
```

### ❗ Error: “react-scripts: command not found”

```bash
npm install react-scripts
```

### Halaman blank setelah deploy

Pastikan Nginx pakai:

```
try_files $uri /index.html;
```

### CORS Error saat fetch data

Perbaiki di backend:

```java
@CrossOrigin(origins = "*")
```

---
