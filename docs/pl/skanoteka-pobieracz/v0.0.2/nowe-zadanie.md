---
description: |
  ...
---

# Przygotowywanie zadania

- w folderze `tasks` utwórz plik tekstowy na wzór pliku `test.txt`
- ważne nie usuwaj pliku `test.txt`
- pamiętaj że każdy link do strony musi być w podwójnym cudzysłowie,
- pamiętaj że każdy link musi być poprzedzony wcięciem, a na końcu wersu musi znajdować się przecinek
- pamiętaj że w 1 lini musi być

```toml
  STRONY = [
```

- pamietaj że w następującej linijce po ostatnim linku, musi być

```toml
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
