$( function(){
    new Accordion( $( '.accordion' ) );
} );

var Accordion = function( obj ){
    this.obj = obj;
    this.items = this.obj.find( '> dt' );

    this.init();
};
    Accordion.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.controls();
        },
        core: function(){
            var self = this;

            return {
                controls: function(){
                    self.items.on( {
                        'click': function(){
                            var curItem = $( this );

                            if( curItem.hasClass( 'opened' ) ){
                                self.core.hide( curItem );
                            } else {
                                self.core.show( curItem );
                            }
                        }
                    } );
                },
                show: function( item ){
                    var content = item.next();

                    item.addClass( 'opened' );
                    content.stop( true, false ).slideDown( 300 );
                },
                hide: function( item ){
                    var content = item.next();

                    content.stop( true, false ).slideUp( 300, function(){
                        $( this ).prev().removeClass( 'opened' );
                    } );
                }
            };
        }

    };