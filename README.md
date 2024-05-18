
___

# Setup

Aby poprawnie uruchomić projekt:

1. Sklonuj repozytorium i otwórz w edytorze kodu (rekomendujemy VSCode'a)
2. Otwórz terminal i przejdź do katalogu z zadaniami ```cd .\Tasks\```
3. Zainstaluj wszystkie wymagane dependencies ```npm install```
4. Uruchom projekt ```npm run dev```

___

# Zadanie 1


### Stworzenie własnego projektu

- Wejdź na stronę [Firebase](https://firebase.google.com/)
- Zapoznaj się z [dokumentacją](https://firebase.google.com/docs)
- Zaloguj się lub załóż konto.
- Stwórz nowy [projekt](https://console.firebase.google.com/)
- Zapoznaj się z dostępnymi możliwościami w projekcie.
- Uruchom usługę Firestore Database.
- Dodaj ręcznie kilka rekordów do bazy Firestore Database.
- Jako potwierdzenie rozwiązania zadania prześlij zrzut ekranu dodanych rekordów.

___

# Zadanie 2

### Logowanie i rejestracja

- Wejdź na stworzony projekt w Firebase:
- a) Project overview -> Project settings -> Your apps -> Add app -> Web -> Config  (Skopiuj config i znajdź w projekcie miejsce, w którym należy go wkleić)
- Authentication -> Sign in method -> Add new provider -> email/password oraz Google (W ten sposób włączysz metody logowania)
- Wszystkie poniższe metody zaimplemtuj w pliku ```useAuth.tsx```:
- b) Zaimplemetuj logowanie przy pomocy 'signInWithEmailAndPassword'
- c) Zaimplemetuj rejestrację przy pomocy 'createUserWithEmailAndPassword'
- d) Zaimplemetuj rejestrację za pomocą Googla 'signInWithGooglePopup'
- Jako potwierdzenie rozwiązania zadania prześlij napisany kod (podpunkty b,c,d)

___

# Zadanie 3

### Pobieranie rekordów z database

- W pliku ```home.page.tsx``` uzupełnij metodę pobierającą rekordy z Firestore Database (te które dodałeś w pierwszym zadaniu).
- Możesz wyświetlić je po prostu w konsoli, ewentualnie zaimplementuj wyświetlanie na frontendzie.
- Jako potwierdzenie rozwiązania zadania prześlij napisany kod.

___

# Zadanie 4 (dodatkowe)

### Inwencja twórcza

- Zaimplementuj to na co masz ochotę
- Sugestia: dodawanie rekordów
