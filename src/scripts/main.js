(function() {
    "use strict";

    const CSS_BODY = {
        "background-color" : "#4C566A",
        "display" : "flex",
        "flex-direction" : "column",
        "margin" : "0px",
        "padding" : "0px",
    }

    const CSS_HEADER = {
        "background-color" : "#2E3440",
        "display" : "flex",
        "justify-content" : "space-between",
        "align-items" : "center",
        "margin" : "0px",
        "padding-top" : "10px",
        "padding-bottom" : "10px",
        "padding-left" : "10px",
        "width" : "100%",
    }

    const CSS_MENU = {
        "background-color" : "#3B4252",
        "color" : "#FFFFFF",
        "display" : "flex",
        "flex-direction" : "column",
        "align-self" : "center",
        "justify-content" : "center",
        "padding" : "20px",
        "margin-top" : "50px",
        "border-radius" : "5px",
        "font-size" : "20px",
    }

    const CSS_CARD = {
        "background-color" : "#2E3440",
        "display" : "flex",
        "flex-direction" : "column",
        "border-radius" : "5px",
        "padding" : "5px",
        "margin-bottom" : "0px",
    }

    const CSS_MENU_ITEM = {
        "margin" : "0px",
        "display" : "flex",
        "justify-content" : "space-between",
    }

    function initialization() {
        let $body = $("body")
        $body.css(CSS_BODY);

        //Creation of the header
        $body.append("<p id='header'></p>");
        let $header = $("#header");
        $header.css(CSS_HEADER);
        $header.append("<img id='logo' src='img/icon.png' width='75px' height='75px'/>")

        //Creation of the login/register menu
        $body.append("<p id='menu'></p>");
        let $menu = $("#menu");
        $menu.css(CSS_MENU);
        $menu.append("<img id='logo' src='img/logo.png' width='500px' height='63px'/>");

        //Login card
        $menu.append("<p id='login-card'></p>");
        let $login_card = $("#login-card");
        $login_card.css(CSS_CARD);
        $login_card.append("<p id='login-menu-item'>Login</p>");
        $login_card.append("<form id='login-form'></form>");

        let $login_form = $("#login-form");
        $login_form.css("display", "none").append("<div id='login-username-block'></div>");
        $login_form.append("<div id='login-password-block'></div>");
        $login_form.append("<button id='login-submit' type='button'>Se connecter</button>");

        let $login_username_block = $("#login-username-block");
        $login_username_block.append("<label for='login-username-input'>Username :</label>");
        $login_username_block.append("<input type='text' id='login-username-input' name='username' autocomplete='username'>");

        let $login_password_block = $("#login-password-block");
        $login_password_block.append("<label for='login-password-input'>Password :</label>");
        $login_password_block.append("<input type='password' id='login-password-input' name='password' autocomplete='password'>");

        let $login_menu_item = $("#login-menu-item");
        $login_menu_item.css(CSS_MENU_ITEM);
        $login_menu_item.append("<span id='login-arrow' class='material-icons'>expand_more</span>");

        $("#login-arrow").css({"transition" : "transform 500ms ease-in-out", "transform" : "rotate(0deg)", "user-select" : "none"}).click(function(){
            let $login_form = $($(this).parent().parent().children()[1]);

            if ($(this).hasClass("shown")) {
                $(this).css("transform", "rotate(0deg)");
                $(this).toggleClass('shown');
                $login_form.css("display", "none");
            } else {
                $(this).css("transform", "rotate(180deg)");
                $(this).toggleClass('shown');
                $login_form.css("display", "block");
            }
        });

        $("#login-submit").click(function(){
            let $username = $($($(this).parent().children()[0]).children()[1]);
            alert($username.val());
        });

        //Register card
        $menu.append("<p id='register-card'></p>");
        let $register_card = $("#register-card");
        $register_card.css(CSS_CARD);
        $register_card.append("<p id='register-menu-item'>Register</p>");
        let $register_menu_item = $("#register-menu-item");
        $register_menu_item.css(CSS_MENU_ITEM);
        $register_menu_item.append("<span id='register-arrow' class='material-icons'>expand_more</span>");
        $("#register-arrow").css({"transition" : "transform 500ms ease-in-out", "transform" : "rotate(0deg)", "user-select" : "none"}).click(function(){
            let $register_form = $($(this).parent().parent().children()[1]);

            if ($(this).hasClass("shown")) {
                $(this).css("transform", "rotate(0deg)");
                $(this).toggleClass('shown');
                $register_form.css("display", "none");
            } else {
                $(this).css("transform", "rotate(180deg)");
                $(this).toggleClass('shown');
                $register_form.css("display", "none");
            }
        });
    }

    $(() => {
        initialization();
    })
}) ();