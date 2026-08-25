/** Dependency-free validator for data/breed-health.json (CI runs on every push). */
import { readFileSync } from "node:fs";

const errors = [];
const err = (m) => errors.push(m);

const d = JSON.parse(readFileSync(new URL("../data/breed-health.json", import.meta.url), "utf8"));
if (d.meta?.license !== "CC-BY-4.0") err("meta.license must be CC-BY-4.0");
if (!/^\d+\.\d+\.\d+$/.test(d.meta?.version ?? "")) err("meta.version must be semver");

const SPECIES = new Set(["dog", "cat", "rabbit", "small_pet", "bird", "reptile", "ferret"]);
const ids = new Set();
let entries = 0;
for (const b of d.breeds ?? []) {
	const at = `breed "${b.id ?? "?"}"`;
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(b.id ?? "")) err(`${at}: bad id`);
	if (ids.has(b.id)) err(`${at}: duplicate id`);
	ids.add(b.id);
	if (!SPECIES.has(b.species)) err(`${at}: bad species "${b.species}"`);
	if (!/^https?:\/\//.test(b.source ?? "")) err(`${at}: source must be a URL`);
	if (!Array.isArray(b.predispositions) || !b.predispositions.length) err(`${at}: predispositions required`);
	for (const p of b.predispositions ?? []) {
		entries++;
		if (typeof p.name_ru !== "string" || p.name_ru.length < 3) err(`${at}: predisposition name_ru missing`);
		if (p.article != null && !/^https?:\/\//.test(p.article)) err(`${at}: article must be a URL or null`);
	}
}
if (!d.breeds?.length) err("breeds is empty");

if (errors.length) {
	console.error(errors.join("\n"));
	process.exit(1);
}
console.log(`OK: ${d.breeds.length} breeds, ${entries} predisposition entries`);
