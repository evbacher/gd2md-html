/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// *** gdc.gs ***
//
// Main code for gd2md-html add-on.
// File info:
//  * addon.gs: addon code
//  * gdc.js: common functions: includes md and util objects
//  * html.gs: HTML-specific functions
//  * sidebar.html: the client-side UI

// NOTE: Markdown is primary target. HTML conversion is a bonus.

// NOTE: Some of these files are rather large because the Apps Script versioning is so
// bad, I need to make frequent backup copies for fear of losing work at
// good checkpoints. Now using Docs as backup for important checkpoints.

// This code is intentionally simple (or at least that's the idea). Trying to channel
// Kernighan and Pike with simplicity and clarity.
// Trying to be general for Markdown/HTML support.

// General note: be careful about putting newlines or whitespace into Markdown output.

// NOTE: Check these before publishing! (and remove β if appropriate)
var DEBUG = false;
var LOG = false;
var GDC_TITLE = 'Docs to Markdown'; // formerly GD2md-html, formerly gd2md-html
var GDC_VERSION = '1.0β39'; // based on 1.0β38

// Version notes: significant changes (latest on top). (files changed)
// - 1.0β39 (7 Oct 2024): Added center/right alignment to HTML paragraph and heading handling. Will add text-align: center/right depending on paragraph formatting. (html, gdc)
// - 1.0β38 (21 Sept 2024): Italic/bold markup default is now */**: _/__ is now an option. Reckless mode now includes Suppress info comment (removed sidebar option too). Also add a News link to gd2md-html news page in sidebar. (sidebar, gdc)
// - 1.0β37 (31 August 2024): Add a Questions link to gd2md-html Google group in sidebar (no functional changes).
/* - 1.0β36 (26 April 2024): Update required permissions: set explicitly in appsscript.json. No code changes. Using these Oauth scopes:
    "oauthScopes": [
        "https://www.googleapis.com/auth/documents.currentonly",
        "https://www.googleapis.com/auth/script.container.ui"
        ],
*/
// - 1.0β35 (20 Nov. 2023): No info comments if "Suppress info comments selected." Also remove clipboard success text. If errors, there will be an informational error comment.
// - 1.0β34 (12 Dec. 2022): Clarify note about TOC -- needs blue links to create intra-doc links). (gdc)
// - 1.0β33 (8 Jan. 2022): Add reckless mode (no warnings or inline alerts). (sidebar, gdc, html)
// - 1.0β32 (7 Jan. 2022): Make the Donate button more obvious. (gdc, sidebar)
// - 1.0β31 (24 Aug. 2021): Don't contain <hr> in <p> for HTML. (gdc)
// - 1.0β30 (1 July 2021): Reduce whitespace after list item (bullets, numbers) in Markdown. (gdc)
// - 1.0β29: Handle partial selections correctly (expand to whole paragraph). (gdc)
// - 1.0β28: Add Coffee button. UI change only. (gdc, sidebar)
// - 1.0β27: Copy output to clipboard. Print success/error messages for clipboard output (see chromium bug 1074489). (gdc, sidebar)
// - 1.0β26: Render soft line breaks correctly in HTML (<br> not &lt;br>). (gdc)
// - 1.0β25: Use image path in this form: images/image1.png, images/image2.png, etc. Clean up old zip image code. (gdc,html,sidebar)
// - 1.0β24: Correct a spelling error (s/Supress/Suppress). (gdc)
// - 1.0β23: Copy converted output to the clipboard. Add option to suppress top comment. Add copyright comment, note about Docs link. (gdc, html, sidebar, addon)
// - 1.0β22: Roll back font-change runs for now (still causing problems), but keep table note. (gdc)
// - 1.0β21: Add a note that tables are currently converted to HTML tables. No change to rendered conversion. (gdc, html)
// - 1.0β20: Handle font-change runs with extra whitespace better (italic, bold, etc.). (gdc)
// - 1.0β19: Fix for angle bracket at beginning of a line. Also: use doc title instead of URL in conversion comment. (gdc)
// - 1.0β18: Escape HTML tags by default, render them optionally (gdc, html, sidebar)
// - 1.0β17: Convert smart quotes to straight quotes in code, but leave them alone in other text. (gdc)
// - 1.0β16: Handle simple nested lists properly in HTML conversion (Markdown already works well). (gdc, html)
// - 1.0β15: Number ordered list items sequentially (instead of using 1. for all items). (gdc)
// - 1.0β14: Name change to Docs to Markdown: now published on G Suite Marketplace. (gdc)
//   G Suite Marketplace URL: https://gsuite.google.com/marketplace/app/docs_to_markdown/700168918607
// - 1.0β13: Close strikethrough text properly at the end of a paragraph. (gdc)
// - 1.0β12: Convert strikethrough test. (gdc)
// - 1.0β11: Fix small bug: replace bufout with bufHTML. Remove version number from banner. Retitle. (gdc, addon)
// - 1.0β10: Handle soft line-breaks (shift-enter) properly. (gdc)
// - 1.0β9: Handle embedded paragraphs in list items for Markdown. (gdc)
// - 1.0β8: Use _ instead of * for italic markup to avoid ambiguity (Markdown). (gdc)
// - 1.0β7: Warn if DEBUG is true. (gdc, html)
// - 1.0β6: Ignore headings that are blank or just contain whitespace. (gdc)
// - 1.0β5: Warn about multiple H1 headings, but only in the top comment, not inline. (gdc)
// - 1.0β4: Don't wrap HTML by default. Add checkbox option to wrap HTML. For footnotes also. (gdc, sidebar)
// - 1.0β3: Escape angle brackets (<) in HTML code blocks. (gdc, html)
// - 1.0β2: Check for spurious 0-row table. Fix image path for placeholder links. (gdc, html)
// - 1.0β: initial release of gd2md-html (addon, gdc, html, sidebar)

var gdc = gdc || {};

gdc.docTypes = {
  md: 'Markdown',
  html: 'HTML',
};

gdc.log = function(text) {
  if (LOG) {
    Logger.log(text);
    gdc.info += '\n' + text;
  }
};

gdc.debug = function(text) {
  if (DEBUG) {
    gdc.writeStringToBuffer('\n<p style="color: green; font-weight: bold">DEBUG: ' + text + '</p>\n\n');
  }
};

// Set up any config from client side config object.
// Don't change original config values.
gdc.config = function(config) {
  if (config.italicBoldUnderscores === true) {
    gdc.italicBoldUnderscores = true;
  }
  if (config.demoteHeadings === true) {
    gdc.demoteHeadings = true;
  }  
  if (config.htmlHeadings === true) {
    gdc.htmlHeadings = true;
  }
  if (config.wrapHTML === true) {
    gdc.wrapHTML = true;
  }
  if (config.renderHTMLTags === true) {
    gdc.renderHTMLTags = true;
  }
  if (config.suppressInfo === true) {
    gdc.suppressInfo = true;
  }
  if (config.recklessMode === true) {
    gdc.recklessMode = true;
    gdc.suppressInfo = true;
  }
};

// Setup for each conversion run (called from addon.gs).
gdc.init = function(docType) {
  gdc.docType = docType;
  
  // Assume we're not in code or a code block to start.
  gdc.isCode = false;
  gdc.inCodeBlock = false;

  // Current markup to use. See gdc.useMarkdown(), gdc.useHtml().
  gdc.useMarkdown();
  //gdc.markup = gdc.mdMarkup;

  gdc.startTime = new Date().getTime();

  gdc.warningCount = 0;
  gdc.errorCount = 0;
  gdc.alertCount = 0;

  gdc.hasTables = false;

  gdc.h1Count = 0;   // We want to keep track of multiple H1s.

  gdc.buffer = '';   // buffer for storing text before conditioning and output.
  gdc.fnBuffer = ''; // buffer for storing footnotes before conditioning and output.
  gdc.out = '';

  // gdc.info is a string of useful information about the conversion that we print at the top.
  gdc.info =  '';
  // Hint about what to do with this output (note output type).
  gdc.info += '\n\nUsing this ' + gdc.docType + ' file:';
  gdc.info += '\n\n1. Paste this output into your source file.';
  gdc.info += '\n2. See the notes and action items below regarding this conversion run.';

  gdc.info += '\n3. Check the rendered output (headings, lists, code blocks, tables) for proper';
  gdc.info += '\n   formatting and use a linkchecker before you publish this page.';

  gdc.info += '\n\nConversion notes:';
  gdc.info += '\n\n* ' + GDC_TITLE + ' version ' + GDC_VERSION;
  gdc.info += '\n* ' + Date();


  // Keep track of numbered lists.
  gdc.listCounters = {};
  gdc.isList = false;
  
  gdc.inHeading = false;

  // Footnotes.
  gdc.isFootnote = false;
  gdc.footnoteNumber = 0;
  gdc.footnoteIndent = '<footnoteindent>';
  gdc.footnotes = [];

  // Images
  gdc.defaultImagePath = 'images/'; // relative to page dir
  gdc.imgName = '';
  gdc.imageCounter = 0;
  gdc.attachments = [];

}; // end gdc.init()


// Some flag defaults. (Should these be in state object?)
gdc.isHTML = false;
gdc.isTable = false;
gdc.isMixedCode = false;
gdc.mixedCodeEnd = -1;
gdc.isToc = false;

// Some setup for alert messages.
// Did we have to call gdc.alert()?
gdc.alertMessage = '';
gdc.chevrons = '>>>>> ';
gdc.alertPrefix = gdc.chevrons + ' gd2md-html alert: ';

// We'll assign a function to this during conversion.
gdc.writeBuf = function() {};

// Force H1 -> H2, etc.
gdc.demoteHeadings = false;

// Some state variables for handling lists.
gdc.ul = 0;
gdc.ol = 1;

// Some state variables, with default values.
gdc.state = {
  isHTML:      false,
  isMixedCode: false,
};

// Markdown markup.
gdc.mdMarkup = {

  // Font changes
  codeOpen:    '`',
  codeClose:   '`',
  italicOpen:  '*',
  italicClose: '*',
  boldOpen:    '**',
  boldClose:   '**',
  strikethroughOpen:  '~~',
  strikethroughClose: '~~',
  underlineOpen: '<span style="text-decoration:underline;">',
  underlineClose: '</span>',

  // Paragraph, lists
  pOpen:        '<newline>',
  pClose:       '<newline>',
  ulOpen:       '<newline>',
  ulClose:      '<newline>',
  olOpen:       '<newline>',
  olClose:      '<newline>',
  ulItem:       '* ',
  olItem:       '1. ',
  liClose:      '',

  hr:           '<newline><newline>---<newline>',

  // description/definition lists (Markdown)
  dlOpen:      '\n\n',
  dlClose:     '\n\n',
  dtOpen:      '\n',
  dtClose:     '\n',
  ddOpen:      ': ',
  ddClose:     '',

  // subscript, superscript
  subOpen:     '<sub>',
  subClose:    '</sub>',
  superOpen:   '<sup>',
  superClose:  '</sup>',
};

// Mixed markup: html for inline font spans only.
gdc.mixedMarkup = {

  // Font changes
  codeOpen:    '<code>',
  codeClose:   '</code>',
  italicOpen:  '<em>',
  italicClose: '</em>',
  boldOpen:    '<strong>',
  boldClose:   '</strong>',
  strikethroughOpen:  '<del>',
  strikethroughClose: '</del>',
  underlineOpen: '<span style="text-decoration:underline;">',
  underlineClose: '</span>',

  // Paragraph, lists
  pOpen:        '<newline>',
  pClose:       '<newline>',
  ulOpen:       '',
  ulClose:      '',
  olOpen:       '',
  olClose:      '',
  ulItem:       '* ',
  olItem:       '1. ',
  liClose:      '',

  hr:           '<newline><newline>---<newline>',

  // description/definition lists (HTML)
  dlOpen:      '\n\n<dl>',
  dlClose:     '</dl>\n',
  dtOpen:      '\n  <dt>',
  dtClose:     '</dt>',
  ddOpen:      '\n   <dd>',
  ddClose:     '</dd>',

  // subscript, superscript
  subOpen:     '<sub>',
  subClose:    '</sub>',
  superOpen:   '<sup>',
  superClose:  '</sup>',
};

// HTML markup.
gdc.htmlMarkup = {

  // Font changes
  codeOpen:    '<code>',
  codeClose:   '</code>',
  italicOpen:  '<em>',
  italicClose: '</em>',
  boldOpen:    '<strong>',
  boldClose:   '</strong>',
  strikethroughOpen:  '<del>',
  strikethroughClose: '</del>',
  underlineOpen: '<span style="text-decoration:underline;">',
  underlineClose: '</span>',

  pOpen:       '\n<p>\n',
  pClose:      '\n</p>',
  ulOpen:      '\n<ul>',
  ulClose:     '\n</ul>',
  olOpen:      '\n<ol>',
  olClose:     '\n</ol>',
  ulItem:      '\n<li>',
  olItem:      '\n<li>',
  liClose:     '\n</li>',

  hr:           '\n<hr>',

  // description/definition lists (HTML)
  dlOpen:      '\n\n<dl>',
  dlClose:     '</dl>\n',
  dtOpen:      '\n  <dt>',
  dtClose:     '</dt>',
  ddOpen:      '\n   <dd>',
  ddClose:     '</dd>',

  // subscript, superscript
  subOpen:     '<sub>',
  subClose:    '</sub>',
  superOpen:   '<sup>',
  superClose:  '</sup>',
};

// Currently open text attributes.
gdc.openAttrs = [];
// Attribute names for openAttrs.
gdc.bold = 'b';
gdc.code = 'c';
gdc.italic = 'i';
gdc.strikethrough = 's';
gdc.underline = 'u';
gdc.subscript = 'sub';
gdc.superscript = 'sup';

// Constants for text alignment types.
var
  NORMAL = DocumentApp.TextAlignment.NORMAL,
  SUBSCRIPT = DocumentApp.TextAlignment.SUBSCRIPT,
  SUPERSCRIPT = DocumentApp.TextAlignment.SUPERSCRIPT;

// Constants for the various element types. This is really for convenience.
// These are types contained in BODY. See the enum DocumentApp.ElementType.
// We are ignoring the top-level elements like HEADER_SECTION.
var
  PARAGRAPH = DocumentApp.ElementType.PARAGRAPH,
  LIST_ITEM = DocumentApp.ElementType.LIST_ITEM,
  TEXT = DocumentApp.ElementType.TEXT,

  TABLE = DocumentApp.ElementType.TABLE,
  TABLE_CELL = DocumentApp.ElementType.TABLE_CELL,
  TABLE_ROW = DocumentApp.ElementType.TABLE_ROW,

  TABLE_OF_CONTENTS = DocumentApp.ElementType.TABLE_OF_CONTENTS,

  FOOTNOTE = DocumentApp.ElementType.FOOTNOTE,
  FOOTNOTE_SECTION = DocumentApp.ElementType.FOOTNOTE_SECTION,
  FOOTER_SECTION = DocumentApp.ElementType.FOOTER_SECTION,
  HEADER_SECTION = DocumentApp.ElementType.HEADER_SECTION,

  PAGE_BREAK = DocumentApp.ElementType.PAGE_BREAK,
  HORIZONTAL_RULE = DocumentApp.ElementType.HORIZONTAL_RULE,
  INLINE_DRAWING = DocumentApp.ElementType.INLINE_DRAWING,
  INLINE_IMAGE = DocumentApp.ElementType.INLINE_IMAGE,
  UNSUPPORTED = DocumentApp.ElementType.UNSUPPORTED,
  EQUATION = DocumentApp.ElementType.EQUATION;

  // Heading links and ids gleaned from the TOC, if present.
  gdc.hasToc = false;
  gdc.htmlHeadings = false; // HTML headings and IDs (for md conversion only)
  gdc.headingLinks = {};
  gdc.headingIds = {};
  // Keep track of id duplicates
  gdc.idIndex = 0;
  gdc.idDups = {};

// Gets the working document, either by URL or from active doc.
gdc.getDoc = function(docsUrl) {
  var doc;

  if (docsUrl) {
    try {
      doc = DocumentApp.openByUrl(docsUrl);
    } catch(e) {
      return 'ERROR opening doc URL: ' + e
        + '\ndocsURL: ' + docsUrl + '\n';
    }
  } else {
    try {
      doc = DocumentApp.getActiveDocument();
    } catch(e) {
      return 'ERROR opening active document: ' + e + '\n\n';
    }
  }

  // We have the doc now. Get some info.
  try {
    gdc.docName = doc.getName();
  } catch(e) {
    return 'ERROR calling getName(): ' + e + '\n\n';
  }

  return doc;
};

// Note that this will be undefined if there is no selection.
// Caller should check.
gdc.getSelection = function() {
  return gdc.getDoc().getSelection();
};

// Returns text from the selection.
gdc.getSelectionText = function (selection) {
  var elements = selection.getRangeElements();
  var text = '';

  // Collect the text from each text element. (Ignore non-text elements.)
  for (var i = 0, z = elements.length; i < z; i++) {
    var element = elements[i];

    // Only consider elements that can be edited as text.
    if (element.getElement().editAsText) {
      text += element.getElement().getText();
    }
  }
  return text;
};

// Get body elements.
gdc.getElements = function() {
  var elements;

  // Note that Document is different from Selection!
  var selection = gdc.getSelection();
  var numChildren = 0;

  // Note the doc name (title) in the conversion notes.
  gdc.info += '\n* Source doc: ' + gdc.docName;

  // Check that there actually is a partial selection. See Range, RangeElement.
  // Do selection first, then whole body if no partial selection, to save processing.
  if (selection) {
    gdc.selection = true;
    var selChildren = selection.getRangeElements();
    elements = new Array(selChildren.length);

    // Add a note that this is a partial selection.
    gdc.info += '\n* This is a partial selection. Check to make sure intra-doc links work.';

    numChildren = selChildren.length;
    // Get the elements from the range and add to elements[].
    for (var i = 0, z = selChildren.length; i < z; i++) {
      elements[i] = selChildren[i].getElement();
    }

    // Handle the case where the selection does not encompass the
    // whole paragraph, list item, etc.
    // If first or last element is partial, we use the parent element instead.
    if (selChildren[0].isPartial()) {
      elements[0] = elements[0].getParent();
    }
    if (selChildren.length > 1 && selChildren[selChildren.length - 1].isPartial()) {
      // Note that selChildren and elements are the same size.
      elements[elements.length - 1] = elements[elements.length - 1].getParent();
    }

    // Add the TOC element to the beginning of the elements to be processed.
    var toc = gdc.getToc();
    if (toc) {
      elements.unshift(toc);
    }
  // No selection: use the whole doc body.
  } else {
    // Maybe we should try setting the selection to the whole body.
    // See Document.setSelection().

    // Make a copy of the body here for safety. Doesn't seem to be too expensive.
    var body = gdc.getDoc().getBody().copy();
    // How many child Elements in the body? We'll go through each one (unless there is a selection).
    numChildren = body.getNumChildren();
    // Create an array of elements from all the body children.
    elements = new Array(numChildren);
    for (var i = 0; i < numChildren; i++) {
      elements[i] = body.getChild(i);
    }

    // Get footnotes (if there is no selection, this seems to be the only way).
    // Or maybe we should always do it this way?
    gdc.footnotes = gdc.getDoc().getFootnotes();
  }

  return elements;
};

// Returns the TOC element if present. Use to define heading IDs in selections.
gdc.getToc = function() {
  var body = gdc.getDoc().getBody().copy();
  numChildren = body.getNumChildren();
  elements = new Array(numChildren);

  // Find the TOC (if there is one).
  for (var i = 0; i < numChildren; i++) {
    var maybeToc = body.getChild(i);
    if (maybeToc.getType() === TABLE_OF_CONTENTS) {
      return maybeToc;
    }
  }
};

// Returns true if the font is a (known) monospace font, false otherwise.
// I wish apps script had a "mono" font family!
gdc.isMonospace = function(font) {
  val = false;
  if (   font === 'Courier New'
      || font === 'Consolas'
      || font === 'Inconsolata'
      || font === 'Roboto Mono'
      || font === 'Source Code Pro'
    ) {
    val = true;
  }
  return val;
};

// Returns true if para has only one child element, which is
// a text element containing only whitespace. (A blank paragraph.)
// Returns false otherwise.
gdc.isWhitespacePara = function(para) {
  if (para.getNumChildren() === 1 && (para.getChild(0).getType() === TEXT) ) {
    if ( para.getText().match(/^\s*$/) ) {
      return true;
    }
  }
  
  return false;
};

// Code block test (see if whole para is monospace font).
gdc.isCodeLine = function(para) {
  // Guard against null paragraph.
  if (!para) {
    return false;
  }

  var paraTest = para.asText();
  var text = paraTest.getText();

  // Do not assume there is any text in the paragraph! (Might be just images.)
  if (text.length === 0) {
    return false;
  }

  var fontStart = paraTest.getFontFamily(0);
  var fontEnd = paraTest.getFontFamily(text.length-1);

  if (text.length !== 0 && gdc.isMonospace(fontStart) && gdc.isMonospace(fontEnd) ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns true if text element is monospace font.
 * @param {Text} textElement A Text element (not just a text string).
 * @return {boolean} true if text is monospace, false otherwise.
 */
gdc.textIsCode = function(textElement) {
  if (!textElement) {
    return false;
  }

  var text = textElement.getText();
  if (text.length === 0) {
    return false;
  }

  var fontStart = textElement.getFontFamily(0);
  var fontEnd = textElement.getFontFamily(text.length-1);

  if (gdc.isMonospace(fontStart) && gdc.isMonospace(fontEnd) ) {
    return true;
  } else {
    return false;
  }
};

// Does this paragraph end in code font?
gdc.endsInCode = function(para) {
  // Guard against null paragraph.
  if (!para) {
    return false;
  }

  var paraTest = para.asText();
  var text = paraTest.getText();
  if (text.length === 0) {
    return false;
  }
  var fontEnd = paraTest.getFontFamily(text.length-1);

  if (text.length !==0 && gdc.isMonospace(fontEnd) ) {
    return true;
  } else {
    return false;
  }

};

// Attributes in effect at the current offset.
gdc.getCurrentAttributes = function(textElement, offset) {
  var currentAttrs = {
    offset: offset,
    url:    textElement.getLinkUrl(offset),
    font:   textElement.getFontFamily(offset),
    italic: textElement.isItalic(offset),
    bold:   textElement.isBold(offset),
    strikethrough: textElement.isStrikethrough(offset),
    underline: textElement.isUnderline(offset),
    alignment: textElement.getTextAlignment(offset),  };
  return currentAttrs;
};

// Is this whole paragraph a link (URL)?
// Mainly used to disqualify a paragraph as a definition term.
gdc.paraIsUrl = function(para) {
  var firstChild = para.getChild(0);
  var childType = firstChild.getType();
  if ( childType === TEXT
      && firstChild.getLinkUrl(0)
      && gdc.getUrlEnd(firstChild, 0) === firstChild.getText().length
    ) {
    return true;
  }
  return false;
};

// Figures out if a code span has embedded font changes.
// NOTE: We can use a similar technique to detect any mixed font span.
gdc.isMixedCodeSpan = function(textElement, offset) {
  // Assume we're not in a mixed code span.
  gdc.isMixedCode = false;
  gdc.state.isMixedCode = false;
  // All the attributes for this text element.
  var attrs = textElement.getTextAttributeIndices();

  // Figure out which attr we've got here. Just walk through
  // the attributes until we find the one at this offset.
  var currAttrIndex = 0;
  for (var i = 0, z = attrs.length; i < z; i++) {
    if (attrs[i] === offset) {
      currAttrIndex = i;
      break;
    }
  }

  // Now, check from the current index until we're not in a code span.
  // If we have any bold or italic in between, then we're in a mixed code span.
  var lastAttrIndex = attrs.slice(-1);
  for (var i = currAttrIndex, z = attrs.length; i < z; i++) {
    var testOffset = attrs[i];

    var testAttrs = gdc.getCurrentAttributes(textElement, testOffset);
    if (testAttrs.bold || testAttrs.italic || testAttrs.url || testAttrs.underline) {
      gdc.mixedCodeStart = offset;
      gdc.isMixedCode = true;
      gdc.state.isMixedCode = true;
    }

    // Stop checking if we're back to a non-code font and haven't found a font change.
    // This is not a mixed code span.
    if (!gdc.isMonospace(testAttrs.font) && !gdc.isMixedCode) {
      break;
    }

    if (gdc.isMixedCode && !gdc.isMonospace(testAttrs.font)) {
      // This is the end of the mixed code span (unless someone's really playing around with fonts).
      // Perhaps we should just check that it's not a constant-width font to be safe.
      gdc.mixedCodeEnd = attrs[i];
      // We want to return this offset, so the caller knows to use HTML until this point.
      break;
    }
  }

  // We're done with the for loop, either via a break because a code span ended,
  // or we've reached the end of the text element.
  if (gdc.isMixedCode) {
    return gdc.mixedCodeEnd;
  } else {
    return false;
  }
}; // end isMixedCodeSpan()

// Figures out if a particular span of characters has embedded font changes.

// Handle text element: all text has at least one attribute.
// NOTE: This is the key function, since most of the conversion is dealing with
// text. This may be a long function, but it's important to get it right.
gdc.handleText = function(textElement) {

  // md or html?
  var markup = gdc.markup;
  if (gdc.isTable) { gdc.useHtml(); }

  // If we're in a Markdown fenced codeblock, we do not want to process any attributes.
  // But if it's an HTML table, we do want to deal with the attributes.
  if (gdc.inCodeBlock) {

    var text = textElement.getText();

    // Leading tabs become an indent in a Google Doc.
    // But we do not want to replace an indent when code block is in a list.
    if (gdc.indent && !gdc.isList) {
      var leadingSpace = '';
      var indentLevel = gdc.indent/36;  // 36 pixels per indent level for Docs.
      for (var i = 0; i < indentLevel; i++) {
        leadingSpace += gdc.fourSpaces;
      }
      text = leadingSpace + text;
    }

    if (gdc.isHTML) {
      // No indent required for HTML nested code blocks.
      gdc.codeIndent = '';
      // Display any HTML tags literally.
      text = html.escapeOpenTag(text);
    }

    text = util.markSpecial(text);
    gdc.writeStringToBuffer(gdc.codeIndent + text + '<newline>');
    return;
  }

  // Initialize offset to -1 so we get any attributes at the beginning (0).
  var offset = -1,
      attrOff = -1, // Keep track of where the current attribute is located.
      text = textElement.getText();

  var attrs = textElement.getTextAttributeIndices();

  // Attribute loop.
  // Walk through the attribute array and look for links (urls), font changes, etc.
  for (var i = 0, z = attrs.length; i < z; i++) {

    // Guard against some funky attribute offsets.
    // GDocs sometimes seems to give the same offset, which messes up links.
    // If this breaks again, check the offsets before and after URLs to
    // see what's going on.
    if (attrs[i] >= offset) {
      attrOff = attrs[i];
    } else {
      continue;
    }

    gdc.setWriteBuf();
    offset = gdc.writeBuf(textElement, offset, attrOff);

    // Check the attributes at the current attribute offset.
    // This should be an object.
    var url = textElement.getLinkUrl(attrOff),
        font = textElement.getFontFamily(attrOff),
        italic = textElement.isItalic(attrOff),
        bold = textElement.isBold(attrOff),
        strikethrough = textElement.isStrikethrough(attrOff),
        underline = textElement.isUnderline(attrOff),
        alignment = textElement.getTextAlignment(attrOff);

    // Check text alignment.
    var subscript = false;
    var superscript = false;
    if (alignment === SUBSCRIPT) {
      subscript = true;
    }
    if (alignment === SUPERSCRIPT) {
      superscript = true;
    }
    if (!gdc.isSubscript && subscript) {
      gdc.useHtml();
      gdc.isSubscript = true;
      gdc.openAttrs.push(gdc.subscript);
      gdc.writeStringToBuffer(gdc.markup.subOpen);
    }
    if (!gdc.isSuperscript && superscript) {
      gdc.useHtml();
      gdc.isSuperscript = true;
      gdc.openAttrs.push(gdc.superscript);
      gdc.writeStringToBuffer(gdc.markup.superOpen);
    }
    var currentAttrs = gdc.getCurrentAttributes(textElement, attrOff);

    // A philosophical question: should we define gdc.isItalic and friends up
    // top in gdc.gs, or just let them be defined here at first use? Might
    // be clearer to define them as false to begin with, though this also works
    // and is less code. Also, gdc.isItalic or gdc.italic?

    // Open attributes (in alphabetical order).
    // Open bold.
    if (!gdc.isBold && bold) {
      // Check for leading or trailing space.
      gdc.isBold = true;
      gdc.openAttrs.push(gdc.bold);
      gdc.writeStringToBuffer(gdc.markup.boldOpen);
    }
    // Open code.
    if (!gdc.isCode && gdc.isMonospace(font) ) {
      gdc.isCode = true;

      // If we open a code span, let's look through the next attributes to see if
      // There are any embedded font changes (bold or italic) in this code span.
      // If so, maybe we should fall back to HTML for this code span.
      var mixed = gdc.isMixedCodeSpan(textElement, attrOff);
      if (mixed) {
        gdc.useMixed();
      }
      if (!gdc.inCodeBlock) {
        gdc.openAttrs.push(gdc.code);
        gdc.writeStringToBuffer(gdc.markup.codeOpen);
      }
    }
    // Open italic.
    if (!gdc.isItalic && italic) {
      // Check for leading or trailing space.
      gdc.isItalic = true;
      gdc.openAttrs.push(gdc.italic);
      gdc.writeStringToBuffer(gdc.markup.italicOpen);
    }
    // Open strikethrough.    
    if (!gdc.isStrikethrough && strikethrough) {
      // Check for leading or trailing space.
      gdc.isStrikethrough = true;
      gdc.openAttrs.push(gdc.strikethrough);
      gdc.writeStringToBuffer(gdc.markup.strikethroughOpen);
    }
    // Open underline (uses HTML always). This should really be discouraged!
    if (!gdc.isUnderline && underline && !url) {
      gdc.isUnderline = true;
      gdc.openAttrs.push(gdc.underline);
      gdc.writeStringToBuffer(gdc.markup.underlineOpen);
    }

    gdc.maybeCloseAttrs(currentAttrs);

    // URL handling.

    // Deal with simple links (URLs).
    if (url && !gdc.isToc) {
      var urlEnd = gdc.getUrlEnd(textElement, offset);
      var linkText = textElement.getText().substring(offset, urlEnd);

      // Check for links to #heading* (internal links).
      // Replace hashed link with corresponding id link (from generated TOC).
      if ((/^#heading/).test(url)) {
        gdc.isIntraDocLink = true;
        if (gdc.headingLinks[url]) {
          url = '#' + gdc.headingLinks[url];
        } else {
          gdc.errorCount++;
          gdc.alert('undefined internal link (link text: "' + linkText + '"). Did you generate a TOC with blue links?');
          gdc.info += '\n\nERROR:\nundefined internal link to this URL: "' + url + '".'
            + 'link text: ' + linkText + '\n'
            + '?Did you generate a TOC with blue links?\n';
        }
      } else {
        gdc.isIntraDocLink = false;
      }

      // Now, write the link, Markdown or HTML.
      if ( (gdc.docType === gdc.docTypes.md) && !gdc.isHTML ) {
          // Write the Markdown [link](url) form.
          gdc.writeStringToBuffer('[');
          gdc.setWriteBuf();
          offset = gdc.writeBuf(textElement, offset, urlEnd);
          gdc.writeStringToBuffer('](' + url + ')');
      } else {  // Must be HTML, write standard link.
        gdc.writeStringToBuffer('<a href="' + url + '">');
        gdc.setWriteBuf();
        offset = gdc.writeBuf(textElement, offset, urlEnd);
        gdc.writeStringToBuffer('</a>');
      }
    }

  } // end attribute loop.

  // Now that we're done with the attributes, write the rest of the text.
  gdc.setWriteBuf();
  gdc.writeBuf(textElement, offset, text.length);

  gdc.closeAllAttrs();

}; // end handleText().

// Inserts a horizontal rule.
gdc.handleHorizontalRule = function() {
  gdc.writeStringToBuffer(gdc.markup.hr);
};

// Warns/alerts that there are equations. Recommend MathJax instead of lame
// partial character conversion.
gdc.handleEquation = function() {
  if (!gdc.handledEquation) {
    gdc.warn('You have some equations: look for "' + gdc.alertPrefix + ' equation..." in output.');
    gdc.handledEquation = true;
  }
  // For now, at least, we should just call out equations in the output.
  gdc.alert('equation: use MathJax/LaTeX if your publishing platform supports it.');
};

// Warns/alerts that there are some inline drawings -- no API for that yet :( .
gdc.handleInlineDrawing = function() {
  if (!gdc.handledInlineDrawing) {
    gdc.warn('Inline drawings not supported: look for "' + gdc.alertPrefix + ' inline drawings..." in output.');
    gdc.handledInlineDrawing = true;
  }
  gdc.alert('inline drawings not supported directly from Docs. '
    + 'You may want to copy the inline drawing to a standalone drawing and export by reference. '
    + 'See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">'
    + 'Google Drawings by reference</a> for details. '
    + 'The img URL below is a placeholder.'
  );
  if (gdc.isHTML) {
    // Drawing URL placeholder.
    gdc.writeStringToBuffer('\n<img src='
      + '"https://docs.google.com/drawings/d/12345/export/png" '
      + 'width="80%" alt="drawing">\n');
  } else {
    gdc.writeStringToBuffer('<newline>![drawing](https://docs.google.com/drawings/d/12345/export/png)');
  }
};

gdc.handleImage = function(imageElement) {
  // Figure out image file information for the link.
  var img = imageElement.asInlineImage();
  var imgBlob = img.getBlob();
  var contentType = imgBlob.getContentType();
  var fileType = '';
  if (contentType === 'image/jpeg') {
    fileType = '.jpg';
  } else if (contentType === 'image/png') {
    fileType = '.png';
  } else if (contentType === 'image/gif') {
    fileType = '.gif';
  }

  // Create image path/file name: 
  // Note that Google Docs export does not necessarily put them in order!
  // But there's no way to predict, so users will need to check.
  gdc.imageCounter++;
  var imagePath = gdc.defaultImagePath + 'image' + gdc.imageCounter +fileType;

  // Put image markup here regardless of whether the image was stored or not.
  gdc.hasImages = true; // So we can provide a note at the top.
  gdc.alert('inline image link here (to ' + imagePath
    + '). Store image on your image server and adjust path/filename/extension if necessary.');
  if (gdc.isHTML) {
    // Width is an optional attribute for img tag, but let's leave the hint.
    gdc.writeStringToBuffer('\n<img src="'
      + imagePath
      + '" width="" alt="alt_text" title="image_tooltip">\n');
  } else {
    gdc.writeStringToBuffer('<newline>![alt_text](' + imagePath +' "image_tooltip")<newline>');
  }
};

gdc.isBullet = function(glyphType) {
  if (   glyphType === DocumentApp.GlyphType.BULLET
      || glyphType === DocumentApp.GlyphType.HOLLOW_BULLET
      || glyphType === DocumentApp.GlyphType.SQUARE_BULLET) {
      return true;
  } else {
    return false;
  }
};

// Sets appropriate markup object.
gdc.useMarkdown = function() {
  gdc.isHTML = false;
  gdc.markup = gdc.mdMarkup;

  if (gdc.italicBoldUnderscores) {
    // * and ** are the default.
    gdc.markup.italicOpen = '_';
    gdc.markup.italicClose = '_';
    gdc.markup.boldOpen = '__';
    gdc.markup.boldClose = '__';
  }
};
gdc.useHtml = function(){
  gdc.isHTML = true;
  gdc.markup = gdc.htmlMarkup;
};
gdc.useMixed = function(){
  gdc.markup = gdc.mixedMarkup;
};

// Sets the writeBuf function, depending on whether we're in
// a footnote or not.
gdc.setWriteBuf = function() {
  gdc.writeBuf = gdc.writeBuffer;
  if (gdc.isFootnote) {
    gdc.writeBuf = gdc.writeFootnoteBuffer;
  }
};
// Write stuff to the buffer: either a text element or a string.
// Returns finish offset.
gdc.writeBuffer = function(te, start, finish) {

  // Test for degenerate case (no text) first.
  if (start === finish) {
    if (gdc.inCodeBlock) {
      gdc.buffer += '<newline>';
    }
    return finish;
  }

  // The text itself.
  var text = te.getText();
  text = text.substring(start, finish);

  if (gdc.inDlist) {
    // Remove the leading ? and : that are just markup for the definitions/terms.
    // Also remove any leading space from the term.
    // Note that we already add the : for Markdown to open a definition.
    text = text.replace(/^\?\s*/, '');
    text = text.replace(/^\s*:/, '');
    // Also, remove excessive whitespace from the line (but not all of it).
    text = text.replace(/^\s+/, ' ');
  }

  // Handle special characters, escaping.
  text = util.removeSmartQuotes(text);
  text = util.carriageReturns(text);
  if (!gdc.renderHTMLTags) {
    // Replace opening <, including at the beginning of a line.
    text = text.replace(/([^\\])<|^</g, '$1&lt;');
  }
  // Remove the escape before escaped < if necessary.
  text = text.replace(/\\</g, '<');


  gdc.buffer += text;
  return finish;
};
// Write to the footnote buffer. Duplicates writeBuffer code :(
// Returns finish offset.
gdc.writeFootnoteBuffer = function(te, start, finish) {

  // Test for degenerate case (no text) first.
  if (start === finish) {
    if (gdc.inCodeBlock) {
      gdc.fnBuffer += '<newline>';
    }
    return finish;
  }

  // The text itself.
  var text = te.getText();
  text = text.substring(start, finish);
  text = util.removeSmartQuotes(text);

  gdc.fnBuffer += text;
  return finish;
};
gdc.writeStringToBuffer = function(s) {
  s = util.removeSmartQuotes(s);
  // Which buffer to write to?
  if (gdc.isFootnote) {
    gdc.fnBuffer += s;
  } else {
    gdc.buffer += s;
  }
};
gdc.flushBuffer = function() {
  // Wrap current buffer, write to gdc.out, and reset.
  // We can at least wrap for HTML. Markdown is more difficult to wrap.
  // Note that this wraps code in code blocks as well!
  if (gdc.isHTML && gdc.wrapHTML) {
    // This wraps all text, including that in code blocks.
    var bufHTML = util.wordwrap(gdc.buffer, 80);
    bufHTML = util.replaceSpecial(bufHTML);
    gdc.out += bufHTML;
  } else {
    var bufMd = util.replaceSpecial(gdc.buffer);
    gdc.out += bufMd;
  }
  gdc.buffer = '';
};
gdc.flushFootnoteBuffer = function() {
  if (gdc.fnBuffer) {
  if (gdc.isHTML && gdc.wrapHTML) {
      gdc.out += util.wordwrap(gdc.fnBuffer, 100);
    } else {
      gdc.out += gdc.fnBuffer;
    }
    gdc.out = util.replaceSpecial(gdc.out);
    gdc.out += '\n';
    gdc.fnBuffer = '';
  }
};

// Insert an alert message into the output.
// And add a message at the top of the Markdown/HTML source too.
gdc.alert = function(message) {  
  gdc.alertCount++;
  // Do not write alerts if in reckless mode!
  if (gdc.recklessMode) {return;}

  var id = 'gdcalert'+gdc.alertCount;
  var redBoldSpan = '<span style="color: red; font-weight: bold">';
  gdc.writeStringToBuffer('\n\n<p id="' + id + '" >' + redBoldSpan);
  gdc.writeStringToBuffer(gdc.alertPrefix + message);
  gdc.writeStringToBuffer(' </span><br>(<a href="#">Back to top</a>)'
                          + '(<a href="#gdcalert' + (gdc.alertCount+1) + '">Next alert</a>)<br>');
  gdc.writeStringToBuffer(redBoldSpan + gdc.chevrons + '</span>');
  gdc.writeStringToBuffer('</p>\n\n');
};

// Prepares an alert message for the top of the output, if necessary.
gdc.setAlertMessage = function() {
  
  // Check for H1 headings first.
  // Note if there is more than a single H1. Make this a warning, not an alert.
  if (gdc.h1Count > 1) {
    var h1Warning = 'You have ' + gdc.h1Count + ' H1 headings. You may want to use '
      + 'the "H1 -> H2" option to demote all headings by one level.';
    gdc.warn(h1Warning);
  }
  
  // Common style for top alerts.
  var alertOpen = '\n<p style="color: red; font-weight: bold">';
  // Skip if in recklessMode.
  if (gdc.recklessMode) {return;}

  // Note ERRORs or WARNINGs or ALERTs if any.
  if ( gdc.errorCount || gdc.warningCount || gdc.alertCount) {
    gdc.alertMessage += alertOpen
      + gdc.alertPrefix
      +  ' ERRORs: '   + gdc.errorCount
      + '; WARNINGs: ' + gdc.warningCount
      + '; ALERTS: '   + gdc.alertCount + '.</p>\n'
      + '<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. '
      + '<li>In the converted Markdown or HTML, search for inline alerts that start with '
      + gdc.alertPrefix + ' for specific instances that need correction.</ul>\n\n'
    ;
    // Provide links to all the inline alerts.
    gdc.alertMessage += '<p style="color: red; font-weight: bold">'
      + 'Links to alert messages:</p>';
    for (i = 1; i <= gdc.alertCount; i++) {
      gdc.alertMessage += '<a href="#gdcalert' + i + '">alert' + i + '</a>\n';
    }
    gdc.alertMessage += '\n<p style="color: red; font-weight: bold">'
      + gdc.chevrons
      + 'PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>\n\n';
  }
};

// Add a warning to gdc.info at the top of the output.
gdc.warn = function(warning) {
  gdc.warningCount++;
  gdc.info += '\n\nWARNING:\n';
  gdc.info += warning + '\n';
};

// Returns the last index of the URL section.
gdc.getUrlEnd = function(textElement, offset) {
  var text = textElement.getText();
  for (var j = offset; j < text.length; j++) {
    if (!textElement.getLinkUrl(j)) {
      return j;
    }
  }
  // If we fall out of the loop, the URL must be at the end of the text element.
  return text.length;
};

// We do not need to close lists in Markdown, but we do in HTML.
gdc.maybeCloseList = function(el) {
  // Check to see if we should close this list.
  var next = el.getNextSibling();
  //var nestingLevel = gdc.nestLevel;
  var nestingLevel = el.getNestingLevel();
  if (next && next.toString() === "ListItem") {
    var nextNestingLevel = next.getNestingLevel();
    
    // This is closer to being correct with list closing, but we also need to
    // keep state in case there are paragraphs embedded in the list.
    if (gdc.isHTML) {
      for (var nest = nestingLevel; nest > nextNestingLevel; nest--) {
        html.closeList();
      }
    }
  }
};

// Check to see if we should close this list. May be fragile.
gdc.checkList = function() {
  if (gdc.isList && !gdc.indent) {
    gdc.isList = false;
    gdc.writeStringToBuffer('\n');
  }
};

// When we have attributes, we may need to close some.
// Also, we'll call this at the end of a paragraph with some special conditions.
gdc.maybeCloseAttrs = function(currentAttrs) {
  // Close attributes. No particular order. We need to close the last one
  // that was opened first.

  // Figure out which attribute to close (let's make this a function soon).

  // pop to check, but put it back for now.
  // Make this into a little function and use it in the while loop.
  var lastOpened = gdc.openAttrs.pop();
  gdc.openAttrs.push(lastOpened);

  // We need to keep looking at these until we have no more to close.
  // Need to put this in a while loop.
  var keepChecking = true;

  while (keepChecking) {
    // Stop checking unless we get a close.
    keepChecking = false;

    // Tag to check now.
    lastOpened = gdc.openAttrs.pop();
    gdc.openAttrs.push(lastOpened);

    // Note that we currently remain in HTML markup after a sub- or superscript.
    // Close subscript (HTML).
    if (gdc.isSubscript && (currentAttrs.alignment !== SUBSCRIPT)
        && (lastOpened === gdc.subscript) ) {
      gdc.isSubscript = false;
      gdc.writeStringToBuffer(gdc.markup.subClose);
      gdc.openAttrs.pop();
      gdc.resetMarkup();
      keepChecking = true;
    }
    // Close superscript (HTML).
    if (gdc.isSuperscript && (currentAttrs.alignment !== SUPERSCRIPT)
        && (lastOpened === gdc.superscript) ) {
      gdc.isSuperscript = false;
      gdc.writeStringToBuffer(gdc.markup.superClose);
      gdc.openAttrs.pop();
      gdc.resetMarkup();
      keepChecking = true;
    }

    // Close underline (HTML).
    if (gdc.isUnderline && !currentAttrs.underline && !currentAttrs.url
        && (lastOpened === gdc.underline) ) {
      gdc.isUnderline = false;
      gdc.writeStringToBuffer(gdc.markup.underlineClose);
      gdc.openAttrs.pop();
      keepChecking = true;
    }
    // Close strikethrough.
    if (gdc.isStrikethrough && !currentAttrs.strikethrough
        && (lastOpened === gdc.strikethrough) ) {
      gdc.isStrikethrough = false;
      gdc.writeStringToBuffer(gdc.markup.strikethroughClose);
      gdc.openAttrs.pop();
      keepChecking = true;
    }

// Close italic.
    if (gdc.isItalic && !currentAttrs.italic && (lastOpened === gdc.italic) ) {
      gdc.isItalic = false;
      gdc.writeStringToBuffer(gdc.markup.italicClose);
      gdc.openAttrs.pop();
      keepChecking = true;
    }
    // Close code.
    if (gdc.isCode && !gdc.isMonospace(currentAttrs.font) && (lastOpened === gdc.code) ) {
      gdc.isCode = false;
      gdc.openAttrs.pop();
      keepChecking = true;
      if (!gdc.inCodeBlock) {
        gdc.writeStringToBuffer(gdc.markup.codeClose);
      }
    }
    // Close bold.
    if (gdc.isBold && !currentAttrs.bold && (lastOpened === gdc.bold) ) {
      gdc.isBold = false;
      gdc.openAttrs.pop();
      keepChecking = true;
      gdc.writeStringToBuffer(gdc.markup.boldClose);
    }
  }
};

// At the end of a paragraph or list item, we want to close all open attributes.
// This is similar to maybeCloseAttrs, but we want to close all of them in
// the openAttrs list (and we do not have an explicit attribute change here).
gdc.closeAllAttrs = function() {
  while (gdc.openAttrs.length > 0) {
    var a = gdc.openAttrs.pop();
    if (a === gdc.bold) {
      gdc.writeStringToBuffer(gdc.markup.boldClose);
      gdc.isBold = false;
    }
    if (a === gdc.code) {
      gdc.writeStringToBuffer(gdc.markup.codeClose);
      gdc.isCode = false;
    }
    if (a === gdc.italic) {
      gdc.writeStringToBuffer(gdc.markup.italicClose);
      gdc.isItalic = false;
    }
    if (a === gdc.strikethrough) {
      gdc.writeStringToBuffer(gdc.markup.strikethroughClose);
      gdc.isStrikethrough = false;
    }
    if (a === gdc.underline) {
      gdc.writeStringToBuffer(gdc.markup.underlineClose);
      gdc.isUnderline = false;
    }
    
    // Close subscript and superscript at end of para. Also reset markup.
    if (a === gdc.subscript) {
      gdc.writeStringToBuffer(gdc.markup.subClose);
      gdc.isSubscript = false;
      gdc.resetMarkup();
    }
    if (a === gdc.superscript) {
      gdc.writeStringToBuffer(gdc.markup.superClose);
      gdc.isSuperscript = false;
      gdc.resetMarkup();
    }

  }
};

// Grab links to headings from TOC, if present.
// Also add [TOC] if Markdown (and not a partial selection).
gdc.handleTOC = function(toc) {
  gdc.hasToc = true;
  if (!gdc.selection && gdc.docType === gdc.docTypes.md) {
    gdc.writeStringToBuffer('\n\n[TOC]\n\n');
  }
  var nc = toc.getNumChildren();
  for (var i = 0; i < nc; i++) {
    var heading = toc.getChild(i),
        text = heading.getText(),
        id = gdc.makeId(text),
        url = heading.getLinkUrl();

    // Save this url and id for later.
    gdc.headingLinks[url] = id;
    gdc.headingIds[text] = id;
  }
};

// Clean up the heading text to make it into an id string.
// Use this for TOC headings and for organic headings.
gdc.makeId = function(headingText) {
  // Trim heading string to match up if TOC generated.
  headingText = headingText.trim();
  var id = headingText.replace(/[\s+:;,.\/?!()]/g, '-');
  // Remove leading, trailing, or multiple _ if any.
  id = id.replace(/^-+/, '').replace(/-+$/, '').replace(/-{2,}/g, '-');
  id = id.toLowerCase();

  if (!gdc.hasToc) {
    id = gdc.dupHeadingCheck(id);
  }
  return id;
};

gdc.dupHeadingCheck = function(id) {
  // Dup id check and handling.
  gdc.idIndex++;
  if (gdc.idDups[id] === 1) {
    id = id + gdc.idIndex;
  }
  gdc.idDups[id] = 1;

  return id;
};

// Checks text to see if it specifies a lang for a code block.
// Returns lang value or empty string.
gdc.getLang = function(text) {
  // Default value of lang.
  var lang = '';
  // Note lang markup: lang:\s*lang-spec$
  var matches = text.match(/^\s*lang:\s*(.*)$/);
  if (matches) {
    lang = matches[1];
  }
  return lang;
};

// Determines if paragraph is a heading or not.
gdc.isHeading = function(para) {
  var heading = para.getHeading();
  if (heading !== DocumentApp.ParagraphHeading.NORMAL) {
    return true;
  }
  return false;
}

// Functions for detecting and handling definition lists.
// May need to check that we're not in a code block.
// We should maybe add this to the markup object once we get it working.
gdc.inDlist = false;
gdc.inDterm = false;
gdc.inDdef = false;
gdc.dtermCount = 0;
gdc.isDterm = function(para) {
  // Skip headings, table text, code blocks, where we do not want definition lists.
  if (gdc.noDefsHere(para)) {
    return false;
  }

  var pText = para.getText();

  // Also skip blank paragraphs (only whitespace).
  if ( pText.match(/^\s+$/) ) {
    return false;
  }

  // Start a DL with a ?. The term can be any phrase that follows (just not empty).
  var dtRegex = /^\?.+/;
  if (pText.match(dtRegex) ) {
    gdc.inDterm = true;
    // Starting a dlist?
    if (!gdc.inDlist) {
      gdc.writeStringToBuffer(gdc.markup.dlOpen);
      gdc.inDlist = true;
    }
    return true;
  }

  // Default: not in a dlist.
  return false;
};
gdc.isDdef = function(para) {
  if (para.getText().match(/^\s*:/)) {
    // Skip headings, table text, code blocks.
    if (gdc.noDefsHere(para)) {
      return false;
    }

    if (!gdc.inDlist) {
      gdc.alert('Definition &darr;&darr; outside of definition list. Missing preceding term(s)?');
      return false;
    }
    gdc.inDdef = true;
    gdc.dtermCount = 0; // Reset: we're done with dterms.
    return true;
  }
  return false;
};
gdc.handleDterm = function(para) {
  if ( gdc.docType === gdc.docTypes.html ) {
    gdc.writeStringToBuffer(gdc.markup.dtOpen);
    return;
  }

  // Only add extra newline for first term (Markdown).
  if ( (gdc.docType === gdc.docTypes.md) && gdc.dtermCount === 0) {
    gdc.writeStringToBuffer(gdc.markup.dtOpen);
  }
  gdc.dtermCount++;
};
gdc.handleDdef = function(para) {
  gdc.writeStringToBuffer(gdc.markup.ddOpen);
};
// Figure out if we're somewhere we shouldn't have definition lists.
gdc.noDefsHere = function(para) {
  if (gdc.isHeading(para)
      || gdc.isTable
      || gdc.inCodeBlock
    ) {
      return true;
    } else {
      return false;
    }
};
gdc.closeDlist = function() {
  // If the last thing we did was a dterm, but no ddef, that's a problem.
  if (!gdc.gotDdef) {
    gdc.alert('Definition term(s) &uarr;&uarr; missing definition?');
  }
  gdc.writeStringToBuffer(gdc.markup.dlClose + '\n\n');

  // Reset state for DL.
  gdc.inDlist = false;
  gdc.dtermCount = 0;
};

// Resets the markup in case we're in a mixed code span or subscript or superscript.
gdc.resetMarkup = function() {
  if (gdc.docType === gdc.docTypes.md && !gdc.isTable) {
    gdc.useMarkdown();
  }
};

// Utility functions.
var util = util || {};

// Removes smart quotes from text (not a text element).
util.removeSmartQuotes = function(smartText) {
  // If not in a code run or a code block, keep the smart quotes.
  if (!gdc.isCode && !gdc.inCodeBlock) {
    return smartText;
  }
  // Note the unicode values for smart quotes.
  return smartText
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
  ;
};

// Marks special characters to protect them during line wrapping.
util.markSpecial = function(text) {
  return text
    .replace(/^\s*$/g, '<newline>')  // "Blank" lines might have spaces.
    .replace(/ /g, '<nbsp>')
  ;
};
// For HTML single-cell-table codeblocks, we need to protect all \n chars.
util.markNewlines = function(text) {
  return text
    .replace(/\n/g, '<newline>')
  ;
}
// Replaces all special characters after line wrapping.
util.replaceSpecial = function(text) {
  return text
    .replace(/<newline>/g, '\n')
    .replace(/=linebreak=/g, '<br>')
    .replace(/<nbsp>/g, ' ')
    .replace(/<listindent>/g, '    ')
    .replace(/<footnoteindent>/g, '    ')
  ;
};
// Replaces carriage returns (\r) with ' \\n' or <br>\n.
util.carriageReturns = function(text) {
  if (gdc.docType === gdc.docTypes.md) {
    return text.replace(/\r/g, ' \\\n');
  } else if (gdc.docType === gdc.docTypes.html) {
    return text.replace(/\r/g, '=linebreak=');
  }
};


// Limit line length functions.
/**
 * Splits a long string at a given width, breaking at word boundaries.
 * @param {string} str The string to wrap.
 * @param {number?} opt_width The max line width, 80 by default.
 * @return {Array.<string>} The input split into lines.
 */
util.wordsplit = function(str, opt_width) {
  if (str === '') {
    return [''];
  }
  var width = opt_width || 80;
  if (!str) { return str; }

  // Regex explained:
  // We're looking at a single long line. We first look for any string
  // that is from 1 to width characters long (any character except for a newline),
  // followed by whitespace and a newline. Alternatively, we'll look for
  // a string that has no spaces at all, followed by whitespace or newline.
  // NOTE: the parens here are just for grouping, not for saving anything.
  var regex = '[^\\n]{1,' + width + '}(\\s|$)|\\S+?(\\s|$)';
  //var regex = '{1,' + width + '}(\\s|$)|\\S+?(\\s|$)';

  // Collect the properly broken strings in an array and return them.
  return str.match(RegExp(regex, 'g'));
}

/**
 * Wraps a long string at a given width, breaking at word boundaries.
 * @param {string} str The string to wrap.
 * @param {number?} opt_width The max line width, 80 by default.
 * @return {string} The input wrapped with line breaks.
 */
util.wordwrap = function(str, opt_width) {
  var split = util.wordsplit(str, opt_width);
  if (split === null) {
    return str;
  }
  var r = split.join('\n');
  // Trim trailing spaces before newlines.
  return r.replace(/\s+\n/g, '\n');
};

util.getPrintableObject = function(obj) {
  return JSON.stringify(obj, null, 2);
};

// md object
// Markdown conversion processing. HTML has a parallel structure to this.

var md = md || {};

// Attribute change markers for Markdown, HTML.
md.code = '`';
md.italic = '*';
md.bold = '**';
md.preCodeBlock = '<newline><newline>';
md.openCodeBlock = '```';
md.closeCodeBlock = '```<newline><newline>';  // No leading \n here on purpose.

// Add new information to the top of the info comment.
// But don't get rid of the opening of the comment.
gdc.topComment = '<!-----\n\n'
;
  
md.doMarkdown = function(config) {
  // Call config first!
  gdc.config(config);
  gdc.useMarkdown();

  // Get the body elements.
  var elements = gdc.getElements();

  // Main loop to walk through all the document's child elements.
  for (var i = 0, z = elements.length; i < z; i++) {
    gdc.nextElement = elements[i + 1];  // may be undefined if at end of body!
    md.handleChildElement(elements[i]);
  }

  if (gdc.hasImages) {
    gdc.info += '\n* This document has images: check for ' + gdc.alertPrefix;
    gdc.info += ' inline image link in generated source and store images to your server.';
    gdc.info += ' NOTE: Images in exported zip file from Google Docs may not appear in ';
    gdc.info += ' the same order as they do in your doc. Please check the images!\n';
  }
  
  // Record elapsed time.
  var eTime = (new Date().getTime() - gdc.startTime)/1000;
  gdc.info = '\n\nConversion time: ' + eTime + ' seconds.\n' + gdc.info;
  
  // Note ERRORs or WARNINGs or ALERTs at the top if there are any.
  gdc.errorSummary = '';
  if ( gdc.errorCount || gdc.warningCount || gdc.alertCount ) {
    gdc.errorSummary = 'You have some errors, warnings, or alerts. '
      + 'If you are using reckless mode, turn it off to see useful information and inline alerts.'
      + '\n* ERRORs: '   + gdc.errorCount
      + '\n* WARNINGs: ' + gdc.warningCount
      + '\n* ALERTS: '   + gdc.alertCount;
  }
  gdc.info = gdc.errorSummary + gdc.info;

  gdc.info = gdc.topComment + gdc.info;
  // Warn at the top if DEBUG is true.
  if (DEBUG) {
    gdc.info = '<!-- WARNING: DEBUG is TRUE!! -->\n\n' + gdc.info;
  }

  // Assemble output.
  gdc.flushBuffer();
  gdc.flushFootnoteBuffer();
  gdc.setAlertMessage();
  gdc.out = gdc.alertMessage + gdc.out;
  // Add info comment if desired.
  if (!gdc.suppressInfo) {
    gdc.out = gdc.info + '\n----->\n\n' + gdc.out;
  } else if (gdc.suppressInfo && gdc.errorSummary !== '') {
    // But notify if there are errors.
    gdc.out = '<!-- ' + gdc.errorSummary + ' -->\n' + gdc.out;
  }
  
  return gdc.out;
};

// Switch for handling different child elements for Markdown conversion.
// Use for all element types, unless they have no children.
// See ElementType enum for actual type names.
md.handleChildElement = function(child) {

  var childType = child.getType();

  // Get indent if possible for this element. But we do not want to
  // change indent if it's an empty paragraph.
  if (child.getIndentStart && child.getNumChildren() ) {
    gdc.indent = child.getIndentStart();
  }

  // Close a list if it ends here.
  gdc.checkList();

  // Most common element types first.
  switch (childType) {
    case PARAGRAPH:
      md.handleParagraph(child);
      break;
    case TEXT:
      try {
        gdc.handleText(child);
      } catch(e) {
        gdc.log('\nERROR handling text element:\n\n' + e + '\n\nText: ' + child.getText());
      }
      break;
    case LIST_ITEM:
      if (gdc.isTable || gdc.isHTML) {
        html.handleListItem(child);
      } else {
        md.handleListItem(child);
      }
      break;
    case TABLE:
      html.handleTable(child);
      break;
    case TABLE_ROW:
      html.handleTableRow(child);
      break;
    case TABLE_CELL:
      html.handleTableCell(child);
      break;
    case TABLE_OF_CONTENTS:
      gdc.isToc = true;
      gdc.handleTOC(child);
      gdc.isToc = false;
      break;
    case HORIZONTAL_RULE:
      gdc.handleHorizontalRule();
      break;
    case FOOTNOTE:
      if (gdc.docType === gdc.docTypes.md) {
        md.handleFootnote(child);
      } else {
        html.handleFootnote(child);
      }
      break;
    case FOOTNOTE_SECTION:
      break;
    case FOOTER_SECTION:
    case HEADER_SECTION:
      gdc.warn('Not processing header or footer sections.');
      break;
    case INLINE_DRAWING:
      gdc.handleInlineDrawing();
      break;
    case INLINE_IMAGE:
      try {
        gdc.handleImage(child);
      } catch(e) {
        gdc.errorCount++;
        gdc.log('\nERROR while handling inline image:\n' + e);
        gdc.alert('error handling inline image');
      }
      break;
    case PAGE_BREAK:
      // No need to warn for web conversion.
      break;
    case EQUATION:
      gdc.handleEquation();
      break;
    case UNSUPPORTED:
      gdc.log('child element: UNSUPPORTED');
      break;
    default:
      gdc.log('child element: unknown');
  };
};

// Handles Markdown and HTML paragraphs.
md.handleParagraph = function(para) {

  // When we're entering a paragraph, close any open HTML lists.
  // Not perfect, but better than leaving them hanging in HTML.
  // Markdown actually works better here.
  if (gdc.docType === gdc.docTypes.html) {
    html.checkList();
  }
  gdc.isMixedCode = false;
  gdc.inHeading = false;
  gdc.state.isMixedCode = false;
  gdc.numChildren = para.getNumChildren();
  // Do not bother with empty paragraphs (blank lines). (Except we preserve them for code blocks.)
  if (gdc.numChildren === 0) {
    if (gdc.inCodeBlock) {
      // Preserve newlines in code block (or single-cell table code block).
      if ( gdc.isCodeLine(para.getNextSibling()) || gdc.isSingleCellTable) {
        // Write a placeholder for newline: will replace after wrapping.
        gdc.writeStringToBuffer('<newline>');
      }
    }
    return;
  }

  // For a standalone horizontal rule, no need for containing paragraph.
  if (gdc.numChildren === 1 && para.getChild(0).getType() === HORIZONTAL_RULE) {
    gdc.handleHorizontalRule();
    return;
  }

  // Check for list after we deal with empty paragraphs. do not want to close list for
  // blank lines.
  html.checkList();


// Check to see if this is a constant-width paragraph (code block signal).
  if (gdc.isCodeLine(para) && !gdc.isTable) {
    // If we're starting a code block, open it up.
    if (!gdc.inCodeBlock) {
      // Check here to see if the first line signals language for the code block.
      var lang = gdc.getLang(para.getText());

      if (lang !== '') {
        gdc.startCodeBlock(lang);
        return; // Do not want the ``` line in the code block.
      } else {
        gdc.startCodeBlock(lang);
      }
    }
  } else {
    // We might be leaving a code block: if so, end it.
    md.maybeEndCodeBlock();
    // But do not return, since this paragraph still has text to process.
  }

  // Is this a definition list item (term or definition)?
  // Note: check this after we check for code block.
  if (gdc.isDterm(para)) {
    gdc.handleDterm(para);
  } else if (gdc.isDdef(para)) {
    gdc.handleDdef(para);
  } else if (gdc.inDlist) {
    // Close definition list if we're in one now. (Make this a function.)
      gdc.closeDlist();
  }

// Headings, codeblocks, regular para. May need to check for codeblock earlier.
  var heading = para.getHeading();
  if (heading !== DocumentApp.ParagraphHeading.NORMAL) {
  
    // Don't process headings that just contain whitespace.
    if (gdc.isWhitespacePara(para)) {
      return;
    }

    gdc.inHeading = true;
    if (gdc.htmlHeadings) {
      html.handleHeading(heading, para);
    } else if (gdc.docType === gdc.docTypes.md && !gdc.isHTML) {
      md.handleHeading(heading);
    } else {
      html.handleHeading(heading, para);
    }
  } else {
    // Real paragraph. Open it up.
    if (gdc.inCodeBlock) {
      // do nothing: we also want to not add the tablePrefix.
      // But check for table cell or definition list.
    } else if (!gdc.startingTableCell && !gdc.inDlist) {
      // This is where we want to check for right/center alignment so that the proper paragraph style can be applied. 
      if (gdc.isHTML && para.getAlignment() === DocumentApp.HorizontalAlignment.RIGHT && para.isLeftToRight()) {
        gdc.writeStringToBuffer('\n<p style="text-align: right">\n');
        // Not sure what this does?
        gdc.useHtml();
      } else if (gdc.isHTML && para.getAlignment() === DocumentApp.HorizontalAlignment.CENTER && para.isLeftToRight()) {
        gdc.writeStringToBuffer('\n<p style="text-align: center">\n');
        gdc.useHtml();
      } else {
        gdc.writeStringToBuffer(gdc.markup.pOpen);
      } 
    }  

    // We want paragraphs after the first text in a table cell.
    gdc.startingTableCell = false;
  }

  if (gdc.isFootnote) {
    gdc.writeStringToBuffer(gdc.footnoteIndent);
  }
  
  // Check for indent.
  if (gdc.indent) {
    var n = gdc.indent/36;
    // Note: code block code already accounts for indent.
    if (!gdc.inCodeBlock) {
      gdc.writeStringToBuffer('\n');
      for (i = 0; i < n; i++ ) {
        gdc.writeStringToBuffer('    ');
      }
    }
  }

  // Detects text direction.
  if (!para.isLeftToRight()) {
    gdc.writeStringToBuffer('<p dir="rtl">\n');
    gdc.useHtml();
    gdc.isRightAligned = true;
  }

  // Go through children of this paragraph.
  var nChildren = para.getNumChildren();
  for (var i = 0; i < nChildren; i++) {
    md.handleChildElement(para.getChild(i));
  }

  // In case we're in a mixed code span, reset the markup.
  gdc.resetMarkup();

  // Is this necessary?
  if (gdc.isRightAligned) {
    gdc.writeStringToBuffer('</p>\n');
    gdc.isRightAligned = false;
  }

  // Now that we're at the end, close heading or paragraph if necessary.
  if (gdc.docType === gdc.docTypes.md && gdc.inHeading && !gdc.isHTML) {
    // Trim heading text to use as hash key (we trim it in gdc.makeId() ).
    var id = gdc.headingIds[para.getText().trim()];
    if (id && !gdc.htmlHeadings) {
      gdc.writeStringToBuffer(' {#' + id + '}');
    }
  }
  if (html.isHeading) {
    html.closeHeading();
  } else {
    // Finally, let's close things up (unless a code block or heading or ...).

    // Close <dd>, <dt>
    if (gdc.inDdef) {
      gdc.writeStringToBuffer(gdc.markup.ddClose + '\n');
      gdc.inDdef = false;
      gdc.gotDdef = true;
    } else if (gdc.inDterm) {
      gdc.writeStringToBuffer(gdc.markup.dtClose);
      gdc.inDterm = false;
      gdc.gotDdef = false;
    } else if (gdc.isTable) {
      //do nothing.
    } else if (gdc.isFootnote) {
      // do not close.
    } else if (!gdc.inCodeBlock) {
      gdc.writeStringToBuffer(gdc.markup.pClose);
    }
  }
  
  //gdc.maybeCloseList(para);
}; // end md.handleParagraph

// Handle the heading type of the paragraph. Fall through for NORMAL.
// This nice bit is from Renato Mangini's original gdocs2md
// (though it's gotten a bit more complex with the demotion check).
md.handleHeading = function(heading) {
  var buf = '';
  // Add an extra newline before a heading.
  buf += '<newline><newline>';
  if (gdc.demoteHeadings) {
    buf += '#';
  }
  // Count H1s to warn for too many.
  if (heading === DocumentApp.ParagraphHeading.HEADING1 && !gdc.demoteHeadings) {
    gdc.h1Count++;
  }

  switch (heading) {
    // Add a # for each heading level. Fall through to accumulate the right number of #s.
    case DocumentApp.ParagraphHeading.HEADING6:
     // Do not demote h6, but warn and mark them.
     var warning = 'H6 not demoted to H7.';
     if (gdc.demoteHeadings) {
       if (!gdc.warnedAboutH7) {
         gdc.warn(warning + ' Look for "' + warning + '" inline.');
         gdc.warnedAboutH7 = true;
       }
       gdc.writeStringToBuffer('\n<!--' + warning + ' -->\n');
     } else {
       buf += '#';
     }
    case DocumentApp.ParagraphHeading.HEADING5: buf += '#';
    case DocumentApp.ParagraphHeading.HEADING4: buf += '#';
    case DocumentApp.ParagraphHeading.HEADING3: buf += '#';

    case DocumentApp.ParagraphHeading.HEADING2:
    case DocumentApp.ParagraphHeading.SUBTITLE:
      buf += '#';

    case DocumentApp.ParagraphHeading.HEADING1:
    case DocumentApp.ParagraphHeading.TITLE:
      buf += '# ';
    default:
  }
  gdc.writeStringToBuffer(buf);
};

md.handleListItem = function(listItem) {

  // Save indent for things inside this list.
  gdc.indent = listItem.getIndentStart();

  // Close definition list if we're in one now.
  if (gdc.inDlist) {
    gdc.closeDlist();
  }

  // Go through children of this list item (same elements as paragraph).

  // Preliminaries: do the list prefix.
  var prefix = '\n',
      glyphType = listItem.getGlyphType(),
      nestLevel = listItem.getNestingLevel(),
      isList = true;
  gdc.nestLevel = nestLevel;

  // Open list if necessary.
  if (!gdc.isList) {
    gdc.isList = true;
    gdc.writeStringToBuffer('\n');
    if (gdc.isBullet(glyphType)) {
      prefix += gdc.markup.ulOpen;
    } else {
      prefix += gdc.markup.olOpen;
    }
  }

  if (gdc.isFootnote) { prefix += gdc.footnoteIndent; }

  md.maybeEndCodeBlock();

  // Indent the list properly.
  for (var i = 0; i < nestLevel; i++) {
    // Markdown requires 4 spaces to separate nesting levels.
    prefix += '<listindent>';
  }
  // Check for bullet list.
  if (gdc.isBullet(glyphType)) {
    prefix += gdc.markup.ulItem;
  } else {
    // Ordered list.
    var key = listItem.getListId() + '.' + nestLevel;
    // Initialize list counter.
    var counter = gdc.listCounters[key] || 0;
    counter++;
    gdc.listCounters[key] = counter;
    // Increment ordered list counter.
    prefix += counter + '. ';
    // Alternative is to use 1. for all ordered list items, but less readable.
    //prefix += gdc.markup.olItem;
  }
  gdc.writeStringToBuffer(prefix);

  // Prefix set, now deal with the content.
  md.childLoop(listItem);

  // We still need to close the list (but not for Markdown!).
  gdc.maybeCloseList(listItem);
};

// Switch Markdown table-handling when Markdown tables are sane.
md.handleTable = function(tableElement) {
  // For now, we'll do tables in HTML.
  gdc.isTable = true;
  gdc.useHtml();

  // Go through children of this table.
  gdc.writeStringToBuffer('\n\n<table>');
  md.childLoop(tableElement);
  gdc.writeStringToBuffer('\n</table>\n\n');

  gdc.isTable = false;
  gdc.useMarkdown();
};
md.handleTableRow = function(tableRowElement) {
  // Go through children of this table.
  gdc.writeStringToBuffer('\n  <tr>');
  md.childLoop(tableRowElement);
  gdc.writeStringToBuffer('\n  </tr>');
};
md.handleTableCell = function(tableCellElement) {
  // Go through children of this table.
  gdc.writeStringToBuffer('\n  <td>');
  md.childLoop(tableCellElement);
  md.maybeEndCodeBlock();
  gdc.writeStringToBuffer('\n  </td>');
};

// Handles elements that can have children
// (by passing each one off to the the handleChildElement() dispatcher).
md.childLoop = function(element) {
  if (!element) { return; }
  for (var i = 0, z = element.getNumChildren(); i < z; i++) {
    md.handleChildElement(element.getChild(i));
  }
};

// Formats footnotes for Markdown.
md.handleFootnote = function(footnote) {
  gdc.footnoteNumber++;
  var fSection = footnote.getFootnoteContents();
  if (!fSection) {
    // Index is one less.
    var findex = gdc.footnoteNumber - 1;
    fSection = gdc.footnotes[findex].getFootnoteContents();
  }

  // Write footnote number in the body text.
  gdc.writeStringToBuffer('[^' + gdc.footnoteNumber + ']');

  // Now, we're ready for the footnote itself.
  gdc.isFootnote = true;
  if (gdc.footnoteNumber === 1) {
      gdc.writeStringToBuffer('\n\n<!-- Footnotes themselves at the bottom. -->'
      + '\n## Notes');
  }
  gdc.writeStringToBuffer('\n\n[^' + gdc.footnoteNumber + ']:');
  md.childLoop(fSection);
  gdc.isFootnote = false;
};

// Starts a code block (either Markdown-fenced or HTML).
// Default lang is defined earlier (either 'none' or ''),
// which still results in prettyprint guessing for HTML.
gdc.startCodeBlock = function(lang) {
  gdc.inCodeBlock = true;
  gdc.codeIndent = '';
  gdc.fourSpaces = '    ';

  // Write the newlines first.
  gdc.writeStringToBuffer(md.preCodeBlock);

  // Account for indent if inside a list.
  // Add indent before opening the code block.
  if (gdc.isList && gdc.indent > 0) {
    var indent = gdc.indent/36;  // 36 pixels per indent level for Docs.
    for (var i = 0; i < indent; i++) {
      gdc.codeIndent += gdc.fourSpaces;
    }
    gdc.writeStringToBuffer(gdc.codeIndent);
  }

  if (gdc.docType === gdc.docTypes.md
     && !(gdc.isTable && gdc.isSingleCellTable) ) {
    gdc.writeStringToBuffer(md.openCodeBlock + lang + '<newline>');
  } else {
    // For HTML, do not add lang if empty, but do not prettyprint if lang is 'none'.
    if (lang === 'none') {
      gdc.writeStringToBuffer(html.openCodeBlockLangNone);
    } else if (lang !== '') {
      gdc.writeStringToBuffer(html.openCodeBlockStart + lang + html.openCodeBlockEnd);
    } else {
      gdc.writeStringToBuffer(html.openCodeBlock);
    }
  }
};

// Ends the code block only if we're already in a code block!
md.maybeEndCodeBlock = function() {
  // Do not end code block if we're in a single-cell table.
  if (gdc.isSingleCellTable === true) {
    return;
  }

  if (gdc.inCodeBlock) {
    gdc.inCodeBlock = false;
    gdc.isCode = false;
    if (gdc.docType === gdc.docTypes.md) {
      gdc.writeStringToBuffer(gdc.codeIndent + md.closeCodeBlock);
    } else {
      gdc.writeStringToBuffer(html.closeCodeBlock);
    }
  }
};
