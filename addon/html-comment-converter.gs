// HTML-specific comment handling code

// Helper function to insert comment references in text
function insertHtmlCommentReferences(text, comments) {
  let output = text;
  let commentCounter = 1;

  comments.forEach((comment) => {
    if (comment.quotedText && output.includes(comment.quotedText)) {
      const reference = `<sup class="comment-ref"><a href="#comment${commentCounter}">[${commentCounter}]</a></sup>`;
      output = output.replace(
        comment.quotedText,
        `${comment.quotedText}${reference}`
      );
      commentCounter++;
    }
  });

  return output;
}

// Create HTML comment section
function createHtmlCommentSection(comments) {
  if (!comments || comments.length === 0) return "";

  let output = '\n<h2>Comments</h2>\n<div class="comments">\n';
  let commentCounter = 1;

  comments.forEach((comment) => {
    output += formatHtmlComment(comment, commentCounter++);
  });

  output += "</div>\n";
  return output;
}

// Add necessary CSS for comment styling
function addCommentStyles() {
  return `
<style>
.comments {
  margin-top: 2em;
  padding: 1em;
  border-top: 1px solid #ccc;
}
.comment {
  margin-bottom: 1em;
  padding: 0.5em;
  border-left: 3px solid #ccc;
}
.comment blockquote {
  margin-left: 1em;
  padding-left: 1em;
  border-left: 2px solid #eee;
}
.comment-ref {
  color: #666;
  font-size: 0.8em;
}
</style>
`;
}
