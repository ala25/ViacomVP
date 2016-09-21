var _ = require('underscore');
var log = require('loglevel');
var originalFactory = log.methodFactory;

/**
 * Override default method to output additional logging information
 */
log.methodFactory = function(methodName, logLevel, loggerName) {
	var rawMethod = originalFactory(methodName, logLevel, loggerName);

	return function() {
		var messages = Array.prototype.slice.call(arguments);

		if (loggerName !== undefined) {
			messages.unshift('[EdgePlayer] ' + methodName.toUpperCase() + ' [' + loggerName + '] ');
		}
		rawMethod.apply(undefined, messages);
	};
};
log.setLevel(log.getLevel());

var utils = require('utils');
var Events = require('Events');
var Errors = require('Errors');
var Timeouts = require('Timeouts');
var PlayState = require('States');
var GlobalCallbacks = require('GlobalCallbacks');
var Core = require('Core');
var Player = require('Player');
var StaticMethods = require('StaticMethods');
var UserSettingsManager = require('UserSettingsManager');
var PluginManager = require('PluginManager');

// New namespace EdgePlayer, MTVNPlayer remains an alias.
var MTVNPlayer = window.MTVNPlayer = window.MTVNPlayer || {};

/**
 * <p>The EdgePlayer API: used to create and manage player instances. </br>
 * Edgeplayer was designed to support single page apps by allowing the </br>
 * creation, distruction, and management of player instances from a simple API </br>
 * which only has to be loaded in the app once.</p>
 * <p>Libraries provided here are intended for use by EdgePlayer projects only. </br>
 * Some are customized and we update at our own descretion.</p>
 * @property {string} version EdgePlayer API version
 * @property {string} build EdgePlayer API build date/time
 * @property {string} defaultGUIVersion Default GUI version
 * @property {string} defaultPollyfillVersion Default polyfill version
 * @property {string} defaultEndslateVersion Default endslate version
 * @namespace EdgePlayer
 *
 */

var EdgePlayer = window.EdgePlayer = MTVNPlayer;

if (!EdgePlayer.Player) {
	EdgePlayer.version = '@@version';
	EdgePlayer.build = '@@timestamp';
	EdgePlayer.defaultGUIVersion = '@@guiVersion';
	EdgePlayer.defaultPolyfillVersion = '@@polyfillVersion';
	EdgePlayer.defaultEndslateVersion = '@@endslateVersion';

	/**
	 * LogLevel reference for player/gui/endslate projects.
	 * This is kept off global and checked for leaks so as to prevent interferance
	 * with the page. {@link https://github.com/pimterry/loglevel| LogLevel}
	 */
	EdgePlayer.log = log;
	EdgePlayer.log.setDefaultLevel(EdgePlayer.log.levels.INFO);

	EdgePlayer.utils = utils;

	/**
	 * These are arrays of functions the player will execute as callbacks when
	 * certain conditions are met.
	 * @type {module:GlobalCallbacks}
	 */
	EdgePlayer.GlobalCallbacks = GlobalCallbacks;

	// Add static methods to the EdgePlayer object
	StaticMethods(EdgePlayer);

	/**
	 * User settings/preferences are shared across player instances
	 */
	EdgePlayer.settings = UserSettingsManager;
	EdgePlayer.settings.initialize();

	/**
	 * Events dispatched by either the EdgePlayer API or Player instances
	 * @type {module:Events}
	 */
	EdgePlayer.Events = Events;

	/**
	 * Errors thrown by either the EdgePlayer API or Player instances
	 *  @type {module:Errors}
	 */
	EdgePlayer.Errors = Errors;

	EdgePlayer.PlayState = PlayState;

	/**
	 * Timeouts used by Bento
	 * @type {module:Timeouts}
	 */
	EdgePlayer.Timeouts = Timeouts;

	EdgePlayer.supports = {
		persistAdTerminated: true
	};

	if (_.isFunction(Object.freeze)) {
		Object.freeze(PlayState);
		Object.freeze(Events);
		Object.freeze(Errors);
	}

	EdgePlayer.Player = Player;

	/**
	 * EdgePlayer API is ready for use
	 * @type {Boolean}
	 */
	EdgePlayer.isReady = true;

	// Execute any of API callbacks
	if (_.isFunction(EdgePlayer.onAPIReady)) {
		EdgePlayer.onAPIReady(EdgePlayer);
	}

	Core.triggerGlobalCallbacks(EdgePlayer.GlobalCallbacks.API_READY, EdgePlayer);

	// Redefine the array of callbacks and override push to fire callbacks immediately
	(window[EdgePlayer.GlobalCallbacks.API_READY] = []).push = function(callback) {
		callback(EdgePlayer);
	};

	// Ensure any legacy pjs callbacks work
	Core.triggerGlobalCallbacks(EdgePlayer.GlobalCallbacks.LEGACY_PJS_API_READY, EdgePlayer);
	window[EdgePlayer.GlobalCallbacks.LEGACY_PJS_API_READY] = window[EdgePlayer.GlobalCallbacks.API_READY];

	// Ensure any legacy mtvnplayer callbacks work
	Core.triggerGlobalCallbacks(EdgePlayer.GlobalCallbacks.LEGACY_API_READY, EdgePlayer);
	window[EdgePlayer.GlobalCallbacks.LEGACY_API_READY] = window[EdgePlayer.GlobalCallbacks.API_READY];

	// Initialize and apply jQuery plugin
	PluginManager.init();

	// Inject CSS
	require('style!PlayerCss');
	EdgePlayer.css = require('PlayerCss').toString();
}
