/*

    This jQuery plugin will turn <ul> elements into psuedo <select>'s
    
    author:      Geof Crowl
    web:         geofcrowl.com
    twitter:     @rectangular

    
    
*/

(function( $ ){
    $.fn.SelectMatic = function(p_selected, p_function, p_urls, p_mouseoff) {
    
        // p_selected: default selected to set via JS, this needs
        //             to be the id of one of the <li> elements
        
        // p_function: class/function run at when an item is clicked
        //             it needs to have a function in it called execute
        //             the e.target will be passed to it and the usual
        //             JS/jQuery can be run on it
        
        // p_urls:     A dictionary of the urls, needs to follow this format
        //             {'selection_id': 'target_url'}
        //             e.g. {'main_div': 'http://www.google.com'};
        
        // p_mouseoff: Boolean. Do you want it to automatically collapse
        //             when the user mouses off of the <ul>
    
        var toggled = false;
        
        var defaultOffset = {'top': 0, 'left': 0};
        var newOffset = {'top': 0, 'left': 0};
    
        // similar to select
        this.css('cursor', 'pointer');
    
        // sets up the inital state
        this.children('li').each( function(index) {
        
            // let's set it as default from p_selected
            if(p_selected) {
            
                // if an <li> item has a class of default, but isn't the same
                // as p_selected, remove that class
                if( $(this).attr("class") == 'default' && this.id != p_selected) {
                    $(this).removeClass('default');
                }
            
                // set something as default
                if(this.id == p_selected) {
                    $(this).addClass('default');
                }            
                
            }
            
            // hide the ones we don't care about yet
            if( $(this).attr("class") != 'default' ) {
                $(this).css('display', 'none');
            } else {
                $(this).css('display', 'block');
            }
        
        });
        
        this.click(function(e) {    
        
            $(this).children('li').each( function(index) {
                if( $(this).attr('class') == 'default' ) {
                    $(this).removeClass('default');
                    $(this).addClass('selected');
                }
            });
            
            if(toggled) {
                // this code gets run if it's open and something
                // is clicked on
            
                // return the item to the normal position
                // and record the right positions for calculating
                // the required position adjustment to keep
                // seleted when expanded
                defaultOffset = $(this).position();
                newOffset = $(e.target).position();
                $(this).css('top', 0);
                
                // is there a function for when it is clicked?
                if(p_function) {
                    p_function.execute(e.target);
                }
                
                // removeClass on any that are set as selected
                $(this).children('li').each( function(index) {
                    $(this).removeClass('selected');
                });
                
                // set the right one as selected
                $(e.target).addClass('selected');
                
                // let's hide the non-selected stuff
                $(this).children('li').each( function(index) {
                    if( $(this).attr("class") != 'selected' ) {
                        $(this).css('display', 'none');
                    }
                });
                
                toggled = false;
                
            } else {
                // this code gets run when it's in a closed state
                // and clicked on
            
                // set the selected item to always be in the center when expanded
                $(this).css('top', -(newOffset.top) );
            
                $(this).children('li').each( function(index) {
                    $(this).css('display', 'block');          
                });
                
                toggled = true;
            }
        });
        
        // do we want it to collapse when the user mouses off?
        if(p_mouseoff) {
        
            this.mouseleave(function(e) {
                if(toggled) {
                    $(this).css('top', 0);
                    $(this).children('li').each( function(index) {
                        if( $(this).attr("class") != 'selected' ) {
                            $(this).css('display', 'none');
                        }
                    });
                    
                    toggled = false;
                }
            });
            
        }
    
    };
})( jQuery );