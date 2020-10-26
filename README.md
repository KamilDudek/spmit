# Sterowanie Produkcją Magazynową i Transportową
Implementacja projektu na zajęcia Sterowanie Produkcją Magazynową i Transportową. Wszystkie materiały związane z projektem można znaleźć w folderze [docs](docs).

## Temat projektu

System wspomagający pracę kuriera. W zależności od natężenia ruchu i ilości paczek, które musi dostarczyć do danych paczkomatów, system wyznacza optymalną trasę pod względem czasu.

## Tablica z zadaniami
Wszystkie taski dotyczące projektu można znaleźć na tablicy [Trello](https://trello.com/b/LDROxPhi/spmit-pempera).

## Praca z projektem

### Commit Message
Przyjmujemy poniższy format commit message

```
<type>: <commit_message>
```

#### Commit Message Type
* **build**: Zmiana która afektuje budowanie projektu lub zależności zewnętrzne
* **docs**: Zmiana w dokumentacji bądź dodatkowych materiałach
* **feature**: Wprowadzenie nowej funkcjonalności
* **bugfix**: Naprawienie błędu
* **refactor**: Zmiana w projekcie, która nic nie naprawia, ani nie dodaje

#### Zasady Commit Message
* używaj imperatywnej formy czasu teraźniejszego: "change", nie "changed" lub "changes"
* nie zaczynaj wielką literą
* nie dodawaj kropki na końcu zdania
* używaj języka angielskiego

### Pull Request
Pracujemy na gałęziach w metodologii `branch per feature`. Staramy się tworzyć małe PR. W opisie PR powinno być dokładnie opisane co on zmienia. Każdy PR musi być zaakceptowany przez przynajmniej jedną inną osobę.

### Development

Ponieważ jest napisany skrypt stawiający backend aplikacji, można to zrobić w jednym kroku. Uprzednio trzeba zainstalować Dockera i docker-compose. Następnie, komenda uruchomi kontener z aplikacją - dla systemu z Linux:
```bash
./main.sh
```
bądź dla systemu Windows:
```bash
.\main-win.bat
```

**UWAGA!**  
W przypadku błędu `standard_init_linux.go:211: exec user process caused „no such file or directory“` trzeba zmienić kodowanie końca linii! Info jak to zrobić u Kamila 😊

Po zbudowaniu kontenera dostępne powinno być API. Można to sprawdzić wchodząć w przeglądarce pod adres `localhost:5000/api/1`.

Przykładowe zapytanie za pomocą cURL, które można wysłać na backend pytając o optymalną drogę:
```bash
curl -X POST -H "Content-type: application/json" -H "Accept: application/json" -d '{"lockers_list": ["WRO88M","WRO911","WRO33A"], "courier_latitude": 51.0, "courier_longitude": 17.0}' "http://localhost:5000/api/1/lockers/route"
```

Jeśli chcemy otrzymać wskazówki:
```bash
curl -X POST -H "Content-type: application/json" -H "Accept: application/json" -d '{"path": ["courier", "WRO88M","WRO911","WRO33A", "courier"], "courier_latitude": 51.09907, "courier_longitude": 17.027580}' "http://localhost:5000/api/1/here_api/directions"
```

Dodano do skryptu również frontend. Ponieważ kontener buduje sobie aplikacje na podstawie folderu node_modules trzeba uprzednio wejść lokalnie w `/spmit/frontend`, a następnie wpisać komendę:
```bash
npm install
```
Komende należy puścić lokalnie, kiedy ktoś dodał jakąś paczkę do node_modules, nie trzeba tego robić za każdym razem! Po zbudowaniu kontenerów, frontend jest dostępny pod `localhost:3000`.
