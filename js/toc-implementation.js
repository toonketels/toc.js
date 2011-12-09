// Our implementation of the toc

// Create a table of contents
toc.parseHtml( [ 'h1', 'h2' , 'h3' ], document.body  );
// Render it
toc.renderToc();