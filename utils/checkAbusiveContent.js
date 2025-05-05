import {Filter} from "bad-words";

export function checkAbusiveContent(text) {
  const filter = new Filter();

  filter.removeWords('idiot', 'stupid',"freak","freaking","damn","hell","crap","suck","shut up","shut ur mouth");

  filter.addWords("fuck","shit","asshole","mc","bc","mkb","bkl","bhosdike","madarchod","gandu","gandmasti","gandmard","gand","bhenchod","bhenchodi","bhenchot","bhenchot","bhenchod","bhenchode","madarchod","madarchodi","madarchod","madarchod","madarchode","madarchod","maa ka lauda","maa ka bhosda")

  const isAbusive = filter.isProfane(text);
  const cleanedText = filter.clean(text);

//   console.log("Input Text:", text);
//   console.log("Contains Abusive Language:", isAbusive);
//   console.log("Cleaned Text:", cleanedText);

  return isAbusive;
}
