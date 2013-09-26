$(function(){
    new SignIn();
    new FooterSelect( $( '.footer-location__select' ) );
    new ControlSelect( $( '.control__select' ) );

} );

var SignIn = function(){
    this.obj = $( '.sign-in' );
    this.btnSign = $( '.site__header-sign-in' );
    this.btnReg = $( '.site__header-registrate' );
    this.btnClose = $( '.sign-in__close' );

    this.init();
};
    SignIn.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.controls();
        },
        core: function(){
            var self = this;

            return {
                controls: function(){
                    self.btnClose.on( {
                        'click': function(){
                            self.obj.stop( true, false ).slideUp( 300 );
                        }
                    } );
                    self.btnSign.on( {
                        'click': function(){
                            self.obj.stop( true, false ).slideDown( 300 );
                        }
                    } );
                }
            };
        }
    };
var ControlSelect = function( obj ){
    this.obj = obj;
    this.parent = this.obj.parent();

    this.init();
};
    ControlSelect.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function(){
            var self = this;

            return {
                build: function(){
                    var options = self.obj.find( 'option'),
                        startLetter = '',
                        resultStr = '';

                    self.newSelect = $( '<div class="control__select">\
                                            <div>\
                                                <ul class="control__sort"></ul>\
                                                <div class="control__scroll"></div>\
                                            </div>\
                                            <input type="hidden" name="region">\
                                         </div>' );
                    self.list = $( '<div></div>' );
                    self.sort = self.newSelect.find( '.control__sort' );
                    self.text = $( '<span></span>' );
                    self.content =  self.newSelect.find( '>div' );
                    self.hidden = self.newSelect.find( 'input' );
                    self.newSelect.prepend( self.text );
                    self.newSelect.find( '.control__scroll' ).append( self.list );

                    options.each( function( i ){
                        var curItem = $( this ),
                            curLetter = curItem.text().substr( 0, 1 ).toUpperCase(),
                            startText = '</dl><dl class="control__it_' + curLetter.toLocaleLowerCase() + '">';

                        if( !i ){
                            startText =  '<dl class="control__it_' + curLetter.toLocaleLowerCase() + '">'
                        }

                        if( curLetter != startLetter ){
                            self.sort.append( '<li data-letter="' + curLetter.toLocaleLowerCase() + '">' + curLetter + '</li>' );
                            resultStr += startText + '<dt>' + curLetter + '</dt>';
                            startLetter = curLetter
                        }

                        if ( curItem[ 0 ].selected ){
                            self.text.text( curItem.text() );
                            resultStr += '<dd class="active">' + curItem.text() + '</dd>';
                        } else {
                            resultStr += '<dd>' + curItem.text() + '</dd>';
                        }
                    } );

                    resultStr += '</dl>';

                    self.list.append(resultStr  );

                    self.obj.after( self.newSelect );
                    self.obj.remove();
                    self.obj = self.newSelect;

                    self.scroll = $('.control__scroll').jScrollPane();
                    self.apiPeopleScroll = self.scroll.data('jsp');
                    self.opened = false;
                    self.sortBtn = self.newSelect.find( 'li' );
                    self.content.css( { display: 'none' } );
                    self.items = self.newSelect.find( 'dd' );
                    self.items2 = self.newSelect.find( 'dl' );
                    self.core.controls();
                },
                controls: function(){
                    self.obj.on( {
                        'click': function(){
                            if( !self.opened ) {
                                self.opened = true;
                                self.content.css( { display: 'block' } );
                            }
                        }
                    } );
                    self.items.on( {
                        'click': function(event){
                            var curItem = $( this ),
                                event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }

                            self.opened = false;
                            if( !curItem.hasClass( 'active' ) ){
                                self.text.text( curItem.text() );
                                self.hidden.val( curItem.text() );
                                self.items.removeClass('active');
                                curItem.addClass( 'active' );
                            }
                            self.content.css( { display: 'none' } );
                        }
                    } );
                    self.sortBtn.on( {
                        'click': function(){
                            var curItem = $( this );

                            self.apiPeopleScroll.scrollToY( self.items2.filter( '.control__it_' + curItem.attr( 'data-letter' ) ).position().top );
                        }
                    } );

                }
            };
        }
    };
var FooterSelect = function( obj ){
    this.obj = obj;
    this.parent = this.obj.parent();

    this.init();
};
    FooterSelect.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function(){
            var self = this;

            return {
                build: function(){
                    var options = self.obj.find( 'option');

                    self.newSelect = $( '<div class="footer__select"><div><div class="footer__scroll"></div></div><input type="hidden" name="region"></div>' );
                    self.list = $( '<ul></ul>' );
                    self.text = $( '<span></span>' );
                    self.content =  self.newSelect.find( '>div' );
                    self.hidden = self.newSelect.find( 'input' );
                    self.newSelect.prepend( self.text );
                    self.newSelect.find( '.footer__scroll' ).append( self.list );

                    options.each( function(){
                        var curItem = $( this );


                        if ( curItem[ 0 ].selected ){
                            self.text.text( curItem.text() );
                            self.list.append( '<li class="active">' + curItem.text() + '</li>' );
                        } else {
                            self.list.append( '<li>' + curItem.text() + '</li>' );
                        }
                    } );

                    self.obj.remove();
                    self.parent.append( self.newSelect );
                    self.obj = self.newSelect;

                    self.scroll = $('.footer__scroll').jScrollPane();
                    self.opened = false;
                    self.content.css( { display: 'none' } );
                    self.items = self.newSelect.find( 'li' );
                    self.core.controls();
                },
                controls: function(){
                    self.obj.on( {
                        'click': function(){
                            if( !self.opened ) {
                                self.opened = true;
                                self.content.css( { display: 'block' } );
                            }
                        }
                    } );
                    self.items.on( {
                        'click': function(event){
                            var curItem = $( this ),
                                event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }

                            self.opened = false;
                            if( !curItem.hasClass( 'active' ) ){
                                self.hidden.val( curItem.text() );
                                self.text.text( curItem.text() );
                                self.items.removeClass('active');
                                curItem.addClass( 'active' );
                                self.obj.parents( 'form' ).trigger( 'submit' );
                            }
                            self.content.css( { display: 'none' } );
                        }
                    } );

                }
            };
        }
    };