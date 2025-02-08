// Functions for handling comments from Drive API

function processCommentReplies(reply) {
  return {
    content: reply.content,
    author: reply.author.displayName,
    created: reply.createdTime,
  };
}

function getDocumentComments() {
  const doc = DocumentApp.getActiveDocument();
  const docId = doc.getId();

  try {
    const commentsResponse = Drive.Comments.list(docId, {
      maxResults: 100,
      fields: "*",
    });

    if (!commentsResponse.comments) return [];

    return commentsResponse.comments.map((comment) => ({
      id: comment.id,
      content: cleanHtmlContent(comment.content),
      author: comment.author.displayName,
      created: comment.createdTime,
      quotedText: comment.quotedFileContent
        ? cleanHtmlContent(comment.quotedFileContent.value)
        : null,
      anchor: comment.anchor,
      replies: (comment.replies || []).map(processCommentReplies),
    }));
  } catch (e) {
    Logger.log("Error getting comments:", e.toString());
    return [];
  }
}

// This helper formats comments for Markdown output
function formatMarkdownComment(comment, referenceId) {
  let output = `[${referenceId}] **${comment.author}** (${new Date(
    comment.created
  ).toLocaleString()}): ${comment.content}\n`;

  if (comment.replies && comment.replies.length > 0) {
    comment.replies.forEach((reply) => {
      output += `    > **${reply.author}** (${new Date(
        reply.created
      ).toLocaleString()}): ${reply.content}\n`;
    });
  }

  return output;
}

// This helper formats comments for HTML output
function formatHtmlComment(comment, referenceId) {
  let output = `<div class="comment" id="comment${referenceId}">\n`;
  output += `  <p><strong>${comment.author}</strong> (${new Date(
    comment.created
  ).toLocaleString()}): ${comment.content}</p>\n`;

  if (comment.replies && comment.replies.length > 0) {
    comment.replies.forEach((reply) => {
      output += `  <blockquote><p><strong>${reply.author}</strong> (${new Date(
        reply.created
      ).toLocaleString()}): ${reply.content}</p></blockquote>\n`;
    });
  }

  output += `</div>\n`;
  return output;
}

// Clean HTML content in comment text
function cleanHtmlContent(content) {
  if (!content) return "";
  return content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&quot;/g, '"') // Fix quotes
    .replace(/&#39;/g, "'") // Fix apostrophes
    .replace(/&amp;/g, "&") // Fix ampersands
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}
