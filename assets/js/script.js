$(document).ready(function () {
    // Navbar background change on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // Smooth reveal on scroll (mini implementation of AOS)
    const revealElements = $('.album-card, .feature-item, .section-heading, .studio-pcard');

    function checkReveal() {
        const windowHeight = $(window).height();
        revealElements.each(function () {
            const elementTop = $(this).offset().top;
            if (elementTop < $(window).scrollTop() + windowHeight - 100) {
                $(this).addClass('revealed');
            }
        });
    }

    // Add CSS for reveal animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .album-card, .feature-item, .section-heading {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease-out;
            }
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    $(window).on('scroll', checkReveal);
    checkReveal(); // Initial check

    // Add some hover interactivity for the search box
    $('.search-box').hover(
        function () { $(this).css('box-shadow', '0 12px 40px rgba(31, 38, 135, 0.2)'); },
        function () { $(this).css('box-shadow', '0 8px 32px rgba(31, 38, 135, 0.1)'); }
    );

    // Studios Filter Tabs
    $('.filter-tab').on('click', function () {
        const filter = $(this).data('filter');

        // Update active tab
        $('.filter-tab').removeClass('active');
        $(this).addClass('active');

        // Filter cards
        $('#studiosGrid .studio-item').each(function () {
            const categories = $(this).data('category') || '';
            if (filter === 'all' || categories.includes(filter)) {
                $(this).removeClass('hidden').css({ opacity: 0, transform: 'translateY(18px)' });
                setTimeout(() => {
                    $(this).css({ opacity: 1, transform: 'translateY(0)', transition: 'all 0.4s ease' });
                }, 20);
            } else {
                $(this).addClass('hidden');
            }
        });
    });

    // Trust Metrics Counter Animation
    let counted = false;
    $(window).scroll(function() {
        if ($('.trust-metrics-section').length) {
            const oTop = $('.trust-metrics-section').offset().top - window.innerHeight + 50;
            if (counted == false && $(window).scrollTop() > oTop) {
                $('.trust-stat-number').each(function() {
                    var $this = $(this),
                        countTo = parseFloat($this.attr('data-count')),
                        suffix = $this.attr('data-suffix') || '',
                        isFloat = $this.attr('data-count').indexOf('.') !== -1;
                    
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2500,
                        easing: 'swing',
                        step: function() {
                            $this.text((isFloat ? this.countNum.toFixed(1) : Math.floor(this.countNum)) + suffix);
                        },
                        complete: function() {
                            $this.text($this.attr('data-count') + suffix);
                        }
                    });
                });
                counted = true;
            }
        }
    });
});
