$(function(){
	"use strict";

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

				$dragItem.closest('.drag-area').length && $dragItem.closest('.drag-area').find('.drop-refresh').show();

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
					var root = $input.closest('[data-qtype]').length ?  $input.closest('[data-qtype]') : $input.closest('.tab-pane');

					if(!root.length &&  $input.closest('.swiper-slide').length){
						root = $input.closest('.swiper-slide');
					}

					if(val.length){
						var ele;

						$dragItem.each(function(){
							var $drag = $(this);
							var text = $drag.data('text') || $drag.text();
							var chance = $drag.data('chance') || this.dataset.dropCount*1;
							var prop = true;

							if(root.length && root.find('.drag-area').length && !root.find($drag).length){
								prop = false;
							}


							if(prop && val.indexOf(text.replace(/\s|　/gi, '')) !== -1){

								ele = $drag.clone().removeClass('ui-draggable ui-draggable-handle');

								if(chance){
									$drag.data('chance', --chance);

									!chance && $drag.draggable('option', 'disabled', true);
								}else{
									$drag.draggable('option', 'disabled', true);
								}

								$input.next().append(ele.html());

								$drag.closest('.drag-area').length && $drag.closest('.drag-area').find('.drop-refresh').show();
							}
						});

						(!dropChance || $input.next().children().length === dropChance) && $input.next().droppable('option', 'disabled', true);
					}
				});
			}
		},100);
	}
});
