
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
	var Ob,t;
    $('x-view.detail', detail).click(function() {
		draw();
	});
    $('x-listview', list).click(function() {
		draw();
	});
	function draw(){
			Ob = $('.detail').get(0);
			
			t = Ob.view.model.get('title');
			var canvas = document.getElementById('object');
			if (canvas.getContext){
				var context = canvas.getContext('2d');
			}
			//var current = new Date();	
			//var previous = localStorage.getItem("p"+t+" ");
			//if(previous){
			//	var difference = current.getTime() - Number(previous);
		    //	difference = Math.floor(difference/1000);
			//	if(difference>2*Number(localStorage["inter"+t+" "])){
			//	localStorage["r"+t+" "]=Number(localStorage["r"+t+" "]) + Number(localStorage["x"+t+" "]);
			//	localStorage["l"+t+" "]=Number(localStorage["l"+t+" "]) - Number(localStorage["x"+t+" "]);
			//	if(localStorage["r"+t+" "]>85)
			//		localStorage["r"+t+" "]=85;
			//	if(localStorage["l"+t+" "]<95)
			//		localStorage["l"+t+" "]=95;
		//	}
		//	}
			var r =  parseInt(localStorage["r"+t+" "]);
			var l = parseInt(localStorage["l"+t+" "]);
			
			
			var centerX = 0;
			var centerY = 0;
			var radius = 65;
			// save state
			context.clearRect(0, 0, canvas.width,canvas.height);
			context.save();
			
			// translate context
			context.translate(canvas.width / 2,canvas.height / 2);

			// scale context horizontally
			context.scale(2, 1);
			
			context.beginPath();
			context.arc(centerX, centerY,radius+2, 0 *(Math.PI/180), 360 *(Math.PI/180), false);

			// restore to original state
			context.restore();

			// apply styling
			//context.fillStyle = '#8ED6FF';
		//	context.fill();
			context.lineWidth = 5;
			context.strokeStyle ='black';
			context.stroke();

			context.save();
			context.translate(canvas.width / 2,canvas.height / 2);

			// scale context horizontally
			context.scale(2, 1);
			
			// draw circle which will be stretched into an oval
			context.beginPath();
			context.arc(centerX, centerY,radius, r *(Math.PI/180), l *(Math.PI/180), false);

			// restore to original state
			context.restore();

			// apply styling
			context.fillStyle = '#8ED6FF';
			context.fill();
			context.lineWidth = 0.1;
			context.strokeStyle ='black';
			context.stroke();
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
	

    $('button.add', detail).click(function() {
        Ob = $(detail).get(0);
        t = Ob.view.model.get('title');
	if(typeof(Storage)!=="undefined")
	{
		var flagr = localStorage.getItem("r"+t+" ");
		var flagl = localStorage.getItem("l"+t+" ");
		var i;
	//	var current = new Date();
			
		if (flagr && flagl)
		{
	//		var previous = localStorage.getItem("p"+t+" ");
	//		var difference = current.getTime() - Number(previous);
	//	    difference = Math.floor(difference/1000);
		//	if(difference>=Number(localStorage["inter"+t+" "]) && difference<2*Number(localStorage["inter"+t+" "])){

			localStorage["r"+t+" "]=Number(localStorage["r"+t+" "]) - Number(localStorage["x"+t+" "]);
			localStorage["l"+t+" "]=Number(localStorage["l"+t+" "]) + Number(localStorage["x"+t+" "]);
		//	localStorage["p"+t+" "]=current.getTime();
		//	}

		//	else if(difference>Number(localStorage["inter"+t+" "])){
		//	localStorage["r"+t+" "]=Number(localStorage["r"+t+" "]) + Number(localStorage["x"+t+" "]);
		//	localStorage["l"+t+" "]=Number(localStorage["l"+t+" "]) - Number(localStorage["x"+t+" "]);
		//	}
		}
		else
		{
		//	localStorage["p"+t+" "]=current.getTime();
			localStorage["r"+t+" "]=85 - Number(localStorage["x"+t+" "]);
			localStorage["l"+t+" "]=95 + Number(localStorage["x"+t+" "]);
		}
		draw();
		var r = localStorage["r"+t+" "];
		var l = localStorage["l"+t+" "];

		if(r==85 && l==95){
		document.getElementById("result").innerHTML="Today might be the perfect day to break the ice and do something you've never done before, but always dreamed of. What's stopping you? Nothing.";
		}
		else if(r<85 && l>95 && r>75 && l<105){
			document.getElementById("result").innerHTML="The beginning is always the hardest. Do not give up.";
		}
		else if(r<75 && l>105 && r>65 && l<115){
			document.getElementById("result").innerHTML="No matter what you are going through, there's light at the end of the tunnel. And it may seem hard to get to it but you can do it. Just keep moving towards it.";
	}
		else if(r<65 && l>115 && r>55 && l<125){
			document.getElementById("result").innerHTML="Keep going. You have promises to keep. Miles to go, before you sleep.";
		}else if(r<55 && l>125 && r>45 && l<135){
			document.getElementById("result").innerHTML="You are doing great! Keep going! Don't forget, this is your life. You must take control of it!";
		}else if(r<45 && l>135 && r>35 && l<145){
			document.getElementById("result").innerHTML="Things only get worse before they get better. Persistence is the key. Be strong. You'll sail through it.";
		}else if(r<35 && l>145 && r>25 && l<155){
			document.getElementById("result").innerHTML="It's better to look back on life and say:'I can't believe I did that' than 'I wish I had done that'. Buck up. It will be worth it.";
		}else if(r<25 && l>155 && r>15 && l<165){
			document.getElementById("result").innerHTML="Don't ever let someone tell you you can't do something. You got a dream, you got to protect it. When people can't do something themselves, they're going to tell you that you can't do it. You want something, go get it. Period.";
		}else if(r<15 && l>165 && r>0 && l<180){
			document.getElementById("result").innerHTML="You have come this far. Don't look back unless you are planning to go that way. Giving up is not an option.";
		}else if(r<0 && l>180 && r>-15 && l<195){
			document.getElementById("result").innerHTML="Wow! Look how far we have come! Remember, Good things come to those who believe, Better things come to those who wait. But the Best things come to those who never give up. ";
		}else if(r<-15 && l>195 && r>-30 && l<210){
			document.getElementById("result").innerHTML="This life is what you make of it. Don't let it go. Stay true to this. Keep trying.";
		}else if(r<-35 && l>215 && r>-50 && l<230){
			document.getElementById("result").innerHTML="You are not out there sweating for hours every day just to find out what it feels like to sweat. Your sweat is your achievement. Every drop counts. Make it count.";
		}else if(r<-55 && l>235 && r>-70 && l<250){
			document.getElementById("result").innerHTML="You are close. Don't lose focus. Don't worry. Everything is going to be AMAZING. Make it happen! ";
		}else if(r<-70 && l>250 && r>-80 && l<265){
			document.getElementById("result").innerHTML="Many of life's failures are people who did not realize how close they were to success when they gave up. Stay strong! Because you are worth it!";
		}else if(r<-80 && l>265 && r>-85 && l<268){
			document.getElementById("result").innerHTML="Take a deep breath and be brave. You are on a warrior's path to accomplishment.";
		}else if(r<=-85 && l>=268 && r>=-88 && l<=269){
			document.getElementById("result").innerHTML="The darkest night was way past you, agreed. But the sun shall rise tomorrow. Are you up for it?";
		}else if(r>=-95 && l>=269 && r<=-88 && l<=275){
			document.getElementById("result").innerHTML="You came, you saw. You bloody hell CONQUERED! Sigh. What next? Never stop dreaming. Add another task. Go for the next kill.";
		}
	}
		else{
		document.getElementById("result").innerHTML="Sorry, your browser does not support web storage...";

	}
	});
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
        var inter = el.find('input[name=inter]').val();
        var format = el.find('select[name=zxcvb]').val();
        var total = el.find('input[name=total]').val();
        var tamrof = el.find('select[name=qwerty]').val();
		if(format === 'm')
			inter = Number(inter) * 60;
		else if(format === 'h')
			inter = Number(inter) * 3600;
		else if(format === 'd')
			inter = Number(inter) * 3600 * 24;

		if(tamrof === 'm')
			total = Number(total) * 60;
		else if(tamrof === 'h')
			total = Number(total) * 3600;
		else if(tamrof === 'd')
			total = Number(total) * 3600 * 24;
		
		
		localStorage["inter" + title.val() + " "] = inter;
		//localStorage["total" + title.val() + " "] = total;
		var x = 175 * Number(inter) / Number(total);
		localStorage["x" + title.val() + " "] = x;
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
