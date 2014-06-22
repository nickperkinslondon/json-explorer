(function() {
  var app, deps;

  deps = ['jsonExplorer'];

  if (!angular.version.full.indexOf("1.1") >= 0) {
    deps.push('ngAnimate');
  }

  app = angular.module('testJsonExplorer', deps);

  app.controller('testController', function($scope) {
    $scope.test_data = {
      name: 'Nick',
      age: 46
    };
    return $scope.test_data = [
      {
        "id": 0,
        "guid": "b0150a5f-6f59-465c-9bb0-eb77ecbe88fb",
        "isActive": true,
        "balance": "$2,621.91",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green",
        "name": "Mullen Bradford",
        "gender": "male",
        "company": "APPLICA",
        "email": "mullenbradford@applica.com",
        "phone": "+1 (988) 425-2642",
        "address": "834 Reed Street, Walker, Michigan, 7365",
        "about": "Voluptate sint nisi minim cillum cupidatat nostrud ullamco adipisicing ad eu cillum. Aliquip minim duis commodo mollit voluptate sit in minim et fugiat. Aute aliqua enim dolore id culpa dolore ipsum ad fugiat Lorem.\r\n",
        "registered": "2014-04-16T17:29:01 +04:00",
        "latitude": -34.264068,
        "longitude": -156.435143,
        "tags": ["velit", "nisi", "sint", "et", "Lorem", "consectetur", "sint"],
        "friends": [
          {
            "id": 0,
            "name": "Marisol Carroll"
          }, {
            "id": 1,
            "name": "Nettie Camacho"
          }, {
            "id": 2,
            "name": "Christina Cross"
          }
        ],
        "greeting": "Hello, Mullen Bradford! You have 6 unread messages.",
        "favoriteFruit": "strawberry"
      }, {
        "id": 1,
        "guid": "a0a465c9-fb41-48f9-b2eb-c82f36607d76",
        "isActive": false,
        "balance": "$2,857.83",
        "picture": "http://placehold.it/32x32",
        "age": 37,
        "eyeColor": "brown",
        "name": "Elisabeth Davenport",
        "gender": "female",
        "company": "LOTRON",
        "email": "elisabethdavenport@lotron.com",
        "phone": "+1 (953) 427-2522",
        "address": "154 Bay Street, Coleville, Nebraska, 5656",
        "about": "Proident voluptate aliqua aute laboris fugiat sint cupidatat et et mollit consectetur voluptate pariatur. Lorem duis id pariatur in dolor ipsum mollit et nulla. Consequat amet consequat fugiat deserunt id ex dolore dolor id dolore non non ut. Dolore ex nostrud sint elit deserunt. Ullamco velit sunt cupidatat non incididunt sint occaecat labore. Fugiat cillum irure laboris do deserunt minim.\r\n",
        "registered": "2014-02-21T15:35:12 +05:00",
        "latitude": 19.61489,
        "longitude": 59.438964,
        "tags": ["ipsum", "ea", "excepteur", "cillum", "exercitation", "enim", "eu"],
        "friends": [
          {
            "id": 0,
            "name": "Golden Carter"
          }, {
            "id": 1,
            "name": "Loretta Robbins"
          }, {
            "id": 2,
            "name": "Cantu Barlow"
          }
        ],
        "greeting": "Hello, Elisabeth Davenport! You have 10 unread messages.",
        "favoriteFruit": "apple"
      }, {
        "id": 2,
        "guid": "7ef83503-9218-4155-b444-9dd45bdc7a2d",
        "isActive": true,
        "balance": "$2,885.68",
        "picture": "http://placehold.it/32x32",
        "age": 36,
        "eyeColor": "brown",
        "name": "Gloria Delaney",
        "gender": "female",
        "company": "EPLODE",
        "email": "gloriadelaney@eplode.com",
        "phone": "+1 (974) 435-2717",
        "address": "806 Bayview Avenue, Layhill, Maine, 3338",
        "about": "Amet veniam est incididunt cillum reprehenderit cillum cupidatat minim officia ea amet ullamco cillum. Enim incididunt velit magna adipisicing eu. Enim dolor anim cupidatat fugiat anim occaecat ut dolor. Eu excepteur aute pariatur adipisicing id eu est laboris excepteur. Lorem ipsum commodo reprehenderit minim qui. Dolor consectetur non consectetur aute ex officia incididunt officia nulla. Est culpa enim ipsum laboris fugiat ut id qui non ex duis laboris.\r\n",
        "registered": "2014-02-23T10:28:10 +05:00",
        "latitude": 44.205944,
        "longitude": 172.064452,
        "tags": ["eiusmod", "exercitation", "dolore", "consequat", "incididunt", "proident", "ut"],
        "friends": [
          {
            "id": 0,
            "name": "Mabel Farley"
          }, {
            "id": 1,
            "name": "Alicia Cruz"
          }, {
            "id": 2,
            "name": "Robyn Pollard"
          }
        ],
        "greeting": "Hello, Gloria Delaney! You have 10 unread messages.",
        "favoriteFruit": "apple"
      }, {
        "id": 3,
        "guid": "bb163d62-d682-48c1-8090-1a65acac5872",
        "isActive": false,
        "balance": "$1,035.69",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "green",
        "name": "Dudley Bush",
        "gender": "male",
        "company": "BIZMATIC",
        "email": "dudleybush@bizmatic.com",
        "phone": "+1 (927) 494-3503",
        "address": "813 Ryder Avenue, Byrnedale, California, 8315",
        "about": "Elit non incididunt pariatur ipsum. Qui cillum ad esse ipsum. Eu occaecat reprehenderit nostrud irure.\r\n",
        "registered": "2014-02-22T22:30:33 +05:00",
        "latitude": 46.871517,
        "longitude": 77.441139,
        "tags": ["ea", "dolore", "proident", "fugiat", "laboris", "deserunt", "ipsum"],
        "friends": [
          {
            "id": 0,
            "name": "Bradshaw Workman"
          }, {
            "id": 1,
            "name": "Woods Pope"
          }, {
            "id": 2,
            "name": "Camacho Roth"
          }
        ],
        "greeting": "Hello, Dudley Bush! You have 4 unread messages.",
        "favoriteFruit": "strawberry"
      }, {
        "id": 4,
        "guid": "f99ba554-436c-49be-88dc-006c9e3ac4db",
        "isActive": true,
        "balance": "$3,789.76",
        "picture": "http://placehold.it/32x32",
        "age": 32,
        "eyeColor": "green",
        "name": "Joan Mcgowan",
        "gender": "female",
        "company": "GAPTEC",
        "email": "joanmcgowan@gaptec.com",
        "phone": "+1 (915) 538-3596",
        "address": "356 Miller Avenue, Darlington, Nevada, 5787",
        "about": "Dolore sint consequat dolor occaecat exercitation ullamco aliquip id anim fugiat sit proident dolor ex. Pariatur exercitation sunt qui ipsum sit anim voluptate ipsum commodo. Laboris et amet nostrud enim dolor est aliqua eiusmod officia exercitation sit fugiat ut et. Laborum dolor irure occaecat do cupidatat aliquip minim ullamco esse exercitation nostrud eu. Veniam dolore velit fugiat cillum laborum proident duis tempor.\r\n",
        "registered": "2014-01-17T04:30:46 +05:00",
        "latitude": -79.205331,
        "longitude": 109.465325,
        "tags": ["magna", "velit", "nostrud", "dolore", "eu", "labore", "exercitation"],
        "friends": [
          {
            "id": 0,
            "name": "Tabitha French"
          }, {
            "id": 1,
            "name": "Booker Gill"
          }, {
            "id": 2,
            "name": "Selena Carpenter"
          }
        ],
        "greeting": "Hello, Joan Mcgowan! You have 5 unread messages.",
        "favoriteFruit": "apple"
      }, {
        "id": 5,
        "guid": "ad209254-3bd1-4d91-983a-296b3d71e979",
        "isActive": false,
        "balance": "$3,725.90",
        "picture": "http://placehold.it/32x32",
        "age": 29,
        "eyeColor": "green",
        "name": "Phillips Eaton",
        "gender": "male",
        "company": "HARMONEY",
        "email": "phillipseaton@harmoney.com",
        "phone": "+1 (802) 407-3226",
        "address": "116 Chapel Street, Vienna, Louisiana, 8947",
        "about": "Officia ipsum elit ex dolor sint voluptate velit occaecat minim aliqua exercitation qui Lorem. Ex laboris ut cillum irure anim nostrud exercitation voluptate anim sint. Velit sunt incididunt dolore adipisicing officia dolore incididunt et veniam veniam. Enim commodo voluptate duis laborum. Qui reprehenderit exercitation eiusmod occaecat. Commodo in anim ex veniam et sint id sunt ullamco aliquip dolore.\r\n",
        "registered": "2014-02-27T14:56:14 +05:00",
        "latitude": 49.270592,
        "longitude": -131.059068,
        "tags": ["dolor", "amet", "nostrud", "sit", "proident", "eiusmod", "aliquip"],
        "friends": [
          {
            "id": 0,
            "name": "Sallie Zamora"
          }, {
            "id": 1,
            "name": "Compton Dalton"
          }, {
            "id": 2,
            "name": "Rachelle Greer"
          }
        ],
        "greeting": "Hello, Phillips Eaton! You have 2 unread messages.",
        "favoriteFruit": "banana"
      }, {
        "id": 6,
        "guid": "8538e660-d6cd-440c-8d50-7048df0c7b48",
        "isActive": false,
        "balance": "$2,540.55",
        "picture": "http://placehold.it/32x32",
        "age": 26,
        "eyeColor": "blue",
        "name": "Rich Woodard",
        "gender": "male",
        "company": "XPLOR",
        "email": "richwoodard@xplor.com",
        "phone": "+1 (947) 537-2869",
        "address": "496 Milford Street, Brutus, West Virginia, 2638",
        "about": "Est laboris mollit eu aute est veniam. Aliquip enim ut irure consequat commodo nostrud officia cillum voluptate tempor labore adipisicing ad elit. Sit labore exercitation sint culpa. Lorem commodo reprehenderit duis quis veniam ad amet consequat consequat cillum proident sit. Aute aliquip proident exercitation voluptate pariatur exercitation ex aliquip reprehenderit labore id sint. Commodo id nisi ullamco proident fugiat sunt Lorem id dolore dolor.\r\n",
        "registered": "2014-01-21T02:03:01 +05:00",
        "latitude": -82.086899,
        "longitude": -63.295205,
        "tags": ["Lorem", "nostrud", "dolore", "incididunt", "enim", "in", "tempor"],
        "friends": [
          {
            "id": 0,
            "name": "Alison Preston"
          }, {
            "id": 1,
            "name": "Raquel Clayton"
          }, {
            "id": 2,
            "name": "Gibbs Case"
          }
        ],
        "greeting": "Hello, Rich Woodard! You have 8 unread messages.",
        "favoriteFruit": "apple"
      }
    ];
  });

}).call(this);
