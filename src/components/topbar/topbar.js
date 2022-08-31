import $ from 'jquery'

$(document).ready(function(){
    let scroll_position = window.screenY

    $(window).on('scroll',() => {
        let topitembar = $('.top-bar-scrollview')
        let subtopitembar = $('.subtop-bar-scrollview')

        let current_scroll_position = window.scrollY
        if (current_scroll_position > scroll_position) {
            topitembar.addClass('hidebar')
            subtopitembar.addClass('hidebar')
        } else {
            topitembar.removeClass('hidebar')
            subtopitembar.removeClass('hidebar')
        }
        scroll_position = current_scroll_position
    })
})