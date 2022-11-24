PluginWrapper.registerPlugin('google_calendar', {
    name: __('Calendar'),
	icon: 'ico-pl-google_calendar',
    element: {
        minSize: {width: 100, height: 100},
        defaultSize: {width: 800, height: 600},
        resizable: true
    },
	propertyDialog: {
		noScroll: true,
		tabs: [
			{children: [
				{type: 'HorizontalLayout', columnWeights: [7, 5], children: [
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Google calendar ID'),
							helpText: __('To find calendar ID, go to calendar settings'),
							uiComponentOptions: function(data, opts) {
								opts.validateText = data.content.groupId ? '' : ('open:' + __('Field "%s" is required').replace('%s', __('Google calendar ID')));
								return opts;
							}
						},
						{type: 'TextField', id: 'groupId', placeholder: 'uk__en_gb@holiday.calendar.google.com'}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Calendar name')},
						{type: 'TextField', id: 'calendar_name', placeholder: 'Calendar name'}
					]}
				]},
				{type: 'HorizontalLayout', css: {marginTop: 15}, children: [
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Language')},
						{type: 'DropdownBox', id: 'language', options: [
							{id: '', name: 'Default'},
							{id: 'id', name: 'Bahasa Indonesia'},
							{id: 'ca', name: 'Català'},
							{id: 'cs', name: 'Čeština'},
							{id: 'da', name: 'Dansk'},
							{id: 'de', name: 'Deutsch'},
							{id: 'en_GB', name: 'English (UK)'},
							{id: 'en', name: 'English (US)'},
							{id: 'es', name: 'Español'},
							{id: 'es_419', name: 'Español (Latinoamérica)'},
							{id: 'fil', name: 'Filipino'},
							{id: 'fr', name: 'Français'},
							{id: 'hr', name: 'Hrvatski'},
							{id: 'it', name: 'Italiano'},
							{id: 'lv', name: 'Latviešu'},
							{id: 'lt', name: 'Lietuvių'},
							{id: 'hu', name: 'Magyar'},
							{id: 'nl', name: 'Nederlands'},
							{id: 'no', name: 'Norsk (bokmål)'},
							{id: 'pl', name: 'Polski'},
							{id: 'pt_BR', name: 'Português (Brasil)'},
							{id: 'pt_PT', name: 'Português (Portugal)'},
							{id: 'ro', name: 'Română'},
							{id: 'sk', name: 'Slovenčina'},
							{id: 'sl', name: 'Slovenščina'},
							{id: 'fi', name: 'Suomi'},
							{id: 'sv', name: 'Svenska'},
							{id: 'tr', name: 'Türkçe'},
							{id: 'vi', name: 'Tiếng Việt'},
							{id: 'el', name: 'Ελληνικά'},
							{id: 'ru', name: 'Русский'},
							{id: 'sr', name: 'Српски'},
							{id: 'uk', name: 'Українська'},
							{id: 'bg', name: 'Български'},
							{id: 'iw', name: 'עברית'},
							{id: 'ar', name: 'العربية'},
							{id: 'fa', name: 'فارسی'},
							{id: 'hi', name: 'हिन्दी'},
							{id: 'th', name: 'ภาษาไทย'},
							{id: 'zh_TW', name: '中文（繁體）'},
							{id: 'zh_CN', name: '中文（简体）'},
							{id: 'ja', name: '日本語'},
							{id: 'ko', name: '한국어'}
						]}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Time zone')},
						{type: 'DropdownBox', id: 'timezone', options: [
							{id: '', name: 'Default'},
							{id: 'Pacific/Niue', name: '(GMT-11:00) Niue'},
							{id: 'Pacific/Pago_Pago', name: '(GMT-11:00) Pago Pago'},
							{id: 'Pacific/Honolulu', name: '(GMT-10:00) Honolulu'},
							{id: 'Pacific/Rarotonga', name: '(GMT-10:00) Rarotonga'},
							{id: 'Pacific/Tahiti', name: '(GMT-10:00) Tahiti'},
							{id: 'Pacific/Marquesas', name: '(GMT-09:30) Marquesas'},
							{id: 'America/Anchorage', name: '(GMT-09:00) Anchorage'},
							{id: 'Pacific/Gambier', name: '(GMT-09:00) Gambier'},
							{id: 'America/Los_Angeles', name: '(GMT-08:00) Los Angeles'},
							{id: 'America/Tijuana', name: '(GMT-08:00) Tijuana'},
							{id: 'America/Vancouver', name: '(GMT-08:00) Vancouver'},
							{id: 'America/Whitehorse', name: '(GMT-08:00) Whitehorse'},
							{id: 'Pacific/Pitcairn', name: '(GMT-08:00) Pitcairn'},
							{id: 'America/Dawson_Creek', name: '(GMT-07:00) Dawson Creek'},
							{id: 'America/Denver', name: '(GMT-07:00) Denver'},
							{id: 'America/Edmonton', name: '(GMT-07:00) Edmonton'},
							{id: 'America/Hermosillo', name: '(GMT-07:00) Hermosillo'},
							{id: 'America/Mazatlan', name: '(GMT-07:00) Mazatlan'},
							{id: 'America/Phoenix', name: '(GMT-07:00) Phoenix'},
							{id: 'America/Yellowknife', name: '(GMT-07:00) Yellowknife'},
							{id: 'America/Belize', name: '(GMT-06:00) Belize'},
							{id: 'America/Chicago', name: '(GMT-06:00) Chicago'},
							{id: 'America/Costa_Rica', name: '(GMT-06:00) Costa Rica'},
							{id: 'America/El_Salvador', name: '(GMT-06:00) El Salvador'},
							{id: 'America/Guatemala', name: '(GMT-06:00) Guatemala'},
							{id: 'America/Managua', name: '(GMT-06:00) Managua'},
							{id: 'America/Mexico_City', name: '(GMT-06:00) Mexico City'},
							{id: 'America/Regina', name: '(GMT-06:00) Regina'},
							{id: 'America/Tegucigalpa', name: '(GMT-06:00)Tegucigalpa'},
							{id: 'America/Winnipeg', name: '(GMT-06:00) Winnipeg'},
							{id: 'Pacific/Galapagos', name: '(GMT-06:00) Galapagos'},
							{id: 'America/Bogota', name: '(GMT-05:00) Bogota'},
							{id: 'America/Cancun', name: '(GMT-05:00) Cancun'},
							{id: 'America/Cayman', name: '(GMT-05:00) Cayman'},
							{id: 'America/Guayaquil', name: '(GMT-05:00) Guayaquil'},
							{id: 'America/Havana', name: '(GMT-05:00) Havana'},
							{id: 'America/Iqaluit', name: '(GMT-05:00) Iqaluit'},
							{id: 'America/Jamaica', name: '(GMT-05:00) Jamaica'},
							{id: 'America/Lima', name: '(GMT-05:00) Lima'},
							{id: 'America/Nassau', name: '(GMT-05:00) Nassau'},
							{id: 'America/New_York', name: '(GMT-05:00) New York'},
							{id: 'America/Panama', name: '(GMT-05:00) Panama'},
							{id: 'America/Port-au-Prince', name: '(GMT-05:00) Port au Prince'},
							{id: 'America/Rio_Branco', name: '(GMT-05:00) Rio Branco'},
							{id: 'America/Toronto', name: '(GMT-05:00) Toronto'},
							{id: 'Pacific/Easter', name: '(GMT-05:00) Easter'},
							{id: 'America/Caracas', name: '(GMT-04:30) Caracas'},
							{id: 'America/Asuncion', name: '(GMT-04:00) Asuncion'},
							{id: 'America/Barbados', name: '(GMT-04:00) Barbados'},
							{id: 'America/Boa_Vista', name: '(GMT-04:00) Boa Vista'},
							{id: 'America/Campo_Grande', name: '(GMT-04:00) Campo Grande'},
							{id: 'America/Cuiaba', name: '(GMT-04:00) Cuiaba'},
							{id: 'America/Curacao', name: '(GMT-04:00) Curacao'},
							{id: 'America/Grand_Turk', name: '(GMT-04:00) Grand Turk'},
							{id: 'America/Guyana', name: '(GMT-04:00) Guyana'},
							{id: 'America/Halifax', name: '(GMT-04:00) Halifax'},
							{id: 'America/La_Paz', name: '(GMT-04:00) La Paz'},
							{id: 'America/Manaus', name: '(GMT-04:00) Manaus'},
							{id: 'America/Martinique', name: '(GMT-04:00) Martinique'},
							{id: 'America/Port_of_Spain', name: '(GMT-04:00) Port of Spain'},
							{id: 'America/Porto_Velho', name: '(GMT-04:00) Porto Velho'},
							{id: 'America/Puerto_Rico', name: '(GMT-04:00) Puerto Rico'},
							{id: 'America/Santo_Domingo', name: '(GMT-04:00) Santo Domingo'},
							{id: 'America/Thule', name: '(GMT-04:00) Thule'},
							{id: 'Atlantic/Bermuda', name: '(GMT-04:00) Bermuda'},
							{id: 'America/St_Johns', name: '(GMT-03:30) St Johns'},
							{id: 'America/Araguaina', name: '(GMT-03:00) Araguaina'},
							{id: 'America/Argentina/Buenos_Aires', name: '(GMT-03:00) Buenos Aires'},
							{id: 'America/Bahia', name: '(GMT-03:00) Bahia'},
							{id: 'America/Belem', name: '(GMT-03:00) Belem'},
							{id: 'America/Cayenne', name: '(GMT-03:00) Cayenne'},
							{id: 'America/Fortaleza', name: '(GMT-03:00) Fortaleza'},
							{id: 'America/Godthab', name: '(GMT-03:00) Godthab'},
							{id: 'America/Maceio', name: '(GMT-03:00) Maceio'},
							{id: 'America/Miquelon', name: '(GMT-03:00) Miquelon'},
							{id: 'America/Montevideo', name: '(GMT-03:00) Montevideo'},
							{id: 'America/Paramaribo', name: '(GMT-03:00) Paramaribo'},
							{id: 'America/Recife', name: '(GMT-03:00) Recife'},
							{id: 'America/Santiago', name: '(GMT-03:00) Santiago'},
							{id: 'America/Sao_Paulo', name: '(GMT-03:00) Sao Paulo'},
							{id: 'Antarctica/Palmer', name: '(GMT-03:00) Palmer'},
							{id: 'Antarctica/Rothera', name: '(GMT-03:00) Rothera'},
							{id: 'Atlantic/Stanley', name: '(GMT-03:00) Stanley'},
							{id: 'America/Noronha', name: '(GMT-02:00) Noronha'},
							{id: 'Atlantic/South_Georgia', name: '(GMT-02:00) South Georgia'},
							{id: 'America/Scoresbysund', name: '(GMT-01:00) Scoresbysund'},
							{id: 'Atlantic/Azores', name: '(GMT-01:00) Azores'},
							{id: 'Atlantic/Cape_Verde', name: '(GMT-01:00) Cape Verde'},
							{id: 'Africa/Abidjan', name: '(GMT+00:00) Abidjan'},
							{id: 'Africa/Accra', name: '(GMT+00:00) Accra'},
							{id: 'Africa/Bissau', name: '(GMT+00:00) Bissau'},
							{id: 'Africa/Casablanca', name: '(GMT+00:00) Casablanca'},
							{id: 'Africa/El_Aaiun', name: '(GMT+00:00) El Aaiun'},
							{id: 'Africa/Monrovia', name: '(GMT+00:00) Monrovia'},
							{id: 'America/Danmarkshavn', name: '(GMT+00:00) Danmarkshavn'},
							{id: 'Atlantic/Canary', name: '(GMT+00:00) Canary'},
							{id: 'Atlantic/Faroe', name: '(GMT+00:00) Faroe'},
							{id: 'Atlantic/Reykjavik', name: '(GMT+00:00) Reykjavik'},
							{id: 'Etc/GMT', name: '(GMT+00:00) GMT'},
							{id: 'Europe/Dublin', name: '(GMT+00:00) Dublin'},
							{id: 'Europe/Lisbon', name: '(GMT+00:00) Lisbon'},
							{id: 'Europe/London', name: '(GMT+00:00) London'},
							{id: 'Africa/Algiers', name: '(GMT+01:00) Algiers'},
							{id: 'Africa/Ceuta', name: '(GMT+01:00) Ceuta'},
							{id: 'Africa/Lagos', name: '(GMT+01:00) Lagos'},
							{id: 'Africa/Ndjamena', name: '(GMT+01:00) Ndjamena'},
							{id: 'Africa/Tunis', name: '(GMT+01:00) Tunis'},
							{id: 'Africa/Windhoek', name: '(GMT+01:00) Windhoek'},
							{id: 'Europe/Amsterdam', name: '(GMT+01:00) Amsterdam'},
							{id: 'Europe/Andorra', name: '(GMT+01:00) Andorra'},
							{id: 'Europe/Belgrade', name: '(GMT+01:00) Belgrade'},
							{id: 'Europe/Berlin', name: '(GMT+01:00) Berlin'},
							{id: 'Europe/Brussels', name: '(GMT+01:00) Brussels'},
							{id: 'Europe/Budapest', name: '(GMT+01:00) Budapest'},
							{id: 'Europe/Copenhagen', name: '(GMT+01:00) Copenhagen'},
							{id: 'Europe/Gibraltar', name: '(GMT+01:00) Gibraltar'},
							{id: 'Europe/Luxembourg', name: '(GMT+01:00) Luxembourg'},
							{id: 'Europe/Madrid', name: '(GMT+01:00) Madrid'},
							{id: 'Europe/Malta', name: '(GMT+01:00) Malta'},
							{id: 'Europe/Monaco', name: '(GMT+01:00) Monaco'},
							{id: 'Europe/Oslo', name: '(GMT+01:00) Oslo'},
							{id: 'Europe/Paris', name: '(GMT+01:00) Paris'},
							{id: 'Europe/Prague', name: '(GMT+01:00) Prague'},
							{id: 'Europe/Rome', name: '(GMT+01:00) Rome'},
							{id: 'Europe/Stockholm', name: '(GMT+01:00) Stockholm'},
							{id: 'Europe/Tirane', name: '(GMT+01:00) Tirane'},
							{id: 'Europe/Vienna', name: '(GMT+01:00) Vienna'},
							{id: 'Europe/Warsaw', name: '(GMT+01:00) Warsaw'},
							{id: 'Europe/Zurich', name: '(GMT+01:00) Zurich'},
							{id: 'Africa/Cairo', name: '(GMT+02:00) Cairo'},
							{id: 'Africa/Johannesburg', name: '(GMT+02:00) Johannesburg'},
							{id: 'Africa/Maputo', name: '(GMT+02:00) Maputo'},
							{id: 'Africa/Tripoli', name: '(GMT+02:00) Tripoli'},
							{id: 'Asia/Amman', name: '(GMT+02:00) Amman'},
							{id: 'Asia/Beirut', name: '(GMT+02:00) Beirut'},
							{id: 'Asia/Damascus', name: '(GMT+02:00) Damascus'},
							{id: 'Asia/Gaza', name: '(GMT+02:00) Gaza'},
							{id: 'Asia/Jerusalem', name: '(GMT+02:00) Jerusalem'},
							{id: 'Asia/Nicosia', name: '(GMT+02:00) Nicosia'},
							{id: 'Europe/Athens', name: '(GMT+02:00) Athens'},
							{id: 'Europe/Bucharest', name: '(GMT+02:00) Bucharest'},
							{id: 'Europe/Chisinau', name: '(GMT+02:00) Chisinau'},
							{id: 'Europe/Helsinki', name: '(GMT+02:00) Helsinki'},
							{id: 'Europe/Istanbul', name: '(GMT+02:00) Istanbul'},
							{id: 'Europe/Kaliningrad', name: '(GMT+02:00) Kaliningrad'},
							{id: 'Europe/Kiev', name: '(GMT+02:00) Kiev'},
							{id: 'Europe/Riga', name: '(GMT+02:00) Riga'},
							{id: 'Europe/Sofia', name: '(GMT+02:00) Sofia'},
							{id: 'Europe/Tallinn', name: '(GMT+02:00) Tallinn'},
							{id: 'Europe/Vilnius', name: '(GMT+02:00) Vilnius'},
							{id: 'Africa/Khartoum', name: '(GMT+03:00) Khartoum'},
							{id: 'Africa/Nairobi', name: '(GMT+03:00) Nairobi'},
							{id: 'Antarctica/Syowa', name: '(GMT+03:00) Syowa'},
							{id: 'Asia/Baghdad', name: '(GMT+03:00) Baghdad'},
							{id: 'Asia/Qatar', name: '(GMT+03:00) Qatar'},
							{id: 'Asia/Riyadh', name: '(GMT+03:00) Riyadh'},
							{id: 'Europe/Minsk', name: '(GMT+03:00) Minsk'},
							{id: 'Europe/Moscow', name: '(GMT+03:00) Moscow'},
							{id: 'Asia/Tehran', name: '(GMT+03:30) Tehran'},
							{id: 'Asia/Baku', name: '(GMT+04:00) Baku'},
							{id: 'Asia/Dubai', name: '(GMT+04:00) Dubai'},
							{id: 'Asia/Tbilisi', name: '(GMT+04:00) Tbilisi'},
							{id: 'Asia/Yerevan', name: '(GMT+04:00) Yerevan'},
							{id: 'Europe/Samara', name: '(GMT+04:00) Samara'},
							{id: 'Indian/Mahe', name: '(GMT+04:00) Mahe'},
							{id: 'Indian/Mauritius', name: '(GMT+04:00) Mauritius'},
							{id: 'Indian/Reunion', name: '(GMT+04:00) Reunion'},
							{id: 'Asia/Kabul', name: '(GMT+04:30) Kabul'},
							{id: 'Antarctica/Mawson', name: '(GMT+05:00) Mawson'},
							{id: 'Asia/Aqtau', name: '(GMT+05:00) Aqtau'},
							{id: 'Asia/Aqtobe', name: '(GMT+05:00) Aqtobe'},
							{id: 'Asia/Ashgabat', name: '(GMT+05:00) Ashgabat'},
							{id: 'Asia/Dushanbe', name: '(GMT+05:00) Dushanbe'},
							{id: 'Asia/Karachi', name: '(GMT+05:00) Karachi'},
							{id: 'Asia/Tashkent', name: '(GMT+05:00) Tashkent'},
							{id: 'Asia/Yekaterinburg', name: '(GMT+05:00) Yekaterinburg'},
							{id: 'Indian/Kerguelen', name: '(GMT+05:00) Kerguelen'},
							{id: 'Indian/Maldives', name: '(GMT+05:00) Maldives'},
							{id: 'Asia/Calcutta', name: '(GMT+05:30) Calcutta'},
							{id: 'Asia/Colombo', name: '(GMT+05:30) Colombo'},
							{id: 'Asia/Katmandu', name: '(GMT+05:45) Katmandu'},
							{id: 'Antarctica/Vostok', name: '(GMT+06:00) Vostok'},
							{id: 'Asia/Almaty', name: '(GMT+06:00) Almaty'},
							{id: 'Asia/Bishkek', name: '(GMT+06:00) Bishkek'},
							{id: 'Asia/Dhaka', name: '(GMT+06:00) Dhaka'},
							{id: 'Asia/Omsk', name: '(GMT+06:00) Omsk'},
							{id: 'Asia/Thimphu', name: '(GMT+06:00) Thimphu'},
							{id: 'Indian/Chagos', name: '(GMT+06:00) Chagos'},
							{id: 'Asia/Rangoon', name: '(GMT+06:30) Rangoon'},
							{id: 'Indian/Cocos', name: '(GMT+06:30) Cocos'},
							{id: 'Antarctica/Davis', name: '(GMT+07:00) Davis'},
							{id: 'Asia/Bangkok', name: '(GMT+07:00) Bangkok'},
							{id: 'Asia/Hovd', name: '(GMT+07:00) Hovd'},
							{id: 'Asia/Jakarta', name: '(GMT+07:00) Jakarta'},
							{id: 'Asia/Krasnoyarsk', name: '(GMT+07:00) Krasnoyarsk'},
							{id: 'Asia/Saigon', name: '(GMT+07:00) Saigon'},
							{id: 'Indian/Christmas', name: '(GMT+07:00) Christmas'},
							{id: 'Antarctica/Casey', name: '(GMT+08:00) Casey'},
							{id: 'Asia/Brunei', name: '(GMT+08:00) Brunei'},
							{id: 'Asia/Choibalsan', name: '(GMT+08:00) Choibalsan'},
							{id: 'Asia/Hong_Kong', name: '(GMT+08:00) Hong Kong'},
							{id: 'Asia/Irkutsk', name: '(GMT+08:00) Irkutsk'},
							{id: 'Asia/Kuala_Lumpur', name: '(GMT+08:00) Kuala Lumpur'},
							{id: 'Asia/Macau', name: '(GMT+08:00) Macau'},
							{id: 'Asia/Makassar', name: '(GMT+08:00) Makassar'},
							{id: 'Asia/Manila', name: '(GMT+08:00) Manila'},
							{id: 'Asia/Shanghai', name: '(GMT+08:00) Shanghai'},
							{id: 'Asia/Singapore', name: '(GMT+08:00) Singapore'},
							{id: 'Asia/Taipei', name: '(GMT+08:00) Taipei'},
							{id: 'Asia/Ulaanbaatar', name: '(GMT+08:00) Ulaanbaatar'},
							{id: 'Australia/Perth', name: '(GMT+08:00) Perth'},
							{id: 'Asia/Pyongyang', name: '(GMT+08:30) Pyongyang'},
							{id: 'Asia/Dili', name: '(GMT+09:00) Dili'},
							{id: 'Asia/Jayapura', name: '(GMT+09:00) Jayapura'},
							{id: 'Asia/Seoul', name: '(GMT+09:00) Seoul'},
							{id: 'Asia/Tokyo', name: '(GMT+09:00) Tokyo'},
							{id: 'Asia/Yakutsk', name: '(GMT+09:00) Yakutsk'},
							{id: 'Pacific/Palau', name: '(GMT+09:00) Palau'},
							{id: 'Australia/Adelaide', name: '(GMT+09:30) Adelaide'},
							{id: 'Australia/Darwin', name: '(GMT+09:30) Darwin'},
							{id: 'Antarctica/DumontDUrville', name: '(GMT+10:00) DumontDUrville'},
							{id: 'Asia/Magadan', name: '(GMT+10:00) Magadan'},
							{id: 'Asia/Vladivostok', name: '(GMT+10:00) Vladivostok'},
							{id: 'Australia/Brisbane', name: '(GMT+10:00) Brisbane'},
							{id: 'Australia/Hobart', name: '(GMT+10:00) Hobart'},
							{id: 'Australia/Sydney', name: '(GMT+10:00) Sydney'},
							{id: 'Pacific/Chuuk', name: '(GMT+10:00) Chuuk'},
							{id: 'Pacific/Guam', name: '(GMT+10:00) Guam'},
							{id: 'Pacific/Port_Moresby', name: '(GMT+10:00) Port Moresby'},
							{id: 'Pacific/Efate', name: '(GMT+11:00) Efate'},
							{id: 'Pacific/Guadalcanal', name: '(GMT+11:00) Guadalcanal'},
							{id: 'Pacific/Kosrae', name: '(GMT+11:00) Kosrae'},
							{id: 'Pacific/Norfolk', name: '(GMT+11:00) Norfolk'},
							{id: 'Pacific/Noumea', name: '(GMT+11:00) Noumea'},
							{id: 'Pacific/Pohnpei', name: '(GMT+11:00) Pohnpei'},
							{id: 'Asia/Kamchatka', name: '(GMT+12:00) Kamchatka'},
							{id: 'Pacific/Auckland', name: '(GMT+12:00) Auckland'},
							{id: 'Pacific/Fiji', name: '(GMT+12:00) Fiji'},
							{id: 'Pacific/Funafuti', name: '(GMT+12:00) Funafuti'},
							{id: 'Pacific/Kwajalein', name: '(GMT+12:00) Kwajalein'},
							{id: 'Pacific/Majuro', name: '(GMT+12:00) Majuro'},
							{id: 'Pacific/Nauru', name: '(GMT+12:00) Nauru'},
							{id: 'Pacific/Tarawa', name: '(GMT+12:00) Tarawa'},
							{id: 'Pacific/Wake', name: '(GMT+12:00) Wake'},
							{id: 'Pacific/Wallis', name: '(GMT+12:00) Wallis'},
							{id: 'Pacific/Apia', name: '(GMT+13:00) Apia'},
							{id: 'Pacific/Enderbury', name: '(GMT+13:00) Enderbury'},
							{id: 'Pacific/Fakaofo', name: '(GMT+13:00) Fakaofo'},
							{id: 'Pacific/Tongatapu', name: '(GMT+13:00) Tongatapu'},
							{id: 'Pacific/Kiritimati', name: '(GMT+14:00) Kiritimati'}
						]}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('First day')},
						{type: 'DropdownBox', id: 'weekday', options: [
							{id: '1', name: 'Sunday'},
							{id: '2', name: 'Monday'},
							{id: '7', name: 'Saturday'}
						]}
					]}
				]},
				{type: 'HorizontalLayout', css: {marginTop: 15}, children: [
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('View mode')},
						{type: 'RadioBox', id: 'mode0', label: __('Week'), group: 'mode'},
						{type: 'RadioBox', id: 'mode1', label: __('Month'), group: 'mode'},
						{type: 'RadioBox', id: 'mode2', label: __('Agenda'), group: 'mode'}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Border'), helpText: __('Show border on calendar')},
						{type: 'RadioBox', id: 'border0', label: __('Yes'), group: 'border'},
						{type: 'RadioBox', id: 'border1', label: __('No'), group: 'border'}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'Label', text: __('Background color')},
						{type: 'ColorSelector', id: 'color'}
					]}
				]},
				{type: 'HorizontalLayout', css: {marginTop: 15}, children: [
					{type: 'VerticalLayout', children: [
						{type: 'CheckBox', id: 'check1', label: __('Title')},
						{type: 'CheckBox', id: 'check2', label: __('Navigation')},
						{type: 'CheckBox', id: 'check3', label: __('Date')}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'CheckBox', id: 'check4', label: __('Print icon')},
						{type: 'CheckBox', id: 'check5', label: __('Tabs')}
					]},
					{type: 'VerticalLayout', children: [
						{type: 'CheckBox', id: 'check6', label: __('Calendars list')},
						{type: 'CheckBox', id: 'check7', label: __('Time zone')}
					]}
				]}
			]}
		]
	},
	pluginScoped: {
		placeholderGroupId: 'uk__en_gb@holiday.calendar.google.com',
		placeholderCalendarName: 'Calendar name',
	},
	properties: [
		{id: 'calendarId', type: 'GoogleCalendarId', helpText: __('To find calendar ID, go to calendar settings.'),
			uiComponentOptions: function(data, opts) {
				opts.validateText = data.content.groupId ? '' : ('open:' + __('Field "%s" is required').replace('%s', __('Google calendar ID')));
				return opts;
			},
			get: function(data) { return data.content.groupId; },
			validate: function(value) {
				if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))
					{
						return '';
					}
				return (__("'%s' field value is incorrect.").replace('%s', 'Email'));
			},
			set: function(value, data) {
				data.content.groupId = value;
				this.updateFinalGroupId(data, value);
			}

		},
		{id: 'calendarName', type: 'GoogleCalendarName',
			get: function(data) { return data.content.calendar_name; },
			set: function(value, data) {
				data.content.calendar_name = value;
				this.updateFinalCalendarName(data);
			}
		},
		{id: 'calendarLanguage', type: 'GoogleCalendarLanguage',
			get: function(data) { return data.content.language; },
			set: function(value, data) {
			data.content.language = value;
			}
		},
		{id: 'calendarTimezone', type: 'GoogleCalendarTimezone',
			get: function(data) { return data.content.timezone; },
			set: function(value, data) {
				data.content.timezone = value;
			}
		},
		{id: 'calendarFirstDay', type: 'GoogleCalendarFirstDay',
			get: function(data) { return data.content.weekday; },
			set: function(value, data) {
				data.content.weekday = value;
			}
		},
		{id: 'calendarBackgroundColor', type: 'GoogleCalendarBackgroundColor',
			get: function(data) { return data.content.color; },
			set: function(value, data) {
				data.content.color = value.replace('#', '');
			}
		},
		{id: 'calendarViewMode', type: 'GoogleCalendarViewMode',
			get: function(data) { return data.content.mode; },
			set: function(value, data) {
				data.content.mode = value;
			}
		},
		{id: 'calendarBorder', type: 'GoogleCalendarBorder',
			get: function(data) {return data.content.checkbox_border; },
			set: function(value, data) {
			console.log(value);
				data.content.checkbox_border = value;
				data.content.border = value ? '1' : '0';
				data.content.border_style = value ? 'border:solid 1px #777' : 'border-width:0';

			}
		},
		{id: 'calendarTitle', type: 'GoogleCalendarTitle',
			get: function(data) { return data.content.checkbox_check1; },
			set: function(value, data) {
				data.content.checkbox_check1 = value;
				data.content.check1 = value ? '' : '&showTitle=0';
			}
		},
		{id: 'calendarNavigation', type: 'GoogleCalendarNavigation',
			get: function(data) { return data.content.checkbox_check2; },
			set: function(value, data) {
				data.content.checkbox_check2 = value;
				data.content.check2 = value ? '' : '&showNav=0';
			}
		},
		{id: 'calendarDate', type: 'GoogleCalendarDate',
			get: function(data) { return data.content.checkbox_check3; },
			set: function(value, data) {
				data.content.checkbox_check3 = value;
				data.content.check3 = value ? '' : '&showDate=0';
			}
		},
		{id: 'calendarPrintIcon', type: 'GoogleCalendarPrintIcon',
			get: function(data) { return data.content.checkbox_check4; },
			set: function(value, data) {
				data.content.checkbox_check4 = value;
				data.content.check4 = value ? '' : '&showPrint=0';
			}
		},
		{id: 'calendarTabs', type: 'GoogleCalendarTabs',
			get: function(data) { return data.content.checkbox_check5; },
			set: function(value, data) {
				data.content.checkbox_check5 = value;
				data.content.check5 = value ? '' : '&showTabs=0';
			}
		},
		{id: 'calendarList', type: 'GoogleCalendarList',
			get: function(data) { return data.content.checkbox_check6; },
			set: function(value, data) {
				data.content.checkbox_check6 = value;
				data.content.check6 = value ? '' : '&showCalendars=0';
			}
		},
		{id: 'calendarShowTimezone', type: 'GoogleCalendarShowTimezone',
			get: function(data) { return data.content.checkbox_check7; },
			set: function(value, data) {
				data.content.checkbox_check7 = value;
				data.content.check7 = value ? '' : '&showTz=0';
			}
		},
	],
	batchUpdates: true,
	resizeTimeout: null,
	
	resizeAction: function(data, elem) {
		if (!this.resizeTimeout) {
			var self = this;
			this.resizeTimeout = setTimeout(function() {
				self.resizeTimeout = null;
				self.updateElement();
			}, 1000);
		}
	},
	updateFinalGroupId: function(data) {
		data.content.finalGroupId = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.content.groupId))
				? data.content.groupId : this.pluginScoped.placeholderGroupId;
	},
	updateFinalCalendarName: function(data) {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};
		data.content.finalCalendarName = data.content.calendar_name ? data.content.calendar_name.replace(/[&<>"']/g, function(m) {return map[m];}) : this.pluginScoped.placeholderCalendarName;
		data.content.finalCalendarName = encodeURIComponent(data.content.finalCalendarName);
	},
	openAction: function(fields, data, elem) {
		var itm;
		itm = fields.timezone.getItemById(data.content.timezone);
		if (!itm) itm = fields.timezone.getItem(0);
		fields.timezone.selectItem(itm);
		itm = fields.language.getItemById(data.content.language);
		if (!itm) itm = fields.language.getItem(0);
		fields.language.selectItem(itm);
		itm = fields.weekday.getItemById(data.content.weekday);
		if (!itm) itm = fields.weekday.getItem(0);
		fields.weekday.selectItem(itm);
		fields.groupId.setText(data.content.groupId);
		fields.calendar_name.setText(data.content.calendar_name);
		fields.border0.setValue(data.content.border === '1');
		fields.border1.setValue(data.content.border === '0');
		
		fields.check1.setValue(data.content.check1 === '');
		fields.check2.setValue(data.content.check2 === '');
		fields.check3.setValue(data.content.check3 === '');
		fields.check4.setValue(data.content.check4 === '');
		fields.check5.setValue(data.content.check5 === '');
		fields.check6.setValue(data.content.check6 === '');
		fields.check7.setValue(data.content.check7 === '');
		
		fields.mode0.setValue(data.content.mode === 'WEEK');
		fields.mode1.setValue(data.content.mode === 'MONTH');
		fields.mode2.setValue(data.content.mode === 'AGENDA');
		
		fields.color.setValue(data.content.color);
	},
	applyAction: function(fields, data, elem) {
		var itm, color;
		itm = fields.timezone.getSelectedItem();
		data.content.timezone = itm.getOriginal().id;
		itm = fields.language.getSelectedItem();
		data.content.language = itm.getOriginal().id;
		itm = fields.weekday.getSelectedItem();
		data.content.weekday = itm.getOriginal().id;
		
		data.content.check1 = fields.check1.getValue() ? '' : '&showTitle=0';
		data.content.check2 = fields.check2.getValue() ? '' : '&showNav=0';
		data.content.check3 = fields.check3.getValue() ? '' : '&showDate=0';
		data.content.check4 = fields.check4.getValue() ? '' : '&showPrint=0';
		data.content.check5 = fields.check5.getValue() ? '' : '&showTabs=0';
		data.content.check6 = fields.check6.getValue() ? '' : '&showCalendars=0';
		data.content.check7 = fields.check7.getValue() ? '' : '&showTz=0';
		
		if (fields.border0.getValue()) {
			data.content.border = '1';
			data.content.border_style = 'border:solid 1px #777';
		}
		if (fields.border1.getValue()) {
			data.content.border = '0';
			data.content.border_style = 'border-width:0';
		}
		if (fields.mode0.getValue()) data.content.mode = 'WEEK';
		if (fields.mode1.getValue()) data.content.mode = 'MONTH';
		if (fields.mode2.getValue()) data.content.mode = 'AGENDA';
		
		color = fields.color.getValue();
		data.content.color = color.replace('#', '');
		
		data.content.groupId = fields.groupId.getText();
		data.content.calendar_name = fields.calendar_name.getText();
		this.updateFinalGroupId(data);
		this.updateFinalCalendarName(data);
	},
	loadAction: function(data) {
		if (!data.content.timezone) data.content.timezone = '';
		if (!data.content.language) data.content.language = '';
		if (!data.content.weekday) data.content.weekday = '2';
		if (!data.content.groupId) data.content.groupId = '';
		if (!data.content.calendar_name) data.content.calendar_name = '';
		if (!data.content.border) {data.content.border = '0'; data.content.checkbox_border = false;}
		else {data.content.border = '1'; data.content.checkbox_border = true;}
		if (!data.content.check1) {data.content.check1 = ''; data.content.checkbox_check1 = true;}
		else {data.content.check1 = '&showTitle=0'; data.content.checkbox_check1 = false;}
		if (!data.content.check2) {data.content.check2 = ''; data.content.checkbox_check2 = true;}
		else {data.content.check2 = '&showNav=0'; data.content.checkbox_check2 = false;}
		if (!data.content.check3) {data.content.check3 = ''; data.content.checkbox_check3 = true;}
		else {data.content.check3 = '&showDate=0'; data.content.checkbox_check3 = false;}
		if (!data.content.check4) {data.content.check4 = ''; data.content.checkbox_check4 = true;}
		else {data.content.check4 = '&showPrint=0'; data.content.checkbox_check5 = false;}
		if (!data.content.check5) {data.content.check5 = ''; data.content.checkbox_check5 = true;}
		else {data.content.check5 = '&showTabs=0'; data.content.checkbox_check5 = false;}
		if (!data.content.check6) {data.content.check6 = ''; data.content.checkbox_check6 = true;}
		else {data.content.check6 = '&showCalendars=0'; data.content.checkbox_check6 = false;}
		if (!data.content.check7) {data.content.check7 = ''; data.content.checkbox_check7 = true;}
		else {data.content.check7 = '&showTz=0'; data.content.checkbox_check7 = false;}

		if (!data.content.mode) data.content.mode = 'MONTH';
		if (!data.content.border_style) data.content.border_style = 'border-width:0';
		if (!data.content.color) data.content.color = '00adef';
		this.updateFinalGroupId(data);
		this.updateFinalCalendarName(data);
	},
	onDblClick: function() {
		var thisClass = this;
		setTimeout(function() {
			var component = thisClass.getPropertyComponent('calendarId');
			if (component) component.focus();
		}, 50);
	}
});
