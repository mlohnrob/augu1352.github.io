'use strict';

Tuborg.Stories = new function Stories() {
    var self = this;

    self.pageIndex = 0;
    self.pageSize = 10;

    /**
     * Check if a story type exists
     *
     * @param {Object} typeCount
     * @param {String} type
     */
    self.typeExists = function typeExists(typeCount, type) {
        for (var i = 0; i < typeCount.length; i++) {
            if (typeCount[i].key == type) {
                return true;
            }
        }
      
        return false;
    };

    /**
     * Check if a beer type exists
     *
     * @param {Object} beerCount
     * @param {String} beer
     */
    self.beerExists = function beerExists(beerCount, beer) {
        for (var i = 0; i < beerCount.length; i++) {
            if (beerCount[i].key == beer) {
                return true;
            }
        }
        
        return false;
    };

    /**
     * Initialises the stories
     */
    self.init = function init() {
        // Don't init, if the "stories" container doesn't exist
        if($('#stories').length < 1) { return; }

        // Tuborg'sk filter
        if ($('.stories__filters').length > 0) {
            $('.stories__filters li').click(function() {
                var isCurrent = $(this).hasClass('active');
                 
                var index = $(this).index();

                if(!isCurrent) {
                    $('.stories__filters .active').removeClass('active');
                    $(this).addClass('active');
                    $('.stories__filter.active').removeClass('active');
                    $('.stories__filter:eq('+index+')').addClass('active');
                }
            });
        }

        // NoUISlider
        if($('.stories__filters').length) {
            var slider = document.getElementById('storiesSlider');

            noUiSlider.create(slider, {
                start: [1805, new Date().getFullYear()],
                connect: true,
                tooltips: [true, true], // Formatter here
                range: {
                    'min': 1800,
                    'max': new Date().getFullYear()
                },
                format: {
                    to: function (value) {
                        return Math.ceil(value);
                    },
                    from: function (value) {
                        return Math.ceil(value);
                    }
                }
            });

            var skipValues = [
                document.getElementById('skip-value-lower'),
                document.getElementById('skip-value-upper')
            ];

            slider.noUiSlider.on('update', function (values, handle) {
                skipValues[handle].value = values[handle];

            });

            slider.noUiSlider.on('end', function () {
                // Clear both buttons if using the slider
                $('.stories__filter.stories__filter--type input[type="radio"]').prop('checked', false);
                $('.stories__filter.stories__filter--beer input[type="radio"]').prop('checked', false);
                self.loadStories(true);
            });
        }
        
        // Event: Clicked beer filter
        $('.stories__filter.stories__filter--beer input[type="radio"]').click(function () {
            // When picking a beer id, clear the story type selection
            $('.stories__filter.stories__filter--type input[type="radio"]').prop('checked', false);
            self.loadStories(true);
        })
        
        // Event: Clicked type filter
        $('.stories__filter.stories__filter--type input[type="radio"]').click(function () {
            // When picking a story type, clear the beer id selection
            $('.stories__filter.stories__filter--beer input[type="radio"]').prop('checked', false);
            self.loadStories(true);
        })

        // Event: Clicked "more stories"
        $("#more-stories").click(function () {
            self.loadStories();
        });

        // Event: Clicked close button on a video modal
        $('#stories__video-reveal .close-button').click(function() {
            $('#stories__video-reveal iframe').attr('src', '');
            $(this).parent().foundation('close');
        });

        // Event: Click to reveal modal
        $('#story-video-single').on('click', function () {
            $("#stories__video-reveal iframe").attr('src', 'https://www.youtube-nocookie.com/embed/' + $(this).data('video-url') + '?autoplay=true');
            $("#stories__video-reveal").foundation("open");
        });

        // Load initial stories
        self.loadStories();
    };

    /**
     * Loads more stories
     *
     * @param {Boolean} clear
     */
    self.loadStories = function loadStories(clear) {
        console.log(Tuborg.Helpers.getRootPath());
        // Reset page index if clearing
        if (clear) {
            self.pageIndex = 0;
            $('.stories__items').empty();
        } 
        
        // Result state caching
        var videoId = 0;

        // Input parameters
        var type = $('input[name=type]:checked').val() || $('.stories__filter--type').val();
        var beerId = $('#stories').data('beer-id') || $('.stories__filter.stories__filter--beer input:checked').val() || null;
        var minYear = $('#skip-value-lower').val();
        var maxYear = $('#skip-value-upper').val();
    
        // If the user is filtering based on type or beer id, the year is irrelevant
        if (type || beerId) {
            minYear = 0;
            maxYear = 9999;
        }
        // Make the search request
        $.ajax({
            type: 'POST',
            url: Tuborg.Helpers.getRootPath() + '/tuborgsk/',
            data: {
                beer: beerId,
                type: type,
                pageIndex: self.pageIndex,
                pageSize: self.pageSize,
                minYear: minYear,
                maxYear : maxYear
            },

            dataType: 'json',

            success: function (result) {
                var data = result.stories;
                var beerAndTypeCount = result.count;

                // Hide the "type" filters that don't exist 
                $('.stories__filter.stories__filter--type li').each(function (index) {
                    if (!self.typeExists(beerAndTypeCount.typeCount, $(this).attr('type'))) {
                        $(this).hide();
                    }
                });

                // Hide the "beer" filters that don't exist 
                $('.stories__filter.stories__filter--beer li').each(function (index) {
                    if (!self.beerExists(beerAndTypeCount.beerCount, $(this).attr('beer'))) {
                        $(this).hide();
                    }
                });

                // If no more stories are available, hide the "more stories" elements
                if (data.length < self.pageSize) {
                    $('.morestories').hide();
                    $('#more-stories').hide();
                }  

                // If no data was found, hide the relevant section
                if (data.length < 1) {
                    $('.sectionhide').hide()
                    
                    return;
                }
                
                self.pageIndex++;
               
                // Generate HTML
                var direction = '-left';
                
                for (var i =0  ; i < data.length ; i++) {
                    if (!data[i]) { continue; }

                    var videoIcon = '';
                    var html = '<div class="stories__item ' + direction + '">';
                    
                    html += '<div class="grid-x">';
                
                    // Insert image
                    if(data[i].imageUrl) {
                        html += '<div class="cell">';
                        html += '<div class="stories__image para-image">';
                        html += '<div class="main__image-container"';
                       
                        // Insert video
                        if(data[i].videoUrl) {
                            var videoLink = data[i].videoUrl.split('?v=');

                            if (!videoLink || videoLink.length < 1) {
                                videoLink = data[i].videoUrl;
                            }

                            html += 'id="story-video-' + videoId + '" data-video-url="' + videoLink + '"';

                            // Event: Click to reveal modal
                            $('.stories__items').on('click', '#story-video-' + videoId, function() {
                                $("#stories__video-reveal iframe").attr('src', 'https://www.youtube-nocookie.com/embed/'+$(this).data('video-url')+'?autoplay=true');
                                $("#stories__video-reveal").foundation("open");
                            });

                            videoId++;

                            videoIcon = '<i class="icon-youtube-play"></i>';
                        }

                        html += '><img src="' + data[i].imageUrl + '" />'+videoIcon+'</div>';
                        
                        html += '</div>';
                    }

                    html += '</div>';
                    
                    // Insert content
                    html += '<div class="cell stories__content-container';
                    
                    if (data[i].imageUrl == undefined) html += ' no-image';
                    
                    html += ' para-content">';
                    html += '<div class="stories__content">';

                    // Insert social sharing button
                    html += '<a class="stories__share" href= "https://www.facebook.com/sharer/sharer.php?u=http://' + location.host + data[i].url + '" target="_blank"><i class="icon-facebook"></i>Del</a>';
                    
                    // Insert heading
                    html += '<h2>' + data[i].heading + '</h2>';
                    
                    // Insert tags
                    html += '<ul class="stories__tags">';
                    
                    // Year tag
                    html += '<li>' + data[i].year + '</li>';

                    // Beer tag
                    if (data[i].beer) {
                        html += '<li><a href="' + data[i].beer.url + '">' + data[i].beer.heading + '</a></li>';
                    }

                    // Type tag
                    if (data[i].type) {
                        html += '<li><p> ' + data[i].type.name + '</p></li>';
                    }

                    html += '</ul>';

                    if (data[i].body) {
                        html += '<p>' + data[i].body + '</p>';
                    }
                    
                    html += '</div></div>';

                    // Append this item
                    $('.stories__items').append(html);

                    // Change direction
                    if (direction == '-left') {
                        direction = '-right';
                    } else {
                        direction = '-left';
                    }
                }
            }
        });
    };
}();
