$(function(){
	"use strict";

    $('#modalVirtual').addClass('modal-open').show();
	
	var $dragItem = $('.drag-fix');
	var $dropBox = $('.drop-fix');
	var target = 'parent';

	$dragItem.on('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
	});

	$dragItem.draggable({
		helper: 'clone',
		scope: 'fbox',
		revertDuration: 0,
		start: function(){
			$(this).addClass('dragging');
		},
		stop: function(){
			$(this).removeClass('dragging');
		}
	});

	$dropBox.droppable({
		accept: '.drag-fix',
		scope: 'fbox',
		drop: function(e, ui){
			var $dropItem = $(this);
			var $dragItem = $(ui.draggable);
			var dragChance = $dragItem.data('chance') || $dragItem.attr('data-drop-count')*1;
			var dropArr = String($dropItem.data('drop')).indexOf(',') !== -1 && $dropItem.data('drop').split(',');
			var dropChance = $dropItem.data('chance');
			var inputVal = $dragItem.attr('data-text') || $dragItem.text();

			if($dropItem.data('parent') !== $dragItem.data('parent') || $dropItem.prev().val().indexOf(inputVal) >= 0){
				return;
			}

			if(($dragItem.data('drop') === $dropItem.data('drop')) || $.inArray(String($dragItem.data('drop')),dropArr)>-1){
				effectAudio.play('correct');
				$dropItem.append(ui.draggable.html());

				(dragChance === 1 || !dragChance) && $dragItem.draggable('option', 'disabled', true);

				(!dropChance || $dropItem.children().length === dropChance) && $dropItem.droppable('option', 'disabled', true);

				if($('.drop-fix').length == $('.ui-droppable-disabled').length){
					$('.drop-refresh').show()
				}

				dragChance && $dragItem.data('chance', --dragChance);

				if(dropChance && $dropItem.prev().val()){
					$dropItem.prev().val($dropItem.prev().val()+', '+inputVal)
				}else{
					$dropItem.prev().val(inputVal);
				}
			}else{
				effectAudio.play('again');
			}
		}
    });

	$('.drop-refresh').click(function(){
		var target = $(this.dataset.target);

		if(!target.find('.drop-fix').length) return;

		target.find('.drop-fix').droppable('option', 'disabled', false).empty().prev().val('');

		$(this).closest('.ttakji-box').length && $(this).closest('.ttakji-box').find('.drop-refresh').hide();

		target.find('.drag-fix').draggable('option', 'disabled', false).data('chance', 0);

		$(this).hide();
	});

	if(parent.API_ANNOTATION_LOAD){
		var interval = setInterval(function(){
			if(!$(top.document).find('#loading').is(':visible')){
				clearInterval(interval);
				$dropBox.prev().each(function(){
					var $input = $(this);
					var val = $input.val() && $input.val().replace(/\s|　/gi, '').split(',');
					var dropChance = $input.next().data('chance');

					if(val.length){
						var ele;

						$dragItem.each(function(){
							var $drag = $(this);
							var text = $drag.data('text') || $drag.text();
							var chance = $drag.data('chance') || this.dataset.dropCount*1;

							if(val.indexOf(text.replace(/\s|　/gi, '')) !== -1){

								ele = $drag.clone().removeClass('ui-draggable ui-draggable-handle').addClass('drag-item-clone');

								if(chance){
									$drag.data('chance', --chance);

									!chance && $drag.draggable('option', 'disabled', true);
								}else{
									$drag.draggable('option', 'disabled', true);
								}

								$input.next().append(ele.html());

								if($('.drop-fix').length == $('.ui-droppable-disabled').length){
									$('.drop-refresh').show()
								}
							}
						});

						(!dropChance || $input.next().children().length === dropChance) && $input.next().droppable('option', 'disabled', true);
					}
				});
			}
		},100);
	}

    $('[data-toggle*=btn-]').on('click', function(){
        var $t = $(this);
        if($t.data('toggle') === 'btn-o'){ 
			if($t.hasClass('active')){
				return false;
			} else {
				$t.addClass('active');
			}
            $('#modalVirtualAlertO').fadeIn();
        } else if($t.data('toggle') === 'btn-x'){ 
			$('#modalVirtualAlertX').fadeIn();
        }
    })

	 // 정리하기 
	 var isValid = true;

	 $('.btn-finish').click(function(){
		 var $t = $(this),
			 $tg = $t.closest('.tab-pane'),
			 $input = $tg.find('[data-toggle=btn-o]');
		 

		console.log($input.length, $input.filter('.active').length);

		if($input.length !== $input.filter('.active').length){
			$('#modalVirtualAlert').fadeIn();
			isValid = false;
			return false;
		} else {
			isValid = true;
		}

		if(isValid){
			$('#virtual-3').addClass('active').siblings().removeClass('active');
		}
	 });

    // 다시 하기
	$('.btn-re').click(function(){
		var $t = $(this);
		
		if($t.data('toggle') === 'replay' ){
			var $tg = $($t.attr('data-target'));
			$t.parent().removeClass('active');
			$tg.children().find('.on, .active').removeClass('on active');
		}
		if($t.data('toggle') === 'refresh' ){
			var target = this.dataset.target ? $(this.dataset.target) : $('body');
			target.find('.drop-item').droppable('option', 'disabled', false).children().remove();
			target.find('.drag-item').draggable('option', 'disabled', false).data('chance', 0);
		}
	});

    //확인
	$('[data-toggle="check"]').click(function(){
		var $t = $(this),
			$tg = $($t.data('target'));

		if(!$t.hasClass('active')){
			$t.parent().addClass('active');
			$tg.addClass('active');
		} else {
			$t.parent().removeClass('active');
			$tg.removeClass('active').find('.active').removeClass('active');
		}
	})

    //초기화
	$('[data-toggle="reset"]').click(function(){
		var $tg = $('#modalVirtual');

		$('.drop-refresh').hide();
		$tg.find('.active, .on, .show').removeClass('active on show');
		$tg.find('.drop-fix').droppable('option', 'disabled', false).empty().prev().val('');	
		$tg.find('.drag-fix').draggable('option', 'disabled', false).data('chance', 0);


		if($tg.find('.tab-pane').length){
			$tg.find('.tab-pane').filter(':first-child').addClass('active').siblings().removeClass('active');
		}

	})
});