# breed-health-reference

**Vet-reviewed breed health predispositions for companion animals** —
breed → known disease risks → what to screen. 197 breeds (86 dog, 55 cat,
12 rabbit, 22 small pets, 12 birds, 9 reptiles, ferret), 967 predisposition
entries, each with a short screening note and a link to a detailed
Russian-language article where one exists.

> **Status: 1.0 — vet-reviewed.** Extracted from the BioVet breed
> encyclopedia ([bio.vet/wiki/porody/](https://bio.vet/wiki/porody/)) and
> reviewed by licensed veterinarians of the BioVet clinic network (Moscow,
> 20 clinics, 24/7) on 25 Aug 2026 — accepted without corrections.

Breed predisposition lists live scattered across breeder sites and
textbooks and disagree with each other. Every pet app, insurer or breeder
that wants to answer "what should I watch for in a corgi?" rebuilds its
own table. This repo gives developers one reviewed JSON.

## Data

- [`data/breed-health.json`](data/breed-health.json) — `meta` +
  `breeds[]`. Each breed:

```json
{
  "id": "korgi",
  "species": "dog",
  "breed_ru": "Вельш-корги пемброк",
  "size_tag": "Малая порода",
  "lifespan": "12–15 лет",
  "weight": "9–14 кг",
  "predispositions": [
    {
      "name_ru": "Дегенеративная миелопатия",
      "note_ru": "Спина · ДНК-тест SOD1 у заводчика",
      "article": "https://bio.vet/wiki/bolezni/sobaki/degenerativnaya-mielopatiya/"
    }
  ],
  "source": "https://bio.vet/wiki/porody/sobaki/korgi/"
}
```

- `species` ∈ `dog | cat | rabbit | small_pet | bird | reptile | ferret`.
- `note_ru` — "organ system · what to screen / what to do" in one line.
- `article` — deep link to the disease article (nullable).
- `source` — the breed page the entry was extracted from.

Language: Russian (field names in English). See `scripts/validate.mjs`
for the enforced shape — run `node scripts/validate.mjs`.

## Use cases

- Breed-aware checklists in pet apps and clinic CRMs ("your cat is a
  Maine Coon — annual echocardiography is worth discussing").
- Pet insurance risk models.
- Breeder and shelter materials.

## License

Data: CC BY 4.0 — free to use with attribution
("Data: BioVet veterinary clinic network, bio.vet"). Code: MIT.

## Disclaimer

Predisposition ≠ diagnosis. A breed being prone to a condition means it
is worth screening for, not that a given animal has it. Individual
history, lineage and examination matter more than breed. When in doubt,
see a veterinarian.
