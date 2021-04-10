(function() {
    "use strict";

    const CSS_BODY = {
        "background-color" : "#4C566A",
        "display" : "flex",
        "flex-direction" : "column",
        "margin" : "0px",
        "padding" : "0px",
        "width" : "100%",
    }

    const CSS_HEADER = {
        "background-color" : "#2E3440",
        "display" : "flex",
        "justify-content" : "space-between",
        "align-items" : "center",
        "margin" : "0px",
        "padding-top" : "10px",
        "padding-bottom" : "10px",
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
        "margin-top" : "20px",
        "user-select" : "none",
    }

    const CSS_MENU_ITEM = {
        "margin" : "0px 0px 0px 10px",
        "display" : "flex",
        "justify-content" : "space-between",
    }

    const CSS_FORM = {
        "padding" : "5px",
        "display" : "flex",
        "flex-direction" : "column",
        "color" : "#D8DEE9"
    }

    const CSS_FORM_ITEM = {
        "display" : "flex",
        "flex-direction" : "column",
        "justify-content" : "center",
        "align-self" : "center",
        "width" : "50%",
        "margin-bottom" : "10px",
    }

    const CSS_FORM_INPUT = {
        "border" : "solid #4C566A 1px",
        "border-radius" : "5px",
        "background-color" : "#3B4252",
        "color" : "#D8DEE9",
        "padding" : "2px 2px 2px 6px",
    }

    const CSS_FORM_SUBMIT = {
        "width" : "50%",
        "align-self" : "center",
        "margin-top" : "10px",
        "border" : "solid #4C566A 1px",
        "border-radius" : "5px",
        "background-color" : "#D8DEE9",
        "color" : "#3B4252",
        "transition" : "background-color 500ms ease-in-out, color 500ms ease-in-out",
    }

    const CSS_USER_DISPLAY = {
        "display" : "flex",
        "justify-content" : "center",
        "color" : "#FFFFFF",
        "margin" : "20px",
    }

    const CSS_LINE_ITEM = {
        "margin-right" : "20px",
        "color" : "#D8DEE9",
    }

    class User {
        constructor() {
            this.id = -1;
            this.username = "";
        }

        setId(id) {
            this.id = id;
        }

        setUsername(username) {
            this.username = username;
        }

        setRoom(room_data) {
            this.room = new Room (room_data['room_id'], room_data['room_name'], room_data['room_creator']);
        }
    }

    class Room {
        constructor (room_id, room_name, room_creator) {
            this.id = room_id;
            this.name = room_name;
            this.creator = room_creator;
        }
    }

    let user = new User();

    function headerDisplay($root) {
        $root.prepend("<p id='header'></p>");
        let $header = $("#header");
        $header.css(CSS_HEADER);
        $header.append("<img id='logo' src='img/icon.png' width='75px' height='75px'/>");
        $("#logo").css("margin-left", "10px");
        $header.append("<div id='user-display'></div>");

        let $user_display = $("#user-display");
        $user_display.css(CSS_USER_DISPLAY).append("<span id='user-icon' class='material-icons'>account_circle</span>");
        $user_display.append("<p id='user-name'>Guest</p>");
        $("#user-name").css({"margin" : "0px 10px 0px 0px", "user-select" : "none"});
        $("#user-icon").css({"margin-right" : "10px", "user-select" : "none"});
    }//headerDisplay

    function loginRegisterDisplay($root) {
        $root.append("<p id='login-menu'></p>");
        let $login_menu = $("#login-menu");
        $login_menu.css(CSS_MENU);
        $login_menu.append("<img id='logo' src='img/logo.png' width='500px' height='63px'/>");
        $("#logo").css("margin-left", "10px");

        //Login card
        $login_menu.append("<p id='login-card'></p>");
        let $login_card = $("#login-card");
        $login_card.css(CSS_CARD);
        $login_card.append("<p id='login-menu-item'>Login</p>");
        $login_card.append("<form id='login-form'></form>");

        let $login_form = $("#login-form");
        $login_form.css(CSS_FORM).append("<div id='login-username-block'></div>");
        $login_form.append("<div id='login-password-block'></div>");
        $login_form.append("<button id='login-submit' type='button'>Login</button>");

        let $login_username_block = $("#login-username-block");
        $login_username_block.css(CSS_FORM_ITEM).append("<label for='login-username-input'>Username :</label>");
        $login_username_block.append("<input type='text' id='login-username-input' name='username' autocomplete='username'>");
        $("#login-username-input").css(CSS_FORM_INPUT);

        let $login_password_block = $("#login-password-block");
        $login_password_block.css(CSS_FORM_ITEM).append("<label for='login-password-input'>Password :</label>");
        $login_password_block.append("<input type='password' id='login-password-input' name='password' autocomplete='password'>");
        $("#login-password-input").css(CSS_FORM_INPUT);

        let $login_menu_item = $("#login-menu-item");
        $login_menu_item.css(CSS_MENU_ITEM);
        $login_menu_item.append("<span id='login-arrow' class='material-icons'>expand_more</span>");
        $("#login-arrow").css({"transition" : "transform 500ms ease-in-out", "transform" : "rotate(180deg)", "user-select" : "none"});

        $login_menu_item.click(function(){
            let $login_form = $("#login-form");
            let $login_arrow = $("#login-arrow");

            if ($(this).hasClass("hidden-form")) {
                $login_arrow.css("transform", "rotate(180deg)");
                $(this).toggleClass("hidden-form");

                if(!($("#register-menu-item").hasClass("hidden-form"))) {
                    $("#register-arrow").css("transform", "rotate(0deg)");
                    $("#register-menu-item").toggleClass("hidden-form");
                    $register_form.slideToggle();
                }
            } else {
                $login_arrow.css("transform", "rotate(0deg)");
                $(this).toggleClass("hidden-form");
            }
            $login_form.slideToggle();
        });

        $("#login-submit").css(CSS_FORM_SUBMIT).click(function() {
            let $username = $("#login-username-input");
            let $password = $("#login-password-input");

            $.ajax({
                url: "http://raspdonut.alwaysdata.net/php/login.php",
                type: "POST",
                data: {'username' : $username.val(), 'password' : $password.val()},
                dataType: "json"
            })
                .done(function(data){
                    if(!(data["id"] == "null")) {
                        $("body").empty();
                        headerDisplay($("body"));
                        $("#user-name").text(data["username"]);
                        user.setId(data["id"]);
                        user.setUsername(data["username"]);
                        appendDisconnectButton();
                        mainMenuDisplay($("body"));
                    }
                });

        }).mouseover(function() {
            $(this).css({
                "background-color" : "#3B4252",
                "color" : "#D8DEE9",
            })
        }).mouseout(function() {
            $(this).css({
                "background-color" : "#D8DEE9",
                "color" : "#3B4252",
            })
        });

        //Register card
        $login_menu.append("<p id='register-card'></p>");
        let $register_card = $("#register-card");
        $register_card.css(CSS_CARD);
        $register_card.append("<p id='register-menu-item' class='hidden-form'>Register</p>");
        $register_card.append("<form id='register-form'></form>");

        let $register_form = $("#register-form");
        $register_form.css(CSS_FORM).css("display", "none").append("<div id='register-username-block'></div>");
        $register_form.append("<div id='register-password-block'></div>");
        $register_form.append("<div id='register-confirm-password-block'></div>");
        $register_form.append("<button id='register-submit' type='button'>Register</button>");

        let $register_username_block = $("#register-username-block");
        $register_username_block.css(CSS_FORM_ITEM).append("<label for='register-username-input'>Username :</label>");
        $register_username_block.append("<input type='text' id='register-username-input' name='username' autocomplete='username'>");
        $("#register-username-input").css(CSS_FORM_INPUT);

        let $register_password_block = $("#register-password-block");
        $register_password_block.css(CSS_FORM_ITEM).append("<label for='register-password-input'>Password :</label>");
        $register_password_block.append("<input type='password' id='register-password-input' name='password' autocomplete='password'>");
        $("#register-password-input").css(CSS_FORM_INPUT);

        let $register_confirm_password_block = $("#register-confirm-password-block");
        $register_confirm_password_block.css(CSS_FORM_ITEM).append("<label for='register-confirm-password-input'>Confirm your password :</label>");
        $register_confirm_password_block.append("<input type='password' id='register-confirm-password-input' name='password' autocomplete='password'>");
        $("#register-confirm-password-input").css(CSS_FORM_INPUT);

        let $register_menu_item = $("#register-menu-item");
        $register_menu_item.css(CSS_MENU_ITEM);
        $register_menu_item.append("<span id='register-arrow' class='material-icons'>expand_more</span>");
        $("#register-arrow").css({"transition" : "transform 500ms ease-in-out", "transform" : "rotate(180deg)", "user-select" : "none"});

        $register_menu_item.click(function(){
            let $register_form = $("#register-form");
            let $register_arrow = $("#register-arrow");

            if ($(this).hasClass("hidden-form")) {
                $register_arrow.css("transform", "rotate(180deg)");
                $(this).toggleClass("hidden-form");

                if(!($("#login-menu-item").hasClass("hidden-form"))) {
                    $("#login-arrow").css("transform", "rotate(0deg)");
                    $("#login-menu-item").toggleClass("hidden-form");
                    $login_form.slideToggle();
                }
            } else {
                $register_arrow.css("transform", "rotate(0deg)");
                $(this).toggleClass("hidden-form");
            }
            $register_form.slideToggle();
        });

        $("#register-submit").css(CSS_FORM_SUBMIT).click(function(){
            let $username = $("#register-username-input");
            let $password = $("#register-password-input");
            let $cpassword = $("#register-confirm-password-input");

            if ($username.val() == "" || $password.val() == "") {
                alert("You must type something");
            } else if ($password.val() == $cpassword.val()) {
                $.ajax({
                    url: "http://raspdonut.alwaysdata.net/php/register.php",
                    type: "POST",
                    data: {'username' : $username.val(), 'password' : $password.val()},
                    dataType: "json"
                });
            } else {
                alert("The two passwords must be identical");
            }

            $username.val('');
            $password.val('');
            $cpassword.val('');
        }).mouseover(function() {
            $(this).css({
                "background-color" : "#3B4252",
                "color" : "#D8DEE9",
            })
        }).mouseout(function() {
            $(this).css({
                "background-color" : "#D8DEE9",
                "color" : "#3B4252",
            })
        });
    }//loginRegisterDisplay

    function mainMenuDisplay($root) {
        $root.append("<p id='main-menu'></p>");
        let $main_menu = $("#main-menu");
        $main_menu.css(CSS_MENU);
        $main_menu.append("<img id='logo' src='img/logo.png' width='500px' height='63px'/>");
        $("#logo").css("margin-left", "10px");
        $main_menu.append("<div id='join-card'></div>");
        $main_menu.append("<div id='create-card'></div>");

        //Join room card
        let $join_card = $("#join-card");
        $join_card.css(CSS_CARD).append("<p id='menu-join-item'>Join a room</p>");
        $("#menu-join-item").css(CSS_MENU_ITEM);
        $join_card.append("<form id='join-form'></form>");

        let $join_form = $("#join-form");
        $join_form.css(CSS_FORM).append("<div id='join-room-block'></div>");
        $join_form.append("<button id='join-submit' type='button'>Join room !</button>");

        let $join_room_block = $("#join-room-block");
        $join_room_block.css(CSS_FORM_ITEM).append("<label for='join-room-input'>Enter room ID :</label>");
        $join_room_block.append("<input type='number' id='join-room-input' name='room-id'>");
        $("#join-room-input").css(CSS_FORM_INPUT);

        $("#join-submit").css(CSS_FORM_SUBMIT).click(function(){
            let room_id = $("#join-room-input").val();

            if (room_id == "") {
                alert("You must type something");
            } else {
                $.ajax({
                    url: "http://raspdonut.alwaysdata.net/php/join_room.php",
                    type: "POST",
                    data: {'room_id' : room_id},
                    dataType: "json"
                }).done(function(data) {
                    if(data == "Existn't") {
                        alert("The room does not exist !");
                    } else {
                        console.log(data);
                        user.setRoom(data);
                        $("#main-menu").remove();
                        roomDisplay($("body"));
                    }
                });
            }
        }).mouseover(function() {
            $(this).css({
                "background-color" : "#3B4252",
                "color" : "#D8DEE9",
            })
        }).mouseout(function() {
            $(this).css({
                "background-color" : "#D8DEE9",
                "color" : "#3B4252",
            })
        });

        //Create room card
        let $create_card = $("#create-card");
        $create_card.css(CSS_CARD).append("<p id='menu-create-item'>Create a room</p>");
        $("#menu-create-item").css(CSS_MENU_ITEM);
        $create_card.append("<form id='create-form'></form>");

        let $create_form = $("#create-form");
        $create_form.css(CSS_FORM).append("<div id='create-room-block'></div>");
        $create_form.append("<button id='create-submit' type='button'>Create room !</button>");

        let $create_room_block = $("#create-room-block");
        $create_room_block.css(CSS_FORM_ITEM).append("<label for='create-room-input'>Enter room name :</label>");
        $create_room_block.append("<input type='text' id='create-room-input' name='room-name'>");
        $("#create-room-input").css(CSS_FORM_INPUT);

        $("#create-submit").css(CSS_FORM_SUBMIT).click(function(){
            let room_name = $("#create-room-input").val();

            if (room_name == "") {
                alert("You must type something");
            } else {
                $.ajax({
                    url: "http://raspdonut.alwaysdata.net/php/create_room.php",
                    type: "POST",
                    data: {'room_name' : room_name, 'creator_id' : user.id},
                    dataType: "json"
                }).done(function(data) {
                    user.setRoom(data);
                    $("#main-menu").remove();
                    roomDisplay($("body"));
                });
            }
        }).mouseover(function() {
            $(this).css({
                "background-color" : "#3B4252",
                "color" : "#D8DEE9",
            })
        }).mouseout(function() {
            $(this).css({
                "background-color" : "#D8DEE9",
                "color" : "#3B4252",
            })
        });
    }//mainMenuDisplay

    function roomDisplay($root) {
        $root.append("<p id='room-menu'></p>");
        let $room_menu = $("#room-menu");
        $room_menu.css(CSS_MENU);
        $room_menu.append("<img id='logo' src='img/logo.png' width='500px' height='63px'/>");
        $("#logo").css("margin-left", "10px");
        $room_menu.append("<div id='room-card'></div>");

        let $room_card = $("#room-card");
        $room_card.css(CSS_CARD).append("<div id='name-id-item'></div>");
        $room_card.append("<div id='chatbox'></div>");
        $room_card.append("<div id='input-chat-item'></div>");
        $room_card.append("<div id='leave-room-item'></div>");

        let $name_id_item = $("#name-id-item");
        $name_id_item.css(CSS_MENU_ITEM).append("<p id='room-name'>Room name : "+user.room.name+"</p>");
        $name_id_item.append("<p id='room-id'>Room ID : "+user.room.id+"</p>");
        $("#room-name").css(CSS_LINE_ITEM);
        $("#room-id").css(CSS_LINE_ITEM);

    }

    function appendDisconnectButton() {
        $("#user-display").append("<span id='disconnect-icon' class='material-icons'>logout</span>");
        $("#disconnect-icon").css({"margin-right" : "10px", "user-select" : "none"}).click(function() {
            $.ajax({
                url: "http://raspdonut.alwaysdata.net/php/disconnect.php",
                type: "POST",
                dataType: "json",
            })
                .done(function(data) {
                    $("body").empty();
                    headerDisplay($("body"));
                    loginRegisterDisplay($("body"));
                });
        });
    }//appendDisconnectButton

     function tryConnectWithSession() {
        $.ajax({
            url: "http://raspdonut.alwaysdata.net/php/login.php",
            type: "POST",
            dataType: "json",
        })
            .done(function(data) {
                if(data.hasOwnProperty("id")) {
                    user.setId(data["id"]);
                    user.setUsername(data["username"]);
                    $("#user-name").text(data["username"]);
                    appendDisconnectButton();
                    mainMenuDisplay($("body"));
                } else {
                    loginRegisterDisplay($("body"));
                }
            });
    }//tryConnectWithSession

    function initialization() {
        let $body = $("body")
        $body.css(CSS_BODY);

        tryConnectWithSession()
        headerDisplay($body);
    }//initialization

    $(() => {
        initialization();
    })
}) ();