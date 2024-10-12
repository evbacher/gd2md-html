<!-- You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see useful information and inline alerts.
* ERRORs: 0
* WARNINGs: 2
* ALERTS: 6 -->

This is a raw conversion from a Google Doc (For verification purposes: use HTML headings and Reckless mode options for Markdown conversion, no other options).

<h1>MAIN: Docs to Markdown (GD2md-html)</h1>


This page demonstrates the features of [Docs to Markdown](https://workspace.google.com/marketplace/app/docs_to_markdown/700168918607) conversion from a Google Doc to a simple Markdown or HTML file. 

**Note**: Not all Markdown renderers support all Markdown features. For example github Markdown does not support a table of contents ([TOC]), footnotes, or definition lists. Also, some Markdown environments strip heading IDs and replace them with their own generated IDs. You’ll have to do some manual adjustments, depending on your target environment.


[TOC]


**Note**: If you find any bugs, please file them at [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues). Thanks for helping to make Docs to Markdown better!

<h1 id="headings">Headings</h1>


Docs to Markdown converts headings to the corresponding heading level in Markdown or HTML. If you use a lot of `Heading 1` headings in your Doc, but you want to adhere to the HTML convention of only a single H1 heading per page, you can use the `Demote headings` option.

<h1 id="heading-ids">Heading IDs</h1>


If you generate a table of contents (with blue links) in your Doc, Docs to Markdown will create IDs for each heading—this also allows proper conversion of intra-doc links. If your Markdown environment does not handle heading attributes, you can choose the `HTML headings/IDs` option. See [Links](#internal-links) for some internal link tests. A link to a different heading with the same words, [Heading IDs](#heading-ids), should go to that heading.

<h1 id="blank-headings">Blank headings</h1>


From here to END BLANK HEADINGS are headings that are empty or contain only whitespace.

END BLANK HEADINGS

<h2 id="basic-paragraphs">Basic paragraphs</h2>


This is a paragraph.[^1] (Docs to Markdown also supports footnotes) A sentence with `some embedded code`. Docs to Markdown changes “smart quotes” to straight quotes in code to guard against cut-and-paste errors.

<h2 id="basic-font-styling">Basic font styling</h2>


This is *italic* text. This is **bold** text. This is ***bold and italic*** text.

<h2 id="font-attribute-runs-including-extra-whitespace-at-the-ends">Font attribute runs including extra whitespace at the ends</h2>


For example a** bold run with some whitespace **on either end. Here’s an* italic run *with added whitespace. And a~~ strikethrough run ~~with additional whitespace. And` some code `with added whitespace. And<span style="text-decoration:underline;"> some underline </span>with added whitespace. Links [http://www.google.com](http://www.google.com). Link with no space:[http://www.google.com](http://www.google.com).

Some *italic**text**alternating**with**bold**italic*** but no spaces between font changes.

<h2 id="mixed-font-spans">Mixed font spans</h2>


Some regular text, *followed by an italic span* ***with some embedded bold*** *text*. (Note: this may still be a problem, depending on how it’s formatted in the Google Doc. Like this: Some regular text, *followed by an italic span **with some embedded bold** text*.

Some more regular text. Some ~~strikethrough text~~ here. 

Some ~~strikethrough text at the end of the paragraph.~~

Followed by some regular text.

<h2 id="mixed-code-spans">Mixed code spans</h2>


Docs to Markdown uses Markdown for most `inline code`, but it will also handle mixed code spans like this: <code>$ ls -l <strong><em>filename</em></strong></code>, by using HTML markup.

<h2 id="lists">Lists</h2>


Docs to Markdown supports numbered lists, ordered lists, and definition lists.

<h3 id="numbered-lists-ordered-lists">Numbered lists (ordered lists)</h3>


Here is a numbered list:



1. Item one.
2. Item two.

<h3 id="unordered-lists">Unordered lists</h3>


And here is a bullet list:



* A list item without any punctuation
* A list item with an embedded command: `ps aux | grep conky | grep -v grep | awk '{print $2}' | xargs kill`
* Some mixed-font code: <code>ls -l <strong><em>filename</em></strong></code>. Followed by some normal text.

<h3 id="another-ordered-list">Another ordered list</h3>




1. First item
2. Second item
3. Third item

<h3 id="a-nested-ordered-list">A nested ordered list</h3>




1. First item
2. Second item (this item has nested items below it)
    1. First nested item
    2. Second nested item
3. Third item

<h3 id="lists-with-code-blocks">Lists with code blocks</h3>


You can have a code block within a list item, as long as you indent the code  (in the Doc) the same amount as the list: 



* A text item, followed by a code block that's indented and should be part of this item:

    ```
    // A comment.
    some code;
      callFunction();
    ```


* Another item.
    * A nested list item with a command:

        ```
        $ cat file | grep dog | wc

        ```


<h3 id="lists-with-embedded-paragraphs">Lists with embedded paragraphs</h3>


Note: Works for Markdown, still a known issue for HTML.



* A bullet list with an additional paragraph:

    This is another paragraph (Note that GitHub renders an indented HTML paragraph under a list item as a code block! markdownlivepreview.com renders it properly as a paragraph.)


    This is a new paragraph, but also part of this list item. It should be indented

* Another item.
    * A nested item.

        This is a new paragraph within the nested item.


        ```
        // Some code after a nested paragraph.
        callSomeFunction();
        ```


* Another list item.
* And another.
    * Nested

        A paragraph within a list item.

        * Nested

            A paragraph within a list item.

    * Reducing the nesting level.
* First-level list item.

A regular paragraph.

<h3 id="definition-lists">Definition lists</h3>


Because Google Docs does not have a definition list element, Docs to Markdown uses a simple but explicit syntax that is similar to the kramdown syntax for definition lists:


```
?term on a line by itself (starting with a question mark)
:Definition preceded by a colon.
```


<h3 id="definition-list-examples">Definition list examples</h3>


**Note**: Github-flavored Markdown does not support Markdown definition-list syntax. You can select a definition list in a Google Doc and convert it to HTML if you’re using it in a GFM page.


```
? term
: Definition here.

?term1
?term2
: First paragraph of definition.
: Second paragraph of definition.
```


renders as:



term
:  Definition here.

term1
term2
:  First paragraph of definition.
:  Second paragraph of definition.

A term that has some ***crazy formatting*** and `characters` (not recommended)//.
:  Definition of crazy term.





But a definition term cannot be empty:

?

: Empty term above causes an error here.

<h2 id="code-blocks">Code blocks</h2>


A code block (note that by default, Docs to Markdown does *not* add language descriptors to code blocks, but see [Code Blocks with lang specification](#code-blocks-with-lang-specification)):


```
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
```


A single-cell table also becomes a code block:


```
#include<stdio.h>
main()
{
    printf("Hello World");
}
```


If you have “smart quotes” in regular text, they should be preserved. But if you have any smart quotes in `"code"` or code blocks, Docs to Markdown removes them during the conversion:


```
func main() {
	fmt.Println("Why would you do this?")
}
```


<h2 id="code-blocks-with-lang-specification">Code blocks with lang specification</h2>


Docs to Markdown supports an optional lang specification on the first line of the code sample (in the Doc source). The syntax is: <code>lang: <em>langspec</em></code>

For example, here is a code block that specifies `lang:c` on the first line:


```c
#include<stdio.h>
main()
{
    printf("Hello World");
}
```


This also works in single-cell tables: here is a single-cell table that specifies `lang: java` on the first line:


```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World");
    }
}
```


<h2 id="code-blocks-with-html">Code blocks with HTML</h2>


Code with some embedded HTML tags that should be displayed, not interpreted:


```html
This is <code>some code</code>
and some <strong>bold text</strong>.
```


A single-cell table with some HTML inside:


```
This is some code
     We want to handle as code block;

Preserve whitespace, <code>HTML tags</code>, etc.
Make a fenced code block in Markdown,
        pre in HTML.
```


<h2 id="tables">Tables</h2>


Docs to Markdown generates HTML tables.

A table:


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


You can also merge columns and rows in tables:


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


<h2 id="internal-links">Internal links</h2>


Some internal links to headings in this doc (note that you need to generate a TOC with blue links in this doc for these intra-doc links to work):



* [Heading IDs](#heading-ids)
* [Code blocks](#code-blocks)

<h2 id="heading-ids">Heading IDs</h2>


This is a duplicate heading (on purpose). An internal link to this heading should come here, not to [Heading IDs](#heading-ids) up top.

<h2 id="links">Links</h2>


Some regular URL links:



* [http://www.google.com/](http://www.google.com/)
* [https://fivethirtyeight.com/](https://fivethirtyeight.com/)

Some links with titles:



* [Jason Kottke's blog](http://kottke.org/)
* [Bean Road](https://beanroad.blogspot.com/)

<h2 id="images">Images</h2>


A plain image:


![alt_text](images/image1.png "image_tooltip")


Note that the image link will be broken until you store the image file on your server and adjust the path and width if necessary.

Alternatively, you can use a Drawing to display an image. Here's an example where we've pasted the image into a Drawing and referenced it after converting the doc:


![alt_text](images/image2.jpg "image_tooltip")


Tip: You can limit the width of an image in Markdown by adding (for example) `{width="75%"}` after the link markup (if your Markdown engine supports such syntax). For HTML, just add a `width="75%"` attribute to the `img` tag.

<h2 id="drawings">Drawings</h2>


Google Docs does not provide an API for accessing the data in a Google Drawing. If you have an inline drawing, Docs to Markdown will warn and provide an alert in the converted output:


![drawing](https://docs.google.com/drawings/d/12345/export/png)

You can display Google Drawings (and images in Drawings) by reference. See [Google Drawings by reference](https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference) for details.

Here's an example where we've referred to a drawing by reference (after converting):


![drawing](https://docs.google.com/drawings/d/12345/export/png)

Tip: For any drawing that you display by reference, be sure to change the permissions to make it viewable by anyone with the link.

<h2 id="equations">Equations</h2>


If you insert an equation using Google Docs, Docs to Markdown will warn and insert an alert message in the output. However, if your target publishing platform supports LaTeX equations, you can use LaTeX syntax directly.

A Google Docs equation:



A LaTeX equation:


```
$$e^{i\pi } = -1$$
```


renders as:

$$e^{i\pi } = -1$$

<h2 id="right-to-left-text">Right-to-left text</h2>


A few Arabic words هذه فقرة تجريبية inside an English paragraph:

They should appear as in this RTL paragraph:

<p dir="rtl">
هذه فقرة تجريبية </p>


<h2 id="soft-line-breaks">Soft line-breaks</h2>


lineBreak \
This line contains a shift-enter soft line-break here \
This bit is after the line break.

This is a line with some bold text interrupted by a soft line **break (shift-enter) here \
Followed by more bold** and some more regular text.

This paragraph has an explicit line-break (Enter) here.

And this is a separate paragraph.

<h2 id="special-characters-feature-request">Special characters (FEATURE REQUEST)</h2>


FEATURE REQUEST: Angle bracket escapes:



* Angle brackets: If you put angle brackets in your text: &lt; or >, we don't want that to render as an HTML tag. So, we use &amp;lt; for the opening bracket by default. However, if you select the Render HTML tags option, the opening &lt; will not be replaced.
* Test: it seems that loose angle brackets &lt; and > do not behave like HTML tags. But when there is no whitespace: &lt;some text>, they do behave like HTML tags. To change that behavior, we’ll need to (by default) escape the opening angle bracket and turn it into &amp;lt;. 
* But if you really want an angle bracket while using the default setting (to insert a few HTML tags), you can escape it: <tag>, <div class=’someclass’>. Not escaped: &lt;tag>. Also not escaped: &lt;p>This is an HTML paragraph.&lt;p>
* Escaped: <p>This is an HTML paragraph.<p>

Note that we need to replace the opening &lt;, even if it occurs at the beginning of a line, like this:

&lt;br>&lt;img src="img1.png"/>&lt;br>

Let’s also check for one at the end of a line, though that would be unusual: &lt;

Apparently, it's not a problem in code blocks (the tags are never rendered):


```
This is a code block with some <html> tags.
```


This is some regular text.


```
This is a single-cell table code block with some <html> tags.
```


This is some more regular text.

<h2 id="subscript-and-superscript-processing">Subscript and superscript processing</h2>


A sentence with <sub>subscript</sub> and <sup>superscript</sup> and some more regular text and <sup><a href="http://www.google.com">a link to Google</a></sup>.

And more <sub><strong>bold</strong></sub> and <sup><code>mixed<strong><em> </em>bold<em> italic </em></strong>code</code></sup> and some more text. Some *italic text*.

Another paragraph with **some bold text**.

<sup>SUP</sup>A subscript or superscript at the beginning or end of a paragraph should not break things:<sub>SUB</sub>



1. A numbered list following a terminal subscript.
2. Another list item.

<h2 id="horizontal-rules">Horizontal rules</h2>


This is a horizontal rule:


---

This is a regular paragraph.

<h2 id="blank-lines">Blank Lines</h2>


Line 1

Line 2

<h2 id="centered-right-aligned-text">Centered/Right aligned text</h2>


Handle centered, right-aligned text for Markdown/HTML (in progress).

<p style="text-align: right">
Right-aligned paragraph.</p>


Left-aligned paragraph.

Center-aligned paragraph.

Left-aligned paragraph.

<h3 id="center-aligned-heading">Center-aligned Heading</h3>


Regular paragraph.

<h2 id="bugs">Bugs</h2>




* Current open bugs: [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues) 
* New bug or feature request: [https://github.com/evbacher/gd2md-html/issues/new](https://github.com/evbacher/gd2md-html/issues/new). Thanks for helping to make Docs to Markdown better!

<h2 id="end">End</h2>


This document ends with this regular paragraph (though footnotes may follow).


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     Docs to Markdown supports footnotes!
