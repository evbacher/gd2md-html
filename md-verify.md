<!----- Conversion time: 3.441 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* gd2md-html version 1.0β2
* Sat Jul 29 2017 16:04:13 GMT-0700 (PDT)
* Source doc: https://docs.google.com/open?id=1Zn4Cdp_OZ-qEbETwkG8reJY40TsZ_lDbLQL5lNKtw28

WARNING:
Inline drawings not supported: look for ">>>>>  gd2md-html alert:  inline drawings..." in output.


WARNING:
You have some equations: look for ">>>>>  gd2md-html alert:  equation..." in output.

* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server.
----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 2; ALERTS: 6.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


This is a raw conversion from a Google Doc.


## gd2md-html MASTER doc

This page demonstrates the features of gd2md-html conversion from a Google Doc to a simple Markdown or HTML file. 

**Note**: Not all Markdown renderers support all Markdown features. For example github Markdown does not support a table of contents ([TOC]), footnotes, or definition lists. Also, some Markdown environments strip heading IDs and replace them with their own generated IDs. You'll have to do some manual adjustments, depending on your target environment.


[TOC]


**Note**: If you find any bugs, please file them at [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues). Thanks for helping to make gd2md-html better!


### Headings {#headings}

gd2md-html converts headings to the corresponding heading level in Markdown or HTML. If you use a lot of `Heading 1` headings in your Doc, but you want to adhere to the HTML convention of only a single H1 heading per page, you can use the `Demote headings` option.


### Heading IDs {#heading-ids}

If you generate a table of contents in your Doc, gd2md-html will create IDs for each heading. If your Markdown environment does not handle heading attributes, you can chose the `HTML headings/IDs` option.


### Basic paragraphs {#basic-paragraphs}

This is a paragraph.[^1] (gd2md-html also supports footnotes) A sentence with `some embedded code`. gd2md-html removes "smart quotes" from text and code to guard against cut-and-paste errors.


### Mixed code spans {#mixed-code-spans}

gd2md-html uses Markdown for most `inline code`, but it will also handle mixed code spans like this: <code>$ ls -l <strong><em>filename</em></strong></code>, by using HTML markup.


### Lists {#lists}

gd2md-html supports numbered lists, ordered lists, and definition lists.


#### Numbered lists {#numbered-lists}

Here is a numbered list:



1.  Item one.
1.  Item two.


#### Ordered lists {#ordered-lists}

And here is a bullet list:



*   A list item without any punctuation
*   A list item with an embedded command: `ps aux | grep conky | grep -v grep | awk '{print $2}' | xargs kill`
*   Some mixed-font code: <code>ls -l <strong><em>filename</em></strong></code>. Followed by some normal text.


#### Lists with code blocks {#lists-with-code-blocks}

You can have a code block within a list item, as long as you indent the code  (in the Doc) the same amount as the list: 



*   A text item, followed by a code block that's indented and should be part of this item:

    ```
    // A comment.
    some code;
      callFunction();
    ```


*   Another item.
    *   A nested list item with a command:

        ```
        $ cat file | grep dog | wc

        ```



#### Definition lists {#definition-lists}

Because Google Docs does not have a definition list element, gd2md-html uses a simple but explicit syntax that is similar to the kramdown syntax for definition lists:


```
?term on a line by itself (starting with a question mark)
:Definition preceded by a colon.
```



#### Definition list examples {#definition-list-examples}


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


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: Definition &darr;&darr; outside of definition list. Missing preceding term(s)? </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


: Empty term above causes an error here.


### Code blocks {#code-blocks}

A code block (note that by default, gd2md-html does *not* add language descriptors to code blocks, but see [Code Blocks with lang specification](#code-blocks-with-lang-specification)):


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


If you have any smart quotes in `"code"` or code blocks, gd2md-html removes them during the conversion:


```
func main() {
	fmt.Println("Why would you do this?")
}
```



### Code blocks with lang specification {#code-blocks-with-lang-specification}

gd2md-html supports an optional lang specification on the first line of the code sample (in the Doc source). The syntax is: <code>lang: <em>langspec</em></code>

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



### Code blocks with HTML {#code-blocks-with-html}

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



### Tables {#tables}

gd2md-html generates HTML tables.

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
   <td>A list:<ul>

<li><a href="https://en.wikipedia.org/wiki/Mozzarella">mozzarella cheese</a></li></ul>

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



### Links {#links}

Some regular URL links:



*   [http://www.google.com/](http://www.google.com/)
*   [https://fivethirtyeight.com/](https://fivethirtyeight.com/)

Some links with titles:



*   [Jason Kottke's blog](http://kottke.org/)
*   [Bean Road](https://beanroad.blogspot.com/)


### Images {#images}

A plain image:



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/gd2md-html-MASTER0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/gd2md-html-MASTER0.png "image_tooltip")


Note that the image link will be broken until you store the image file on your server and adjust the path and width if necessary.

Alternatively, you can use a Drawing to display an image. Here's an example where we've pasted the image into a Drawing and referenced it after converting the doc:



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/gd2md-html-MASTER1.jpg). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/gd2md-html-MASTER1.jpg "image_tooltip")


Tip: You can limit the width of an image in Markdown by adding (for example) `{width="75%"}` after the link markup (if your Markdown engine supports such syntax). For HTML, just add a `width="75%"` attribute to the `img` tag.


### Drawings {#drawings}

Google Docs does not provide an API for accessing the data in a Google Drawing. If you have an inline drawing, gd2md-html will warn and provide an alert in the converted output:



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline drawings not supported directly from Docs. You may want to copy the inline drawing to a standalone drawing and export by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details. The img URL below is a placeholder. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![drawing](https://docs.google.com/a/google.com/drawings/d/12345/export/png)

You can display Google Drawings (and images in Drawings) by reference. See [Google Drawings by reference](https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference) for details.

Here's an example where we've referred to a drawing by reference (after converting):



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline drawings not supported directly from Docs. You may want to copy the inline drawing to a standalone drawing and export by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details. The img URL below is a placeholder. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![drawing](https://docs.google.com/a/google.com/drawings/d/12345/export/png)

Tip: For any drawing that you display by reference, be sure to change the permissions to make it viewable by anyone with the link.


### Equations {#equations}

If you insert an equation using Google Docs, gd2md-html will warn and insert an alert message in the output. However, if your target publishing platform supports LaTeX equations, you can use LaTeX syntax directly.

A Google Docs equation:



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>



A LaTeX equation:


```
$$e^{i\pi } = -1$$
```


renders as:

$$e^{i\pi } = -1$$


### Right-to-left text {#right-to-left-text}

A few Arabic words هذه فقرة تجريبية inside an English paragraph:

They should appear as in this RTL paragraph:

<p dir="rtl">
هذه فقرة تجريبية </p>



### Subscript and superscript processing {#subscript-and-superscript-processing}

A sentence with <sub>subscript</sub> and <sup>superscript</sup> and some more regular text and <sup><a href="http://www.google.com">a link to Google</a></sup>.

And more <sub><strong>bold</strong></sub> and <sup><code>mixed<strong><em> </em>bold<em> italic </em></strong>code</code></sup> and some more text. Some *italic text*.

Another paragraph with **some bold text**.

<sup>SUP</sup>A subscript or superscript at the beginning or end of a paragraph should not break things:<sub>SUB</sub>



1.  A numbered list following a terminal subscript.
1.  Another list item.


### Bugs {#bugs}



*   Current open bugs: [https://github.com/evbacher/gd2md-html/issues](https://github.com/evbacher/gd2md-html/issues) 
*   New bug or feature request: [https://github.com/evbacher/gd2md-html/issues/new](https://github.com/evbacher/gd2md-html/issues/new). Thanks for helping to make gd2md-html better!

<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     gd2md-html supports footnotes!
