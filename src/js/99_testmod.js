class TestScreen extends Screen {
    onCreate() {
        var wl = new WaitlockView(this),
            ctx = this;

        this.setHomeAsUpAction();
        this.appendView(new TextView("title", "FW Test!"));

        // MAIN
        this.appendView(new RowView().setTitle("Widgets test page").setOnClickListener(function(){
            new TestScreen2().start();
        }));
        this.appendView(new RowView().setTitle("SlidingScreen demo").setOnClickListener(function(){
            new TestScreen3().start();
        }));
        this.appendView(new RowView().setTitle("Framework settings screen").setOnClickListener(function(){
            new FWSettingsScreen().start();
        }));
        
        this.appendView(new RowView().setTitle("Set color and reopen").setOnClickListener(function(){
            var c = "#";
            c += Math.round(Math.random()*100);
            c += Math.round(Math.random()*100);
            c += Math.round(Math.random()*100);
            Config.mainColor = c;

            ctx.finish();
            new TestScreen().start();
        }));

        // FAB
        this.appendView(new SubHeader("Floating action button"));
        var fab = new FloatingActionButton().setIcon("star").setTitle("Star");
        this.appendView(fab);
        this.appendView(new RowView().setTitle("Default fab mode").setOnClickListener(function(){
            fab.setMode(FloatingActionButton.MODE_DEFAULT);
        }));
        this.appendView(new RowView().setTitle("Small fab mode").setOnClickListener(function(){
            fab.setMode(FloatingActionButton.MODE_SMALL);
        }));
        this.appendView(new RowView().setTitle("Expanded fab mode").setOnClickListener(function(){
            fab.setMode(FloatingActionButton.MODE_EXPAND);
        }));
        this.appendView(new RowView().setTitle("Scroll listen, expanding").setOnClickListener(function(){
            fab.attachScreen(ctx, FloatingActionButton.MODE_EXPAND, FloatingActionButton.MODE_DEFAULT);
        }));
        this.appendView(new RowView().setTitle("Scroll listen, hide").setOnClickListener(function(){
            fab.attachScreen(ctx, FloatingActionButton.MODE_DEFAULT, FloatingActionButton.MODE_HIDE);
        }));

        // AB
        this.appendView(new SubHeader("AB tests"));
        this.appendView(new RowView().setTitle("AB SM Hide").setOnClickListener(function(){
            ctx.setScrollMode(Screen.AB_MODE_HIDE);
        }));
        this.appendView(new RowView().setTitle("AB SM None").setOnClickListener(function(){
            ctx.setScrollMode(Screen.AB_MODE_NONE);
        }));
        this.appendView(new RowView().setTitle("Set a very long title").setOnClickListener(function(){
            ctx.setTitle("Very very very very very very long title")
        }));
        this.appendView(new RowView().setTitle("Add some actions to AB").setOnClickListener(function(){
            ctx.addAction(new MenuItem("action", "android"));
            ctx.addAction(new MenuItem("action2", "apple"));
        }));

        // ETC
        this.appendView(new SubHeader("etc"));
        this.appendView(new RowView().setTitle("Wipe page").setOnClickListener(function(){
            ctx.wipeContents();
        }));
        this.appendView(wl);
        this.appendView(new RowView().setTitle("Enable waitlockview for 5 seconds").setOnClickListener(function(){
            wl.show();
            Utils.timer(5000).then(function(){
                console.log("ok");
                wl.hide();
            }).catch(function(e){
                console.warn(e);
            });
        }));

    }
}

class TestScreen2 extends Screen {
    onCreate() {
        var tv = new TextInputView().setTitle("Text input demo").setHolder("Empty"),
            tv2 = new TextInputView().setTitle("Password input demo").setHolder("Empty").setType("password"),
            tv3 = new BigTextInputView().setTitle("Big input demo").setHolder("Empty");

        this.setHomeAsUpAction();
        this.setTitle("Widgets test mode!");

        var tb = new ToolbarView();
        this.appendView(tb);

        tb.add("android","android", function(){
            alert(1);
        });
        tb.add("check","check", function(){
            alert(2);
        });
        tb.addSeparator();
        tb.add("undo","undo", function(){
            alert(3);
        });

        var sp = new SpoilerView().setTitle("Spoiler test").setSummary("Tap to open!");
        sp.appendView(new RowView().setTitle("Hidden row!"));
        this.appendView(sp);

        this.appendView(new SubHeader("Input tests"));
        this.appendView(tv);
        this.appendView(tv2);
        this.appendView(tv3);
        this.appendView(new RowView().setTitle("Show value").setOnClickListener(function(){
            new Alert().setTitle("Text form value:").setMessage(tv.toString()).show();
        }).setOnLongTouchListener(function(){
            new Alert().setTitle("Long tap!").show();
        }));

        this.appendView(new SpinnerView());

        this.appendView(new TextView("info", "This is info TextView!"));

        this.appendView(new Button().setText("Default button"));
        this.appendView(new Button().setStyle(Button.STYLE_CONTAINED).setText("Contained button"));
        this.appendView(new Button().setStyle(Button.STYLE_FLAT).setText("Flat button"));

        this.appendView(new SubHeader("RowView tests"));
        this.appendView(new RowView().setTitle("Single-line"));
        this.appendView(new RowView().setTitle("Single-line with icon").setIcon("android"));
        this.appendView(new RowView().setTitle("Single-line with icon and action").setIcon("android").setAction("Hello", "more_vert", function(){
            new Alert().setMessage("Hello!").show();
        }));
        
        this.appendView(new RowView().setSummary("Description").setTitle("Two-line"));
        this.appendView(new RowView().setSummary("Description").setTitle("Two-line with icon").setIcon("android").setOnClickListener(function(){

        }));
        this.appendView(new RowView().setSummary("Description").setTitle("Two-line with icon and action").setIcon("android").setAction("Hello", "more_vert", function(){
            new Alert().setTitle("It is menu!").setMessage("Hello, World!").setOnClickListener(function(){
                console.log(2);
            }).show();
        }));
    }
}

class TestScreen3 extends SlidingScreen {
    onCreate() {
        this.setHomeAsUpAction();
    }
    onUpdate() {
        this.wipe();

        var a = this.newPage(),
            b = this.newPage(),
            ctx = this;

        a.appendView(new TextView("title", "Page 1"));
        for(var i = 0; i < 50; i++) a.appendView(new RowView().setTitle("Row A"+i));

        b.appendView(new TextView("title", "Page 2"));
        for(var i = 0; i < 50; i++) b.appendView(new RowView()
            .setTitle("Row B"+i).setOnClickListener(function(){
                ctx.onUpdate();
            }));
    }
}

/*
class TestScreen2 extends Screen {
    onCreate() {
        this.setHomeAsUpAction();
        this.setTitle("Test mode!");
    }
}
*/
