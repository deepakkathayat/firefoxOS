
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Write your app here.

    require('layouts/view');
    require('layouts/list');

    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // List view

    var list = $('.list').get(0);
    list.add({ title: 'Writing',
               desc: 'I\'m writing my first novel!',
               date: new Date() });

    $('button.refresh', list).click(function() {
        localStorage.clear();
		// Do nothing right now
    });

    $('button.add', list).click(function() {
        edit.open();
    });
    
    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).text(item.get('title'));
        $('.desc', this).text(item.get('desc'));
        $('.date', this).text(formatDate(item.get('date')));
    };
	

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close();
    });
});
