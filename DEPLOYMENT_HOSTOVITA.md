# Wdrozenie na Hostovita VPS

Ten projekt wymaga `VPS`, a nie zwyklego hostingu wspoldzielonego, bo:

- `apps/web` to aplikacja `Next.js` uruchamiana jako proces `Node.js`,
- `apps/cms` to `Strapi`, ktore tez musi dzialac stale jako proces `Node.js`,
- formularze kontaktowe i wyceny dzialaja przez `Next.js API` i zapis do `Strapi`.

Najprostszy i bezpieczny uklad produkcyjny:

- strona: `https://twojadomena.pl`
- CMS: `https://cms.twojadomena.pl`
- reverse proxy: `Nginx`
- procesy: `PM2`
- baza dla Strapi: najlepiej `MariaDB/MySQL` albo `PostgreSQL`

## 1. Co przygotowac w Hostovita

- VPS z Linuxem, najlepiej Ubuntu 22.04 lub 24.04
- dostep SSH
- dwie domeny lub subdomena:
  - `twojadomena.pl` dla frontendu
  - `cms.twojadomena.pl` dla Strapi
- certyfikaty SSL dla obu adresow

## 2. Instalacja pakietow na serwerze

```bash
sudo apt update
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Sprawdz:

```bash
node -v
npm -v
pm2 -v
```

## 3. Wgranie projektu

Wgraj repozytorium do katalogu, np.:

```bash
/var/www/wftwebsite
```

Potem:

```bash
cd /var/www/wftwebsite
npm install
```

## 4. Zmienne srodowiskowe

### Frontend `apps/web/.env.production`

```env
STRAPI_URL=https://cms.twojadomena.pl
STRAPI_API_TOKEN=TU_WKLEJ_TOKEN_Z_STRAPI
NEXT_PUBLIC_SITE_URL=https://twojadomena.pl
PORT=3000
```

### Strapi `apps/cms/.env`

Minimalna wersja:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=losowy_klucz_1,losowy_klucz_2,losowy_klucz_3,losowy_klucz_4
API_TOKEN_SALT=losowy_token_salt
ADMIN_JWT_SECRET=losowy_admin_jwt_secret
TRANSFER_TOKEN_SALT=losowy_transfer_token_salt
JWT_SECRET=losowy_jwt_secret
ENCRYPTION_KEY=losowy_encryption_key
```

Jesli uruchamiasz Strapi na bazie `MariaDB/MySQL`, dodaj:

```env
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=wft_strapi
DATABASE_USERNAME=wft_user
DATABASE_PASSWORD=twoje_haslo
DATABASE_SSL=false
```

Jesli bardzo chcesz uruchomic szybko i bez osobnej bazy, kod obsluzy tez `sqlite`, ale na produkcji bezpieczniej wybrac `MariaDB/MySQL` albo `PostgreSQL`.

## 5. Build obu aplikacji

```bash
cd /var/www/wftwebsite
npm run build:cms
npm run build:web
```

## 6. Start przez PM2

W repo jest gotowy plik:

- `ecosystem.config.cjs`

Uruchom:

```bash
cd /var/www/wftwebsite
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Sprawdz status:

```bash
pm2 status
pm2 logs wft-web
pm2 logs wft-cms
```

## 7. Konfiguracja Nginx

### Frontend `twojadomena.pl`

```nginx
server {
    server_name twojadomena.pl www.twojadomena.pl;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Strapi `cms.twojadomena.pl`

```nginx
server {
    server_name cms.twojadomena.pl;

    client_max_body_size 64M;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Po zapisaniu:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL

Jesli certyfikaty nie sa juz wystawione w panelu Hostovita, najprosciej uzyc `certbot`:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d twojadomena.pl -d www.twojadomena.pl
sudo certbot --nginx -d cms.twojadomena.pl
```

## 9. Konfiguracja Strapi pod formularze

Po uruchomieniu `Strapi`:

1. Zaloguj sie do panelu admina.
2. Utworz `API Token`.
3. Daj mu uprawnienia:
   - `find` dla `categories`
   - `find` dla `products`
   - `create` dla `quote-requests`
4. Wklej ten token do:
   - `apps/web/.env.production` jako `STRAPI_API_TOKEN`
5. Zrestartuj frontend:

```bash
pm2 restart wft-web
```

## 10. Jak dzialaja formularze w tej wersji

Obecnie:

- formularz kontaktowy
- formularz wyceny

nie wysylaja maila bezposrednio. Zapisują rekord do kolekcji `Quote Request` w `Strapi`.

To oznacza, ze po wdrozeniu formularze beda dzialac, jesli:

- frontend widzi `Strapi` pod `STRAPI_URL`,
- token ma prawo `create` do `quote-requests`,
- baza `Strapi` dziala poprawnie.

## 11. Jesli chcesz rowniez powiadomienia e-mail

Wtedy trzeba dodac drugi krok:

- konfiguracje providera e-mail w `Strapi`, albo
- wysylke maila z poziomu `Next.js API route`

Na ten moment repo zapisuje zapytania do CMS, ale nie wysyla jeszcze automatycznych maili.

## 12. Szybki test po wdrozeniu

1. Otworz strone glowna.
2. Sprawdz, czy laduja sie obrazy produktow ze `Strapi`.
3. Wyslij formularz kontaktowy.
4. Wyslij formularz wyceny z poziomu produktu.
5. Wejdz do `Strapi` i sprawdz, czy pojawily sie wpisy w `Quote Request`.

## 13. Typowe problemy

- `500` przy formularzu:
  - zly `STRAPI_URL`
  - brak `STRAPI_API_TOKEN`
  - token bez uprawnienia `create` dla `quote-requests`
- brak obrazow:
  - zly adres `STRAPI_URL`
  - zla subdomena dla CMS
- `502 Bad Gateway`:
  - `PM2` nie uruchomil procesu
  - `Nginx` proxy wskazuje zly port
- `403` z CMS:
  - token API ma zbyt male uprawnienia
