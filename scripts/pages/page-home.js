(function() {
	/* VARIABLES */
    var $document = $(document);
	var $cuerpo = $('body');
	var $ventana = $(window);
	var $widthVentana = $ventana.width();
	var $htmlcuerpo = $('html, body');

	var $img_lazy = $('.lazy');

    var $frm_label = $('.cnt-input').find('label');
    var $frm_input = $('.cnt-input').find('input');

	var $date = new Date();
	var $year = $date.getFullYear();
	var $output_year = $('#id_year');

    

    /*-----------------------------------------------------------------------------------*/
    /* Lazy Images
    /*----------------------------------------------------------------------------------*/

    lazy();
    function lazy(){
    	$img_lazy.lazy(0, function(){
            $(this).on('load',function(){
                $(this).addClass('loaded');
            });
        });
    }

    /*-----------------------------------------------------------------------------------*/
    /* Select
    /*----------------------------------------------------------------------------------*/

    var $select = $('select');
    $select.select2();


}());
