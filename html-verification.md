<!-----
Copy and paste the converted output.

NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 3.909 seconds.


Using this HTML file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β25
* Sat May 30 2020 20:28:08 GMT-0700 (PDT)
* Source doc: Docs to Markdown (GD2md-html): MASTER
* Tables are currently converted to HTML tables.

WARNING:
Inline drawings not supported: look for ">>>>>  gd2md-html alert:  inline drawings..." in output.


WARNING:
You have some equations: look for ">>>>>  gd2md-html alert:  equation..." in output.

* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

* Footnote support in HTML is alpha: please check your footnotes.

WARNING:
You have 3 H1 headings. You may want to use the "H1 -> H2" option to demote all headings by one level.

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 3; ALERTS: 6.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


<p>
This is a raw conversion from a Google Doc (HTML headings option for MD, no other options).
</p>
<h1>Docs to Markdown (GD2md-html) MASTER doc</h1>


<p>
This page demonstrates the features of Docs to Markdown conversion from a Google Doc to a simple Markdown or HTML file. 
</p>
<p>
<strong>Note</strong>: Not all Markdown renderers support all Markdown features. For example github Markdown does not support a table of contents ([TOC]), footnotes, or definition lists. Also, some Markdown environments strip heading IDs and replace them with their own generated IDs. You’ll have to do some manual adjustments, depending on your target environment.
</p>
<p>
<strong>Note</strong>: If you find any bugs, please file them at <a href="https://github.com/evbacher/gd2md-html/issues">https://github.com/evbacher/gd2md-html/issues</a>. Thanks for helping to make Docs to Markdown better!
</p>
<h1 id="headings">Headings</h1>


<p>
Docs to Markdown converts headings to the corresponding heading level in Markdown or HTML. If you use a lot of <code>Heading 1</code> headings in your Doc, but you want to adhere to the HTML convention of only a single H1 heading per page, you can use the <code>Demote headings</code> option.
</p>
<h1 id="heading-ids">Heading IDs</h1>


<p>
If you generate a table of contents in your Doc, Docs to Markdown will create IDs for each heading. If your Markdown environment does not handle heading attributes, you can chose the <code>HTML headings/IDs</code> option.
</p>
<h1 id="blank-headings">Blank headings</h1>


<p>
From here to END BLANK HEADINGS are headings that are empty or contain only whitespace.
</p>
<p>
END BLANK HEADINGS
</p>
<h2 id="basic-paragraphs">Basic paragraphs</h2>


<p>
This is a paragraph.<sup id="fnref1"><a href="#fn1" rel="footnote">1</a></sup> (Docs to Markdown also supports footnotes) A sentence with <code>some embedded code</code>. Docs to Markdown changes “smart quotes” to straight quotes in code to guard against cut-and-paste errors.
</p>
<h2 id="font-attribute-runs-including-extra-whitespace-at-the-ends">Font attribute runs including extra whitespace at the ends</h2>


<p>
For example a<strong> bold run with some whitespace </strong>on either end. Here’s an<em> italic run </em>with added whitespace. And a<del> strikethrough run </del>with additional whitespace. And<code> some code </code>with added whitespace. And<span style="text-decoration:underline;"> some underline </span>with added whitespace. Links <a href="http://www.google.com">http://www.google.com</a>. Link with no space:<a href="http://www.google.com">http://www.google.com</a>.
</p>
<p>
Some <em>italic<strong>text</strong>alternating<strong>with</strong>bold<strong>italic</strong></em> but no spaces between font changes.
</p>
<h2 id="mixed-font-spans">Mixed font spans</h2>


<p>
Some regular text, <em>followed by an italic span</em> <strong><em>with some embedded bold</em></strong> <em>text</em>. (Note: this may still be a problem, depending on how it’s formatted in the Google Doc. Like this: Some regular text, <em>followed by an italic span <strong>with some embedded bold</strong> text</em>.
</p>
<p>
Some more regular text. Some <del>strikethrough text</del> here. 
</p>
<p>
Some <del>strikethrough text at the end of the paragraph.</del>
</p>
<p>
Followed by some regular text.
</p>
<h2 id="mixed-code-spans">Mixed code spans</h2>


<p>
Docs to Markdown uses Markdown for most <code>inline code</code>, but it will also handle mixed code spans like this: <code>$ ls -l <strong><em>filename</em></strong></code>, by using HTML markup.

<h2 id="lists">Lists</h2>


<p>
Docs to Markdown supports numbered lists, ordered lists, and definition lists.
</p>
<h3 id="numbered-lists-ordered-lists">Numbered lists (ordered lists)</h3>


<p>
Here is a numbered list:
</p>
<ol>

<li>Item one.

<li>Item two.
</li>
</ol>
<h3 id="unordered-lists">Unordered lists</h3>


<p>
And here is a bullet list:
</p>
<ul>

<li>A list item without any punctuation

<li>A list item with an embedded command: <code>ps aux | grep conky | grep -v grep | awk '{print $2}' | xargs kill</code>

<li>Some mixed-font code: <code>ls -l <strong><em>filename</em></strong></code>. Followed by some normal text.
</li>
</ul>
<h3 id="another-ordered-list">Another ordered list</h3>


<ol>

<li>First item

<li>Second item

<li>Third item
</li>
</ol>
<h3 id="a-nested-ordered-list">A nested ordered list</h3>


<ol>

<li>First item

<li>Second item 
<ol>
 
<li>First nested item
 
<li>Second nested item
</li> 
</ol>

<li>Third item
</li>
</ol>
<h3 id="lists-with-code-blocks">Lists with code blocks</h3>


<p>
You can have a code block within a list item, as long as you indent the code  (in the Doc) the same amount as the list: 
</p>
<ul>

<li>A text item, followed by a code block that's indented and should be part of this item:

    

<pre class="prettyprint">// A comment.
some code;
  callFunction();
</pre>


<ul>

<li>Another item. 
<ul>
 
<li>A nested list item with a command:

        

<pre class="prettyprint">$ cat file | grep dog | wc

</li> 
</ul>
</li> 
</ul>
</li> 
</ul></pre>


<h3 id="lists-with-embedded-paragraphs">Lists with embedded paragraphs</h3>


<p>
Note: Works for Markdown, still a known issue for HTML.
</p>
<ul>

<li>A bullet list with an additional paragraph:
<p>

    This is another paragraph.
</p>
<p>

    This is a new paragraph, but also part of this list item. It should be indented
</p>
<ul>

<li>Another item. 
<ul>
 
<li>A nested item.
<p>

        This is a new paragraph within the nested item.
</p>

        

<pre class="prettyprint">// Some code after a nested paragraph.
callSomeFunction();
</pre>


<ul>

<li>Another list item.

<li>And another. 
<ul>
 
<li>Nested
<p>

        A paragraph within a list item.
</p>  
<ul>
  
<li>Nested
<p>

            A paragraph within a list item.
</p> 
<ul>
 
<li>Reducing the nesting level.
</li> 
</ul>

<li>First-level list item.
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>
A regular paragraph.
</p>
<h3 id="definition-lists">Definition lists</h3>


<p>
Because Google Docs does not have a definition list element, Docs to Markdown uses a simple but explicit syntax that is similar to the kramdown syntax for definition lists:
</p>



<pre class="prettyprint">?term on a line by itself (starting with a question mark)
:Definition preceded by a colon.
</pre>


<h3 id="definition-list-examples">Definition list examples</h3>


<p>
<strong>Note</strong>: Github-flavored Markdown does not support Markdown definition-list syntax. You can select a definition list in a Google Doc and convert it to HTML if you’re using it in a GFM page.
</p>



<pre class="prettyprint">? term
: Definition here.

?term1
?term2
: First paragraph of definition.
: Second paragraph of definition.
</pre>


<p>
renders as:
</p>

<dl>
  <dt>term</dt>
   <dd> Definition here.</dd>

  <dt>term1</dt>
  <dt>term2</dt>
   <dd> First paragraph of definition.</dd>

   <dd> Second paragraph of definition.</dd>

  <dt>A term that has some <strong><em>crazy formatting</em></strong> and <code>characters</code> (not recommended)//.</dt>
   <dd> Definition of crazy term.</dd>
</dl>



<p>
But a definition term cannot be empty:
</p>
<p>
?
</p>

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: Definition &darr;&darr; outside of definition list. Missing preceding term(s)? </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<p>
: Empty term above causes an error here.
</p>
<h2 id="code-blocks">Code blocks</h2>


<p>
A code block (note that by default, Docs to Markdown does <em>not</em> add language descriptors to code blocks, but see <a href="#code-blocks-with-lang-specification">Code Blocks with lang specification</a>):
</p>



<pre class="prettyprint">package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
</pre>


<p>
A single-cell table also becomes a code block:
</p>



<pre class="prettyprint">#include&lt;stdio.h>
main()
{
    printf("Hello World");
}</pre>


<p>
If you have “smart quotes” in regular text, they should be preserved. But if you have any smart quotes in <code>"code"</code> or code blocks, Docs to Markdown removes them during the conversion:
</p>



<pre class="prettyprint">func main() {
	fmt.Println("Why would you do this?")
}
</pre>


<h2 id="code-blocks-with-lang-specification">Code blocks with lang specification</h2>


<p>
Docs to Markdown supports an optional lang specification on the first line of the code sample (in the Doc source). The syntax is: <code>lang: <em>langspec</em></code>

<p>
For example, here is a code block that specifies <code>lang:c</code> on the first line:
</p>



<pre class="prettyprint lang-c">#include&lt;stdio.h>
main()
{
    printf("Hello World");
}
</pre>


<p>
This also works in single-cell tables: here is a single-cell table that specifies <code>lang: java</code> on the first line:
</p>



<pre class="prettyprint lang-java">
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World");
    }
}</pre>


<h2 id="code-blocks-with-html">Code blocks with HTML</h2>


<p>
Code with some embedded HTML tags that should be displayed, not interpreted:
</p>



<pre class="prettyprint lang-html">This is &lt;code>some code&lt;/code>
and some &lt;strong>bold text&lt;/strong>.
</pre>


<p>
A single-cell table with some HTML inside:
</p>



<pre class="prettyprint">This is some code
     We want to handle as code block;

Preserve whitespace, &lt;code>HTML tags&lt;/code>, etc.
Make a fenced code block in Markdown,
        pre in HTML.</pre>


<h2 id="tables">Tables</h2>


<p>
Docs to Markdown generates HTML tables.
</p>
<p>
A table:
</p>

<table>
  <tr>
   <td>Some text.
   </td>
   <td><code>some code</code>
<p>
<code>  var i = 0;</code>
   </td>
  </tr>
  <tr>
   <td>More text.
   </td>
   <td>A list:
<ul>

<li><a href="https://en.wikipedia.org/wiki/Mozzarella">mozzarella cheese</a>
</li>
</ul>
   </td>
  </tr>
</table>


<p>
You can also merge columns and rows in tables:
</p>

<table>
  <tr>
   <td colspan="3" ><strong>This row merges the first three columns.</strong>
<p>
one
   </td>
   <td>four
   </td>
  </tr>
  <tr>
   <td>one
   </td>
   <td>two
   </td>
   <td rowspan="2" ><strong>These two rows are merged</strong>
<p>
three
   </td>
   <td>four
   </td>
  </tr>
  <tr>
   <td>one
   </td>
   <td>two
   </td>
   <td>four
   </td>
  </tr>
</table>


<h2 id="links">Links</h2>


<p>
Some regular URL links:
</p>
<ul>

<li><a href="http://www.google.com/">http://www.google.com/</a>

<li><a href="https://fivethirtyeight.com/">https://fivethirtyeight.com/</a>
</li>
</ul>
<p>
Some links with titles:
</p>
<ul>

<li><a href="http://kottke.org/">Jason Kottke's blog</a>

<li><a href="https://beanroad.blogspot.com/">Bean Road</a>
</li>
</ul>
<h2 id="images">Images</h2>


<p>
A plain image:
</p>
<p>


<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image1.png" width="" alt="alt_text" title="image_tooltip">

</p>
<p>
Note that the image link will be broken until you store the image file on your server and adjust the path and width if necessary.
</p>
<p>
Alternatively, you can use a Drawing to display an image. Here's an example where we've pasted the image into a Drawing and referenced it after converting the doc:
</p>
<p>


<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image2.jpg" width="" alt="alt_text" title="image_tooltip">

</p>
<p>
Tip: You can limit the width of an image in Markdown by adding (for example) <code>{width="75%"}</code> after the link markup (if your Markdown engine supports such syntax). For HTML, just add a <code>width="75%"</code> attribute to the <code>img</code> tag.
</p>
<h2 id="drawings">Drawings</h2>


<p>
Google Docs does not provide an API for accessing the data in a Google Drawing. If you have an inline drawing, Docs to Markdown will warn and provide an alert in the converted output:
</p>
<p>


<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline drawings not supported directly from Docs. You may want to copy the inline drawing to a standalone drawing and export by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details. The img URL below is a placeholder. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="https://docs.google.com/drawings/d/12345/export/png" width="80%" alt="drawing">

</p>
<p>
You can display Google Drawings (and images in Drawings) by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details.
</p>
<p>
Here's an example where we've referred to a drawing by reference (after converting):
</p>
<p>


<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline drawings not supported directly from Docs. You may want to copy the inline drawing to a standalone drawing and export by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details. The img URL below is a placeholder. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="https://docs.google.com/drawings/d/12345/export/png" width="80%" alt="drawing">

</p>
<p>
Tip: For any drawing that you display by reference, be sure to change the permissions to make it viewable by anyone with the link.
</p>
<h2 id="equations">Equations</h2>


<p>
If you insert an equation using Google Docs, Docs to Markdown will warn and insert an alert message in the output. However, if your target publishing platform supports LaTeX equations, you can use LaTeX syntax directly.
</p>
<p>
A Google Docs equation:
</p>
<p>


<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


</p>
<p>
A LaTeX equation:
</p>



<pre class="prettyprint">$$e^{i\pi } = -1$$
</pre>


<p>
renders as:
</p>
<p>
$$e^{i\pi } = -1$$
</p>
<h2 id="right-to-left-text">Right-to-left text</h2>


<p>
A few Arabic words هذه فقرة تجريبية inside an English paragraph:
</p>
<p>
They should appear as in this RTL paragraph:
</p>
<p>
<p dir="rtl">
هذه فقرة تجريبية </p>

</p>
<h2 id="soft-line-breaks">Soft line-breaks</h2>


<p>
lineBreak&lt;br>
This line contains a shift-enter soft line-break here&lt;br>
This bit is after the line break.
</p>
<p>
This is a line with some bold text interrupted by a soft line <strong>break (shift-enter) here&lt;br>
Followed by more bold</strong> and some more regular text.
</p>
<p>
This paragraph has an explicit line-break (Enter) here.
</p>
<p>
And this is a separate paragraph.
</p>
<h2 id="special-characters-feature-request">Special characters (FEATURE REQUEST)</h2>


<p>
FEATURE REQUEST: Angle bracket escapes:
</p>
<ul>

<li>Angle brackets: If you put angle brackets in your text: &lt; or >, we don't want that to render as an HTML tag. So, we use &amp;lt; for the opening bracket by default. However, if you select the Render HTML tags option, the opening &lt; will not be replaced.

<li>Test: it seems that loose angle brackets &lt; and > do not behave like HTML tags. But when there is no whitespace: &lt;some text>, they do behave like HTML tags. To change that behavior, we’ll need to (by default) escape the opening angle bracket and turn it into &amp;lt;. 

<li>But if you really want an angle bracket while using the default setting (to insert a few HTML tags), you can escape it: <tag>, <div class=’someclass’>. Not escaped: &lt;tag>. Also not escaped: &lt;p>This is an HTML paragraph.&lt;p>

<li>Escaped: <p>This is an HTML paragraph.<p>
</li>
</ul>
<p>
Note that we need to replace the opening &lt;, even if it occurs at the beginning of a line, like this:
</p>
<p>
&lt;br>&lt;img src="img1.png"/>&lt;br>
</p>
<p>
Let’s also check for one at the end of a line, though that would be unusual: &lt;
</p>
<p>
Apparently, it's not a problem in code blocks (the tags are never rendered):
</p>



<pre class="prettyprint">This is a code block with some &lt;html> tags.
</pre>


<p>
This is some regular text.
</p>



<pre class="prettyprint">This is a single-cell table code block with some &lt;html> tags.</pre>


<p>
This is some more regular text.
</p>
<h2 id="subscript-and-superscript-processing">Subscript and superscript processing</h2>


<p>
A sentence with <sub>subscript</sub> and <sup>superscript</sup> and some more regular text and <sup><a href="http://www.google.com">a link to Google</a></sup>.
</p>
<p>
And more <sub><strong>bold</strong></sub> and <sup><code>mixed<strong><em> </em>bold<em> italic </em></strong>code</code></sup> and some more text. Some <em>italic text</em>.

<p>
Another paragraph with <strong>some bold text</strong>.
</p>
<p>
<sup>SUP</sup>A subscript or superscript at the beginning or end of a paragraph should not break things:<sub>SUB</sub>
</p>
<ol>

<li>A numbered list following a terminal subscript.

<li>Another list item.
</li>
</ol>
<h2 id="bugs">Bugs</h2>


<ul>

<li>Current open bugs: <a href="https://github.com/evbacher/gd2md-html/issues">https://github.com/evbacher/gd2md-html/issues</a> 

<li>New bug or feature request: <a href="https://github.com/evbacher/gd2md-html/issues/new">https://github.com/evbacher/gd2md-html/issues/new</a>. Thanks for helping to make Docs to Markdown better!

<!-- Footnotes themselves at the bottom. -->

<h2>Notes</h2>
<div class="footnotes">
<hr>
<ol><li id="fn1">
<p>
     Docs to Markdown supports footnotes!&nbsp;<a href="#fnref1" rev="footnote">&#8617;</a>

</ol></div>
