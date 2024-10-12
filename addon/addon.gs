// *** addon.gs ***

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

// *** addon.gs ***
// Google Docs Converter add-on (g2md-html).
// This is the server-side JavaScript.

/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current document.
 */

// We need the UI to add the menu and show the sidebar.
var ui = DocumentApp.getUi();

// Create the add-on menu item.
function onOpen() {
  ui.createAddonMenu()
      .addItem('Convert', 'showSidebar')
      .addToUi();  
}

// When this is installed, call onOpen.
function onInstall() {
  onOpen();
}

// Display sidebar.html.
function showSidebar() {
  var title = GDC_TITLE;
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle(title)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ui.showSidebar(html);
}

// This is the main public function the client will call (from sidebar.html).
function convertToMarkdown(config) {
  gdc.init(gdc.docTypes.md);
  // Pass config to conversion function.
  return md.doMarkdown(config);
}

// This is the main public function the client will call (from sidebar.html).
function convertToHTML(config) {
  gdc.init(gdc.docTypes.html);
  // Pass config to conversion function.
  return html.doHtml(config);
}

function convertText(text) {
  return text;
}
