<!----- Conversion time: 2.392 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β14
* Mon Jan 28 2019 20:41:28 GMT-0800 (PST)
* Source doc: https://docs.google.com/open?id=1-Z2oM1qMTAtbxsSLV3_mgmR5gLOC0KqszcTsn3eQ-jQ
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server.
----->

<h2>Docs to Markdown (GD2md-html): convert a Google Doc to Markdown or HTML</h2>


[the add-on formerly known as GD2md-html]

([link to original Google Doc](https://docs.google.com/document/d/1-Z2oM1qMTAtbxsSLV3_mgmR5gLOC0KqszcTsn3eQ-jQ/))


**Contents:**
* [Installing GD2md-html](#installing-docs-to-markdown)
* [Using GD2md-html](#using-docs-to-markdown)
* [Features](#features)
* [Sample conversion](#sample-conversion)
* [Troubleshooting](#troubleshooting)
* [Permissions](#permissions)
* [Bugs](#bugs)
* [Acknowledgements](#acknowledgements)
* [See also](#see-also)
* [Articles and other good stuff about GD2md-html](#articles-about-docs-to-markdown)

<h2>

---
</h2>


<h2>Docs to Markdown quick start: </h2>




1.  [Install Docs to Markdown](https://gsuite.google.com/marketplace/app/docs_to_markdown/700168918607) from the G Suite Marketplace. Or: [Install Docs to Markdown](https://chrome.google.com/webstore/detail/gd2md-html/igffnbdfnodiaphfmfaiiaegmoljbghf) from the Chrome web store (which is soon to be deprecated).
1.  From the Google Docs Add-ons menu in a Google Doc, select **Docs to Markdown > Convert**.
1.  Use the **Markdown** or **HTML** buttons in the sidebar window to convert your document to either Markdown or HTML.
1.  Copy the entire text from the text area in the sidebar to the clipboard and paste it into either a Markdown or HTML file.
1.  View the rendered page using a web browser or your publishing tools.

<h2 id="details">Details</h2>


Docs to Markdown is a free Google Docs add-on that converts a Google Doc to a simple, readable Markdown or HTML text file. Docs to Markdown lets you use Google Docs' editing, formatting, and collaboration tools before you publish to a Markdown or HTML platform. Docs to Markdown also lets you select and convert part of a Google Doc.

Docs to Markdown requires minimal permissions: it will ask for permission to access the current Doc (to convert it) and permission to create a sidebar (the user interface). It requires no other permissions.

**Note**: Not all Markdown renderers support all Markdown features. For example github Markdown does not support a table of contents (`[TOC]`), footnotes, or definition lists. Also, some Markdown environments strip heading IDs and replace them with their own generated IDs. You'll have to do some manual adjustments, depending on your target environment.

If you find any bugs, please file them at [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues). Thanks for helping to make Docs to Markdown better.

Join the [GD2md-html group](https://groups.google.com/forum/#!forum/gd2md-html) group for announcements, questions, and discussion about Docs to Markdown (formerly GD2md-html). Low traffic.

Thanks to Renato Mangini for inspiration: he created an earlier conversion script at [https://github.com/mangini/gdocs2md](https://github.com/mangini/gdocs2md) before Drive add-ons even existed!

<h2 id="installing-docs-to-markdown">Installing Docs to Markdown</h2>


[Install Docs to Markdown](https://gsuite.google.com/marketplace/app/docs_to_markdown/700168918607) from the G Suite Marketplace. Or: [Install Docs to Markdown](https://chrome.google.com/webstore/detail/gd2md-html/igffnbdfnodiaphfmfaiiaegmoljbghf) from the Chrome web store (which is soon to be deprecated).

<h2 id="using-docs-to-markdown">Using Docs to Markdown</h2>


You can use the Docs to Markdown add-on with any Doc for which you have edit permission. If you only have view permission, make a copy.



1.  From the Google Docs **Add-ons** menu, select **Docs to Markdown > Convert**. The sidebar window opens:

    [![GD2md-html sidebar](https://docs.google.com/drawings/d/1B0J5YwRSZlPUmzq-2TX-bxW7duea0Ko3FnV-lwtMeuM/export/png)](https://docs.google.com/drawings/d/1B0J5YwRSZlPUmzq-2TX-bxW7duea0Ko3FnV-lwtMeuM/edit "Click to view/edit diagram")

1.  Use the Markdown or HTML buttons in the sidebar window to convert your document to either Markdown or HTML. If you select part of the document, Docs to Markdown will convert only the selection. Otherwise it will convert the entire document. Click the Docs link for more information.

<h3 id="options">Options</h3>




*   **Demote headings (H1 → H2, etc.)**: If you have used multiple Heading 1 headings in your Doc, choose this option to demote all heading levels to conform with the following standard: single H1 as title, H2 as top-level heading in the text body. You may need to add an H1 to function as the title after conversion.
*   **HTML headings/IDs**: Not all Markdown renderers handle Markdown-style IDs. If that is the case for your target platform, choose this option to generate HTML headings and IDs.
*   **Wrap HTML**: By default, HTML output is not wrapped. Selecting this option will wrap HTML text (but note that some publishing platforms treat line breaks as `<br>` or `<p>` tags).
*   **Allow HTML tags**: [Note: this option currently has no effect.] By default, angle brackets (`<`) will be replaced by the `&lt;` entity. If you really want to embed HTML tags in your Markdown, select this option to preserve them. Or, if you just want to use an occasional HTML tag, you can escape the opening angle bracket like this: `\\<tag>text\\</tag>`.

<h3 id="using-docs-to-markdown-output">Using Docs to Markdown output</h3>


To use the output, copy the entire text to the clipboard and paste it into either a Markdown or HTML file.

If there are any errors or warnings during the conversion, they will appear in the conversion notes comment at the top of the text output.

<h3 id="images">Images</h3>


Docs to Markdown creates placeholder markup for images. You will need to move images to your server and change the path in the image tags to match the image location.

<h3 id="drawings">Drawings</h3>


The converter cannot handle inline Google Drawings, since Google Drawings does not (yet) have an API to get drawing data. However, you can copy embedded drawings to standalone Google Drawings and refer to them by reference in your Markdown or HTML documents (see [Google Drawings by reference](https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference) for details).

<h2 id="features">Features</h2>


<h3 id="text-element-conversion-features">Text element conversion features</h3>


Support for both Markdown and HTML conversion, unless noted.



*   **Basic elements**: Paragraphs, lists, inline code, links.
*   **Text formatting**: _italic_, **bold**, ~~strikethrough~~, `inline code`, and <code><em>combinations</em> of <strong><del>text formatting</del></strong></code>.
*   <strong>Headings</strong>: Heading levels convert directly, unless you choose the option to demote heading levels.
*   <strong>Line breaks</strong>: If you use shift-enter to insert an explicit line break, the converter will preserve that line break, inserting a <code>\\</code> at the end of the line for Markdown, or <code>&lt;br></code> for HTML.
*   <strong>Intra-document links</strong>: If you linked to headings in your Doc, those links will convert properly as long as you generated a TOC.
*   <strong>Mixed inline code</strong>: Docs to Markdown may fall back to HTML to handle mixed code spans in normal text properly.
*   <strong>Definition lists</strong>: Docs to Markdown supports simple definition lists. \


        ```
        Definition list syntax (in a Google Doc):

?Term starts with a question mark.
:Definition here (starts with a leading colon).
        ```


*   **Code blocks**: Constant-width-font paragraphs and single-cell tables convert to fenced code blocks (Markdown) or `<pre>` blocks (HTML).
*   **Code block language specification**: You can optionally specify the language for a code block by specifying `lang: langspec` as the first line. For example this code block (in your Google Doc):


    ```
    lang:java
    public class HelloWorld {
      public static void main(String[] args) {
        System.out.println("Hello, World");
      }
    }
    ```
    
    renders as:

    ```java
    public class HelloWorld {
      public static void main(String[] args) {
        System.out.println("Hello, World");
      }
    }
    ```



    This applies to both constant-width-font paragraphs and single-cell tables.



*   **Tables**: Tables currently convert to HTML tables for both Markdown and HTML. Full support for merged rows and columns.
*   **Images**: Docs to Markdown creates image links. You will need to save images to your web server and adjust the image paths.
*   **Footnotes**: Footnotes convert to standard Markdown footnotes, and corresponding markup in HTML.
*   **Right-to-left languages**: Embedded RTL text or RTL paragraphs display properly in the converted output.

<h4 id="ui-reporting-features">UI/reporting features</h4>




*   **Partial selections**: If you select part of the document, Docs to Markdown will convert only the selection. Otherwise it will convert the entire document. This is useful for converting code samples or tables.
*   **ERRORs, WARNINGs, ALERTs**: Docs to Markdown output includes information about conditions that will probably require your attention (both in a comment at the top of the output and in red in the rendered output). Please proofread and correct before publishing.

<h2 id="sample-conversion">Sample conversion</h2>


Both this document and the [sample/demo page](https://github.com/evbacher/gd2md-html/wiki/Demo-and-sample-doc) were converted from Google Docs using Docs to Markdown.

<h2 id="troubleshooting">Troubleshooting</h2>


If you find trouble that's not noted here, please file a bug at [Docs to Markdown bugs](https://github.com/evbacher/gd2md-html/issues).

<h3 id="conversion-error">Conversion error</h3>


If a conversion fails completely, file a bug against the converter at [Docs to Markdown bugs](https://github.com/evbacher/gd2md-html/issues). Be sure to include the error message and a link to the document you were trying to convert.

**TIP**: You can do a crude sort of binary search to localize the problem by selecting the first half of the doc and converting. Change and/or reduce the selection until you find the offending portion of the document. You may be able to work around the problem, but please still file a bug! (And note the area of the problem if you localized it. Thanks!)

<h3 id="alerts">Alerts</h3>


**Problem**

Red marks all over the page.

Docs to Markdown alerts you to known issues, warnings, or errors that require your attention by inserting alert messages in the rendered output. For example, if you use a Google Docs equation, you'll get a message like this:

**>>>>> equation: use MathJax/LaTeX if your publishing platform supports it.**

**Solution**

Address the problem and remove the message from the Markdown/HTML file before publishing.

<h3 id="heading-ids-not-generated">Heading IDs not generated</h3>


**Problem**

Docs to Markdown does not generate heading IDs and intra-document links properly if you're using a Doc that has the new-style TOC (with page numbers). Currently, Docs to Markdown requires the old-style ("blue links") TOC to correctly generate heading IDs and intra-document links.

**Solution**

Delete your TOC and insert a new TOC (choose the "blue links" style).

**Alternate solution** (in case the "blue links" style TOC is not available):

Find an old Doc that has the old-style TOC.

Cut and paste the entire TOC (not just the links -- you need to get the whole box) into your Doc, then regenerate the TOC. The promise is to have the TOC be selectable, but for now, the print-style TOC is the default for new Docs, it seems.

<h3 id="error-undefined-internal-link">ERROR: undefined internal link</h3>


**Problem**

The conversion notes contains an error like this:


```
ERROR:
undefined internal link to this URL"#heading=h.64x194v1qq35".link text: link to an internal heading
?Did you generate a TOC?
```


**Solution**

First, check to see that you generated a table of contents (TOC) in your document. The conversion engine uses the TOC to create internal links. (Also, the TOC should come before any link references.)

If you generated a TOC and you are still getting internal link errors, the heading link in the original TOC may be stale. Try regenerating the TOC in your Google Doc, then convert the document again.

To check for staleness: search through the converted output for the link URL (something like #heading=h.vwl3eupkcsuz). When you find it, go back to the doc and see if that link works in the doc itself (by appending #heading=h.vwl3eupkcsuz or similar to the end of the doc URL).

<h2 id="permissions">Permissions</h2>


The Docs to Markdown add-on does not collect or distribute any information about you or about the documents being converted.

Docs to Markdown will ask for permission to access the current Doc (to convert it). Docs to Markdown reads the Doc content and structure; it does not change any content.

Docs to Markdown will also ask for permission to display a sidebar. It uses the sidebar to display action buttons and option checkboxes as well as the converted text (Markdown or HTML).

It requires no other permissions.

See the official privacy policy for Docs to Markdown here: [https://sites.google.com/site/edbacher/home/gd2md-html-privacy-policy](https://sites.google.com/site/edbacher/home/gd2md-html-privacy-policy).

<h2 id="bugs">Bugs</h2>


Go to [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues) to view open bugs or to file a new bug.

<h2 id="acknowledgements">Acknowledgements</h2>


This add-on was inspired by the work of Renato Mangini at [https://github.com/mangini/gdocs2md](https://github.com/mangini/gdocs2md), who created gdocs2md before Drive add-ons existed!

<h2 id="see-also">See also</h2>


See these links for more information about Markdown syntax and standards, and about Markdown previewers and editors.

<h3 id="markdown-previewers-editors">Markdown previewers, editors</h3>




*   StackEdit: [https://stackedit.io/editor](https://stackedit.io/editor)

<h3 id="markdown-syntax-standards-information">Markdown syntax, standards information</h3>




*   Basic Markdown syntax from John Gruber, the inventor of Markdown: [https://daringfireball.net/projects/markdown/syntax](https://daringfireball.net/projects/markdown/syntax)
*   CommonMark standard: [http://commonmark.org/](http://commonmark.org/)

<h2 id="articles-about-docs-to-markdown">Articles about Docs to Markdown (GD2md-html)</h2>




*   Tom Johnson: I'd Rather be Writing: [Convert Google Docs content to Markdown or HTML using the gd2md-html add-on](http://idratherbewriting.com/2017/09/22/convert-google-docs-to-markdown/)
*   [Useful tools for (Kubernetes) contributors](https://discuss.kubernetes.io/t/useful-tools-for-contributors/1403): "The best part is it also lets you select part of a document to convert to Markdown."
*   [How to convert a Google Doc to Markdown or HTML](http://iainbroome.com/how-to-convert-a-google-doc-to-markdown-or-html/): Iain Broome is a writer, editor, and content producer who uses Docs to Markdown to take advantage of the collaboration features of Google Docs before converting to HTML for publication.
*   Sarah Maddox uses Docs to Markdown to [convert her Trilby Trench novels to HTML](https://ffeathers.wordpress.com/2018/04/15/building-an-amazon-kindle-book-via-html-and-opf/) for Kindle publication.
*   [15 useful add-ons for Google Docs](https://lifehacker.ru/dopolneniya-google-docs/) (translated from Russian Lifehacker): "This add-on allows you to instantly convert all text from a document to a Markdown or HTML format. It does an excellent job not only with headings and various selections, but also with pictures, tables and other content."
*   Hudson's Bay Company recommends using Docs to Markdown for their tech blog: [Convert your Google Doc to Markdown](https://tech.hbc.com/2018-04-12-non-technical-guide-to-posting-to-the-blog.html#step-3-convert-your-google-doc-to-markdown)
*   Zapier Blog: [The 32 Best Google Docs Add-ons in 2017](https://zapier.com/blog/best-google-docs-addons/) (search for `gd2md-html`): They mistakenly report that GD2md-html does not convert a selection, but they also say: _It worked almost perfectly in our tests—much better than the other Markdown export add-ons._

<!-- Docs to Markdown version 1.0β14 -->
