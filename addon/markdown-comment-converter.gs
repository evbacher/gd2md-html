// Markdown-specific comment handling code

// Helper function to insert comment references in text
function insertMarkdownCommentReferences(text, comments) {
  let output = text;
  let commentCounter = 1;

  comments.forEach((comment) => {
    if (comment.quotedText && output.includes(comment.quotedText)) {
      output = output.replace(
        comment.quotedText,
        `${comment.quotedText}[${commentCounter}]`
      );
      commentCounter++;
    }
  });

  return output;
}

// Create Markdown comment section
function createMarkdownCommentSection(comments) {
  if (!comments || comments.length === 0) return "";

  let output = "\n## Comments\n\n";
  let commentCounter = 1;

  comments.forEach((comment) => {
    output += formatMarkdownComment(comment, commentCounter++);
    output += "\n";
  });

  return output;
}
