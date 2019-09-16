
;( function ( document, window, index )
{
	'use strict';

	var elSelector = '.header',
	elClassNarrow = 'header--narrow',
	elNarrowOffset = 100,
	element = document.querySelector( elSelector );

	if( !element ) return true;

	var elHeight = 0,
	elTop = 0,
	dHeight = 0,
	wHeight = 0,
	wScrollCurrent = 0,
	wScrollBefore = 0,
	wScrollDiff = 0,

	hasElementClass = function( element, className ){ return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className ); },
	addElementClass	= function( element, className ){ element.classList ? element.classList.add( className ) : element.className += ' ' + className; },
	removeElementClass = function( element, className ){ element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' ); };

	window.addEventListener( 'scroll', function()
	{
		elHeight = element.offsetHeight;
		dHeight = document.body.offsetHeight;
		wHeight = window.innerHeight;
		wScrollCurrent = window.pageYOffset;
		wScrollDiff = wScrollBefore - wScrollCurrent;
		elTop = parseInt( window.getComputedStyle( element ).getPropertyValue( 'top' ) ) + wScrollDiff;

			if( wScrollCurrent > elNarrowOffset ) // toggles "narrow" classname
			{
				if( !hasElementClass( element, elClassNarrow ) )
					addElementClass( element, elClassNarrow );
			}
			else removeElementClass( element, elClassNarrow );

			if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
			element.style.top = '0px';

			else if( wScrollDiff > 0 ) // scrolled up; element slides in
			element.style.top = ( elTop > 0 ? 0 : elTop ) + 'px';

			else if( wScrollDiff < 0 ) // scrolled down
			{
				if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
				element.style.top = ( ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';

				else // scrolled down; element slides out
				element.style.top = ( Math.abs( elTop ) > elHeight ? -elHeight : elTop ) + 'px';
			}

			wScrollBefore = wScrollCurrent;
		});

}( document, window, 0 ));
