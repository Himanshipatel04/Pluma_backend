import natural from "natural";
import Blog from "../models/blog.model";

export const checkSimilarity = async (textToCheck) => {
  const similarityThreshold = 0.9;
  const tokenizer = new natural.WordTokenizer();
  const text1Tokens = tokenizer.tokenize(textToCheck.toLowerCase());
   console.log("reachedhere")
  const blogs = await Blog.find({});
  const existingTexts = blogs.map((blog) => blog.content);

  for (let existingText of existingTexts) {
    const text2Tokens = tokenizer.tokenize(existingText.toLowerCase());
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(text1Tokens.join(" "));
    tfidf.addDocument(text2Tokens.join(" "));

    const similarity = natural.JaroWinklerDistance(
      text1Tokens.join(" "),
      text2Tokens.join(" ")
    );

    console.log(similarityThreshold,similarity)

    console.log(similarity);
    if (similarity > similarityThreshold) {
      return true; // Found a similar blog
    }
  }

  return false; // No similar blogs found
};
