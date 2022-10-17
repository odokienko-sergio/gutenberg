/******/
( function( modules ) { // webpackBootstrap
	/******/ 	// The module cache
	/******/
	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/
	function __webpack_require__( moduleId ) {
		/******/
		/******/ 		// Check if module is in cache
		/******/
		if ( installedModules[ moduleId ] ) {
			/******/
			return installedModules[ moduleId ].exports;
			/******/
		}
		/******/ 		// Create a new module (and put it into the cache)
		/******/
		var module = installedModules[ moduleId ] = {
			/******/            i: moduleId,
			/******/            l: false,
			/******/            exports: {}
			/******/
		};
		/******/
		/******/ 		// Execute the module function
		/******/
		modules[ moduleId ].call( module.exports, module, module.exports, __webpack_require__ );
		/******/
		/******/ 		// Flag the module as loaded
		/******/
		module.l = true;
		/******/
		/******/ 		// Return the exports of the module
		/******/
		return module.exports;
		/******/
	}

	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/
	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/
	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/
	__webpack_require__.d = function( exports, name, getter ) {
		/******/
		if ( ! __webpack_require__.o( exports, name ) ) {
			/******/
			Object.defineProperty( exports, name, {
				/******/                configurable: false,
				/******/                enumerable: true,
				/******/                get: getter
				/******/
			} );
			/******/
		}
		/******/
	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/
	__webpack_require__.n = function( module ) {
		/******/
		var getter = module && module.__esModule ?
			/******/            function getDefault() {
				return module[ 'default' ];
			} :
			/******/            function getModuleExports() {
				return module;
			};
		/******/
		__webpack_require__.d( getter, 'a', getter );
		/******/
		return getter;
		/******/
	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/
	__webpack_require__.o = function( object, property ) {
		return Object.prototype.hasOwnProperty.call( object, property );
	};
	/******/
	/******/ 	// __webpack_public_path__
	/******/
	__webpack_require__.p = '';
	/******/
	/******/ 	// Load entry module and return exports
	/******/
	return __webpack_require__( __webpack_require__.s = 0 );
	/******/
} )
	/************************************************************************/
	/******/ ( [
	/* 0 */
	/***/ ( function( module, __webpack_exports__, __webpack_require__ ) {

		'use strict';
		Object.defineProperty( __webpack_exports__, '__esModule', { value: true } );
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_0__edit__ = __webpack_require__( 1 );
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_1__block_json__ = __webpack_require__( 2 );
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_1__block_json___default = __webpack_require__.n( __WEBPACK_IMPORTED_MODULE_1__block_json__ );
		var registerBlockType                                 = wp.blocks.registerBlockType;


		wp.domReady( function() {
			registerBlockType( __WEBPACK_IMPORTED_MODULE_1__block_json___default.a.name, {
				title: __WEBPACK_IMPORTED_MODULE_1__block_json___default.a.title,
				attributes: __WEBPACK_IMPORTED_MODULE_1__block_json___default.a.attributes,
				edit: __WEBPACK_IMPORTED_MODULE_0__edit__[ 'a' /* default */ ],
				save: function save( props ) {
					return null;
				}
			} );
		} );

		/***/
	} ),
	/* 1 */
	/***/ ( function( module, __webpack_exports__, __webpack_require__ ) {

		'use strict';

		function _toConsumableArray( arr ) {
			if ( Array.isArray( arr ) ) {
				for ( var i = 0, arr2 = Array( arr.length ); i < arr.length; i++ ) {
					arr2[ i ] = arr[ i ];
				}
				return arr2;
			} else {
				return Array.from( arr );
			}
		}

		var InspectorControls = wp.blockEditor.InspectorControls;
		var __                = wp.i18n.__;
		var _wp               = wp,
			apiFetch          = _wp.apiFetch;
		var _wp$components    = wp.components,
			SelectControl     = _wp$components.SelectControl,
			PanelBody         = _wp$components.PanelBody,
			Button            = _wp$components.Button,
			ServerSideRender  = _wp$components.ServerSideRender;
		var _wp$element       = wp.element,
			useEffect         = _wp$element.useEffect,
			Fragment          = _wp$element.Fragment;


		var Edit = function Edit( props ) {
			var _props$attributes = props.attributes,
				users             = _props$attributes.users,
				allUsers          = _props$attributes.allUsers,
				attributes        = props.attributes,
				setAttributes     = props.setAttributes;


			useEffect( function() {
				apiFetch( {
					path: '/rgbc-users/v1/user-list'
				} ).then( function( response ) {
					setAttributes( { allUsers: response } );
				} );
			}, [] );

			var addUser = function addUser( userID ) {

				var users = [].concat( _toConsumableArray( attributes.users ) ) || [];

				if ( ! users.includes( userID ) ) {
					users.push( userID );
					setAttributes( { users: users } );
				}
			};

			var removeUser = function removeUser( userID ) {

				var users = [].concat( _toConsumableArray( attributes.users ) ) || [];
				var index = users.indexOf( userID );

				if ( -1 < index ) {
					users.splice( index, 1 );
					setAttributes( { users: users } );
				}
			};

			var getUserLabel = function getUserLabel( userID ) {

				for ( var i = 0; i < users.length; i++ ) {
					if ( userID == users[ i ].value ) {
						return users[ i ].label;
					}
				}

				return userID;
			};

			return wp.element.createElement(
				Fragment,
				null,
				wp.element.createElement(
					InspectorControls,
					{
						key: 'custom-users-block-inspector'
					},
					wp.element.createElement(
						PanelBody,
						{
							title: __( 'Select Users' )
						},
						users.length,
						wp.element.createElement(
							'p',
							null,
							0 < users.length && users.map( function( userID ) {
								return wp.element.createElement(
									Fragment,
									null,
									wp.element.createElement(
										'span',
										null,
										getUserLabel( userID )
									),
									wp.element.createElement(
										Button,
										{
											isSecondary: true,
											isSmall: true,
											onClick: function onClick() {
												removeUser( userID );
											}
										},
										'x'
									)
								);
							} )
						),

						wp.element.createElement( SelectControl, {
							label: __( 'Add User' ),
							help: __( 'Select user to show' ),
							options: allUsers,
							onChange: function onChange( value ) {
								addUser( value );
							}
						} )
					)
				),
				wp.element.createElement( ServerSideRender, {
					block: 'rgbc/custom-users-block',
					attributes: attributes
				} )
			);
		};

		/* harmony default export */
		__webpack_exports__[ 'a' ] = ( Edit );

		/***/
	} ),
	/* 2 */
	/***/ ( function( module, exports ) {

		module.exports = {
			'name': 'rgbc/custom-users-block',
			'title': 'RGBC Custom Users Block',
			'className': 'rgbc-custom-users-block',
			'textdomain': 'rgbc-custom-users-block',
			'icon': 'admin-users',
			'attributes': {
				'users': { 'type': 'array', 'default': [] },
				'allUsers': { 'type': 'array', 'default': [] }
			},
			'category': 'design'
		}
		/***/
	} )
	/******/ ] );