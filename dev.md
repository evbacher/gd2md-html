<!----- Conversion time: 0.906 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β22
* Tue Apr 21 2020 20:16:57 GMT-0700 (PDT)
* Source doc: Developer guide: contributing to  Docs to Markdown
----->


<h2>Developer guide: contributing to Docs to Markdown </h2>


[Docs to Markdown](https://gsuite.google.com/marketplace/app/docs_to_markdown/700168918607) is a Google Docs add-on that converts a Google Doc to simple, readable Markdown or HTML.

**Note**: This is my first big open-source project, so I’m still figuring it out. If you have any suggestions, please file a bug or feature request.





<h2 id="the-spirit-of-docs-to-markdown">The spirit of Docs to Markdown</h2>


Docs to Markdown is meant to provide a simple conversion from Google Docs text content to Markdown. While Markdown is the primary target, because we sometimes need to convert things to HTML (like tables), we also provide a secondary HTML target.

<h3 id="docs-to-markdown-is-a-filter">Docs to Markdown is a filter</h3>


Docs to Markdown converts the text in your Google Doc to either Markdown or HTML. It is a filter only: that is, it creates Markdown or HTML output based on the content in your Google Doc. It does not change anything in the source document.

<h3 id="no-fancy-formatting">No fancy formatting</h3>


In general, Docs to Markdown does not not do fancy formatting, colors, or styles. Examples of fancy formatting considered but not implemented include font colors and background colors, table-cell background colors, and heading styles.

And in general, Docs to Markdown converts the text as-is. There are a few exceptions:



*   HTML tags &lt;tag> are escaped by default (so that they appear literally in the rendered output). If you want to actually write HTML and render it in your output, you can select the Render HTML tags option.
*   Single-cell tables get converted to code blocks.
*   Definition lists: Docs to Markdown provides a simple markup for definition lists, since Google Docs does not provide a way to express this useful construct.
*   Smart quotes are converted to straight quotes when they appear within code (inline or in code blocks).

<h2 id="getting-the-source-to-docs-to-markdown">Getting the source to Docs to Markdown</h2>




*   The source code to Docs to Markdown is in the `addon/` directory at [https://github.com/evbacher/gd2md-html](https://github.com/evbacher/gd2md-html). Fork the gd2md-html project into your own repository.

<h2 id="modifying-docs-to-markdown-code">Modifying Docs to Markdown code</h2>


There is a [development/verification doc](https://docs.google.com/document/d/18gdpECY7PDFT6govm7l7M1fjgGqESDZWOYkhmJoy0U8/edit#heading=h.vrm03961beag) that you can use to develop changes to Docs to Markdown. Make a copy of the development/verification doc and change the source there :



1. Tools > Script Manager > New
2. Create a new project and copy the add-on files there (keep the same names).
3. Make your changes (and add any necessary test cases to the doc). Note that Docs to Markdown is currently running under the legacy Rhino runtime engine (not the Chrome V8 engine).
4. Run your modified add-on against the doc (select the “HTML headings/ids” option for the Markdown conversion, no options for the HTML conversion).
5. Fork the gd2md-html project and compare your output to the `markdown-verification.md` and `html-verification.`md files. Any diffs should be consistent with your changes (and they should not change any other rendered output).

<h3 id="testing-your-changes">Testing your changes</h3>


Convert your development doc to both Markdown and HTML (use the HTML headings option for Markdown, but no other options). On your forked copy of the gd2md-html repo, compare your output to the Markdown and HTML verification files. The diffs should be minimal, except for any test cases you have added to the master doc and any rendering changes that result from your change.

<h3 id="getting-your-changes-into-the-main-branch-of-the-docs-to-markdown-add-on">Getting your changes into the main branch of the Docs to Markdown add-on</h3>




1. When you’re sure your changes are working well, send me a pull request, detailing the changes you’ve made. In the pull request comment, share a link to your copy of the development doc with me (view permission is good enough, since I’ll have the changed add-on code via your pull request) so that I can use it to verify any changes.
2. I will add your code changes to a development branch and verify that your changes work and are consistent with the spirit of Docs to Markdown.
3. Once I publish a new version, I will add you to the project as a contributor (unless you prefer to remain anonymous).

<h2 id="potential-enhancements">Potential enhancements</h2>


In addition to [open bugs](#existing-bugs-feature-requests), there are several potential enhancements possible for Docs to Markdown:

<h3 id="new-markup-targets">New markup targets</h3>


Docs to Markdown provides a fairly generic framework for parsing Google Docs content. The current add-on provides conversion to Markdown and HTML. It should be relatively easy to add conversion capabilities to other targets, including plain-text markup like reStructuredText or AsciiDoc. In addition, it should be possible to provide reasonable conversion to typesetting markup languages like troff or LaTex. Note that there may be complications unique to each target that I am not aware of.

<h3 id="markdown-tables">Markdown tables</h3>


There is an existing feature request for Markdown table output. This should be possible, but Markdown tables cannot handle complex tables that are possible in Google Docs or HTML.

<h3>New workflows </h3>


Docs to Markdown is a simple filter. There are other tools available like Pandoc that provide good conversion from one document format to another. You may be able to combine Docs to Markdown with Pandoc or other tools to get to the target format. And Pandoc may provide better conversion for some workflows than Docs to Markdown can provide. There is no need for Docs to Markdown to try to compete with a tool like Pandoc. This enhancement may require more process documentation than code.

<h3 id="existing-bugs-feature-requests">Existing bugs, feature requests</h3>


Open issues for Docs to Markdown are at [/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues).


<!-- Docs to Markdown version 1.0β22 -->
