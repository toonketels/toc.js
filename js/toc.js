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
//
// Namespace it: ref: http://www.brainonfire.net/blog/javascript-object-literal-namespace/
//----------------------------------------------------------
//----------------------------------------------------------


var toc = {
    
    // Our model
    toc: {
	model: [],
	
	addElementToToc:function( item ) {
	    toc.toc.model.push( item );
	}
	
    },
    
    // Our parser
    parseHtml:function( filters, element ) {
	// Default filters if none provided
	filters = filters || [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];
	// In case arg is not supplied, start from body
	element = element || document;
    
	var cur = element.firstChild;
    
	var counter = counter || 1;
    
	// Untill we have no more next elements
	while ( cur != null ) {
        
	    // get the children nodes if those are html tags
	    if( cur.nodeType == 1 ) {
		
	        // If the element watches what we defined in the array,
	        // add it to the toc
	        for (var i = 0; i < filters.length; i++) {
	            if(filters[i].toLowerCase() == cur.tagName.toLowerCase()) {
		
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
			
			toc.toc.addElementToToc( item );	
			}
		    }
		toc.parseHtml( filters, cur );
	    }
	    cur = cur.nextSibling;
	}
	return this;
    },
    
    // Our renderer
    renderToc: function( element ) {
        // the element to append the toc too
	element = element || document.body;
    
	// Create out html element
	var ulToc = document.createElement('ul');
	ulToc.setAttribute('id', 'toc');
    
	// Add the toc to it.
	for( var i = 0; i < toc.toc.model.length ; i++ ) {
	    var child = document.createElement('li');
	    var link = document.createElement('a');
	    link.setAttribute('href', toc.toc.model[i].link);
	    link.innerHTML = toc.toc.model[i].title;
	
	    child.appendChild(link);
	
	    ulToc.appendChild(child);
	}
	
	element.appendChild(ulToc); 
    }  
}
