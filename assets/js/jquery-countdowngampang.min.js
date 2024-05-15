/**************************************************************************************************************************************************/
/*
 * jQuery CountdownGampang
 * written by Shidiq Fadhilah - Indonesia <akhmadshidiqfadhilah@gmail.com>
 * Licensed under the MIT license https://github.com/fadhilah1992/jquery-countdowngampang/blob/main/LICENSE
 * Version 1.0.1
 *
 * jQuery ClassyCountdown
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.0.1
 /**************************************************************************************************************************************************/

(function ($) {

    $.fn.CountdownGampang = function (options, callback) {
        // check for jQuery knob and throttle
        if (!jQuery().knob) {
            throw 'CountdownGampang require jQuery knob.';
        }

        if (!jQuery.throttle) {
            throw 'CountdownGampang require jQuery throttle / debounce.';
        }

        var element = $(this);
        var settings = {
            rampung: undefined,
            labels: true,
            labelsOptions: {
                lang: {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                },
            },
            style: {
                element: '',
                labels: false,
                textResponsive: 0.5,
                days: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: '#ff8503',
                        fgColor: '#ff8503',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                hours: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                minutes: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                seconds: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                }
            },
            onEndCallback: function () {
                if (window.console && window.console.log) {
                    window.console.log("[CountdownGampang::isRampung] Wayae, wayae ......");
                }
            }
        };

        // if not rampung passed in options
        if (!options.rampung) {
            throw 'Parameter options.rampung must passed bro.';
        }

        // append options
        settings = $.extend(true, settings, options);

        // callback
        if (typeof callback !== undefined) {
            settings.onEndCallback = callback;
        }

        function prepareTemplate() {
            element.append('<div class="ClassyCountdown-wrapper">' +
                '<div class="ClassyCountdown-days">' +
                '<input type="text" />' +
                '<div class="ClassyCountdown-value"><div></div><span></span></div>' +
                '</div>' +
                '<div class="ClassyCountdown-hours">' +
                '<input type="text" />' +
                '<div class="ClassyCountdown-value"><div></div><span></span></div>' +
                '</div>' +
                '<div class="ClassyCountdown-minutes">' +
                '<input type="text" />' +
                '<div class="ClassyCountdown-value"><div></div><span></span></div>' +
                '</div>' +
                '<div class="ClassyCountdown-seconds">' +
                '<input type="text" />' +
                '<div class="ClassyCountdown-value"><div></div><span></span></div>' +
                '</div>' +
                '</div>');

            element.find('.ClassyCountdown-days input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 365
            }, settings.style.days.gauge));

            element.find('.ClassyCountdown-hours input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 24
            }, settings.style.hours.gauge));

            element.find('.ClassyCountdown-minutes input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.minutes.gauge));

            element.find('.ClassyCountdown-seconds input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.seconds.gauge));

            element.find('.ClassyCountdown-wrapper > div').attr("style", settings.style.element);
            element.find('.ClassyCountdown-days .ClassyCountdown-value').attr('style', settings.style.days.textCSS);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value').attr('style', settings.style.hours.textCSS);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value').attr('style', settings.style.minutes.textCSS);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value').attr('style', settings.style.seconds.textCSS);

            if (settings.labels) {
                element.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(settings.labelsOptions.lang.days);
                element.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(settings.labelsOptions.lang.hours);
                element.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(settings.labelsOptions.lang.minutes);
                element.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(settings.labelsOptions.lang.seconds);
                element.find(".ClassyCountdown-value > span").attr("style", settings.labelsOptions.style);
            }
        }

        function onResize() {
            element.find('.ClassyCountdown-wrapper > div').each(function () {
                $(this).css('height', $(this).width() + 'px');
            });

            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
            }

            element.find('.ClassyCountdown-days input').trigger('change');
            element.find('.ClassyCountdown-hours input').trigger('change');
            element.find('.ClassyCountdown-minutes input').trigger('change');
            element.find('.ClassyCountdown-seconds input').trigger('change');
        }

        function doResponsive() {
            element.find('.ClassyCountdown-wrapper > div').each(function () {
                $(this).css('height', $(this).width() + 'px');
            });

            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
            }

            $(window).trigger('resize');

            $(window).resize($.throttle(50, onResize));
        }

        function getTheme(name) {
            switch (name) {
                case 'flat-colors-very-wide':
                return {
                    labels: true,
                    style: {
                        element: '',
                        textResponsive: 0.5,
                        days: {
                            gauge: {
                                thickness: 0.1,
                                width: 140,
                                height: 140,
                                bgColor: "#F3F3F3",
                                fgColor: "#00C4F4"
                            },
                            textCSS: 'font-weight:600;color:#030B15;'
                        },
                        hours: {
                            gauge: {
                                thickness: 0.1,
                                width: 140,
                                height: 140,
                                bgColor: "#F3F3F3",
                                fgColor: "#FF9700"
                            },
                            textCSS: 'font-weight:600;color:#030B15;'
                        },
                        minutes: {
                            gauge: {
                                thickness: 0.1,
                                width: 140,
                                height: 140,
                                bgColor: "#F3F3F3",
                                fgColor: "#FF4581"
                            },
                            textCSS: 'font-weight:600;color:#030B15;'
                        },
                        seconds: {
                            gauge: {
                                thickness: 0.1,
                                width: 140,
                                height: 140,
                                bgColor: "#F3F3F3",
                                fgColor: "#12D176"
                            },
                            textCSS: 'font-weight:600;color:#030B15;'
                        }
                    }
                };
            }
        }

        // append theme from options if passed
        if (options.theme) {
            if (options.theme === "default") {
                options.theme = "flat-colors-very-wide";
            }
            settings = $.extend(true, settings, getTheme(options.theme));
        } else {
            settings = $.extend(true, settings, getTheme("flat-colors-very-wide"));
        }

        prepareTemplate();

        var countdown = setInterval(function () {
            var siki = new Date().getTime();
            var sels = settings.rampung - siki;

            var days = Math.floor(sels / (1000 * 60 * 60 * 24));
            var hours = Math.floor((sels % (1000 * 60 * 60 * 18)) / (1000 * 60 * 60));
            var minutes = Math.floor((sels % (1000 * 60 * 40)) / (1000 * 60));
            var seconds = Math.floor((sels % (1000 * 60)) / 1000);

            if (sels < 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }

            element.find('.ClassyCountdown-days input').val(365 - days).trigger('change');
            element.find('.ClassyCountdown-hours input').val(24 - hours).trigger('change');
            element.find('.ClassyCountdown-minutes input').val(60 - minutes).trigger('change');
            element.find('.ClassyCountdown-seconds input').val(60 - seconds).trigger('change');
            element.find('.ClassyCountdown-days .ClassyCountdown-value > div').html(days);
            element.find('.ClassyCountdown-hours .ClassyCountdown-value > div').html(hours);
            element.find('.ClassyCountdown-minutes .ClassyCountdown-value > div').html(minutes);
            element.find('.ClassyCountdown-seconds .ClassyCountdown-value > div').html(seconds);

            if (sels < 0) {
                clearInterval(countdown);
                settings.onEndCallback();
            }
        }, 1000);
        doResponsive();
    };

}(jQuery));