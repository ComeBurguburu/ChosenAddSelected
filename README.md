# ChosenAddSelected
Additional jQuery plugin for Chosen: add possibility to add new values
(ChosenAddSelected load options and register new value in database by calling server script side with Ajax)

- To linked original select to a database table use its name as id or class attribute
- select must have "multiple" attribute
- this plugin was tested with Chosen v1.4.2 and support IE9+ and others modern web browsers
- call ChosenAddSelected({url: "your url"}) to change the server script url
____

$("#myselect").chosen({width: "200px",max_selected_options: 1}).ChosenAddSelected();

