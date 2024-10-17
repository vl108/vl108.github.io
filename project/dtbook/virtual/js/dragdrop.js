$(function(){
	"use strict";
	var $dragItems = $('.drag-item');
	var $dropBox = $('.drop-item');

	$dragItems.on('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
	});

	$dragItems.draggable({
		helper: 'clone',
		scope: 'box',
		start: function(){
			$(this).addClass('dragging');
		},
		stop: function(){
			$(this).removeClass('dragging');
		}
	});

	$dropBox.droppable({
		accept: '.drag-item',
		scope: 'box',
		drop: function(e, ui){
			var $t = $(this);
			var $dragItem = $(ui.draggable);
			var dragChance = $dragItem.data('chance') || $dragItem.attr('data-chance');
			var dropChance = $t.data('chance');
			var inputVal = $dragItem.attr('data-text') || $dragItem.text();
			var prop = false;

			$t.prev().val() && $t.prev().val().split(',').forEach((item, i) => {
				if(item === inputVal){
					prop = true;
					return false;
				}
			});

			if(prop){
				return;
			}

			if (!dropChance) { // 여러개 드롭이 아니면 밀어내기 가능
				if($dragItem.parent()[0] !== this && $t.find('.drag-item').length){
					var $before = $t.find('.drag-item'),
						$beforeDrag = $dragItems.filter(function(){
							return $(this).closest($before.data('root')[0]).length;
						}).eq($before.data('index')),
						beforeDragChance = $beforeDrag.data('chance');

					$beforeDrag.draggable('option', 'disabled', false);
					$beforeDrag.attr('data-chance') && $beforeDrag.data('chance', beforeDragChance+1);
					$before.remove();
					$t.prev().val('');
					$t.prev().prop('checked', false);
				}
			}

			if($dragItem.hasClass('drag-item-clone')){
				$dragItem.parent().droppable('option', 'disabled', false);
				$t.append(ui.draggable);
				$dragItem.css({top: 0, left: 0}).draggable();
			}else{
				var newDrag = ui.draggable.clone();
				var dragRoot = $dragItem.closest('.drag-area');
				var index = dragRoot.find('.drag-item').index($dragItem);

				(dragChance === 1 || !dragChance) && $dragItem.draggable('option', 'disabled', true);

				$t.append(newDrag);
				newDrag.removeClass('dragging ui-draggable-disabled').addClass('drag-item-clone').data({
					'index': index,
					'root': dragRoot
				}).draggable({
					scope: 'box',
					revert: true,
					revertDuration: 0
				}).on('touchmove',function(event){
					event.preventDefault();
					event.stopPropagation();
				})

				dragChance && $dragItem.data('chance', --dragChance);
			}

			(dropChance && $t.children().length === dropChance) && $t.droppable('option', 'disabled', true);

			// 여러번 드롭했을 때 기존 값 남아있는 것 방지
			$dropBox.each(function(){
				var inputVal = '' ;
				var _this = $(this);

				if(_this.prev()[0].type === 'text'){
					_this.find('.drag-item').each(function(i, ele){
						if( i > 0) inputVal +=',';
						inputVal += $(ele).attr('data-text') || $(ele).text();
					});

					_this.prev().val(inputVal);
				}
			});

			$t.prev()[0].type !== 'text' && $t.prev().prop('checked', true);
		}
    });

	$('.drop-refresh').click(function(){
		var target = this.dataset.target ? $(this.dataset.target) : $('body');
		target.find('.drop-item').droppable('option', 'disabled', false).children().remove();
		target.find('.drag-item').draggable('option', 'disabled', false).data('chance', 0);
		target.find('.drop-item').prev('input[type=text]').length && target.find('.drop-item').prev().val('');
		target.find('.drop-item').prev().prop('checked', false);
	});

	if(parent.API_ANNOTATION_LOAD){
		var interval = setInterval(function(){
			if(!$(top.document).find('#loading').is(':visible')){
				clearInterval(interval);
				$dropBox.prev().each(function(){
					var $input = $(this);
					var val = $input.val() && $input.val().replace(/\s|　/gi, '').split(',');
					var root = $input.closest('[data-qtype]').length ?  $input.closest('[data-qtype]') : $input.closest('.tab-pane');
					var dropChance = $input.next().data('chance');

					if(val.length){
						var ele;

						$dragItems.each(function(){
							var $drag = $(this);
							var text = $drag.data('text') || $drag.text();
							var chance = $drag.data('chance') || this.dataset.chance*1;
							var prop = true;

							if(root.length && root.find('.drag-area').length && !root.find($drag).length){
								prop = false;
							}

							if(prop && val.indexOf(text.replace(/\s|　/gi, '')) !== -1){
								ele = $drag.clone().removeClass('ui-draggable ui-draggable-handle').addClass('drag-item-clone');

								if(chance){
									$drag.data('chance', --chance);

									!chance && $drag.draggable('option', 'disabled', true);
								}else{
									$drag.draggable('option', 'disabled', true);
								}

								$input.next().append(ele);

								$(ele).data({
									'index': $drag.closest('.drag-area').find('.drag-item').index($drag),
									'root': $drag.closest('.drag-area')
								}).draggable({
									scope: 'box',
									revert: true,
									revertDuration: 0
								}).on('touchmove',function(event){
									event.preventDefault();
									event.stopPropagation();
								});
							}
						});
					}

					dropChance && $input.next().children().length === dropChance && $input.next().droppable('option', 'disabled', true);
				});
			}
		},100);
	}
});
