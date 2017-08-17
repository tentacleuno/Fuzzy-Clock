const Main = imports.ui.main;
const GLib = imports.gi.GLib;

var HOURS = [ "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE" ];

var FUZZY_RULES = [ "%s O'CLOCK",
    "FIVE past %s",
    "TEN past %s",
    "QUARTER past %s",
    "TWENTY past %s",
    "TWENTY FIVE past %s",
    "HALF past %s",
    "TWENTY FIVE to %s",
    "TWENTY to %s",
    "QUARTER to %s",
    "TEN to %s",
    "FIVE to %s" ];

function overrider(lbl) {
    var t = lbl.get_text();

    var now = GLib.DateTime.new_now_local();
    var hour = now.get_hour();
    var minute = now.get_minute();
    minute = Math.floor((minute + 2) / 5);

    if (hour >= 12)
        hour -= 12;

    hour -= 1;

    if (minute > 6)
        hour += 1;

    var desired = FUZZY_RULES[minute].format(HOURS[hour]);

    if (t != desired) {
        last = t;
        lbl.set_text(desired);
    }
}

var lbl, signalHandlerID, last = "";

function enable() {
    var sA = Main.panel._statusArea;
    if (!sA) { sA = Main.panel.statusArea; }

    if (!sA || !sA.dateMenu || !sA.dateMenu.actor) {
        print("Looks like Shell has changed where things live again; aborting.");
        return;
    }

    sA.dateMenu.actor.first_child.get_children().forEach(function(w) {
        // assume that the text label is the first StLabel we find.
        // This is dodgy behaviour but there's no reliable way to
        // work out which it is.
        if (w.get_text && !lbl) { lbl = w; }
    });
    if (!lbl) {
        print("Looks like Shell has changed where things live again; aborting.");
        return;
    }
    signalHandlerID = lbl.connect("notify::text", overrider);
    last = lbl.get_text();
    overrider(lbl);
}

function disable() {
    if (lbl && signalHandlerID) {
        lbl.disconnect(signalHandlerID);
        lbl.set_text(last);
    }
}
