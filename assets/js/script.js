///// INTRO PAGE
$(document).ready(function() {
	//pageAction
	IntroAction();
});

///// RANDOM MODAL
// DISPLAY RANDOM ITEMS ON MODAL (RANDOM MODAL)
$(document).on('click', '.run-random', function() {
	$('.rand-item').addClass('animated rotateOutDownLeft');
	RunSearchAction();
	event.preventDefault();

	$.ajax({
		url: Edamam.buildQueryURLRand(),
		method: 'GET',
	}).then(function(response) {
		console.log('randomURL: ' + Edamam.buildQueryURLRand());
		console.log(response);
		$('.rand-item').removeClass('rotateOutDownLeft');

		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.rand-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.rand-item-name').html(response.hits[0].recipe.label);
		}
		$('.rand-item-img').attr('src', response.hits[0].recipe.image);
		if (response.hits[0].recipe.dietLabels !== []) {
			$('.rand-item-dietLabels').text(response.hits[0].recipe.dietLabels);
		}
		if (response.hits[0].recipe.dietLabels !== []) {
			$('.rand-item-healthLabels').text(response.hits[0].recipe.healthLabels);
		}
	});
});
// CLICKING ON LIKE BTN (RANDOM MODAL)
$(document).on('click', '#rand-like', function(event) {
	$('.rand-item').addClass('animated zoomOutRight');
	var $likedName = $('.rand-item-name')
		.clone()
		.removeClass();
	var $likedImg = $('.rand-item-img')
		.clone()
		.removeClass();
	$likedImg.attr('name', $likedName.text());
	$likedImg.addClass('food-img');
	$likedImg.attr('data-target', '#modelId');
	$likedImg.attr('data-toggle', 'modal');
	var $likedDiet = $('.rand-item-dietLabels')
		.clone()
		.removeClass();
	var $likedHealth = $('.rand-item-healthLabels')
		.clone()
		.removeClass();

	var $likedItem = $('<div class="liked-item col-xs-12 col-sm-8 col-md-6 col-lg-4 card">');
	$likedItem.append($likedName);
	$likedItem.append($likedImg);
	$likedItem.append($likedDiet);
	$likedItem.append($likedHealth);
	$('.result-item-area').prepend($likedItem);
	event.preventDefault();

	$.ajax({
		url: Edamam.buildQueryURLRand(),
		method: 'GET',
	}).then(function(response) {
		console.log(response);
		console.log('randomURL: ' + Edamam.buildQueryURLRand());

		$('.rand-item').removeClass('zoomOutRight');
		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.rand-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.rand-item-name').html(response.hits[0].recipe.label);
		}
		$('.rand-item-img').attr('src', response.hits[0].recipe.image);
		if (response.hits[0].recipe.dietLabels !== '[]') {
			$('.rand-item-dietLabels').text(response.hits[0].recipe.dietLabels);
		}
		if (response.hits[0].recipe.dietLabels !== '[]') {
			$('.rand-item-healthLabels').text(response.hits[0].recipe.healthLabels);
		}
	});
});

// DISPLAY SEARCHED ITEMS ON MODAL
$(document).on('click', '.run-search', function(event) {
	let x = $('#searchItem').val().length;
	if (x === 0) {
		alert('Enter a food item!!!');
	} else {
		$('.search-item').addClass('animated rotateOutDownLeft');
		//pageAction
		RunSearchAction();

		event.preventDefault();
		var search = $('#searchItem')
			.val()
			.trim();
		console.log(Edamam.buildQueryURLSearch(search));

		//!!! temp action for adding item to modal and to page
		// ADDING TO SEARCH MODAL
		$.ajax({
			url: Edamam.buildQueryURLSearch(search),
			method: 'GET',
		}).then(function(response) {
			console.log(response);
			console.log('searchedURL: ' + Edamam.buildQueryURLSearch(search));
			$('.search-item').removeClass('rotateOutDownLeft');

			if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
				$('.searched-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
			} else {
				$('.searched-item-name').html(response.hits[0].recipe.label);
			}
			$('.searched-item-img').attr('src', response.hits[0].recipe.image);
			if (response.hits[0].recipe.dietLabels !== []) {
				$('.searched-item-dietLabels').text(response.hits[0].recipe.dietLabels);
			}
			if (response.hits[0].recipe.dietLabels !== []) {
				$('.searched-item-healthLabels').text(response.hits[0].recipe.healthLabels);
			}
			addItemToBody();
		});
		// LIKING ITEMS //!!! cannot get the key id inside of AJAX... will go non-dry for now   search for "fa-thumbs-up" on html
		var addItemToBody = function() {
			if (
				$(this)
					.bind(this.document)
					.attr('id') === 'like'
			) {
				$('.result-item-area').prepend($('.search-item').clone());
			}
		};
	}
});

// ---------------------------------------------------- remove after make it dry with .run-search
$(document).on('click', '#like', function(event) {
	$('.search-item').addClass('animated zoomOutRight');
	var $likedName = $('.searched-item-name')
		.clone()
		.removeClass();
	var $likedImg = $('.searched-item-img')
		.clone()
		.removeClass();
	$likedImg.attr('name', $likedName.text());
	$likedImg.addClass('food-img');
	$likedImg.attr('data-target', '#modelId');
	$likedImg.attr('data-toggle', 'modal');
	var $likedDiet = $('.searched-item-dietLabels')
		.clone()
		.removeClass();
	var $likedHealth = $('.searched-item-healthLabels')
		.clone()
		.removeClass();

	var $likedItem = $('<div class="liked-item col-xs-12 col-sm-8 col-md-6 col-lg-4 card">');
	$likedItem.append($likedName);
	$likedItem.append($likedImg);
	$likedItem.append($likedDiet);
	$likedItem.append($likedHealth);
	$('.result-item-area').prepend($likedItem);
	event.preventDefault();
	var search = $('#searchItem')
		.val()
		.trim();
	console.log(Edamam.buildQueryURLSearch(search));

	$.ajax({
		url: Edamam.buildQueryURLSearch(search),
		method: 'GET',
	}).then(function(response) {
		console.log('searchedURL: ' + Edamam.buildQueryURLSearch(search));
		console.log(response);
		$('.search-item').removeClass('zoomOutRight');
		if (response.hits[0].recipe.label.toLowerCase().includes('recipe')) {
			$('.searched-item-name').html(response.hits[0].recipe.label.replace('recipe', ''));
		} else {
			$('.searched-item-name').html(response.hits[0].recipe.label);
		}
		$('.searched-item-img').attr('src', response.hits[0].recipe.image);
		if (response.hits[0].recipe.dietLabels !== '[]') {
			$('.searched-item-dietLabels').text(response.hits[0].recipe.dietLabels);
		}
		if (response.hits[0].recipe.dietLabels !== '[]') {
			$('.searched-item-healthLabels').text(response.hits[0].recipe.healthLabels);
		}
	});
});
// ---------------------------------------------------- remove after make it dry with .run-search

var displaySearchedItems = function() {
	// food item img
	var $itemImg = $('<img>');
	var itemImg = Edamam.searchedItems[0].image;
	$itemImg.attr('data-target', '#modelId');
	$itemImg.attr('data-toggle', 'modal');
	$itemImg.addClass('food-img');
	if (itemImg) {
		$itemImg.attr('src', itemImg);
	}

	// food item name
	var $itemName = $('<h5>');
	$itemName.addClass('food-name card-body');
	var itemName = Edamam.searchedItems[0].label;
	if (itemName) {
		$itemImg.attr('name', itemName);
		$itemName.html(itemName.toUpperCase());
	}

	// ------------------------------------------------------------ UNCOMENT AND TEST FOR ADDING ITEM TO MODAL/ ALSO UNCOMMEND LINE 45 data-target=".search-modal"
	// var test = "TEST";
	// // container for food img and name
	// var $itemContainer = $('<div>');
	// $itemContainer.addClass("item-ctnr card");
	// // append to container
	// $itemContainer.append($itemImg);
	// //!!! add btn to the container
	// // append to modal
	// $('#searched-item').append($itemContainer);
	// $('#searched-item-info').append($itemName);
	// $('#searched-item-info').append(test);
	// ------------------------------------------------------------ UNCOMENT AND TEST FOR ADDING ITEM TO MODAL/ ALSO UNCOMMEND LINE 45 data-target=".search-modal"

	// container for food img and name
	var $foodCtnr = $('<div>');
	$foodCtnr.addClass('food-ctnr card');
	// append to container
	$foodCtnr.append($itemImg);
	$foodCtnr.append($itemName);
	// append to body
	$('.result-item-area').append($foodCtnr);
};

// DETAIL SEARCH TOGGLE ON/OFF
$(document).on('click', '#detail-search', function() {
	$('.detail-search-form').toggle();
});
