const Main = imports.ui.main;
const GLib = imports.gi.GLib;

var HOURS = [ "TWELVE",
	"ONE",
	"TWO",
	"THREE",
	"FOUR",
	"FIVE",
	"SIX",
	"SEVEN",
	"EIGHT",
	"NINE",
	"TEN",
	"ELEVEN" ];
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

var clockLabel;
var signalID;
var defaultText;

function setText() {
	var now = GLib.DateTime.new_now_local();
	var hour = now.get_hour();
	var minute = now.get_minute();
	var rule = Math.floor((minute + 2) / 5); // Round minutes

	if (hour >= 12) // 0-23 to 0 to 11
		hour -= 12;

	if (rule > 6) // "To" the next hour
		hour += 1;

	if (hour == 12)
		hour = 0;

	if (rule == 12) // Use the OCLOCK rule
		rule = 0;

	var currentText = clockLabel.get_text();
	var desiredText = FUZZY_RULES[rule].format(HOURS[hour]);

	if (currentText != desiredText) {
		// Only set the text if it's changed to avoid loops
		defaultText = currentText; // defaultText from Shell
		clockLabel.set_text(desiredText);
	}
}

function enable() {
	var statusArea = Main.panel.statusArea;

	if (!statusArea || !statusArea.dateMenu || !statusArea.dateMenu.actor) {
		print("Looks like Shell has changed things again; aborting.");
		return;
	}

	statusArea.dateMenu.actor.first_child.get_children().forEach(function(actor) {
		// Assume that the text label is the first StLabel we find.
		// This is dodgy behaviour but there's no reliable way to
		// work out which it is.
		if (actor.get_text && !clockLabel)
			clockLabel = actor;
	});

	if (!clockLabel) {
		print("Looks like Shell has changed things again; aborting.");
		return;
	}

	defaultText = clockLabel.get_text();
	// on text changed signal, run setText funcation
	signalID = clockLabel.connect("notify::text", setText);

	setText(); // Don't wait for the first signal to change the text
}

function disable() {
	if (clockLabel && signalID) {
		// Stop reciving text changed signal
		clockLabel.disconnect(signalID);
		clockLabel.set_text(defaultText);
	}
}

