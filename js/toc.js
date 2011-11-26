//------------------------------------------------------------
//  toc.js
// 
// A Table Of Content js script.
// Generates a table of contents from the current page.
//
// 3 parts:
// 1. html parser:
//	event-based DOM parser
// 2. toc model:
//	holds the toc data
//	defines methods for adding items
// 3. toc renderer:
//	displays a toc
//----------------------------------------------------------
//----------------------------------------------------------


// Our parser
function parseHtml( element ) {
    // In case arg is not supplied, start from body
    element = element || document;
    
    var cur = element.firstChild;
    
    var counter = counter || 1;
    
    // Untill we have no more next elements
    while ( cur != null ) {
        
        // get the children
        if( cur.nodeType == 1 ) {
		
		// Log were we are
		console.log( cur.tagName );
		
		// Set the id if there is none;
		cur.id = cur.id || "toc-" + counter;
		
		// increment counter
		counter ++;
		
		// Create item object
		var item = {
		    'tag': cur.tagName,
		    'title': cur.innerText,
		    'link': '#'+cur.id
		};
		
		console.log( item );
		
		addElementToToc( item );
  
            parseHtml( cur );
        }

        cur = cur.nextSibling;
    }

    return this.elements;

}

// Our modal
var toc = []

function addElementToToc( item ) {
	toc.push( item );
}


// Our tocRenderer
function renderToc() {
    
    // Create out html element
    var ulToc = document.createElement('ul');
    ulToc.setAttribute('id', 'toc');
    
    // Add the toc to it.
    for( var i = 0; i < toc.length ; i++ ) {
	var child = document.createElement('li');
	var link = document.createElement('a');
	link.setAttribute('href', toc[i].link);
	link.innerHTML = toc[i].title;
	
	child.appendChild(link);
	
	ulToc.appendChild(child);
    }
    
    document.body.appendChild(ulToc); 
}


// Create a table of contents
parseHtml( document.body  );

renderToc();

console.log(toc);