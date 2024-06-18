# skanoteka-pobieracz

aby móc skorzystać potrzebujesz

- zainstalować darmowe środowisko wykonawcze DENO
- utworzyć plik zadania (dla wygody polecam darmowy edytor VSCODE)
- uruchomić program (ewentualnie dostosować do swoich potrzeb)
- jak tego urzyć?
  - pobierz w terminalu/konsoli
   ```shell
    git clone https://github.com/j-Cis/skanoteka-pobieracz.git
   ```
  - liknij pobierz "Source code" na stronie <https://github.com/j-Cis/skanoteka-pobieracz/releases>

## `1.` Instalowanie DENO

Możesz to zrobić na wiele sposobów

### używając PowerShell (Windows)

wpisz w terminal komendę i kliknij enter

```shell
irm https://deno.land/install.ps1 | iex
```

### używając Shell (macOS/Linux)

wpisz w terminal komendę i kliknij enter

```shell
 curl -fsSL https://deno.land/install.sh | sh
```

### pozostałe metody

znajdziejsz na stronie oficjalnej
<https://docs.deno.com/runtime/manual/getting_started/installation>

## `2.` Instalowanie VSCODE (opcjonalnie)

oficjalna strona
<https://code.visualstudio.com/>

## `3.` Przygotowywanie zadania

- w folderze `tasks` utwórz plik tekstowy na wzór pliku `test.txt`
- ważne nie usuwaj pliku `test.txt`
- pamiętaj że każdy link do strony musi być w podwójnym cudzysłowie,
- pamiętaj że każdy link musi być poprzedzony wcięciem, a na końcu wersu musi znajdować się przecinek
- pamiętaj że w 1 lini musi być

  ```
  STRONY = [
  ```

- pamietaj że w następującej linijce po ostatnim linku, musi być

  ```
  ]

  [METRYCZKA]
  ZESPOL_SYGNATURA    = "44444"
  JEDNOSTKA_SYGNATURA = "1331"
  ```

- pamiętaj że w metryczce obowiązkowymi polami są pola sygnaturalne! (zamieszczone powyżej)
- Możesz dodawać dowolne inne pola do metryczki
  - pamiętając by w nazwie pola nie było
    - spacji
    - znaków specjalnych za wyjątkiem znaku podkreślenia
    - innych znaków niż znaki z alfabetu angielskiego i cyfr
  - pamietaj że wielkość znaków ma znaczenie
  - pamiętaj że tylko i wyłącznie liczby mogą być nie być w cudzysłowie
- Pamiętaj że ostatnia linia dokumentu musi być pusta

Przykładowy plik zadania

```toml
STRONY = [
  "https://sadowe.genealodzy.pl/index.php?op=pg&amp&id=2456&amp&se=5&amp&sy=18&amp&kt=&amp&plik=087.jpg",
  "https://sadowe.genealodzy.pl/index.php?op=pg&amp&id=2456&amp&se=5&amp&sy=18&amp&kt=&amp&plik=088.jpg",
  "https://sadowe.genealodzy.pl/index.php?op=pg&amp&id=2456&amp&se=5&amp&sy=18&amp&kt=&amp&plik=089.jpg",
  "https://sadowe.genealodzy.pl/index.php?op=pg&amp&id=2456&amp&se=5&amp&sy=18&amp&kt=&amp&plik=090.jpg",
  "https://sadowe.genealodzy.pl/index.php?op=pg&amp&id=2456&amp&se=5&amp&sy=18&amp&kt=&amp&plik=091.jpg",
]

[METRYCZKA]
ZESPOL_SYGNATURA = "44444"
JEDNOSTKA_SYGNATURA = "1331"
ZESPOL_OPIS = "Sądy różne - zbiór szczątków zespołów"
SERIA_OPIS = "Forum Nobilium"
JEDNOSTKA_OPIS = "Acta successionalia et pupillaria"
JEDNOSTKA_LATA_OD = 1739
JEDNOSTKA_LATA_DO = 1804

```

## `4.a.` Uruchamianie zadania z terminala/konsoli

```shell
deno task start --zadanie=test
```

gdzie zamiast `test` należy wpisać nazwę utworzonego zadania a następnie kliknąć enter i nie zamykać okna do ukończenia, co może być czasochłonne

## `4.b.` Uruchamianie zadania poprzez kliknięcie dwukrotne pliku `start.cmd` lub `start.bat`

przed uruchomieniem ważne jest by zastąpić w pliku `start.cmd` lub `start.bat` wyraz `test` nazwę utworzonego zadania a następnie zapisać zmiany i uruchomić jeden z tych plików, oba robią dokładnie to samo co punkt `4.a.` ważne by i tu nie zamykać okna do ukończenia, co może być czasochłonne

## `5` dostosowywanie programu

Domyślnie aby nie przeciążyć serwera ustawione jest tylko 6 operacji na minute.
Można to zmienić w pliku `ustawienia.ts`

```typescript
const OPERACJE_NA_MINUTE:number = 6;
```

------

## KONIEC

s
