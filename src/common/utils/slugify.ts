export function slugify(text: string): string {
  return text
    .normalize('NFKD') //separar acentos de letras na formatação unicode (e.g. á -> a + )
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, '') //remove acentos (marcadores Unicode)
    .replace(/[^a-z0-9]/g, ' ') //substituir caracteres não-alfanuméricos por espaços em branco
    .trim()
    .replace(/\s+/g, '-');
}

//DOCS:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
