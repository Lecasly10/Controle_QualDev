import { assertEquals } from "jsr:@std/assert/equals";
import { assertThrows } from "jsr:@std/assert";
import { convertNbToTab } from '../src/Date.ts';

Deno.test("date général", () => {
  assertEquals(convertNbToTab("22/04/2025"), [22,4,2025]);
})

Deno.test("Jour pas bon format", () => {
  assertThrows(
    () => convertNbToTab("60/04/2025"),
    Error,
    "Jour pas bon format"
  );
});

Deno.test("Date pas au bon format", () => {
  assertThrows(
    () => convertNbToTab("22-04-2025-10"),
    Error,
    "Date pas au bon format"
  );
});

Deno.test("Mois pas bon format", () => {
  assertThrows(
    () => convertNbToTab("22/44/2025"),
    Error,
    "Mois pas bon format"
  );
});

Deno.test("Date au format américain", () => {
  assertThrows(
    () => convertNbToTab("04/22/2025"),
    Error,
    "Date au format américain"
  );
});